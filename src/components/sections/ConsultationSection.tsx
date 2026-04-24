'use client';

import { useTranslations } from 'next-intl';
import { Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';

export function ConsultationSection() {
  const t = useTranslations('consultation');
  const tNav = useTranslations('nav');

  return (
    <section className="consultation-section py-20 text-white">
      <div className="container-custom text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mb-8"
                  >
          {t('title')}
        </h2>

        <div className="max-w-xl mx-auto space-y-6 mb-10">
          {/* Phone */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-3 group"
          >
            <Phone className="w-6 h-6 text-gold" />
            <span className="text-2xl md:text-3xl font-light text-gold group-hover:underline">
              {siteConfig.contact.phone}
            </span>
          </a>

          {/* Address */}
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-gold" />
            <span className="text-gray-300">
              {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}
            </span>
          </div>
        </div>

        <Button
          asChild
          className="btn-gold text-base px-10 py-6"
        >
          <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
            {tNav('bookAppointment')}
          </a>
        </Button>
      </div>
    </section>
  );
}
