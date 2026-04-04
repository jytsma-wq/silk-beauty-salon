'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { Link } from '@/i18n/routing';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('title')}
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {t('subtitle')}
          </p>
          <p className="text-base text-gray-300 mb-10 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="btn-gold min-w-[200px]"
            >
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                {t('cta.book')}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/treatments">
                {t('cta.treatments')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}
