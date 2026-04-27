import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { rtlLocales } from '@/i18n';
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Premier Beauty Salon in Batumi | Silk Beauty Salon",
    description: "Batumi's premier beauty salon on Zurab Gorgiladze Street.",
    keywords: ["beauty salon", "botox", "dermal fillers", "laser treatments", "skin treatments", "Batumi", "Georgia", "cosmetic clinic"],
    authors: [{ name: "Silk Beauty Salon" }],
    icons: {
      icon: "/favicon.ico",
    },
    other: {
      'link:rel:preload;as:video;href:https://cdn.coverr.co/videos/coverr-a-woman-getting-a-facial-treatment-6960/1080p.mp4;type:video/mp4': '',
    },
  };
}

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
  const isRtl = rtlLocales.includes(validLocale as 'ar' | 'he');

  return (
    <html lang={validLocale} dir={isRtl ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {csrfToken ? <meta name="csrf-token" content={csrfToken} /> : null}
      </head>
      <body>
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
