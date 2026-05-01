'use client';

import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { treatmentCategories } from '@/data/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Treatment data with magazine styling
interface TreatmentItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  span: string;
}

// Pull quote component for magazine layout
function MagazinePullQuote() {
  return (
    <div className="relative col-span-2 py-20 px-8 lg:px-12">
      {/* Decorative line */}
      <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-[#b5453a] to-transparent" />

      {/* Huge quote mark */}
      <div className="absolute -top-8 left-4 text-[12rem] font-serif text-[#b5453a]/10 leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <blockquote className="relative text-3xl lg:text-4xl font-serif italic leading-tight text-stone-800 max-w-2xl">
        The results are remarkable. My skin has never looked more radiant.
      </blockquote>

      <footer className="mt-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-200">
          <div className="w-full h-full bg-linear-to-br from-stone-300 to-stone-400" />
        </div>
        <div>
          <cite className="not-italic text-sm font-medium text-stone-900">
            — Marina K.
          </cite>
          <p className="text-xs text-stone-500">Botox & Filler Patient</p>
        </div>
      </footer>
    </div>
  );
}

export function EditorialTreatmentsSection() {
  const t = useTranslations('treatments');
  const locale = useLocale();

  // Treatment items with broken grid spans
  const treatments: TreatmentItem[] = treatmentCategories.slice(0, 6).map((cat, index) => ({
    id: String(index + 1).padStart(2, '0'),
    name: cat.name,
    slug: cat.slug,
    description: cat.description || `${cat.name} treatments for natural, elegant results.`,
    image: cat.image,
    span: index === 0 ? 'col-span-2 row-span-2' :
          index === 2 ? 'col-span-1 row-span-2' :
          index === 3 ? 'col-span-2 row-span-1' :
          'col-span-1 row-span-1',
  }));

  return (
    <section className="bg-[#f7f4f0] py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header - asymmetric */}
        <div className="mb-20 lg:mb-32">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('sectionLabel', { defaultValue: 'Our Services' })}
          </motion.p>

          <motion.h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-serif font-light leading-[0.95] text-stone-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our <em className="italic text-[#b5453a]">Treatments</em>
          </motion.h2>
        </div>

        {/* Broken grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[250px] lg:auto-rows-[300px] gap-4 lg:gap-6">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              className={`relative group cursor-pointer ${treatment.span}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Background number - oversized, low opacity */}
              <div className="absolute -top-8 -left-4 text-[8rem] lg:text-[12rem] font-serif text-stone-200/40 leading-none select-none pointer-events-none z-0">
                {treatment.id}
              </div>

              {/* Image container */}
              <div className="relative h-full overflow-hidden z-10">
                {treatment.image ? (
                  <Image
                    src={treatment.image}
                    alt={treatment.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized={treatment.image.startsWith('http')}
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200" />
                )}

                {/* Gradient overlay - appears on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  {/* Title - always visible */}
                  <h3 className="text-2xl lg:text-3xl font-serif font-light text-stone-900 group-hover:text-stone-50 mb-2 transition-colors duration-500">
                    {treatment.name}
                  </h3>

                  {/* Description - appears on hover */}
                  <p className="text-sm text-stone-600 group-hover:text-stone-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 max-w-xs">
                    {treatment.description}
                  </p>

                  {/* Link - appears on hover */}
                  <Link
                    href={`/${locale}/treatments/${treatment.slug}`}
                    className="inline-flex items-center mt-4 text-sm text-stone-50 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                  >
                    Explore treatment →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Pull quote in grid */}
          <MagazinePullQuote />
        </div>

        {/* View all link */}
        <motion.div
          className="mt-16 lg:mt-24 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/${locale}/treatments`}
            className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
          >
            <span>{t('viewAll', { defaultValue: 'View All Treatments' })}</span>
            <span className="w-8 h-px bg-stone-400 group-hover:w-12 group-hover:bg-stone-900 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

