/// <reference types="node" />

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
  const svg: string = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
    </svg>
  `;
  
  const base64: string = Buffer.from(svg).toString('base64');
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

// Supported image formats in priority order (best first)
export const SUPPORTED_FORMATS = ['avif', 'webp', 'jpg', 'png'] as const;
export type ImageFormat = (typeof SUPPORTED_FORMATS)[number];

/**
 * Check if browser supports AVIF format
 * Uses client-side detection
 * @returns boolean - true if AVIF is supported (client-side only)
 */
export function supportsAvif(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

/**
 * Check if browser supports WebP format
 * Uses client-side detection
 * @returns boolean - true if WebP is supported (client-side only)
 */
export function supportsWebp(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Get optimal image format based on browser support
 * @returns Best supported format
 */
export function getOptimalFormat(): ImageFormat {
  if (supportsAvif()) return 'avif';
  if (supportsWebp()) return 'webp';
  return 'jpg';
}

/**
 * CDN configuration for external image optimization
 */
export interface CDNConfig {
  provider: 'cloudinary' | 'cloudflare' | 'imgix' | 'unsplash';
  baseUrl?: string;
  quality?: number;
  format?: ImageFormat;
}

/**
 * Generate Cloudinary optimized URL
 * @param publicId - Cloudinary public ID
 * @param options - Optimization options
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; format?: ImageFormat; quality?: number } = {}
): string {
  const { width = 800, height, format = 'auto', quality = 80 } = options;

  const transformations = [`q_${quality}`, `f_${format}`, `w_${width}`];

  if (height) {
    transformations.push(`h_${height}`, 'c_fill');
  } else {
    transformations.push('c_scale');
  }

  return `https://res.cloudinary.com/image/upload/${transformations.join(',')}/${publicId}`;
}

/**
 * Generate Cloudflare Images optimized URL
 * @param imageUrl - Original image URL
 * @param options - Optimization options
 * @returns Optimized Cloudflare URL
 */
export function getCloudflareUrl(
  imageUrl: string,
  options: { width?: number; height?: number; format?: ImageFormat; quality?: number; fit?: string } = {}
): string {
  const { width = 800, height, format = 'auto', quality = 80, fit = 'cover' } = options;

  const params = new URLSearchParams({
    width: width.toString(),
    quality: quality.toString(),
    format,
    fit,
  });

  if (height) {
    params.set('height', height.toString());
  }

  // Note: Replace with your actual Cloudflare account hash
  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH || '';
  return `https://imagedelivery.net/${accountHash}/${encodeURIComponent(imageUrl)}?${params.toString()}`;
}

/**
 * Get srcSet for responsive images with multiple sizes
 * @param src - Base image URL
 * @param widths - Array of desired widths
 * @returns srcSet string
 */
export function getSrcSet(src: string, widths: number[] = [400, 800, 1200, 1600]): string {
  if (src.includes('images.unsplash.com')) {
    return widths
      .map((w) => `${optimizeUnsplashUrl(src, w)} ${w}w`)
      .join(', ');
  }

  return widths.map((w) => `${src}?w=${w} ${w}w`).join(', ');
}

/**
 * Generate LQIP (Low Quality Image Placeholder) blur hash
 * For use with blurDataURL when actual blurhash is not available
 * @param color - Base color for placeholder
 * @returns SVG-based blur placeholder
 */
export function generateLQIP(color: string = '#f5f5f5'): string {
  const svg: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="${color}"/></svg>`;
  const base64: string = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Image loading priority helper
 * Determines if an image should be loaded eagerly or lazily
 * @param index - Image index in the page
 * @param isLCP - Whether this is the Largest Contentful Paint element
 * @returns Loading strategy
 */
export function getLoadingStrategy(index: number, isLCP: boolean = false): 'eager' | 'lazy' {
  if (isLCP) return 'eager';
  if (index < 3) return 'eager'; // First 3 images load eagerly
  return 'lazy';
}

/**
 * Calculate optimal image dimensions based on container and aspect ratio
 * @param containerWidth - Container width in pixels
 * @param aspectRatio - Target aspect ratio (e.g., "16/9")
 * @param maxWidth - Maximum width constraint
 * @returns Calculated dimensions
 */
export function calculateDimensions(
  containerWidth: number,
  aspectRatio: string,
  maxWidth: number = 1920
): { width: number; height: number } {
  const [w, h] = aspectRatio.split('/').map(Number);
  const ratio = w / h;

  const width = Math.min(containerWidth, maxWidth);
  const height = Math.round(width / ratio);

  return { width, height };
}

/**
 * Determine if an image should use priority loading
 * Based on position and viewport
 * @param boundingRect - Element's bounding client rect
 * @returns Whether to prioritize loading (always false server-side)
 */
export function shouldPrioritize(boundingRect: {
  top: number;
  left: number;
  width: number;
  height: number;
}): boolean {
  // Prioritize if image is in or near viewport (within 200px)
  // Returns false on server-side
  if (typeof window === 'undefined') return false;
  
  const viewportHeight = window.innerHeight;
  return boundingRect.top < viewportHeight + 200 && boundingRect.width > 0 && boundingRect.height > 0;
}
