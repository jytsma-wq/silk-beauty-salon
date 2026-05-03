import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { rtlLocales } from '@/i18n';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';
  const isRtl = rtlLocales.includes(locale as 'ar' | 'he');

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
