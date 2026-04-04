'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { conditions } from '@/data/conditions';
import { Link } from '@/i18n/routing';

export function ConditionsSection() {
  const t = useTranslations('conditions');
  const tCommon = useTranslations('common');

  return (
    <section className="section-spacing bg-secondary" id="conditions">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-primary mb-4 heading-underline"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            {t('subtitle')}
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((condition) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] card-hover"
            >
              {/* Background Image */}
              <img
                src={condition.image}
                alt={condition.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 
                  className="text-xl font-serif font-semibold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {condition.name}
                </h3>
                <p className="text-sm text-gray-200 line-clamp-2 mb-4">
                  {condition.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                  {tCommon('learnMore')}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/conditions"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-gold transition-colors"
          >
            {t('viewAll')}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
