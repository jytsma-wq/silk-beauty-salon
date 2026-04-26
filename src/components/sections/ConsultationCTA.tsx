'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function ConsultationCTA() {
  const t = useTranslations('consultation');

  return (
    <section className="section-spacing bg-stone-50 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1c1c1c] text-white text-sm tracking-widest uppercase transition-colors hover:bg-[#b5453a]"
            >
              {t('cta')}
            </Link>
          </motion.div>

          {/* Right - Image (55/45 split) */}
          <motion.div
            className="relative aspect-4/5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/consultation.svg"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
