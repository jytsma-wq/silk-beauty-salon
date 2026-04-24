'use client';

import { siteConfig } from '@/data/site-config';

export function AwardsMarquee() {
  // Duplicate items for seamless infinite scroll
  const items = [...siteConfig.awards, ...siteConfig.awards];

  return (
    <section className="bg-primary py-4 overflow-hidden border-y border-white/10">
      <div className="marquee-track">
        {items.map((award, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-8 text-sm md:text-base text-white/90 font-medium whitespace-nowrap"
          >
            <span className="text-gold">✦</span>
            {award}
          </span>
        ))}
      </div>
    </section>
  );
}
