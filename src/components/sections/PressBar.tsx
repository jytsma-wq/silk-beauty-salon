'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const CREDENTIAL_KEYS = [
  'credential1',
  'credential2',
  'credential3',
  'credential4',
  'credential5',
  'credential6',
];

export function PressBar() {
  const t = useTranslations('pressBar');
  const shouldReduceMotion = useReducedMotion();
  // Triple the items to ensure seamless infinite scroll on all screen widths
  const tripled = [...CREDENTIAL_KEYS, ...CREDENTIAL_KEYS, ...CREDENTIAL_KEYS];

  if (shouldReduceMotion) {
    return (
      <div className="bg-[#1c1c1c] py-5 overflow-hidden" aria-label={t('ariaLabel')}>
        <div className="flex justify-center gap-16">
          {CREDENTIAL_KEYS.map((key) => (
            <div key={key} className="flex items-center gap-6">
              <span className="text-[#b5453a] text-sm">✦</span>
              <span className="text-xs tracking-[0.2em] uppercase text-white/50 whitespace-nowrap font-light">
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#1c1c1c] py-5 overflow-hidden"
      aria-label={t('ariaLabel')}
    >
      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-16 items-center will-change-transform"
          initial={{ x: '0%' }}
          animate={{ x: '-33.333%' }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {tripled.map((key, i) => (
            <div key={`${key}-${i}`} className="flex items-center gap-6 shrink-0">
              <span className="text-[#b5453a] text-sm">✦</span>
              <span className="text-xs tracking-[0.2em] uppercase
                text-white/50 whitespace-nowrap font-light">
                {t(key)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
