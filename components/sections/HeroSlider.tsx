'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const SLIDE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=90',
    overlay: 'from-gray-900/50 via-gray-800/30 to-gray-900/50',
  },
  {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=90',
    overlay: 'from-gray-900/50 via-gray-800/30 to-gray-900/50',
  },
  {
    url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=90',
    overlay: 'from-gray-900/50 via-gray-800/30 to-gray-900/50',
  },
  {
    url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1920&q=90',
    overlay: 'from-gray-900/50 via-gray-800/30 to-gray-900/50',
  },
];

export default function HeroSlider({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const tSlider = useTranslations('heroSlider');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slideLabels = [
    tSlider('slide1'),
    tSlider('slide2'),
    tSlider('slide3'),
    tSlider('slide4'),
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDE_IMAGES[currentSlide].url})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${SLIDE_IMAGES[currentSlide].overlay}`} />
        </motion.div>
      </AnimatePresence>

      {/* Animated particles/shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <motion.p
            className="text-amber-400/80 text-sm md:text-base tracking-[0.3em] uppercase font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {t('badge')}
          </motion.p>
        </motion.div>

        {/* Main heading - Welcome to Silk Beauty Salon */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-bold mb-4 leading-tight"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            background: 'linear-gradient(135deg, #f5e6d0 0%, #C9A96E 50%, #f5e6d0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('welcome')}
        </motion.h1>

        {/* Tagline - It is your time to shine */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-stone-300 text-xl md:text-2xl lg:text-3xl font-light mb-8 tracking-wide"
        >
          {t('tagline')}
        </motion.p>

        {/* Current slide indicator */}
        <motion.p
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-amber-400/60 text-sm tracking-wider uppercase mb-10"
        >
          {slideLabels[currentSlide]}
        </motion.p>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white/80 hover:text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white/80 hover:text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentSlide(i);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? 'w-8 h-2 bg-amber-400'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-teal-300 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
