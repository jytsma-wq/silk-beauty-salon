import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';
import { BookingProvider } from './booking-context';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bookingPage' });
  
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function BookPage({
  params,
}: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'bookingPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const consultationTypes = [
    {
      title: t('consultations.facial.title'),
      duration: t('consultations.facial.duration'),
      description: t('consultations.facial.description'),
      bookingType: 'facial-consultation',
    },
    {
      title: t('consultations.skin.title'),
      duration: t('consultations.skin.duration'),
      description: t('consultations.skin.description'),
      bookingType: 'skin-consultation',
    },
    {
      title: t('consultations.body.title'),
      duration: t('consultations.body.duration'),
      description: t('consultations.body.description'),
      bookingType: 'body-consultation',
    },
    {
      title: t('consultations.virtual.title'),
      duration: t('consultations.virtual.duration'),
      description: t('consultations.virtual.description'),
      bookingType: 'virtual-consultation',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Silk Beauty Salon',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      addressCountry: 'GE',
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '$$',
    acceptsOffers: [
      {
        '@type': 'Offer',
        name: 'Facial Consultation',
        price: '50',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Skin Consultation',
        price: '60',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Body Treatment Consultation',
        price: '50',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Virtual Consultation',
        price: '40',
        priceCurrency: 'USD',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80"
            alt="Salon interior"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-gray-300">
            <Link href="/" className="hover:text-gold">
              {tCommon('home')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{t('title')}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 
              className="text-4xl md:text-5xl font-serif font-semibold text-white mb-6"
                          >
              {t('title')}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cal.com Embed */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-gold" />
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary"
                                      >
                    {t('selectDateTime')}
                  </h2>
                </div>

                {/* Booking Embed Container */}
                <div id="booking-embed" className="min-h-150 bg-secondary rounded-lg flex items-center justify-center p-8">
                  <BookingProvider>
                    <div className="text-center">
                      <h3 className="font-serif text-xl text-primary mb-2">{t('selectDateTime')}</h3>
                      <p className="text-muted-foreground">{t('bookingComingSoon', { defaultValue: 'Online booking coming soon. Please call us to schedule your appointment.' })}</p>
                      <a 
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 mt-4 text-gold hover:underline"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </BookingProvider>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Consultation Types */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 
                  className="font-serif text-lg font-semibold text-primary mb-4"
                                  >
                  {t('consultationTypes')}
                </h3>
                <div className="space-y-4">
                  {consultationTypes.map((type) => (
                    <button
                      key={type.title}
                      onClick={() => {
                        const embed = document.getElementById('booking-embed');
                        if (embed) {
                          embed.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">{type.title}</h4>
                        <p className="text-xs text-muted-foreground">{type.duration}</p>
                        <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-primary rounded-lg p-6 text-white">
                <h3 
                  className="font-serif text-lg font-semibold mb-4"
                                  >
                  {t('whatToExpect.title')}
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">1.</span>
                    <span>{t('whatToExpect.step1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">2.</span>
                    <span>{t('whatToExpect.step2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">3.</span>
                    <span>{t('whatToExpect.step3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">4.</span>
                    <span>{t('whatToExpect.step4')}</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 
                  className="font-serif text-lg font-semibold text-primary mb-4"
                                  >
                  {t('needHelp')}
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t('phone')}:</span>
                    <br />
                    <a 
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                      className="text-primary hover:text-gold"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('email')}:</span>
                    <br />
                    <a 
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-primary hover:text-gold"
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
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <h2 
            className="text-2xl font-serif font-semibold text-primary text-center mb-8"
                      >
            {t('faq.title')}
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { q: t('faq.q1'), a: t('faq.a1') },
              { q: t('faq.q2'), a: t('faq.a2') },
              { q: t('faq.q3'), a: t('faq.a3') },
              { q: t('faq.q4'), a: t('faq.a4') },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
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
