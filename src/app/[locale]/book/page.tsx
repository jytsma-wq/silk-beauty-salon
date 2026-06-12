import { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { Link } from '@/i18n/routing';
import { ChevronRight, Calendar } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/data/site-config';
import { BookingForm } from './booking-form';
import { ConsultationTypeButtons } from './consultation-type-buttons';

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
    { '@type': 'Offer', name: 'Facial Consultation', price: '50', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Skin Consultation', price: '60', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Body Treatment Consultation', price: '50', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Virtual Consultation', price: '40', priceCurrency: 'USD' },
  ],
} as const;

export async function generateMetadata({ params: _params }: Props): Promise<Metadata> {
  return {
    title: 'Book Your Consultation | Silk Beauty Salon',
    description: 'Select a consultation type and reserve your appointment.',
  };
}

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bookingPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  // Build consultation types from translation keys
  const consultationTypes = CONSULTATION_TYPE_KEYS.map(({ key, bookingType }) => ({
    title: {
      facial: 'Facial Consultation',
      skin: 'Skin Consultation',
      body: 'Body Treatment Consultation',
      virtual: 'Virtual Consultation',
    }[key],
    duration: {
      facial: '45 min',
      skin: '45 min',
      body: '45 min',
      virtual: '30 min',
    }[key],
    description: {
      facial: 'A short in-clinic consultation focused on your facial goals.',
      skin: 'Assess skin concerns and build a treatment plan.',
      body: 'Discuss body contouring and treatment options.',
      virtual: 'A remote consultation from anywhere.',
    }[key],
    bookingType,
  }));

  // Build JSON-LD with dynamic address data
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
      {/* Hero Section */}
      <section className="bg-[#f7f2eb] pt-42.5 md:pt-47">
        <div className="container-custom py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-[#241f1b]">
              {tCommon('home')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#241f1b]">{tNav('book')}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[48%_52%]">
            <div className="max-w-3xl">
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
                {t('personalInfo')}
              </p>
              <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b]">
                {tNav('book')}
              </h1>
              <p className="text-lg text-stone-700 leading-8">
                Choose a consultation type, pick a time, and submit your request.
              </p>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80"
                alt={t('heroImageAlt')}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Booking Calendar and Form */}
            <div className="lg:col-span-2">
              <div className="border-t border-[#e8e4df] pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-[#b5453a]" />
                  <h2 className="font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                    {t('selectDateTime')}
                  </h2>
                </div>

                <div className="rounded-md bg-[#f7f4f0] p-4 md:p-8">
                  <BookingForm consultationTypes={consultationTypes} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="border-t border-[#e8e4df] py-8">
                <h3 className="mb-4 font-sans text-lg font-light text-[#241f1b]">
                  {t('needHelp')}
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                  <span className="text-muted-foreground">{t('phone')}:</span>
                  <br />
                  <a 
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                    className="text-primary hover:text-[#b5453a]"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('email')}:</span>
                  <br />
                  <a 
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-primary hover:text-[#b5453a]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('address')}:</span>
                  <br />
                  <span className="text-primary">
                    {siteConfig.contact.address}, {siteConfig.contact.city}
                  </span>
                </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Consultation Types */}
              <div className="border-t border-[#e8e4df] py-8">
                <h3 className="mb-4 font-sans text-lg font-light text-[#241f1b]">
                  Consultation Types
                </h3>
                <ConsultationTypeButtons types={consultationTypes} />
              </div>

              {/* What to Expect */}
              <div className="border-t border-[#e8e4df] py-8">
                <h3 className="mb-4 font-sans text-lg font-light text-[#241f1b]">
                  What to Expect
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">01</span>
                    <span>Choose the consultation type that fits your needs.</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">02</span>
                    <span>Select your preferred date and time.</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">03</span>
                    <span>Enter your contact details and notes.</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">04</span>
                    <span>We confirm your appointment and follow up promptly.</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="border-t border-[#e8e4df] py-8">
                <h3 className="mb-4 font-sans text-lg font-light text-[#241f1b]">
                  Need Help
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <br />
                    <a 
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                      className="text-primary hover:text-[#b5453a]"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <br />
                    <a 
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-primary hover:text-[#b5453a]"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Address:</span>
                    <br />
                    <span className="text-primary">
                      {siteConfig.contact.address}, {siteConfig.contact.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom">
          <h2 className="mb-8 text-center font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { q: 'How do I book?', a: 'Select a consultation type and choose a time.' },
              { q: 'Can I reschedule?', a: 'Yes, contact us and we will help adjust your booking.' },
              { q: 'Do I need a deposit?', a: 'Some consultations may require a deposit depending on the service.' },
              { q: 'Can I book online?', a: 'Yes, the booking form is available on this page.' },
            ].map((faq, index) => (
              <div key={index} className="py-6 border-t border-[#e8e4df]">
                <h3 className="font-semibold text-primary mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
