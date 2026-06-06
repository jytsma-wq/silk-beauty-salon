import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Clock, ChevronRight, Instagram, Facebook } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/data/site-config';
import ContactFormClient from './ContactForm';

type TranslationFunction = {
  (key: string): string;
  has(key: string): boolean;
};

const contactCopy = {
  title: 'Contact Us',
  subtitle: 'Get in touch with our team to plan your visit or ask a question.',
  contactSilkBeautySalon: 'Contact Silk Beauty Salon',
  formTitle: 'Send us a message',
  getInTouch: 'Get in touch',
  address: 'Address',
  phone: 'Phone',
  email: 'Email',
  openingHours: 'Opening Hours',
  monTue: 'Mon - Tue',
  wedThu: 'Wed - Thu',
  friday: 'Friday',
  satSun: 'Sat - Sun',
  social: 'Social',
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  readyToBook: 'Ready to book?',
  bookOnlineDesc: 'Request a consultation and our team will confirm your appointment.',
  bookAppointment: 'Book Appointment',
  mapTitle: 'Silk Beauty Salon location',
} as const;

function contactText(t: TranslationFunction, key: string, fallback: string) {
  return t.has(key) ? t(key) : fallback;
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us | Silk Beauty Salon',
    description: 'Get in touch with Silk Beauty Salon. Book your consultation today.',
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <section className="bg-[#f7f2eb] pt-42.5 md:pt-47">
        <div className="container-custom py-16 md:py-20">
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-[#241f1b]">
              {tCommon('home')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#241f1b]">{contactText(t, 'title', contactCopy.title)}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
            <div className="max-w-3xl">
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#765946]">{tNav('contact')}</p>
              <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b]">
                {contactText(t, 'title', contactCopy.title)}
              </h1>
              <p className="text-lg leading-8 text-stone-700">{contactText(t, 'subtitle', contactCopy.subtitle)}</p>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80"
                alt={contactText(t, 'contactSilkBeautySalon', contactCopy.contactSilkBeautySalon)}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">{contactText(t, 'formTitle', contactCopy.formTitle)}</h2>
              <ContactFormClient />
            </div>

            <div>
              <h2 className="mb-6 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">{contactText(t, 'getInTouch', contactCopy.getInTouch)}</h2>

              <div className="mb-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <MapPin className="h-6 w-6 text-[#765946]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-primary">{contactText(t, 'address', contactCopy.address)}</h3>
                    <p className="text-muted-foreground">
                      {siteConfig.contact.address}
                      <br />
                      {siteConfig.contact.city}, {siteConfig.contact.postcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Phone className="h-6 w-6 text-[#765946]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-primary">{contactText(t, 'phone', contactCopy.phone)}</h3>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                      className="text-muted-foreground transition-colors hover:text-[#241f1b]"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Mail className="h-6 w-6 text-[#765946]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-primary">{contactText(t, 'email', contactCopy.email)}</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-muted-foreground transition-colors hover:text-[#241f1b]"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e8e4df] py-8">
                <div className="mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#765946]" />
                  <h3 className="font-medium text-primary">{contactText(t, 'openingHours', contactCopy.openingHours)}</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{contactText(t, 'monTue', contactCopy.monTue)}</span>
                    <span>{siteConfig.businessHours.monday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{contactText(t, 'wedThu', contactCopy.wedThu)}</span>
                    <span>{siteConfig.businessHours.wednesday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{contactText(t, 'friday', contactCopy.friday)}</span>
                    <span>{siteConfig.businessHours.friday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{contactText(t, 'satSun', contactCopy.satSun)}</span>
                    <span>{siteConfig.businessHours.saturday}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="mb-4 font-medium text-primary">
                  {tCommon.has('social') ? tCommon('social') : contactCopy.social}
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#765946] transition-opacity hover:opacity-80"
                    aria-label={contactText(t, 'instagram', contactCopy.instagram)}
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#765946] transition-opacity hover:opacity-80"
                    aria-label={contactText(t, 'facebook', contactCopy.facebook)}
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@silkbeautybatumi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-opacity hover:opacity-80"
                    aria-label={contactText(t, 'tiktok', contactCopy.tiktok)}
                  >
                    <TikTokIcon className="h-6 w-6" />
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-[#e8e4df] py-8 text-center">
                <h3 className="mb-2 font-sans text-xl font-light text-[#241f1b]">{contactText(t, 'readyToBook', contactCopy.readyToBook)}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{contactText(t, 'bookOnlineDesc', contactCopy.bookOnlineDesc)}</p>
                <Link
                  href="/book"
                  className="btn-gold inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  {contactText(t, 'bookAppointment', contactCopy.bookAppointment)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-125 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.1234567890123!2d41.6167!3d41.6500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM5JzAwLjAiTiA0McKwMzcnMDAuMCJF!5e0!3m2!1sen!2sge!4v1234567890123!5m2!1sen!2sge"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={tNav.has('locationTitle') ? tNav('locationTitle') : contactCopy.mapTitle}
        />
      </section>
    </>
  );
}
