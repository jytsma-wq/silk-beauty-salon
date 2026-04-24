/**
 * Image optimization utilities for Next.js Image component
 * Provides consistent sizing, preconnect hints, and blur placeholder support
 */

import { ImageProps } from 'next/image';

// Standard image sizes for responsive images
export const IMAGE_SIZES = {
  thumbnail: { width: 200, height: 200 },
  small: { width: 400, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
};

// Preconnect URLs for external image domains
declare global {
  interface Window {
    __PRECONNECT_ADDED?: boolean;
  }
}

/**
 * Get sizes attribute for responsive images
 * @param maxColumns - Maximum number of columns in grid layout
 * @returns sizes string for Image component
 */
export function getResponsiveSizes(maxColumns: number = 3): string {
  const breakpointSm = 640;  // sm breakpoint
  const breakpointMd = 768;  // md breakpoint
  const breakpointLg = 1024; // lg breakpoint
  
  if (maxColumns === 1) {
    return '100vw';
  }
  
  if (maxColumns === 2) {
    return `(max-width: ${breakpointMd}px) 100vw, 50vw`;
  }
  
  if (maxColumns === 3) {
    return `(max-width: ${breakpointMd}px) 100vw, (max-width: ${breakpointLg}px) 50vw, 33vw`;
  }
  
  if (maxColumns === 4) {
    return `(max-width: ${breakpointSm}px) 100vw, (max-width: ${breakpointMd}px) 50vw, (max-width: ${breakpointLg}px) 33vw, 25vw`;
  }
  
  return '100vw';
}

/**
 * Get optimized image props for common use cases
 * @param size - Preset size configuration
 * @param priority - Whether to prioritize loading (LCP images)
 * @returns Partial ImageProps with optimized settings
 */
export function getOptimizedImageProps(
  size: keyof typeof IMAGE_SIZES = 'medium',
  priority: boolean = false
): Partial<ImageProps> {
  const dimensions = IMAGE_SIZES[size];
  
  return {
    ...dimensions,
    priority,
    loading: priority ? 'eager' : 'lazy',
    quality: 80,
    placeholder: 'blur',
    blurDataURL: getBlurDataURL(dimensions.width, dimensions.height),
  };
}

/**
 * Generate a tiny blur placeholder (base64 encoded SVG)
 * @param width - Image width
 * @param height - Image height
 * @returns Base64 encoded blur placeholder
 */
export function getBlurDataURL(width: number = 10, height: number = 10): string {
  // Create a tiny SVG placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Add preconnect links for external image domains
 * Should be called in layout.tsx or page.tsx
 */
export function getImagePreconnectLinks(): { rel: string; href: string }[] {
  return [
    { rel: 'preconnect', href: 'https://images.unsplash.com' },
    { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
  ];
}

/**
 * Optimize Unsplash image URL with proper sizing
 * @param url - Original Unsplash URL
 * @param width - Desired width
 * @returns Optimized Unsplash URL
 */
export function optimizeUnsplashUrl(url: string, width: number = 800): string {
  // Unsplash supports w= parameter for width
  if (url.includes('images.unsplash.com')) {
    // Remove existing size params
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&q=80&auto=format&fit=crop`;
  }
  return url;
}

/**
 * Get aspect ratio for common image types
 * @param type - Image type
 * @returns Aspect ratio as string (e.g., "16/9")
 */
export function getAspectRatio(type: 'hero' | 'card' | 'square' | 'portrait'): string {
  const ratios = {
    hero: '16/9',
    card: '4/3',
    square: '1/1',
    portrait: '3/4',
  };
  return ratios[type];
}
