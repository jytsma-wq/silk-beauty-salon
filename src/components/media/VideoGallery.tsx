'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, Volume2, VolumeX, Maximize } from 'lucide-react';
import type { VideoItem } from '@/data/media';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface VideoGalleryProps {
  videos: VideoItem[];
  columns?: 2 | 3 | 4;
  showCategory?: boolean;
  className?: string;
}

export function VideoGallery({ 
  videos, 
  columns = 3,
  showCategory = true,
  className 
}: VideoGalleryProps) {
  const t = useTranslations('accessibility');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsMuted(false);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <div className={cn('grid gap-6', gridCols[columns], className)}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleVideoClick(video)}
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-video overflow-hidden rounded-sm bg-stone-200">
              <Image
                src={video.thumbnail}
                alt={t('videoThumbnail', { title: video.title })}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Play button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: hoveredId === video.id ? 1 : 0.8, 
                  opacity: hoveredId === video.id ? 1 : 0.7 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Play className="w-6 h-6 text-[#b5453a] ml-1" fill="#b5453a" />
                </div>
              </motion.div>

              {/* Duration badge */}
              {video.duration && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded-sm backdrop-blur-sm">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              )}

              {/* Category badge */}
              {showCategory && (
                <div className="absolute top-3 left-3">
                  <span className="text-[0.625rem] tracking-[0.15em] uppercase bg-white/90 text-stone-700 px-3 py-1 rounded-sm backdrop-blur-sm">
                    {video.category}
                  </span>
                </div>
              )}
            </div>

            {/* Text content */}
            <div className="mt-4 space-y-2">
              <h3 className="font-serif text-lg text-stone-800 group-hover:text-[#b5453a] transition-colors duration-300">
                {video.title}
              </h3>
              <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal / Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-2 text-white/70 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20"
              aria-label={t('closeVideo')}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video player */}
              <div className="relative aspect-video bg-black rounded-sm overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  src={selectedVideo.src}
                  poster={selectedVideo.thumbnail}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  controls
                  className="w-full h-full"
                />

                {/* Custom controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-serif text-lg">{selectedVideo.title}</h3>
                      <p className="text-white/70 text-sm">{selectedVideo.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Mute button */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label={isMuted ? t('closeVideo') : t('closeVideo')}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      
                      {/* Fullscreen button */}
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label={t('toggleFullscreen')}
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
