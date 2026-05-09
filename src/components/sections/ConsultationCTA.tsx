'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { StickySplitSection } from './StickySplitSection';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function ConsultationCTA() {
  const t = useTranslations('consultation');
  const locale = useLocale();

  return (
    <StickySplitSection
      imageSrc="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80"
      imageAlt={t('imageAlt')}
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
      <MagneticButton strength={0.4} radius={90}>
        <Link
          href={`/${locale}/book`}
          className="inline-flex items-center justify-center rounded-md border border-[#d9cec1] bg-[#f7f2eb] px-8 py-4 text-sm uppercase tracking-widest text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
        >
          {t('cta.button')}
        </Link>
      </MagneticButton>
    </StickySplitSection>
  );
}
