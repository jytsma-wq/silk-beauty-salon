/**
 * Locale-aware formatters for Silk Beauty Salon
 * Uses Intl API for proper localization
 */

/**
 * Format a price amount with proper currency formatting
 * @param amount - The numeric amount
 * @param locale - The locale code (e.g., 'en', 'ka', 'ru', 'ar', 'he', 'tr')
 * @param currency - The currency code (default: 'GEL' for Georgian Lari)
 * @returns Formatted price string
 */
export function formatPrice(
  amount: number,
  locale: string,
  currency: string = 'GEL'
): string {
  // Map locale codes to proper Intl locales
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ka: 'ka-GE',
    ru: 'ru-RU',
    ar: 'ar-SA',
    he: 'he-IL',
    tr: 'tr-TR',
  };

  const intlLocale = localeMap[locale] || locale;

  try {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback if Intl.NumberFormat fails
    return `${amount} ${currency}`;
  }
}

/**
 * Format a date with locale-specific formatting
 * @param date - The date to format
 * @param locale - The locale code
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ka: 'ka-GE',
    ru: 'ru-RU',
    ar: 'ar-SA',
    he: 'he-IL',
    tr: 'tr-TR',
  };

  const intlLocale = localeMap[locale] || locale;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(intlLocale, defaultOptions).format(date);
  } catch {
    // Fallback to ISO string if Intl.DateTimeFormat fails
    return date.toISOString().split('T')[0];
  }
}

/**
 * Format a number with locale-specific formatting
 * @param num - The number to format
 * @param locale - The locale code
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ka: 'ka-GE',
    ru: 'ru-RU',
    ar: 'ar-SA',
    he: 'he-IL',
    tr: 'tr-TR',
  };

  const intlLocale = localeMap[locale] || locale;

  try {
    return new Intl.NumberFormat(intlLocale).format(num);
  } catch {
    return num.toString();
  }
}

/**
 * Format a relative time (e.g., "2 days ago")
 * @param date - The date to format relatively
 * @param locale - The locale code
 * @returns Formatted relative time string
 */
export function formatRelativeTime(
  date: Date,
  locale: string
): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ka: 'ka-GE',
    ru: 'ru-RU',
    ar: 'ar-SA',
    he: 'he-IL',
    tr: 'tr-TR',
  };

  const intlLocale = localeMap[locale] || locale;

  try {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return new Intl.RelativeTimeFormat(intlLocale).format(-diffInMinutes, 'minute');
      }
      return new Intl.RelativeTimeFormat(intlLocale).format(-diffInHours, 'hour');
    }

    if (diffInDays < 30) {
      return new Intl.RelativeTimeFormat(intlLocale).format(-diffInDays, 'day');
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return new Intl.RelativeTimeFormat(intlLocale).format(-diffInMonths, 'month');
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return new Intl.RelativeTimeFormat(intlLocale).format(-diffInYears, 'year');
  } catch {
    // Fallback to simple date format
    return formatDate(date, locale);
  }
}
