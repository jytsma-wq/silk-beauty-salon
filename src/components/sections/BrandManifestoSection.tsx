'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { KineticText } from '@/components/effects/KineticText';
import { ScrollRevealLine } from '@/components/effects/ScrollRevealLine';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function BrandManifestoSection() {
  const t = useTranslations('manifesto');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const values = ['value1', 'value2', 'value3'] as const;

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-[#0f0e0c] section-spacing overflow-hidden"
    >
      <div className="container-custom">

        {/* Section label with grow-in line */}
        <div className="flex items-center gap-6 justify-center mb-20">
          <ScrollRevealLine className="w-16" delay={0.1} />
          <motion.span
            className="text-[0.625rem] tracking-[0.3em] uppercase text-stone-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t('label')}
          </motion.span>
          <ScrollRevealLine className="w-16" delay={0.1} />
        </div>

        {/* Kinetic manifesto statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p
            className="manifesto-text leading-[1.15]"
            aria-label={t('statement')}
          >
            <KineticText
              text={t('statement')}
              delay={0.2}
              stagger={0.045}
              splitBy="word"
            />
          </p>
        </div>

        {/* Full-width divider line */}
        <ScrollRevealLine className="mb-16" delay={0.8} color="#e0e0e0" />

        {/* Three values — staggered fade up */}
        <div className="flex items-center justify-center gap-12 flex-wrap mb-16">
          {values.map((key, i) => (
            <motion.div
              key={key}
              className="flex items-center gap-12"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 1.0 + i * 0.15,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {i > 0 && (
                <div className="hidden md:block h-8 w-px bg-stone-200 dark:bg-stone-700" />
              )}
              <span className="text-[0.625rem] tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
                {t(key)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <MagneticButton strength={0.2} radius={60}>
            <Link href="/about" className="link-french">
              {t('cta')} →
            </Link>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
