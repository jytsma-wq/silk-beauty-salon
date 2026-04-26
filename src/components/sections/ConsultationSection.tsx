'use client';

import { useTranslations } from 'next-intl';
import { Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { BookingButton } from '@/components/booking-button';

export function ConsultationSection() {
  const t = useTranslations('consultation');

  return (
    <section className="section-warm py-24">
      <div className="container-custom text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight text-foreground mb-8"
        >
          {t('title')}
        </h2>

        <div className="max-w-xl mx-auto space-y-6 mb-10">
          {/* Phone */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-3 group"
          >
            <Phone className="w-6 h-6 text-[#b5453a]" />
            <span className="text-2xl md:text-3xl font-light text-[#b5453a] group-hover:underline">
              {siteConfig.contact.phone}
            </span>
          </a>

          {/* Address */}
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-[#b5453a]" />
            <span className="text-muted-foreground">
              {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}
            </span>
          </div>
        </div>

        <BookingButton />
      </div>
    </section>
  );
}
