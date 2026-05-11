import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { AnnouncerProvider } from "@/components/ui/announcer";
import { GaldermaHeader } from "@/components/layout/GaldermaHeader";
import { GaldermaFooter } from "@/components/layout/GaldermaFooter";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from '@/data/site-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url),
    title: t('siteTitle'),
    description: t('siteDescription'),
    keywords: t('siteKeywords'),
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
  );
}
