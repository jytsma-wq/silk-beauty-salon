'use client';

import { treatmentCategories } from '@/data/navigation';
import { MarqueeTrack } from '@/components/effects/MarqueeTrack';

export function TreatmentsMarquee() {
  const treatmentNames = treatmentCategories.flatMap(cat =>
    cat.items.map(item => item.name)
  );

  const categoryNames = treatmentCategories.map(cat => cat.name.toUpperCase());

  return (
    <section
      className="py-0 bg-[#1c1c1c] dark:bg-[#0a0a0a] overflow-hidden"
      aria-label="Treatment catalogue"
    >
      {/* Row 1 — Treatment names, left-to-right, 36s */}
      <div className="py-5 border-b border-white/5">
        <MarqueeTrack duration={36} reverse={false} pauseOnHover>
          {treatmentNames.map((name, i) => (
            <span key={i} className="flex items-center mx-10">
              <span className="text-[0.65rem] tracking-[0.22em] uppercase text-white/45 font-light">
                {name}
              </span>
              <span className="ml-10 text-[#b5453a] text-xs">✦</span>
            </span>
          ))}
        </MarqueeTrack>
      </div>

      {/* Row 2 — Category names, right-to-left, 22s, brighter */}
      <div className="py-5">
        <MarqueeTrack duration={22} reverse={true} pauseOnHover>
          {categoryNames.map((name, i) => (
            <span key={i} className="flex items-center mx-12">
              {/* Numeric counter for editorial feel */}
              <span className="font-serif text-[0.6rem] text-white/15 mr-4 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[0.7rem] tracking-[0.15em] uppercase text-white/65 font-medium">
                {name}
              </span>
              <span className="ml-12 h-px w-8 bg-white/15 inline-block" />
            </span>
          ))}
        </MarqueeTrack>
      </div>
    </section>
  );
}
