'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { StickySplitSection } from './StickySplitSection';

export function ConsultationCTA() {
  const t = useTranslations('consultation');

  return (
    <StickySplitSection
      imageSrc="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80"
      imageAlt="Consultation with aesthetic specialist"
      reverse={true}
    >
      {/* Section Label */}
      <div className="section-label mb-8">
        <span>— {t('label')} —</span>
      </div>

      {/* Heading */}
      <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6 leading-tight">
        {t('headline')}
      </h2>

      {/* Body */}
      <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-lg">
        {t('body')}
      </p>

      {/* CTA Button */}
      <Link
        href="/book"
        className="inline-flex items-center justify-center px-8 py-4 bg-[#1c1c1c] text-white text-sm tracking-widest uppercase transition-colors hover:bg-[#b5453a]"
      >
        {t('cta.button')}
      </Link>
    </StickySplitSection>
  );
}
