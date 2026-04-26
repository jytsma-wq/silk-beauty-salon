'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { treatmentCategories } from '@/data/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Extended category type with detail text
interface CategoryWithDetail {
  name: string;
  slug: string;
  href: string;
  image?: string;
  description: string;
  detailText: string;
}

export function EditorialTreatmentsSection() {
  const t = useTranslations('treatments');
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // Extended categories with detail text
  const categories: CategoryWithDetail[] = treatmentCategories.slice(0, 6).map((cat, index) => ({
    ...cat,
    description: cat.description || `${cat.name} treatments for natural, elegant results.`,
    detailText: `Our ${cat.name.toLowerCase()} treatments are designed with the precision of French medical aesthetics. Each procedure is customized to your unique facial anatomy, ensuring results that enhance your natural beauty while maintaining complete harmony. Experience the intersection of science and artistry.`,
  }));

  // Track which item is in viewport center
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: [0.5, 0.8], rootMargin: '-20% 0px -20% 0px' }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Track scroll progress for the list
  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    const rect = listRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const listTop = rect.top;
    const listHeight = rect.height;

    // Calculate progress through the list
    const scrolled = windowHeight - listTop;
    const total = listHeight + windowHeight;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f7f4f0] py-32 lg:py-40">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          {/* Left: sticky sidebar with animated counter */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="section-label mb-6">
              <span>{t('sectionLabel')}</span>
            </div>

            {/* Animated Counter */}
            <div className="relative h-[clamp(4rem,8vw,7rem)] mb-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0 font-serif text-[clamp(4rem,8vw,7rem)] font-light leading-none text-[#f0ede8]"
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl font-light leading-tight tracking-tight text-stone-900 mb-6">
              {t('sectionTitle')}
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-8 max-w-sm">
              {t('sectionDescription')}
            </p>
            <Link href="/treatments" className="link-french inline-flex items-center">
              {t('viewAll')} →
            </Link>
          </div>

          {/* Right: numbered editorial list with scroll progress */}
          <div ref={listRef} className="relative">
            {/* Scroll Progress Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#b5453a]/10 hidden lg:block">
              <motion.div
                className="w-full bg-[#b5453a]/40"
                style={{ height: `${scrollProgress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="pl-6 lg:pl-8">
              {categories.map((cat, index) => (
                <div
                  key={cat.slug}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="hairline" />

                  {/* Main Item Row */}
                  <div
                    className={`py-6 flex gap-6 items-start cursor-pointer
                      border-l-2 transition-all duration-300
                      ${expandedIndex === index ? 'border-[#b5453a] pl-4' : 'border-transparent hover:border-[#b5453a] hover:pl-4'}
                      ${activeIndex === index ? 'bg-stone-50/50' : ''}`}
                    onClick={() => toggleExpand(index)}
                  >
                    {/* Number */}
                    <span className="editorial-number shrink-0 leading-none text-stone-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Text Content */}
                    <div className="flex-1 pt-1 relative">
                      <h3 className={`font-serif text-lg lg:text-xl font-light tracking-tight mb-2 transition-colors
                        ${activeIndex === index ? 'text-[#b5453a]' : 'text-stone-900 hover:text-[#b5453a]'}`}>
                        {cat.name}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
                        {cat.description}
                      </p>

                      {/* Hover Image Preview */}
                      <AnimatePresence>
                        {hoveredIndex === index && cat.image && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="absolute right-0 top-0 w-50 h-50 rounded-sm overflow-hidden shadow-xl z-20 hidden lg:block"
                          >
                            <Image
                              src={cat.image}
                              alt={cat.name}
                              fill
                              className="object-cover"
                              sizes="200px"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6 flex items-center justify-center text-stone-400 shrink-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-16 pr-4 pb-8">
                          <div className="grid grid-cols-1 md:grid-cols-[1fr,200px] gap-6 items-start">
                            <div>
                              <p className="text-stone-600 leading-relaxed mb-6">
                                {cat.detailText}
                              </p>
                              <Link
                                href={`/treatments/${cat.slug}`}
                                className="inline-flex items-center text-sm text-[#b5453a] hover:underline"
                              >
                                Explore {cat.name} →
                              </Link>
                            </div>
                            {cat.image && (
                              <div className="relative w-full aspect-square rounded-sm overflow-hidden">
                                <Image
                                  src={cat.image}
                                  alt={cat.name}
                                  fill
                                  className="object-cover"
                                  sizes="200px"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="hairline" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

