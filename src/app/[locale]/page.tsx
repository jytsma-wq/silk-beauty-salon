import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { GaldermaInspiredHome } from '@/components/sections/galderma-home/GaldermaInspiredHome';
import { JsonLd, generateLocalBusinessSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/data/site-config';

const localeMap: Record<string, string> = {
  en: 'en_US',
  ka: 'ka_GE',
  ru: 'ru_RU',
  tr: 'tr_TR',
  ar: 'ar_SA',
  he: 'he_IL',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('homeTitle'),
      template: '%s | Silk Beauty Salon',
    },
    description: t('homeDescription'),
    keywords: t('keywords'),
    authors: [{ name: 'Silk Beauty Salon' }],
    creator: 'Silk Beauty Salon',
    publisher: 'Silk Beauty Salon',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        ka: `${siteConfig.url}/ka`,
        ru: `${siteConfig.url}/ru`,
        tr: `${siteConfig.url}/tr`,
        ar: `${siteConfig.url}/ar`,
        he: `${siteConfig.url}/he`,
      },
    },
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      url: `${siteConfig.url}/${locale}`,
      siteName: 'Silk Beauty Salon',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [
        {
          url: `${siteConfig.url}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: 'Silk Beauty Salon - Medical Aesthetics in Batumi',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [`${siteConfig.url}/opengraph-image.png`],
      creator: '@silkbeauty_batumi',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd schema={generateLocalBusinessSchema(locale)} />
      <GaldermaInspiredHome />
    </>
  );
}
