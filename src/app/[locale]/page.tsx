import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ContentSection from '@/components/sections/ContentSection';
import CategoryGrid from '@/components/sections/CategoryGrid';
import StatsSection from '@/components/sections/StatsSection';
import CTABanner from '@/components/sections/CTABanner';
import BeforeAfter from '@/components/sections/BeforeAfter';
import { JsonLd, generateLocalBusinessSchema } from '@/components/seo/JsonLd';

const categories = [
  { title: 'Dermal Fillers', description: 'Restore volume and contour with premium hyaluronic acid treatments.', imageSrc: 'https://picsum.photos/seed/fillers/1152/864', imageAlt: 'Dermal fillers treatment', href: '/treatments/fillers' },
  { title: 'Skinboosters', description: 'Deep hydration and radiance for revitalized, glowing skin.', imageSrc: 'https://picsum.photos/seed/skinboosters/1152/864', imageAlt: 'Skinboosters treatment', href: '/treatments/skinboosters' },
  { title: 'Biostimulators', description: 'Stimulate your skin\'s natural collagen production for lasting results.', imageSrc: 'https://picsum.photos/seed/biostimulators/1152/864', imageAlt: 'Biostimulators treatment', href: '/treatments/biostimulators' },
  { title: 'Other Treatments', description: 'Expression line treatments and additional aesthetic solutions.', imageSrc: 'https://picsum.photos/seed/other/1152/864', imageAlt: 'Other aesthetic treatments', href: '/treatments/other' },
]

const stats = [
  { value: '67', suffix: '%', description: 'Patients with a desire to feel happier and more confident or improve quality of life.' },
  { value: '61', suffix: '%', description: 'Patients who wanted to treat themselves or celebrate a milestone.' },
]

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
  
  return (
    <>
      <JsonLd schema={generateLocalBusinessSchema(locale)} />
      <HeroSection
        imageSrc="https://picsum.photos/seed/hero/1344/768"
        imageAlt="Beauty aesthetics confidence"
        heading="Confidence in your skin is our main concern"
        ctaText="Find out how"
        ctaHref="/consultation"
      />
      <ContentSection
        heading="Aesthetic possibilities shaped together"
        body="There are many types of fine lines and wrinkles, and a name for almost every type we may experience on our face. Our portfolio of treatments offers a holistic approach to achieving natural-looking results that celebrate your individuality."
      />
      <CategoryGrid categories={categories} />
      <ContentSection
        heading="Combat the side effects of time"
        body="As we age, changes to the underlying structure of our skin can result in expression lines that alter our appearance. By temporarily relaxing the muscles of the face, we can reduce the appearance of these expression lines and feel our best."
        imageSrc="https://picsum.photos/seed/combat/1344/768"
        imageAlt="Combat side effects of time"
      />
      <StatsSection stats={stats} />
      <CTABanner
        imageSrc="https://picsum.photos/seed/specialist/1344/768"
        imageAlt="Find a specialist"
        heading="Find a specialist"
        description="Ready to explore your options? Connect with a qualified specialist near you."
        ctaText="Get started"
        ctaHref="/find-specialist"
      />
      <BeforeAfter
        beforeSrc="https://picsum.photos/seed/before/800/800"
        afterSrc="https://picsum.photos/seed/after/800/800"
        beforeAlt="Before treatment"
        afterAlt="After treatment"
        ctaText="See their results"
        ctaHref="/results"
      />
    </>
  );
}
