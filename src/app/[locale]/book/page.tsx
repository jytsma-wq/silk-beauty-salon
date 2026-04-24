import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Book an Appointment | Silk Beauty Salon',
  description: 'Book your consultation or treatment appointment at Silk Beauty Salon in Batumi, Georgia.',
};

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bookingPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const consultationTypes = [
    {
      title: t('consultations.facial.title'),
      duration: '30 min',
      description: t('consultations.facial.description'),
      icon: 'face',
    },
    {
      title: t('consultations.skin.title'),
      duration: '45 min',
      description: t('consultations.skin.description'),
      icon: 'skin',
    },
    {
      title: t('consultations.body.title'),
      duration: '30 min',
      description: t('consultations.body.description'),
      icon: 'body',
    },
    {
      title: t('consultations.virtual.title'),
      duration: '20 min',
      description: t('consultations.virtual.description'),
      icon: 'video',
    },
  ];

  return (
    <>
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
              style={{ fontFamily: "'Playfair Display', serif" }}
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
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t('selectDateTime')}
                  </h2>
                </div>

                {/* Cal.com Embed Container */}
                <div className="min-h-[600px] bg-secondary rounded-lg">
                  {/* 
                    INSTRUCTIONS: 
                    1. Create a Cal.com account at https://cal.com
                    2. Set up your booking types (consultations, treatments)
                    3. Replace the data below with your Cal.com embed code
                    4. Or uncomment the iframe and add your Cal.com booking link
                  */}
                  <div 
                    className="w-full h-full min-h-[600px] flex items-center justify-center"
                    style={{ minHeight: '600px' }}
                  >
                    {/* Option 1: Cal.com iframe embed */}
                    {/*
                    <iframe
                      src="https://cal.com/silkbeauty/consultation"
                      frameBorder="0"
                      scrolling="no"
                      seamless
                      className="w-full h-full min-h-[600px]"
                      style={{ minHeight: '600px' }}
                    />
                    */}
                    
                    {/* Placeholder until Cal.com is configured */}
                    <div className="text-center p-8">
                      <Calendar className="w-16 h-16 text-gold mx-auto mb-4 opacity-50" />
                      <h3 className="font-serif text-xl text-primary mb-2">{t('bookingNotConfigured')}</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        {t('bookingNotConfiguredDesc')}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="btn-gold">
                          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                            <Phone className="w-4 h-4 mr-2" />
                            {t('callToBook')}
                          </a>
                        </Button>
                        <Button asChild variant="outline">
                          <a href={`mailto:${siteConfig.contact.email}`}>
                            <Mail className="w-4 h-4 mr-2" />
                            {t('emailToBook')}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Consultation Types */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 
                  className="font-serif text-lg font-semibold text-primary mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t('consultationTypes')}
                </h3>
                <div className="space-y-4">
                  {consultationTypes.map((type) => (
                    <div key={type.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">{type.title}</h4>
                        <p className="text-xs text-muted-foreground">{type.duration}</p>
                        <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-primary rounded-lg p-6 text-white">
                <h3 
                  className="font-serif text-lg font-semibold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
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
                  style={{ fontFamily: "'Playfair Display', serif" }}
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
            style={{ fontFamily: "'Playfair Display', serif" }}
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
