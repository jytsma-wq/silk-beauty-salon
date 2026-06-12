# Performance Optimization Guide

This document outlines the performance optimization strategies implemented in Silk Beauty Salon, including Core Web Vitals targets, caching strategies, and monitoring tools.

## Table of Contents

- [Overview](#overview)
- [Performance Targets](#performance-targets)
- [Image Optimization](#image-optimization)
- [Code Splitting & Bundling](#code-splitting--bundling)
- [Caching Strategy](#caching-strategy)
- [Service Worker](#service-worker)
- [Monitoring & Analytics](#monitoring--analytics)
- [Performance Budget](#performance-budget)
- [CDN Configuration](#cdn-configuration)

## Overview

The application implements comprehensive performance optimizations to achieve excellent Core Web Vitals scores and provide a fast user experience.

## Performance Targets

| Metric | Target | Threshold |
| ------ | ------ | --------- |
| Lighthouse Score | > 95 | - |
| LCP (Largest Contentful Paint) | < 2.5s | < 4.0s |
| FID (First Input Delay) | < 100ms | < 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 |
| TTI (Time to Interactive) | < 3.5s | < 5.0s |
| FCP (First Contentful Paint) | < 1.8s | < 3.0s |
| TTFB (Time to First Byte) | < 600ms | < 1.8s |
| Bundle Size (First Load JS) | < 200KB | < 250KB |

## Image Optimization

### Next.js Image Component

All images use the Next.js `Image` component with automatic optimization:

```tsx
import Image from 'next/image';
import { getOptimizedImageProps } from '@/lib/image-optimizer';

// Basic usage
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For LCP images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Using optimizer utilities
<Image
  src="/treatment.jpg"
  alt="Treatment"
  {...getOptimizedImageProps('medium', false)}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Supported Formats

- **AVIF**: Best compression, supported in modern browsers
- **WebP**: Excellent compression, wide browser support
- **JPEG**: Fallback for older browsers
- **PNG**: For images requiring transparency

### Image Utilities

```typescript
import {
  optimizeUnsplashUrl,
  getResponsiveSizes,
  getBlurDataURL,
  getAspectRatio,
} from '@/lib/image-optimizer';

// Optimize external images
const optimized = optimizeUnsplashUrl(originalUrl, 800);

// Get responsive sizes attribute
const sizes = getResponsiveSizes(3); // 3-column grid

// Generate blur placeholder
const blurUrl = getBlurDataURL(10, 10);

// Get aspect ratio
const ratio = getAspectRatio('hero'); // "16/9"
```

## Code Splitting & Bundling

### Dynamic Imports

```typescript
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Lazy load below-the-fold components
const Footer = dynamic(() => import('@/components/footer'), {
  loading: () => null,
});
```

### Webpack Optimization

The Next.js config includes:

- **Vendor chunk splitting**: Separate node_modules bundles
- **Common chunk optimization**: Deduplicate shared code
- **Tree shaking**: Remove unused code
- **Package optimization**: Automatic for `lucide-react`, `framer-motion`

### Bundle Analysis

```bash
npm run analyze  # Opens bundle analyzer
```

## Caching Strategy

### HTTP Caching Headers

The middleware automatically sets appropriate caching headers:

| Asset Type | Cache Control |
| ---------- | ------------- |
| Static files (`/_next/static`) | `max-age=31536000, immutable` |
| Images | `max-age=86400` (24 hours) |
| HTML pages | `s-maxage=3600, stale-while-revalidate=86400` |
| API routes | `no-cache` |

### Client-Side Caching

```typescript
// SWR for data fetching with caching
import useSWR from 'swr';

const { data, error } = useSWR('/api/treatments', fetcher, {
  revalidateOnFocus: false,
  revalidateIfStale: false,
  dedupingInterval: 60000,
});
```

## Service Worker

### Features

- **Offline support**: Cache static assets for offline access
- **Background sync**: Retry failed form submissions
- **Image caching**: Aggressive caching for images
- **API caching**: Stale-while-revalidate for API calls

### Registration

The service worker is automatically registered in the browser:

```typescript
// In your layout or providers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

### Cache Strategies

| Resource Type | Strategy |
| ------------- | -------- |
| Static assets | Cache First |
| Images | Stale While Revalidate |
| API calls | Network First |
| HTML pages | Cache First |

## Monitoring & Analytics

### Core Web Vitals Tracking

The `PerformanceProvider` automatically tracks:

- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)
- **INP** (Interaction to Next Paint)

### Usage

```tsx
import { PerformanceProvider } from '@/components/providers/performance-provider';

export default function RootLayout({ children }) {
  return (
    <PerformanceProvider>
      {children}
    </PerformanceProvider>
  );
}
```

### Performance Hook

```typescript
import { usePerformance } from '@/components/providers/performance-provider';

function MyComponent() {
  const { measure, mark, measureMarks } = usePerformance();

  const handleClick = () => {
    measure('button-click', () => {
      // Expensive operation
      doSomething();
    });
  };

  return <button onClick={handleClick}>Measure</button>;
}
```

## Performance Budget

Configuration in `performance-budget.json`:

```json
{
  "budgets": [
    {
      "type": "initial",
      "name": "total",
      "maximumWarningSize": "500kb",
      "maximumErrorSize": "600kb"
    }
  ]
}
```

### CI Enforcement

The CI pipeline fails if performance budgets are exceeded:

```yaml
- name: Check bundle size
  run: |
    npm run build
    node scripts/check-performance-budget.js
```

## CDN Configuration

### Recommended CDNs

1. **Cloudflare Images**
   - Automatic format optimization (WebP/AVIF)
   - On-the-fly resizing
   - Global edge caching

2. **Cloudinary**
   - Advanced image transformations
   - Automatic quality optimization
   - Video optimization

### Integration

```typescript
import { getCloudinaryUrl } from '@/lib/image-optimizer';

const optimizedUrl = getCloudinaryUrl('treatment-photo', {
  width: 800,
  height: 600,
  format: 'avif',
  quality: 80,
});
```

## Optimization Checklist

### Before Deployment

- [ ] Run Lighthouse audit (score > 95)
- [ ] Verify all images use Next.js Image component
- [ ] Check Core Web Vitals in DevTools
- [ ] Run bundle analyzer
- [ ] Test on mobile network (Fast 3G)
- [ ] Verify service worker registration
- [ ] Check caching headers

### Regular Monitoring

- [ ] Weekly Lighthouse reports
- [ ] Review Vercel Analytics dashboard
- [ ] Monitor error rates
- [ ] Track bundle size trends
- [ ] Analyze real user metrics (RUM)

## Troubleshooting

### High LCP

1. Optimize hero images
2. Use `priority` loading for LCP elements
3. Preload critical resources
4. Reduce render-blocking CSS/JS

### High CLS

1. Set explicit width/height on images
2. Reserve space for dynamic content
3. Avoid inserting content above existing content
4. Use `aspect-ratio` CSS property

### Large Bundle Size

1. Use dynamic imports
2. Remove unused dependencies
3. Enable tree shaking
4. Use smaller alternatives for heavy libraries

### Slow API Responses

1. Add database indexes
2. Implement query caching
3. Cache repeated read-heavy responses where appropriate
4. Add response caching headers

## Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

For questions or performance issues, please create an issue with:
1. Lighthouse report (JSON)
2. Browser and device information
3. Network conditions
4. Reproduction steps
