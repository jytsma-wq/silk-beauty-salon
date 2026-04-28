'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// The 3 most impressive cases — shown on homepage
const TEASER_CASES = [
  {
    id: '1',
    treatment: 'Cheek Fillers',
    patient: 'Mirjam, 45',
    beforeImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    afterImage:  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
    result: 'Natural volume restoration',
  },
  {
    id: '5',
    treatment: 'Lip Enhancement',
    patient: 'Georgia, 41',
    beforeImage: 'https://images.unsplash.com/photo-1541779408-c355f9d288b0?w=600&q=80',
    afterImage:  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80',
    result: 'Natural-looking volume',
  },
  {
    id: '6',
    treatment: 'Anti-Wrinkle Botox',
    patient: 'Anna, 48',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80',
    afterImage:  'https://images.unsplash.com/photo-1553514029-1318c9127859?w=600&q=80',
    result: 'Smooth, refreshed look',
  },
];

export function BeforeAfterTeaser() {
  const t = useTranslations('beforeAfterPage');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="section-spacing bg-[#f7f4f0]">
      <div className="container-custom">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-4">
              <span>{t('sectionLabel', { defaultValue: 'Real Results' })}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-gray-900">
              {t('homeTeaserTitle', { defaultValue: 'The proof is in the results' })}
            </h2>
          </div>
          <Link
            href="/before-after"
            className="link-french text-gray-600 self-start md:self-auto whitespace-nowrap"
          >
            {t('seeMoreResults', { defaultValue: 'See all results' })} →
          </Link>
        </div>

        {/* 3-column before/after grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEASER_CASES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Before/After image pair */}
              <div className="grid grid-cols-2 gap-1 mb-4">
                {/* Before */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image src={item.beforeImage} alt={`Before ${item.treatment}`}
                    fill className="object-cover object-top
                      transition-transform duration-700 ease-out
                      group-hover:scale-102"
                    sizes="(max-width: 768px) 50vw, 18vw" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1.5 px-3">
                    <span className="text-white text-[0.5625rem] tracking-[0.15em] uppercase">
                      {t('before', { defaultValue: 'Before' })}
                    </span>
                  </div>
                </div>
                {/* After */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image src={item.afterImage} alt={`After ${item.treatment}`}
                    fill className="object-cover object-top
                      transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 18vw" />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#b5453a]/80 py-1.5 px-3">
                    <span className="text-white text-[0.5625rem] tracking-[0.15em] uppercase font-medium">
                      {t('after', { defaultValue: 'After' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Case details */}
              <div className="pl-1">
                <h3 className="font-serif text-lg font-light text-gray-900 mb-1">
                  {item.treatment}
                </h3>
                <p className="text-[0.625rem] tracking-[0.1em] uppercase text-gray-400 mb-2">
                  {item.patient}
                </p>
                <p className="text-sm text-gray-500">{item.result}</p>
              </div>

              {/* Crimson bottom border reveal on hover */}
              <motion.div
                className="h-px bg-[#b5453a] mt-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredId === item.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[0.625rem] text-gray-400 mt-12 text-center tracking-wide">
          {t('disclaimer', { defaultValue: 'Individual results may vary. All photos shown with client consent.' })}
        </p>

      </div>
    </section>
  );
}
