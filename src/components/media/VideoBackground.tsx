'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  overlayClassName?: string;
  children?: React.ReactNode;
  fallbackImage?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export function VideoBackground({
  src,
  poster,
  className,
  overlayClassName = 'bg-black/40',
  children,
  fallbackImage,
  loop = true,
  muted = true,
  autoPlay = true,
  controls = false,
  parallax = false,
  parallaxSpeed = 0.3,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [translateY, setTranslateY] = useState(0);

  // Video load handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Check if already loaded
    if (video.readyState >= 3) {
      setIsLoaded(true);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Parallax effect
  useEffect(() => {
    if (!parallax) return;

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        if (containerRef.current && scrollY !== lastScrollY) {
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          
          const offset = distanceFromCenter * parallaxSpeed;
          setTranslateY(offset);
          lastScrollY = scrollY;
        }
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [parallax, parallaxSpeed]);

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Fallback/Poster image */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-1000',
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        )}
      >
        {fallbackImage || poster ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${fallbackImage || poster})`,
              transform: parallax ? `translateY(${translateY}px) scale(1.1)` : undefined,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-stone-800" />
        )}
      </div>

      {/* Video element */}
      <motion.video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        controls={controls}
        className={cn(
          'absolute inset-0 w-full h-full object-cover',
          'transition-opacity duration-1000',
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transform: parallax ? `translateY(${translateY}px) scale(1.1)` : undefined,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Overlay */}
      {overlayClassName && (
        <div className={cn('absolute inset-0 pointer-events-none', overlayClassName)} />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
}

// Specialized variant for hero sections with rotating videos
interface RotatingVideoHeroProps {
  videos: { src: string; thumbnail: string; title: string }[];
  interval?: number;
  className?: string;
  children?: React.ReactNode;
}

export function RotatingVideoHero({
  videos,
  interval = 15000,
  className,
  children,
}: RotatingVideoHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setIsTransitioning(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [videos.length, interval]);

  const currentVideo = videos[currentIndex];

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Current video */}
      <VideoBackground
        src={currentVideo.src}
        poster={currentVideo.thumbnail}
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isTransitioning ? 'opacity-0' : 'opacity-100'
        )}
        overlayClassName="bg-linear-to-t from-black/70 via-black/30 to-black/20"
      />

      {/* Progress indicators */}
      {videos.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Switch to ${videos[index].title}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}

// Video section with text overlay
interface VideoSectionProps {
  videoSrc: string;
  poster?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  minHeight?: string;
}

export function VideoSection({
  videoSrc,
  poster,
  title,
  subtitle,
  align = 'center',
  className,
  minHeight = '60vh',
}: VideoSectionProps) {
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <VideoBackground
      src={videoSrc}
      poster={poster}
      className={cn('min-h-[60vh] flex', className)}
      style={{ minHeight }}
      overlayClassName="bg-black/50"
      parallax
      parallaxSpeed={0.2}
    >
      <div className={cn('container-custom flex flex-col justify-center', alignClasses[align])}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </VideoBackground>
  );
}
