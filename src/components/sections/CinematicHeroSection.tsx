'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { heroVideos } from '@/data/media';
import { MagneticButton } from '@/components/ui/MagneticButton';

// Organic blob shape for magazine overlay
function OrganicShape({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M200 0C310 0 400 90 400 200C400 310 310 400 200 400C90 400 0 310 0 200C0 90 90 0 200 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Magazine-style scroll indicator
function EditorialScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.6 }}
    >
      <span className="text-[0.625rem] tracking-[0.4em] uppercase text-white/50">
        Scroll
      </span>
      <motion.div
        className="w-px h-16 bg-linear-to-b from-white/50 to-transparent"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export function CinematicHeroSection() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentVideo = heroVideos[currentVideoIndex];

  // Cycle through videos every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
        setIsTransitioning(false);
      }, 800);
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  // Handle video load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener('canplay', handleCanPlay);

    setVideoLoaded(false);

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [currentVideoIndex]);

  return (
    <section className="relative h-screen overflow-hidden bg-stone-900">
      {/* ── Full-bleed Video Layer ── */}
      <div className="absolute inset-0 z-0">
        {/* Poster image shows instantly while video loads */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideo.id}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded && !isTransitioning ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
            poster={currentVideo.thumbnail}
          >
            <source src={currentVideo.src} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        {/* Magazine-style gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-stone-900/70 via-stone-900/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-transparent to-stone-900/20" />

        {/* Organic shape overlay - bottom right */}
        <motion.div
          className="absolute bottom-0 right-0 w-[60vw] h-[60vh] text-[#b5453a]/10 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <OrganicShape className="w-full h-full" />
        </motion.div>

        {/* Secondary organic shape - top left */}
        <motion.div
          className="absolute top-0 left-0 w-[40vw] h-[40vh] text-stone-100/5 pointer-events-none -scale-x-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          <OrganicShape className="w-full h-full" />
        </motion.div>
      </div>

      {/* ── Magazine Typography Layers ── */}
      <div className="relative z-10 h-full flex items-end">
        {/* Background oversized text */}
        <motion.div
          className="absolute top-1/4 -left-4 text-[20vw] font-serif text-stone-100/3 leading-none pointer-events-none select-none whitespace-nowrap"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          BEAUTY
        </motion.div>

        {/* Main content - asymmetric placement (bottom-left) */}
        <div className="w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24 lg:pb-32">
          <div className="max-w-4xl">
            {/* Kicker - small caps with wide tracking */}
            <motion.p
              className="text-xs tracking-[0.3em] uppercase text-stone-300 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('eyebrow', { defaultValue: 'Medical Aesthetics · Batumi Edition' })}
            </motion.p>

            {/* Main headline - oversized serif with italic accent */}
            <motion.h1
              className="text-[clamp(2.5rem,8vw,7rem)] font-serif font-light leading-[0.9] text-stone-50 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="block">Redefining</span>
              <motion.span
                className="block italic text-[#b5453a]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Beauty
              </motion.span>
            </motion.h1>

            {/* Subtitle - flowing text */}
            <motion.p
              className="text-lg md:text-xl font-light text-stone-200 max-w-md leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {t('subtitle', { defaultValue: 'Where French medical precision meets Georgian hospitality' })}
            </motion.p>

            {/* Magazine-style CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <MagneticButton strength={0.5} radius={100}>
                <Link
                  href="/book"
                  className="group relative inline-flex items-center overflow-hidden px-10 py-5 border border-stone-50/80"
                >
                  <span className="relative z-10 text-sm tracking-[0.2em] uppercase text-stone-50 group-hover:text-stone-900 transition-colors duration-500">
                    Book Consultation
                  </span>
                  <div className="absolute inset-0 bg-stone-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Scroll indicator - centered at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <EditorialScrollIndicator />
          </div>
        </div>

        {/* Vertical text - running down right side */}
        <motion.div
          className="absolute right-6 md:right-12 top-1/3 hidden md:block"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.5em] uppercase text-stone-400/60 [writing-mode:vertical-rl] rotate-180">
            Silk Beauty Salon
          </span>
        </motion.div>

        {/* Edition marker - top right */}
        <motion.div
          className="absolute top-8 right-6 md:right-16 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <p className="text-[0.625rem] tracking-[0.3em] uppercase text-stone-400/80 text-right">
            Spring 2026
          </p>
        </motion.div>
      </div>

      {/* ── Video progress indicators ── */}
      <motion.div
        className="absolute bottom-8 left-8 z-20 flex gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        {heroVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentVideoIndex(index);
                setIsTransitioning(false);
              }, 800);
            }}
            className={`h-px transition-all duration-500 ${
              index === currentVideoIndex
                ? 'w-12 bg-stone-50'
                : 'w-4 bg-stone-50/30 hover:bg-stone-50/50'
            }`}
            aria-label={`Switch to video ${index + 1}`}
          />
        ))}
      </motion.div>
    </section>
  );
}
