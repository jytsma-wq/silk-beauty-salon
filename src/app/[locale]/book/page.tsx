import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/data/site-config';
import { baseTreatmentCategories } from '@/data/treatments';
import { BookingForm } from './booking-form';
import { bookingCopy, bookingText } from './booking-copy';

interface Props {
  params: Promise<{ locale: string }>;
}

// Hoisted static data - defined once at module level
const CONSULTATION_TYPE_KEYS = [
  { key: 'facial', bookingType: 'facial-consultation' },
  { key: 'skin', bookingType: 'skin-consultation' },
  { key: 'body', bookingType: 'body-consultation' },
  { key: 'virtual', bookingType: 'virtual-consultation' },
] as const;

const JSON_LD_BASE = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Silk Beauty Salon',
  image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80',
  priceRange: '$$',
  acceptsOffers: [
    { '@type': 'Offer', name: 'Facial Consultation', price: '50', priceCurrency: 'GEL' },
    { '@type': 'Offer', name: 'Skin Consultation', price: '60', priceCurrency: 'GEL' },
    { '@type': 'Offer', name: 'Body Treatment Consultation', price: '50', priceCurrency: 'GEL' },
    { '@type': 'Offer', name: 'Virtual Consultation', price: '40', priceCurrency: 'GEL' },
  ],
} as const;

export async function generateMetadata({ params: _params }: Props): Promise<Metadata> {
  const { locale } = await _params;
  const t = await getTranslations({ locale, namespace: 'bookingPage' });

  return {
    title: bookingText(t, 'metadata.title', bookingCopy.metadata.title),
    description: bookingText(t, 'metadata.description', bookingCopy.metadata.description),
  };
}

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bookingPage' });

  const consultationTypes = CONSULTATION_TYPE_KEYS.map(({ key, bookingType }) => ({
    title: bookingText(t, `consultations.${key}.title`, bookingCopy.consultations[key].title),
    duration: bookingText(t, `consultations.${key}.duration`, bookingCopy.consultations[key].duration),
    description: bookingText(t, `consultations.${key}.description`, bookingCopy.consultations[key].description),
    price: key === 'virtual' ? 'From GEL 40' : 'From GEL 50',
    bookingType,
  }));

  const serviceGroups = [
    {
      id: 'consultation-services',
      title: 'Consultation Services',
      services: consultationTypes,
    },
    ...baseTreatmentCategories.map((category) => ({
      id: category.slug,
      title: category.name,
      services: category.treatments.map((treatment) => ({
        title: treatment.name,
        duration: treatment.duration || 'Consultation required',
        description: treatment.shortDescription,
        price: treatment.price || 'Consultation required',
        bookingType: treatment.slug,
      })),
    })),
  ];

  const jsonLd = {
    ...JSON_LD_BASE,
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      addressCountry: 'GE',
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
  };

  return (
    <>
      <Script
        id="json-ld-booking"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="min-h-screen bg-[#f3f5f7] px-3 py-6 sm:px-5 md:py-8">
        <BookingForm serviceGroups={serviceGroups} />
      </section>
    </>
  );
}
