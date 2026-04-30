/**
 * Smart Locale Detection for Silk Beauty Salon
 * Detects locale from various sources with priority order
 */

import { cookies } from 'next/headers';
import { locales, Locale, localeNames } from '@/i18n';

// Constants
const LOCALE_COOKIE_NAME = 'preferred-locale';
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Language to locale mapping for common Accept-Language values
const languageToLocale: Record<string, Locale> = {
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'ka': 'ka',
  'ka-ge': 'ka',
  'ru': 'ru',
  'ru-ru': 'ru',
  'tr': 'tr',
  'tr-tr': 'tr',
  'ar': 'ar',
  'ar-sa': 'ar',
  'ar-ae': 'ar',
  'he': 'he',
  'he-il': 'he',
  'iw': 'he', // Legacy Hebrew code
};

// Geolocation to locale mapping (country code to locale)
const countryToLocale: Record<string, Locale> = {
  'GE': 'ka', // Georgia
  'RU': 'ru', // Russia
  'UA': 'ru', // Ukraine (Russian widely spoken)
  'BY': 'ru', // Belarus
  'KZ': 'ru', // Kazakhstan
  'TR': 'tr', // Turkey
  'SA': 'ar', // Saudi Arabia
  'AE': 'ar', // UAE
  'QA': 'ar', // Qatar
  'KW': 'ar', // Kuwait
  'BH': 'ar', // Bahrain
  'OM': 'ar', // Oman
  'JO': 'ar', // Jordan
  'LB': 'ar', // Lebanon
  'EG': 'ar', // Egypt
  'IQ': 'ar', // Iraq
  'IL': 'he', // Israel
  'PS': 'ar', // Palestine
};

export interface LocaleDetectionResult {
  locale: Locale;
  source: 'cookie' | 'accept-language' | 'geolocation' | 'default';
  confidence: number;
  detectedCountry?: string;
}

/**
 * Detect locale from Accept-Language header
 */
function detectFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  // Parse Accept-Language header
  // Format: "en-US,en;q=0.9,ka;q=0.8,ru;q=0.7"
  const languages = header
    .split(',')
    .map((lang) => {
      const [code, qValue] = lang.trim().split(';q=');
      return {
        code: code.toLowerCase().trim(),
        quality: qValue ? parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first matching locale
  for (const { code } of languages) {
    const locale = languageToLocale[code];
    if (locale) {
      return locale;
    }

    // Try matching base language (e.g., 'en' from 'en-US')
    const baseCode = code.split('-')[0];
    const baseLocale = languageToLocale[baseCode];
    if (baseLocale) {
      return baseLocale;
    }
  }

  return null;
}

/**
 * Detect locale from geolocation (IP-based)
 * Note: This requires a geolocation service
 */
function detectFromGeolocation(countryCode: string | null): Locale | null {
  if (!countryCode) return null;

  const upperCode = countryCode.toUpperCase();
  return countryToLocale[upperCode] || null;
}

/**
 * Check if a locale is valid
 */
function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Smart locale detection with priority order:
 * 1. User's saved preference (cookie)
 * 2. Browser Accept-Language header
 * 3. Geolocation-based detection
 * 4. Default locale
 */
export function detectLocale(options: {
  acceptLanguage?: string | null;
  countryCode?: string | null;
  cookieLocale?: string | null;
  defaultLocale?: Locale;
} = {}): LocaleDetectionResult {
  const { acceptLanguage, countryCode, cookieLocale, defaultLocale = 'en' } = options;

  // Priority 1: Cookie (user preference)
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return {
      locale: cookieLocale,
      source: 'cookie',
      confidence: 1.0,
    };
  }

  // Priority 2: Accept-Language header
  const fromHeader = detectFromAcceptLanguage(acceptLanguage || null);
  if (fromHeader) {
    return {
      locale: fromHeader,
      source: 'accept-language',
      confidence: 0.8,
    };
  }

  // Priority 3: Geolocation
  const fromGeo = detectFromGeolocation(countryCode || null);
  if (fromGeo) {
    return {
      locale: fromGeo,
      source: 'geolocation',
      confidence: 0.6,
      detectedCountry: countryCode || undefined,
    };
  }

  // Priority 4: Default
  return {
    locale: defaultLocale,
    source: 'default',
    confidence: 0.5,
  };
}

/**
 * Set preferred locale in cookie
 * (Server action or API route)
 */
export async function setPreferredLocale(locale: Locale): Promise<void> {
  'use server';

  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Get user preferred locale (client-side)
 * Returns null if no preference stored
 */
export function getClientPreferredLocale(): Locale | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp(`${LOCALE_COOKIE_NAME}=([^;]+)`));
  const locale = match?.[1];

  if (locale && isValidLocale(locale)) {
    return locale as Locale;
  }

  return null;
}

/**
 * Save preferred locale (client-side)
 */
export function setClientPreferredLocale(locale: Locale): void {
  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Locale detection for Next.js middleware
 */
export function detectLocaleFromRequest(request: Request): LocaleDetectionResult {
  const acceptLanguage = request.headers.get('accept-language');

  // Try cookie first
  const cookieHeader = request.headers.get('cookie');
  const cookieMatch = cookieHeader?.match(new RegExp(`${LOCALE_COOKIE_NAME}=([^;]+)`));
  const cookieLocale = cookieMatch?.[1];

  return detectLocale({
    acceptLanguage,
    cookieLocale: cookieLocale || null,
  });
}

/**
 * Get all supported locales info for UI
 */
export function getSupportedLocales(): Array<{
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}> {
  return locales.map((code) => ({
    code,
    ...localeNames[code],
  }));
}
