'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="bg-[#f7f4f0] py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Magazine Feature Header ── */}
        <div className="mb-16 lg:mb-24">
          {/* Kicker */}
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('sectionLabel', { defaultValue: 'Established 2018 — Batumi, Georgia' })}
          </motion.p>

          {/* Headline - oversized serif with italic accent */}
          <motion.h2
            className="text-[clamp(2.5rem,7vw,5rem)] font-serif font-light leading-[0.95] text-stone-900 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Where Science Meets{' '}
            <em className="italic text-[#b5453a]">Artistry</em>
          </motion.h2>
        </div>

        {/* ── Feature Article Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Large image - left side */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
                alt={t('imageAlt', { defaultValue: 'Our salon interior' })}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <p className="mt-4 text-xs italic text-stone-500">
              Our flagship treatment room overlooking the Black Sea
            </p>
          </motion.div>

          {/* Text content - right side */}
          <motion.div
            className="lg:col-span-5 lg:pt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Standfirst / Deck */}
            <p className="text-xl lg:text-2xl font-serif font-light leading-relaxed text-stone-600 mb-12">
              At Silk Beauty Salon, we blend French medical precision with Georgian hospitality to deliver world-class aesthetic treatments.
            </p>

            {/* Drop cap first paragraph */}
            <p className="text-base leading-relaxed text-stone-700 mb-6">
              <span className="float-left text-7xl font-serif leading-[0.8] mr-4 mt-1 text-[#b5453a]">
                F
              </span>
              ounded by Dr. Ana Beridze in 2018, Silk Beauty Salon emerged from a vision to bring European medical aesthetics standards to Georgia. Our philosophy centers on enhancement rather than transformation—preserving the natural beauty that makes each face unique.
            </p>

            <p className="text-base leading-relaxed text-stone-700 mb-6">
              Every treatment begins with a comprehensive consultation. We study your facial anatomy, discuss your aesthetic goals, and craft a personalized treatment plan. Our team of certified medical professionals brings together expertise from Paris, London, and Tbilisi.
            </p>

            {/* Pull Quote */}
            <aside className="my-12 relative">
              <div className="absolute -left-6 top-0 w-1 h-full bg-linear-to-b from-[#b5453a] to-transparent" />
              <blockquote className="text-2xl lg:text-3xl font-serif italic leading-tight text-stone-800 pl-6">
                &ldquo;Beauty is not about perfection. It&apos;s about feeling confident in your own skin.&rdquo;
              </blockquote>
              <footer className="mt-4 pl-6">
                <cite className="not-italic text-sm text-stone-500">
                  — Dr. Ana Beridze, Founder
                </cite>
              </footer>
            </aside>

            <p className="text-base leading-relaxed text-stone-700 mb-8">
              We use only premium European products—Juvederm, Botox, and Restylane—sourced directly from certified distributors. Our facility meets the highest international standards for medical aesthetics.
            </p>

            {/* Credentials - Magazine Credits Style */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-stone-200">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Established
                </p>
                <p className="text-2xl font-serif">2018</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Treatments
                </p>
                <p className="text-2xl font-serif">5,000+</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Team
                </p>
                <p className="text-2xl font-serif">8 Specialists</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Certifications
                </p>
                <p className="text-2xl font-serif">European</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CTA Link ── */}
        <motion.div
          className="mt-16 lg:mt-24 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
          >
            <span>{t('readMore', { defaultValue: 'Read Our Story' })}</span>
            <span className="w-8 h-px bg-stone-400 group-hover:w-12 group-hover:bg-stone-900 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
