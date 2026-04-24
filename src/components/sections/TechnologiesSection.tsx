'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export function TechnologiesSection() {
  const t = useTranslations('technologies');

  return (
    <section className="py-20 bg-white border-y border-border">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-primary mb-6"
                      >
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            {t('subtitle')}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-gold font-semibold text-lg hover:gap-3 transition-all"
          >
            {t('aboutUs')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
