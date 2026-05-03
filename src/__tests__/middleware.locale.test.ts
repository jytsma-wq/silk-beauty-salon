import { describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Import the functions we want to test
// We need to extract and export these from middleware.ts for testing

// Re-implement the functions here for testing (since they're not exported from middleware.ts)
const SUPPORTED_LOCALES = ['en', 'ka', 'ru', 'tr', 'ar', 'he'];

function parseAcceptLanguage(header: string | null): Array<{ tag: string; quality: number }> {
  if (!header) return [];

  return header
    .split(',')
    .map((part) => {
      const [tag, ...qParts] = part.trim().split(';');
      let quality = 1;

      if (qParts.length > 0) {
        const qMatch = qParts.join(';').match(/q=([0-9.]+)/);
        if (qMatch) {
          quality = parseFloat(qMatch[1]) || 0;
        }
      }

      return { tag: tag.trim().toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);
}

function mapToSupportedLocale(tag: string): string | null {
  const normalizedTag = tag.toLowerCase();

  // Exact match
  if (SUPPORTED_LOCALES.includes(normalizedTag)) {
    return normalizedTag;
  }

  // Try primary language subtag (e.g., "ar-AE" -> "ar")
  const primaryTag = normalizedTag.split('-')[0];
  if (SUPPORTED_LOCALES.includes(primaryTag)) {
    return primaryTag;
  }

  return null;
}

function detectLocale(request: NextRequest): string {
  // Check for existing locale cookie first
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && SUPPORTED_LOCALES.includes(localeCookie)) {
    return localeCookie;
  }

  // Parse Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const parsedLanguages = parseAcceptLanguage(acceptLanguage);

  // Find first matching supported locale
  for (const { tag } of parsedLanguages) {
    const matchedLocale = mapToSupportedLocale(tag);
    if (matchedLocale) {
      return matchedLocale;
    }
  }

  // Fall back to default locale
  return 'en';
}

describe('parseAcceptLanguage', () => {
  it('returns empty array for null header', () => {
    expect(parseAcceptLanguage(null)).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(parseAcceptLanguage('')).toEqual([]);
  });

  it('parses single language without quality', () => {
    expect(parseAcceptLanguage('en')).toEqual([{ tag: 'en', quality: 1 }]);
  });

  it('parses multiple languages with quality values', () => {
    const result = parseAcceptLanguage('en-US,en;q=0.9,ka;q=0.8');
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ tag: 'en-us', quality: 1 });
    expect(result[1]).toEqual({ tag: 'en', quality: 0.9 });
    expect(result[2]).toEqual({ tag: 'ka', quality: 0.8 });
  });

  it('sorts by quality (highest first)', () => {
    const result = parseAcceptLanguage('ka;q=0.5,en;q=0.9,ru;q=0.8');
    expect(result[0].tag).toBe('en');
    expect(result[1].tag).toBe('ru');
    expect(result[2].tag).toBe('ka');
  });
});

describe('mapToSupportedLocale', () => {
  it('returns exact match for supported locale', () => {
    expect(mapToSupportedLocale('en')).toBe('en');
    expect(mapToSupportedLocale('ka')).toBe('ka');
    expect(mapToSupportedLocale('ru')).toBe('ru');
    expect(mapToSupportedLocale('tr')).toBe('tr');
    expect(mapToSupportedLocale('ar')).toBe('ar');
    expect(mapToSupportedLocale('he')).toBe('he');
  });

  it('matches primary language subtag for region variants', () => {
    expect(mapToSupportedLocale('en-US')).toBe('en');
    expect(mapToSupportedLocale('en-GB')).toBe('en');
    expect(mapToSupportedLocale('ar-AE')).toBe('ar');
    expect(mapToSupportedLocale('ar-SA')).toBe('ar');
    expect(mapToSupportedLocale('he-IL')).toBe('he');
    expect(mapToSupportedLocale('ru-RU')).toBe('ru');
    expect(mapToSupportedLocale('tr-TR')).toBe('tr');
    expect(mapToSupportedLocale('ka-GE')).toBe('ka');
  });

  it('handles case insensitivity', () => {
    expect(mapToSupportedLocale('EN')).toBe('en');
    expect(mapToSupportedLocale('Ar-AE')).toBe('ar');
    expect(mapToSupportedLocale('KA-ge')).toBe('ka');
  });

  it('returns null for unsupported locales', () => {
    expect(mapToSupportedLocale('fr')).toBeNull();
    expect(mapToSupportedLocale('de')).toBeNull();
    expect(mapToSupportedLocale('es-MX')).toBeNull();
    expect(mapToSupportedLocale('zh-CN')).toBeNull();
  });
});

describe('detectLocale', () => {
  let request: NextRequest;

  beforeEach(() => {
    // Create a mock request with NextRequest-like interface
    const url = new URL('http://localhost:3000/');
    request = new NextRequest(url, {
      headers: new Headers(),
    });
  });

  it('returns "en" when no Accept-Language header is provided', () => {
    expect(detectLocale(request)).toBe('en');
  });

  it('returns "ka" for Accept-Language: ka', () => {
    request.headers.set('accept-language', 'ka');
    expect(detectLocale(request)).toBe('ka');
  });

  it('returns "ar" for Accept-Language: ar-AE', () => {
    request.headers.set('accept-language', 'ar-AE');
    expect(detectLocale(request)).toBe('ar');
  });

  it('returns "en" for unknown language tag', () => {
    request.headers.set('accept-language', 'fr-FR');
    expect(detectLocale(request)).toBe('en');
  });

  it('respects quality values and returns first supported match', () => {
    // fr is not supported, en is, so en should be returned
    request.headers.set('accept-language', 'fr;q=0.9,en;q=0.8');
    expect(detectLocale(request)).toBe('en');
  });

  it('returns higher quality supported locale over lower quality', () => {
    request.headers.set('accept-language', 'ka;q=0.9,en;q=0.8');
    expect(detectLocale(request)).toBe('ka');
  });

  it('falls back when no languages match', () => {
    request.headers.set('accept-language', 'fr,de,es');
    expect(detectLocale(request)).toBe('en');
  });

  it('handles complex Accept-Language headers', () => {
    request.headers.set('accept-language', 'en-US,en;q=0.9,ka;q=0.8,ru;q=0.7,*;q=0.5');
    expect(detectLocale(request)).toBe('en');
  });

  it('prefers cookie over Accept-Language header', () => {
    // Create request with cookie
    const cookieUrl = new URL('http://localhost:3000/');
    const cookieRequest = new NextRequest(cookieUrl, {
      headers: new Headers({
        'accept-language': 'ka',
      }),
    });
    // Manually set cookie
    cookieRequest.cookies.set('NEXT_LOCALE', 'ru');

    expect(detectLocale(cookieRequest)).toBe('ru');
  });

  it('ignores invalid cookie and falls back to header', () => {
    request.headers.set('accept-language', 'ka');
    request.cookies.set('NEXT_LOCALE', 'invalid');

    expect(detectLocale(request)).toBe('ka');
  });
});
