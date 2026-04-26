'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ParallaxImage } from '@/components/effects';

export function PullQuoteTestimonial() {
  const t = useTranslations('testimonial');

  return (
    <section className="section-spacing bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image with Parallax */}
          <motion.div
            className="relative aspect-4/5 lg:aspect-3/4 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ParallaxImage
              src="/images/testimonial-portrait.svg"
              alt=""
              fill
              parallaxSpeed={0.15}
            />
          </motion.div>

          {/* Right - Pull Quote */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Large Quote Mark - 200px crimson */}
            <span className="pull-quote-mark">&ldquo;</span>

            {/* Quote Text - 2rem serif */}
            <blockquote className="pull-quote-text mb-8 relative z-10">
              {t('quote')}
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-stone-300" />
              <div>
                <p className="font-serif text-lg text-stone-800">{t('name')}</p>
                <p className="text-xs tracking-widest uppercase text-stone-500">
                  {t('location')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
