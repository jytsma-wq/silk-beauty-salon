'use client';

import { useEffect } from 'react';
import { rtlLocales } from '@/i18n';

export function DocumentLocale({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = (rtlLocales as readonly string[]).includes(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
