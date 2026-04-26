import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';
import { BookingForm } from './booking-form';

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
      <section className="relative py-20 bg-[#1c1c1c]">
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
            <Link href="/" className="hover:text-[#b5453a]">
              {tCommon('home')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#b5453a]">{t('title')}</span>
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
              <div className="border-t border-[#e8e4df] pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-[#b5453a]" />
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary"
                                      >
                    {t('selectDateTime')}
                  </h2>
                </div>

                {/* Booking Form */}
                <div id="booking-embed" className="bg-[#f7f4f0] p-8">
                  <BookingForm consultationTypes={consultationTypes} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Consultation Types */}
              <div className="border-t border-[#e8e4df] py-8">
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
                      className="w-full flex items-start gap-3 py-4 border-t border-[#e8e4df] hover:border-[#b5453a] transition-colors text-left"
                    >
                      <Clock className="w-5 h-5 text-[#b5453a] shrink-0 mt-0.5" />
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
              <div className="border-t border-[#e8e4df] py-8">
                <h3 
                  className="font-serif text-lg font-semibold mb-4"
                                  >
                  {t('whatToExpect.title')}
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">01</span>
                    <span>{t('whatToExpect.step1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">02</span>
                    <span>{t('whatToExpect.step2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">03</span>
                    <span>{t('whatToExpect.step3')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#b5453a] text-xs tracking-[0.15em] uppercase">04</span>
                    <span>{t('whatToExpect.step4')}</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="border-t border-[#e8e4df] py-8">
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
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-[#f7f4f0]">
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
