import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { rtlLocales } from '@/i18n';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';
  const isRtl = rtlLocales.includes(locale as 'ar' | 'he');
  const nonce = headersList.get('x-nonce') || '';
  const csrfToken = headersList.get('X-CSRF-Token') || '';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {csrfToken ? <meta name="csrf-token" content={csrfToken} /> : null}
        {nonce ? <meta name="csp-nonce" content={nonce} /> : null}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
