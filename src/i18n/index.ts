export const locales = ['en', 'ka', 'ru', 'tr', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, { name: string; nativeName: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  ka: { name: 'Georgian', nativeName: 'ქართული', dir: 'ltr' },
  ru: { name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  he: { name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' }
};

export const rtlLocales = ['ar', 'he'];
