import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { rtlLocales } from '@/i18n';
import './globals.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';
  const isRtl = rtlLocales.includes(locale as 'ar' | 'he');
  const nonce = headersList.get('x-nonce') || '';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {nonce ? <meta name="csp-nonce" content={nonce} /> : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
