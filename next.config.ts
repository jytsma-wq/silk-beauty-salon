/**
 * Bundle Optimization Strategy — next.config.ts
 *
 * Tree-shaking:  experimental.optimizePackageImports (below)
 * Code-splitting: Next.js 16 App Router built-in (do NOT override webpack)
 * Bundle analysis: npm run analyze (BUNDLE_ANALYZE=true)
 *
 * The webpack splitChunks override was removed — it conflicted with RSC
 * streaming and Next.js 16's granular per-route chunk strategy.
 *
 * Note: No Plasmic CMS found in codebase (verified)
 * Note: lucide-react uses named imports (verified)
 */

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // CSP is handled exclusively by middleware.ts (nonce-based, per-request).
  // DO NOT add a Content-Security-Policy header here — it would shadow the
  // middleware nonce and re-enable 'unsafe-inline', breaking XSS protection.
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
          // Note: Content-Security-Policy is intentionally omitted here.
          // It is generated per-request with a unique nonce in middleware.ts.
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
      { protocol: 'https', hostname: 'flagcdn.com', pathname: '/w40/**' },
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
  // Turbopack optimization for instant HMR in Windsurf
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  // Security headers are handled by reverse proxy (Caddyfile) and middleware.ts (CSP only)
};

export default withSentryConfig(
  withNextIntl(nextConfig),
  {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    widenClientFileUpload: true,
    disableLogger: true,
    automaticVercelMonitors: false,
  }
);
