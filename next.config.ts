import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'cdn.coverr.co' },
    ],
  },
  // Security headers are handled by reverse proxy (Caddyfile) and middleware.ts (CSP only)
};

// Enable bundle analyzer when BUNDLE_ANALYZE=true
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

export default withAnalyzer(withNextIntl(nextConfig));
