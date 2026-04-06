export const locales = ['en', 'ka', 'ru', 'tr', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, { name: string; nativeName: string; flag: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', flag: 'https://flagcdn.com/w40/gb.png', dir: 'ltr' },
  ka: { name: 'Georgian', nativeName: 'ქართული', flag: 'https://flagcdn.com/w40/ge.png', dir: 'ltr' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: 'https://flagcdn.com/w40/ru.png', dir: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: 'https://flagcdn.com/w40/sa.png', dir: 'rtl' },
  he: { name: 'Hebrew', nativeName: 'עברית', flag: 'https://flagcdn.com/w40/il.png', dir: 'rtl' }
};

export const rtlLocales = ['ar', 'he'];
