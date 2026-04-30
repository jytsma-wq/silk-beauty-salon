import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
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
      'framer-motion',
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
  // Security headers are handled by reverse proxy (Caddyfile) and middleware.ts (CSP only)
};

// Enable bundle analyzer when BUNDLE_ANALYZE=true
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

export default withAnalyzer(withNextIntl(nextConfig));
