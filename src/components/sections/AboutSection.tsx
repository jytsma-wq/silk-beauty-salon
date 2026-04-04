'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function AboutSection() {
  const t = useTranslations('about');

  const features = [
    { key: 'award' },
    { key: 'practitioners' },
    { key: 'products' },
    { key: 'experience' },
    { key: 'technology' },
    { key: 'results' },
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 
              className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('title')}
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t('description')}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('descriptionExtended')}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature.key} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-sm">{t(`features.${feature.key}`)}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
            >
              {t('readMore')}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="Silk Beauty Salon"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/10 rounded-lg -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
