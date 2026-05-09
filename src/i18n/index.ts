export const locales = ['en', 'ka', 'ru', 'tr', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<
  Locale,
  { name: string; nativeName: string; flag: string; dir: 'ltr' | 'rtl' }
> = {
  en: { name: 'English', nativeName: 'English', flag: '/flags/en.svg', dir: 'ltr' },
  ka: { name: 'Georgian', nativeName: 'ქართული', flag: '/flags/ka.svg', dir: 'ltr' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: '/flags/ru.svg', dir: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '/flags/tr.svg', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '/flags/ar.svg', dir: 'rtl' },
  he: { name: 'Hebrew', nativeName: 'עברית', flag: '/flags/he.svg', dir: 'rtl' },
};

export const rtlLocales = ['ar', 'he'];
