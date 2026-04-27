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
  const [hovered, setHovered] = useState<string | null>(null);
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

            <div className="pl-6 lg:pl-8 relative">
              {categories.map((cat, index) => (
                <div
                  key={cat.slug}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link href={`/treatments/${cat.slug}`} className="group block">
                    <div className="hairline" />
                    <div
                      className="py-8 flex gap-6 items-start relative overflow-hidden
                        border-l-0 hover:border-l-2 border-[#b5453a]
                        hover:pl-4 transition-all duration-500"
                      onMouseEnter={() => setHovered(cat.slug)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Hover image — slides in from right (Harley St pattern) */}
                      <motion.div
                        className="absolute right-0 top-0 bottom-0 w-32 lg:w-48
                          overflow-hidden pointer-events-none"
                        initial={{ opacity: 0, x: 20 }}
                        animate={hovered === cat.slug
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <Image
                          src={cat.image || `https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=200&q=70`}
                          alt=""
                          fill
                          className="object-cover"
                          aria-hidden="true"
                          sizes="200px"
                          unoptimized={cat.image?.startsWith('http')}
                        />
                      </motion.div>

                      {/* Number */}
                      <span className="editorial-number shrink-0 leading-none text-stone-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {/* Text */}
                      <div className="pt-2 flex-1">
                        <h3 className="font-serif text-xl font-light text-stone-900
                          group-hover:text-stone-700 mb-2 tracking-tight">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </Link>

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

