'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BookingButton } from '@/components/booking-button';
import { motion, useReducedMotion } from 'framer-motion';
import { FloatingParticles } from '@/components/effects';

export function HeroSection() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Handle video load
  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax effect with requestAnimationFrame - disabled on mobile
  useEffect(() => {
    // Skip parallax on mobile for performance
    if (isMobile) return;

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) return; // Throttle via RAF

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY !== lastScrollY) {
          setParallaxOffset(scrollY * 0.3); // 0.3x scroll speed
          lastScrollY = scrollY;
        }
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Animation variants - respect reduced motion
  const fadeInUp = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: () => ({ opacity: 1, y: 0 }),
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: (delay: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.25, 0.1, 0.25, 1] as const,
          },
        }),
      };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-end overflow-hidden">
      {/* Video Background with Parallax */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: isMobile ? undefined : `translateY(${parallaxOffset}px)` }}
      >
        {/* Mobile: Static poster with Ken Burns (no video for performance) */}
        {isMobile ? (
          <div className="absolute inset-0">
            {/* Reduced motion: static image. Normal: Ken Burns animation */}
            <div
              className={`absolute inset-0 ${shouldReduceMotion ? '' : 'animate-ken-burns'}`}
              style={shouldReduceMotion ? {} : {
                animation: 'kenBurns 20s ease-out forwards',
              }}
            >
              <Image
                src="/images/hero-poster.jpg"
                alt="Luxury spa and beauty salon interior"
                fill
                priority
                fetchPriority="high"
                className="object-cover scale-100"
                sizes="100vw"
              />
            </div>
          </div>
        ) : (
          <>
            {/* Desktop: Poster Image with Ken Burns effect (shown while video loads) */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: isVideoLoaded ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`absolute inset-0 ${shouldReduceMotion ? '' : 'animate-ken-burns'}`}
                style={shouldReduceMotion ? {} : {
                  animation: 'kenBurns 10s ease-out forwards',
                }}
              >
                <Image
                  src="/images/hero-poster.jpg"
                  alt="Luxury spa and beauty salon interior"
                  fill
                  priority
                  fetchPriority="high"
                  className="object-cover scale-100"
                  sizes="100vw"
                />
              </div>
            </motion.div>

            {/* Desktop: Video Element */}
            <motion.video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              onLoadedData={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVideoLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </motion.video>
          </>
        )}

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />

        {/* Mobile-specific darker overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20 md:hidden" />

        {/* Floating Particles - Ambient Effect (disabled on mobile) */}
        {!isMobile && <FloatingParticles />}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-left text-white pb-16 md:pb-28">
        <div className="max-w-2xl">
          {/* Editorial headline with animation */}
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-light leading-tight mb-4 tracking-tight"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            {t('title')}
          </motion.h1>

          <motion.h2
            className="text-lg md:text-2xl font-sans font-light text-white/80 mb-6 md:mb-8 tracking-wide"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
          >
            {t('subtitle')}
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-white/70 mb-8 md:mb-10 max-w-lg leading-relaxed"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.9}
          >
            {t('description')}
          </motion.p>

          {/* Book Appointment button */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1.2}
          >
            <BookingButton />
          </motion.div>

          {/* Elegant Scroll Indicator */}
          <motion.div
            className="mt-12 md:mt-16 flex flex-col items-start gap-2"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? {} : { duration: 0.6, delay: 1.8 }}
          >
            <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-white/60"
                animate={shouldReduceMotion ? {} : {
                  y: ['-100%', '100%'],
                }}
                transition={shouldReduceMotion ? {} : {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
