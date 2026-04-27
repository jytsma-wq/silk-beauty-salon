import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CinematicHeroSection } from '@/components/sections/CinematicHeroSection';
import { PressBar } from '@/components/sections/PressBar';
import { BrandManifestoSection } from '@/components/sections/BrandManifestoSection';
import { RevealSection } from '@/components/ui/RevealSection';
import { EditorialTreatmentsSection } from '@/components/sections/EditorialTreatmentsSection';
import { StatisticsStrip } from '@/components/sections/StatisticsStrip';
import { PullQuoteTestimonial } from '@/components/sections/PullQuoteTestimonial';
import { ConsultationCTA } from '@/components/sections/ConsultationCTA';
import { AboutSection } from '@/components/sections/AboutSection';
import { JsonLd, generateLocalBusinessSchema } from '@/components/seo/JsonLd';

// Lazy load below-fold components for better performance
const TreatmentsMarquee = dynamic(
  () => import('@/components/sections/TreatmentsMarquee').then(mod => mod.TreatmentsMarquee),
  { loading: () => null }
);

const ConditionsSection = dynamic(
  () => import('@/components/sections/ConditionsSection').then(mod => mod.ConditionsSection),
  { loading: () => null }
);

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
      template: '%s | Silk Beauty Salon'
    },
    description: t('homeDescription'),
    keywords: ['botox', 'dermal fillers', 'laser treatment', 'skin care', 'aesthetic clinic', 'Batumi', 'Georgia', 'beauty salon'],
    authors: [{ name: 'Silk Beauty Salon' }],
    creator: 'Silk Beauty Salon',
    publisher: 'Silk Beauty Salon',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.silkbeauty.ge'),
    alternates: {
      canonical: `https://www.silkbeauty.ge/${locale}`,
      languages: {
        'en': 'https://www.silkbeauty.ge/en',
        'ka': 'https://www.silkbeauty.ge/ka',
        'ru': 'https://www.silkbeauty.ge/ru',
        'tr': 'https://www.silkbeauty.ge/tr',
        'ar': 'https://www.silkbeauty.ge/ar',
        'he': 'https://www.silkbeauty.ge/he',
      },
    },
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      url: `https://www.silkbeauty.ge/${locale}`,
      siteName: 'Silk Beauty Salon',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [
        {
          url: 'https://www.silkbeauty.ge/opengraph-image.png',
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
      images: ['https://www.silkbeauty.ge/opengraph-image.png'],
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
      <CinematicHeroSection />          {/* Video + kinetic text */}
      <PressBar />                      {/* Dark credential ticker */}
      <RevealSection><BrandManifestoSection /></RevealSection>
      <RevealSection direction="left"><EditorialTreatmentsSection /></RevealSection>
      <TreatmentsMarquee />
      <RevealSection direction="right"><ConditionsSection /></RevealSection>
      <RevealSection direction="left"><AboutSection /></RevealSection>
      <StatisticsStrip />              {/* Already has internal motion */}
      <PullQuoteTestimonial />         {/* Already has internal motion */}
      <RevealSection><ConsultationCTA /></RevealSection>
    </>
  );
}
