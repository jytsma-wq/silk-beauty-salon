'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function BrandManifestoSection() {
  const t = useTranslations('manifesto');

  return (
    <section className="bg-white section-spacing">
      <div className="container-custom">

        {/* Section label */}
        <div className="section-label justify-center mb-16">
          <span>{t('label')}</span>
        </div>

        {/* The manifesto statement — central, large */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="manifesto-text mb-16">
            {t('statement')}
          </p>

          {/* Three short values below — separated by thin vertical lines */}
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {['value1', 'value2', 'value3'].map((key, i) => (
              <div key={key} className="flex items-center gap-12">
                {i > 0 && <div className="hidden md:block h-8 w-px bg-stone-200" />}
                <span className="text-[0.625rem] tracking-[0.2em] uppercase text-stone-500">
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          {/* Subtle CTA */}
          <div className="mt-16">
            <Link href="/about" className="link-french">
              {t('cta')} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
