'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BookingButton } from '@/components/booking-button';

// Split text into words for staggered animation (Harley Street pattern)
function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.8 + i * 0.09,   // 800ms initial delay, then stagger
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function CinematicHeroSection() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Optional: video can cycle between 2-3 clips for variety
  const videoSources = [
    'https://cdn.coverr.co/videos/coverr-a-woman-getting-a-facial-treatment-6960/1080p.mp4',
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener('canplay', () => setVideoLoaded(true));
    return () => video.removeEventListener('canplay', () => setVideoLoaded(true));
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-stone-900">

      {/* ── Video Layer ── */}
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
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          poster="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80"
        >
          <source src={videoSources[0]} type="video/mp4" />
        </video>

        {/* Multi-layer gradient — heavier at bottom for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
      </div>

      {/* ── Kinetic Text Content ── */}
      <div className="relative z-10 container-custom pb-24 md:pb-36">
        <div className="max-w-3xl">

          {/* Eyebrow — slides in from left */}
          <motion.p
            className="text-[0.625rem] tracking-[0.3em] uppercase text-white/60 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t('eyebrow', { defaultValue: 'Silk Beauty · Batumi, Georgia' })}
          </motion.p>

          {/* Main heading — word-by-word reveal (Harley Street pattern) */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light
            leading-[1.1] tracking-tight text-white mb-8">
            <AnimatedHeading text={t('title')} />
          </h1>

          {/* Subtitle — fades in after heading */}
          <motion.p
            className="text-lg md:text-xl font-light text-white/70 mb-12
              max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs — slide up last */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
          >
            <BookingButton />
            <a
              href="/treatments"
              className="text-[0.625rem] tracking-[0.2em] uppercase text-white/60
                hover:text-white border-b border-white/20 hover:border-white/60
                pb-0.5 transition-all duration-300 self-center"
            >
              {t('exploreMore', { defaultValue: 'Explore Treatments' })} →
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20 flex items-center gap-3 text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <motion.div
              className="w-px h-10 bg-white/30"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[0.5rem] tracking-[0.3em] uppercase">
              {t('scroll', { defaultValue: 'Scroll' })}
            </span>
          </motion.div>

        </div>
      </div>

      {/* ── Corner detail — editorial accent ── */}
      <motion.div
        className="absolute bottom-8 right-8 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        <p className="text-[0.5rem] tracking-[0.25em] uppercase text-white/30 text-right"
           dangerouslySetInnerHTML={{ __html: t('cornerDetail') }}>
        </p>
      </motion.div>

    </section>
  );
}
