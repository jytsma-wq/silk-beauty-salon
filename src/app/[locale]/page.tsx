import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { HeroSection } from '@/components/sections/HeroSection';
import { TreatmentsSection } from '@/components/sections/TreatmentsSection';
import { ConditionsSection } from '@/components/sections/ConditionsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { QuickLinksSection } from '@/components/sections/QuickLinksSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { JsonLd, generateLocalBusinessSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'Silk Beauty Salon | Premier Medical Aesthetics in Batumi',
    template: '%s | Silk Beauty Salon'
  },
  description: 'Premier medical aesthetic clinic in Batumi, Georgia. Expert Botox, dermal fillers, laser treatments & advanced skin care. Book your consultation today.',
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
    canonical: 'https://www.silkbeauty.ge',
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
    locale: 'en_US',
    url: 'https://www.silkbeauty.ge',
    siteName: 'Silk Beauty Salon',
    title: 'Silk Beauty Salon | Premier Medical Aesthetics in Batumi',
    description: 'Premier medical aesthetic clinic in Batumi, Georgia. Expert Botox, dermal fillers, laser treatments & advanced skin care.',
    images: [
      {
        url: 'https://www.silkbeauty.ge/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Silk Beauty Salon - Medical Aesthetics in Batumi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silk Beauty Salon | Premier Medical Aesthetics in Batumi',
    description: 'Premier medical aesthetic clinic in Batumi, Georgia. Expert Botox, dermal fillers, laser treatments.',
    images: ['https://www.silkbeauty.ge/og-image.svg'],
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
      <HeroSection />
      <TreatmentsSection />
      <ConditionsSection />
      <AboutSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <QuickLinksSection />
      <NewsletterSection />
    </>
  );
}
