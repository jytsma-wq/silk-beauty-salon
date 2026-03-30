'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PageHeroProps {
  pageKey: 'about' | 'treatments' | 'specialists' | 'contact';
  images?: string[];
}

// Default placeholder gradient background
const PlaceholderBackground = () => (
  <div 
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(135deg, #FFFBF5 0%, #FDF6E9 50%, #FFFBF5 100%)'
    }}
  >
    {/* Decorative elements */}
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
        style={{ background: 'rgba(20, 184, 166, 0.15)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'rgba(201, 169, 110, 0.12)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
    
    {/* Center icon */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(13, 148, 136, 0.1))',
            border: '1px solid rgba(20, 184, 166, 0.3)'
          }}
        >
          <Sparkles size={32} className="text-teal-500" />
        </div>
        <p className="text-gray-500 text-sm tracking-wider uppercase">Silk Beauty</p>
      </div>
    </div>
  </div>
);

export default function PageHero({ pageKey, images = [] }: PageHeroProps) {
  const t = useTranslations(`pageHero.${pageKey}`);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Filter out images that failed to load
  const validImages = images.filter((_, index) => !imageErrors.has(index));

  useEffect(() => {
    if (!isAutoPlaying || validImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, validImages.length]);

  const nextSlide = () => {
    if (validImages.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % validImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    if (validImages.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + validImages.length) % validImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const hasValidImages = validImages.length > 0;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides or Placeholder */}
      {hasValidImages ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={validImages[currentSlide]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => handleImageError(currentSlide)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-800/20 to-gray-900/50" />
          </motion.div>
        </AnimatePresence>
      ) : (
        <PlaceholderBackground />
      )}

      {/* Animated overlay shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(201, 169, 110, 0.1)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(201, 169, 110, 0.08)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-amber-400/70 text-xs md:text-sm tracking-[0.3em] uppercase">
            {t('title')}
          </p>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-bold leading-tight text-center"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            background: 'linear-gradient(135deg, #f5e6d0 0%, #C9A96E 50%, #f5e6d0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('subtitle')}
        </motion.h1>
      </div>

      {/* Navigation arrows - only show if multiple images */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white/80 hover:text-white transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white/80 hover:text-white transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slide indicators - only show if multiple images */}
      {validImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {validImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentSlide(i);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? 'w-6 h-1.5 bg-amber-400'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}
