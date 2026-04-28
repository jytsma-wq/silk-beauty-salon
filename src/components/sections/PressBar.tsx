'use client';

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
  // Triple the items to ensure seamless infinite scroll on all screen widths
  const tripled = [...CREDENTIAL_KEYS, ...CREDENTIAL_KEYS, ...CREDENTIAL_KEYS];

  return (
    <div
      className="bg-[#1c1c1c] py-5 overflow-hidden"
      aria-label={t('ariaLabel')}
      suppressHydrationWarning
    >
      <div className="flex animate-marquee">
        {tripled.map((key, i) => (
          <div key={`${key}-${i}`} className="flex items-center gap-6 shrink-0 px-8">
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
