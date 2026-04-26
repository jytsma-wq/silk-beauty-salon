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
    <section className="section-spacing section-warm" id="conditions">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary tracking-tight mb-4"
          >
            {t('title')}
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-8">
            {t('subtitle')}
          </p>
        </div>

        {/* Conditions Grid - editorial card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((condition) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className="group p-6 transition-colors hover:bg-stone-50"
            >
              <h3
                className="text-lg font-serif text-primary tracking-tight mb-2"
              >
                {condition.name}
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2">
                {condition.shortDescription}
              </p>
              <span className="category-pill">
                {tCommon('learnMore')}
              </span>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/conditions"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-[#b5453a] transition-colors"
          >
            {t('viewAll')}
            <ChevronRight className="w-5 h-5 text-[#b5453a]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
