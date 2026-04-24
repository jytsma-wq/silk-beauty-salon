'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';

export function HeroSection() {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80"
          alt="Luxury spa and beauty salon interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay - darker cinematic */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-3xl mx-auto">
          {/* Two-line split headline like HSI */}
          <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-semibold leading-tight mb-2"
                      >
            {t('title')}
          </h1>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gold mb-8"
                      >
            {t('subtitle')}
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          {/* Book Appointment button */}
          <Button
            asChild
            className="btn-gold text-base px-8 py-6"
          >
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              {tNav('bookAppointment')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
