'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BookingButton } from '@/components/booking-button';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
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
        {/* Overlay - lighter, directional gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-left text-white pb-20 md:pb-28">
        <div className="max-w-2xl">
          {/* Editorial headline — light weight, tight tracking */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight mb-4 tracking-tight"
          >
            {t('title')}
          </h1>
          <h2
            className="text-xl md:text-2xl font-sans font-light text-white/80 mb-8 tracking-wide"
          >
            {t('subtitle')}
          </h2>
          <p className="text-base text-white/70 mb-10 max-w-lg leading-relaxed">
            {t('description')}
          </p>
          {/* Book Appointment button */}
          <BookingButton />

          {/* Scroll indicator */}
          <div className="mt-16 flex items-center gap-2 text-white/50 text-xs tracking-widest uppercase">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
