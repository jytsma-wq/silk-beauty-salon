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
  const csrfToken = headersList.get('X-CSRF-Token') || '';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.galdermaaesthetics.com" crossOrigin="anonymous" />
        {csrfToken ? <meta name="csrf-token" content={csrfToken} /> : null}
        {nonce ? <meta name="csp-nonce" content={nonce} /> : null}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const locale = window.location.pathname.split('/')[1] || '${locale}';
                document.documentElement.lang = locale;
                document.documentElement.dir = ${JSON.stringify(rtlLocales)}.includes(locale) ? 'rtl' : 'ltr';
              })();
            `,
          }}
        />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.remove('dark');
                try { localStorage.removeItem('theme'); } catch (error) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
