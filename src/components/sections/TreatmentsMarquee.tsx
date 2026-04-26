'use client';

import { treatmentCategories } from '@/data/navigation';

export function TreatmentsMarquee() {
  // Flatten all treatment names
  const treatmentNames = treatmentCategories.flatMap(cat =>
    cat.items.map(item => item.name)
  );

  // Duplicate for seamless loop
  const allNames = [...treatmentNames, ...treatmentNames];

  return (
    <section className="py-16 bg-stone-900 overflow-hidden">
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-stone-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-stone-900 to-transparent z-10" />

        {/* Scrolling content */}
        <div className="flex marquee-track whitespace-nowrap">
          {allNames.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="text-xs tracking-[0.2em] uppercase text-stone-400 mx-12 font-sans"
            >
              {name}
              <span className="mx-12 text-stone-600">—</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
