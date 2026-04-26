import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { headers } from 'next/headers';
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AnnouncerProvider } from "@/components/ui/announcer";
import { GaldermaHeader } from "@/components/layout/GaldermaHeader";
import { GaldermaFooter } from "@/components/layout/GaldermaFooter";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { AnalyticsScripts } from "@/components/providers/AnalyticsScripts";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { SkipLink } from "@/components/layout/SkipLink";

export const metadata: Metadata = {
  title: "Premier Beauty Salon in Batumi | Silk Beauty Salon",
  description: "Batumi's premier beauty salon on Zurab Gorgiladze Street.",
  keywords: ["beauty salon", "botox", "dermal fillers", "laser treatments", "skin treatments", "Batumi", "Georgia", "cosmetic clinic"],
  authors: [{ name: "Silk Beauty Salon" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure valid locale
  const validLocale = (routing.locales as readonly string[]).includes(locale) ? locale : routing.defaultLocale;

  setRequestLocale(validLocale);

  const messages = await getMessages();

  // Get CSRF token from middleware header
  const headersList = await headers();
  const csrfToken = headersList.get('X-CSRF-Token') || '';

  // Check if RTL language
  const rtlLocales = ['ar', 'he'];
  const isRtl = rtlLocales.includes(validLocale);

  return (
    <html lang={validLocale} suppressHydrationWarning className="scroll-smooth" dir={isRtl ? 'rtl' : 'ltr'}>
      <head>{csrfToken ? <meta name="csrf-token" content={csrfToken} /> : null}</head>
      <body
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <ConsentProvider>
          <AnalyticsScripts
            gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
            gtmId={process.env.NEXT_PUBLIC_GTM_ID}
            fbPixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID}
          />
          <NextIntlClientProvider messages={messages}>
            <AnnouncerProvider>
              <SkipLink />
              <GaldermaHeader />
              <main id="main-content">{children}</main>
              <GaldermaFooter />
              <WhatsAppWidget />
              <Toaster />
            </AnnouncerProvider>
          </NextIntlClientProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
