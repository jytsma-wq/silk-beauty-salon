'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryGridProps {
  images: string[];
  category?: string;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function GalleryGrid({ 
  images, 
  category,
  className,
  columns = 3 
}: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Handle body scroll lock
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <>
      <div className={cn('grid gap-4', gridCols[columns], className)}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer bg-stone-200"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image}
              alt={`${category || 'Gallery'} image ${index + 1}`}
              fill
              className={cn(
                'object-cover transition-transform duration-700 ease-out',
                hoveredIndex === index ? 'scale-110' : 'scale-100'
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Hover overlay */}
            <div className={cn(
              'absolute inset-0 bg-[#b5453a]/0 transition-all duration-300 flex items-center justify-center',
              hoveredIndex === index ? 'bg-[#b5453a]/20' : ''
            )}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: hoveredIndex === index ? 1 : 0, 
                  opacity: hoveredIndex === index ? 1 : 0 
                }}
                className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"
              >
                <span className="text-[#b5453a] text-xs font-medium">View</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2 text-white/70 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex items-center justify-center p-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                <Image
                  src={images[selectedImage]}
                  alt={`Gallery image ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                  className={cn(
                    'w-16 h-16 rounded-sm overflow-hidden shrink-0 transition-all duration-200',
                    selectedImage === idx ? 'ring-2 ring-[#b5453a]' : 'opacity-50 hover:opacity-100'
                  )}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
