import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ContentSection from '@/components/sections/ContentSection';
import CategoryGrid from '@/components/sections/CategoryGrid';
import StatsSection from '@/components/sections/StatsSection';
import CTABanner from '@/components/sections/CTABanner';
import BeforeAfter from '@/components/sections/BeforeAfter';
import { JsonLd, generateLocalBusinessSchema } from '@/components/seo/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';

function getCategories(t: (key: string) => string) {
  return [
    { title: t('fillers'), description: t('fillersDesc'), imageSrc: 'https://picsum.photos/seed/fillers/1152/864', imageAlt: t('fillersAlt'), href: '/treatments/fillers' },
    { title: t('skinboosters'), description: t('skinboostersDesc'), imageSrc: 'https://picsum.photos/seed/skinboosters/1152/864', imageAlt: t('skinboostersAlt'), href: '/treatments/skinboosters' },
    { title: t('biostimulators'), description: t('biostimulatorsDesc'), imageSrc: 'https://picsum.photos/seed/biostimulators/1152/864', imageAlt: t('biostimulatorsAlt'), href: '/treatments/biostimulators' },
    { title: t('other'), description: t('otherDesc'), imageSrc: 'https://picsum.photos/seed/other/1152/864', imageAlt: t('otherAlt'), href: '/treatments/other' },
  ];
}

function getStats(t: (key: string) => string) {
  return [
    { value: '67', suffix: '%', description: t('stat1') },
    { value: '61', suffix: '%', description: t('stat2') },
  ];
}

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
      locale: locale || 'en_US',
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

  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tContent = await getTranslations({ locale, namespace: 'content' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tStats = await getTranslations({ locale, namespace: 'stats' });
  const tCTA = await getTranslations({ locale, namespace: 'cta' });
  const tResults = await getTranslations({ locale, namespace: 'results' });

  const categories = getCategories(tCat);
  const stats = getStats(tStats);

  return (
    <>
      <JsonLd schema={generateLocalBusinessSchema(locale)} />
      <HeroSection
        imageSrc="https://picsum.photos/seed/hero/1344/768"
        imageAlt={tHero('imageAlt')}
        heading={tHero('heading')}
        ctaText={tHero('ctaText')}
        ctaHref="/consultation"
      />
      <ScrollReveal delay={0}>
        <ContentSection
          heading={tContent('heading1')}
          body={tContent('body1')}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <CategoryGrid categories={categories} />
      </ScrollReveal>
      <ScrollReveal delay={0}>
        <ContentSection
          heading={tContent('heading2')}
          body={tContent('body2')}
          imageSrc="https://picsum.photos/seed/combat/1344/768"
          imageAlt={tContent('imageAlt2')}
        />
      </ScrollReveal>
      <ScrollReveal delay={0}>
        <StatsSection stats={stats} />
      </ScrollReveal>
      <ScrollReveal delay={0}>
        <CTABanner
          imageSrc="https://picsum.photos/seed/specialist/1344/768"
          imageAlt={tCTA('imageAlt')}
          heading={tCTA('heading')}
          description={tCTA('description')}
          ctaText={tCTA('ctaText')}
          ctaHref="/find-specialist"
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BeforeAfter
          beforeSrc="https://picsum.photos/seed/before/800/800"
          afterSrc="https://picsum.photos/seed/after/800/800"
          beforeAlt={tResults('beforeAlt')}
          afterAlt={tResults('afterAlt')}
          ctaText={tResults('ctaText')}
          ctaHref="/results"
        />
      </ScrollReveal>
    </>
  );
}
