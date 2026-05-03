/**
 * Bundle Analysis & Optimization Configuration
 * 
 * Before optimizations:
 * - First-load JS: ~[Baseline pending analysis]
 * - Heavy modules: framer-motion, lucide-react, radix-ui components
 * 
 * Optimizations applied:
 * 1. optimizePackageImports for lucide-react, @radix-ui/react-*, date-fns
 * 2. Webpack splitChunks for vendor/common code splitting
 * 3. LazyMotion with domAnimation for framer-motion (in layout)
 * 
 * Note: No Plasmic CMS found in codebase (verified)
 * Note: lucide-react uses named imports (verified)
 * Note: date-fns not currently used (no changes needed)
 */

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Security headers including CSP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob: https://picsum.photos https://flagcdn.com; media-src 'self' https://cdn.coverr.co https://storage.googleapis.com blob:; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://cdn.coverr.co; frame-src 'self' https://cal.com https://*.cal.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
          },
        ],
      },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/photo-**' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'cdn.coverr.co' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    minimumCacheTTL: 86400, // 24 hours
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-accordion',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-toast',
      'framer-motion',
      'date-fns',
    ],
    scrollRestoration: true,
  },
  // Webpack optimization
  webpack: (config, { isServer }: { isServer: boolean }) => {
    // Split chunks for better caching
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        common: {
          minChunks: 2,
          chunks: 'all',
          enforce: true,
          priority: 5,
        },
      },
    };

    // Optimize font loading
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/font/google': require.resolve('next/dist/build/webpack/loaders/next-font-loader'),
      };
    }

    return config;
  },
  // Turbopack optimization for instant HMR in Windsurf
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  // Security headers are handled by reverse proxy (Caddyfile) and middleware.ts (CSP only)
};

// Enable bundle analyzer when BUNDLE_ANALYZE=true
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

export default withAnalyzer(withNextIntl(nextConfig));
