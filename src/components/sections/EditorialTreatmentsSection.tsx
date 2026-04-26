'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { treatmentCategories } from '@/data/navigation';

export function EditorialTreatmentsSection() {
  const t = useTranslations('treatments');

  const categories = treatmentCategories.slice(0, 6);

  return (
    <section className="bg-[#f7f4f0] section-spacing">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 lg:gap-32">

          {/* Left: editorial intro */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="section-label">
              <span>{t('sectionLabel')}</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-light leading-tight tracking-tight text-stone-900 mb-8">
              {t('sectionTitle')}
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-12 max-w-sm">
              {t('sectionDescription')}
            </p>
            <Link href="/treatments" className="link-french">
              {t('viewAll')} →
            </Link>
          </div>

          {/* Right: numbered editorial list */}
          <div>
            {categories.map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/treatments/${cat.slug}`}
                className="group block"
              >
                <div className="hairline" />
                <div className="py-8 flex gap-6 items-start 
                  border-l-0 hover:border-l-2 border-[#b5453a] 
                  hover:pl-4 transition-all duration-300">
                  {/* Number */}
                  <span className="editorial-number shrink-0 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Text */}
                  <div className="pt-2">
                    <h3 className="font-serif text-xl font-light text-stone-900 
                      group-hover:text-[#b5453a] mb-2 tracking-tight transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="hairline" />
          </div>

        </div>
      </div>
    </section>
  );
}
