'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImagePlaceholderProps {
  alt: string;
  className?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  icon?: 'sparkles' | 'heart' | 'star' | 'flower';
  overlay?: boolean;
}

export default function ImagePlaceholder({ 
  alt, 
  className = '', 
  aspectRatio = 'portrait',
  icon = 'sparkles',
  overlay = true 
}: ImagePlaceholderProps) {
  const aspectClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    square: 'aspect-square',
  };

  const icons = {
    sparkles: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/>
        <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"/>
        <path d="M5 18l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z"/>
      </svg>
    ),
    heart: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    star: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
    flower: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6z"/>
        <path d="M19.07 4.93a3 3 0 0 0-4.24 4.24 3 3 0 0 0 4.24-4.24z"/>
        <path d="M22 12a3 3 0 0 0-6 0 3 3 0 0 0 6 0z"/>
        <path d="M19.07 19.07a3 3 0 0 0-4.24-4.24 3 3 0 0 0 4.24 4.24z"/>
        <path d="M12 22a3 3 0 0 0 0-6 3 3 0 0 0 0 6z"/>
        <path d="M4.93 19.07a3 3 0 0 0 4.24-4.24 3 3 0 0 0-4.24 4.24z"/>
        <path d="M2 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0z"/>
        <path d="M4.93 4.93a3 3 0 0 0 4.24 4.24 3 3 0 0 0-4.24-4.24z"/>
      </svg>
    ),
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 ${aspectClasses[aspectRatio]} ${className}`}
    >
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-amber-400/40">
          {icons[icon]}
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-0 border border-stone-700/50 rounded-2xl" />

      {/* Overlay gradient */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      )}

      {/* Alt text for accessibility */}
      <span className="sr-only">{alt}</span>
    </div>
  );
}
