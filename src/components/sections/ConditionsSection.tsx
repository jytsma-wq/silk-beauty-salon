'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { getLocalizedConditions, type Condition } from '@/data/conditions';
import { Link } from '@/i18n/routing';

export function ConditionsSection() {
  const t = useTranslations('conditions');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [conditions, setConditions] = useState<Condition[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const localizedConditions = await getLocalizedConditions(locale);
      setConditions(localizedConditions);
    };
    fetchData();
  }, [locale]);

  return (
    <section className="section-spacing bg-secondary" id="conditions">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-primary mb-4 heading-underline"
                      >
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            {t('subtitle')}
          </p>
        </div>

        {/* Conditions Grid - editorial card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((condition) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className="editorial-card group rounded-lg"
            >
              <h3 
                className="text-lg font-serif font-semibold text-primary mb-2"
                              >
                {condition.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {condition.shortDescription}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                {tCommon('learnMore')}
                <ChevronRight className="w-4 h-4" />
              </span>
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
