'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { StickySplitSection } from './StickySplitSection';

export function AboutSection() {
  const t = useTranslations('about');

  const stats = [
    { number: '10+', label: t('stats.years') },
    { number: '5000+', label: t('stats.patients') },
    { number: '15+', label: t('stats.treatments') },
  ];

  return (
    <StickySplitSection
      imageSrc="/images/salon-interior.jpg"
      imageAlt="Silk Beauty Salon"
      reverse={false}
    >
      {/* Section Label */}
      <div className="section-label mb-8">
        <span>{t('sectionLabel')}</span>
      </div>

      {/* Category Label */}
      <span className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-6">
        {t('category')}
      </span>

      {/* Heading - Editorial Scale */}
      <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-stone-800 mb-8">
        {t('title')}
      </h2>

      {/* Body Text - Soft Neutrals */}
      <p className="text-stone-600 leading-[1.7] mb-6 text-lg">
        {t('description')}
      </p>
      <p className="text-stone-600 leading-[1.7] mb-10 text-lg">
        {t('descriptionExtended')}
      </p>

      {/* Stats */}
      <div className="flex gap-8 mb-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="stat-number text-[#b5453a]">{stat.number}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/about"
        className="btn-outline inline-flex w-fit"
      >
        {t('readMore')}
      </Link>
    </StickySplitSection>
  );
}
