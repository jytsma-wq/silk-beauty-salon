import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AnnouncerProvider } from "@/components/ui/announcer";
import { GaldermaHeader } from "@/components/layout/GaldermaHeader";
import { GaldermaFooter } from "@/components/layout/GaldermaFooter";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeProvider } from "@/components/providers/theme-provider";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://silkbeautysalon.com'),
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

  
  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages}>
        <ConsentProvider>
          <AnnouncerProvider>
            <SkipLink />
            <GaldermaHeader />
            <main id="main-content" className="pt-35">
              {children}
            </main>
            <GaldermaFooter />
            <WhatsAppWidget />
            <Toaster />
          </AnnouncerProvider>
        </ConsentProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
