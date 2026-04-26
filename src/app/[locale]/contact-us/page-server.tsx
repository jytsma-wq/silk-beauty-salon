import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Clock, ChevronRight, Instagram, Facebook } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import ContactFormClient from './ContactForm';

// TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Contact Us | Silk Beauty Salon',
    description: 'Get in touch with Silk Beauty Salon. Book your consultation today.',
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      {/* Full Screen Hero Image */}
      <section className="relative h-screen min-h-37.5">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80"
          alt="Contact Silk Beauty Salon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1c1c1c]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-gold">
              {tCommon('home')}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">{t('title')}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
                {t('formTitle')}
              </h2>
              <ContactFormClient />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
                {t('getInTouch')}
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('address')}</h3>
                    <p className="text-muted-foreground">
                      {siteConfig.contact.address}<br />
                      {siteConfig.contact.city}, {siteConfig.contact.postcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('phone')}</h3>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                      className="text-muted-foreground hover:text-gold transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('email')}</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-muted-foreground hover:text-gold transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="border-t border-[#e8e4df] py-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gold" />
                  <h3 className="font-semibold text-primary">{t('openingHours')}</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('monTue')}</span>
                    <span>{siteConfig.businessHours.monday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('wedThu')}</span>
                    <span>{siteConfig.businessHours.wednesday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('friday')}</span>
                    <span>{siteConfig.businessHours.friday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t('satSun')}</span>
                    <span>{siteConfig.businessHours.saturday}</span>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h3 className="font-semibold text-primary mb-4">{tCommon('social')}</h3>
                <div className="flex items-center gap-4">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E4405F] hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1877F2] hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@silkbeautybatumi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:opacity-80 transition-opacity"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Book CTA */}
              <div className="mt-8 py-8 border-t border-[#e8e4df] text-center">
                <h3 className="text-primary font-serif text-xl mb-2">{t('readyToBook')}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('bookOnlineDesc')}
                </p>
                <Button asChild className="btn-gold">
                  <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                    {t('bookAppointment')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-100 bg-[#f7f4f0]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl text-primary mb-2">{t('mapAddress')}</h3>
            <p className="text-muted-foreground">{t('mapCity')}</p>
            <a
              href="https://maps.google.com/?q=63+Zurab+Gorgiladze+Street+Batumi+Georgia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-gold hover:underline"
            >
              {t('viewOnMap')} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
