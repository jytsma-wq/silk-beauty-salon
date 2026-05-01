'use client';

/**
 * Performance Monitoring Provider
 * Tracks Core Web Vitals and performance metrics
 */

import { useEffect, useCallback } from 'react';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  entries: PerformanceEntry[];
  navigationType?: string;
}

interface PerformanceData {
  url: string;
  timestamp: number;
  metrics: Record<string, number>;
  userAgent: string;
  connection?: string;
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

function getRating(value: number, metric: keyof typeof THRESHOLDS): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metric];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(data: WebVitalsMetric) {
  // Send to your analytics endpoint
  const body: PerformanceData = {
    url: window.location.href,
    timestamp: Date.now(),
    metrics: { [data.name]: data.value },
    userAgent: navigator.userAgent,
    connection: (navigator as Navigator & { connection?: { effectiveType: string } }).connection?.effectiveType,
  };

  // Use sendBeacon for reliable delivery
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/performance', JSON.stringify(body));
  } else {
    fetch('/api/analytics/performance', {
      method: 'POST',
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {
      // Silent fail - don't impact user experience
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[Web Vitals] ${data.name}: ${data.value} (${data.rating})`);
  }
}

// Report Largest Contentful Paint (LCP)
function reportLCP(callback: (metric: WebVitalsMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    if (lastEntry) {
      const value = lastEntry.startTime;
      callback({
        id: Math.random().toString(36).slice(2),
        name: 'LCP',
        value,
        rating: getRating(value, 'LCP'),
        entries,
      });
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });

  // Report final LCP on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      observer.disconnect();
    }
  });
}

// Report First Input Delay (FID)
function reportFID(callback: (metric: WebVitalsMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();

    entries.forEach((entry) => {
      if (entry.entryType === 'first-input') {
        const firstInput = entry as PerformanceEventTiming;
        const value = firstInput.processingStart - firstInput.startTime;
        callback({
          id: Math.random().toString(36).slice(2),
          name: 'FID',
          value,
          rating: getRating(value, 'FID'),
          entries,
        });
      }
    });
  });

  observer.observe({ entryTypes: ['first-input'] });
}

// Report Cumulative Layout Shift (CLS)
function reportCLS(callback: (metric: WebVitalsMetric) => void) {
  let sessionValue = 0;
  const sessionEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as unknown as Array<{ hadRecentInput: boolean; value: number }>;

    entries.forEach((entry) => {
      // Only count layout shifts without recent user input
      if (!entry.hadRecentInput) {
        sessionValue += entry.value;
        sessionEntries.push(entry as unknown as PerformanceEntry);
      }
    });

    callback({
      id: Math.random().toString(36).slice(2),
      name: 'CLS',
      value: sessionValue,
      rating: getRating(sessionValue, 'CLS'),
      entries: sessionEntries,
    });
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

// Report First Contentful Paint (FCP)
function reportFCP(callback: (metric: WebVitalsMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');

    if (fcpEntry) {
      const value = fcpEntry.startTime;
      callback({
        id: Math.random().toString(36).slice(2),
        name: 'FCP',
        value,
        rating: getRating(value, 'FCP'),
        entries,
      });
    }
  });

  observer.observe({ entryTypes: ['paint'] });
}

// Report Time to First Byte (TTFB)
function reportTTFB(callback: (metric: WebVitalsMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as PerformanceNavigationTiming[];

    entries.forEach((entry) => {
      const value = entry.responseStart - entry.startTime;
      callback({
        id: Math.random().toString(36).slice(2),
        name: 'TTFB',
        value,
        rating: getRating(value, 'TTFB'),
        entries,
      });
    });
  });

  observer.observe({ entryTypes: ['navigation'] });
}

// Report Interaction to Next Paint (INP)
function reportINP(callback: (metric: WebVitalsMetric) => void) {
  let maxDuration = 0;
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as PerformanceEventTiming[];

    entries.forEach((entry) => {
      const duration = entry.processingEnd - entry.startTime;
      if (duration > maxDuration) {
        maxDuration = duration;
        callback({
          id: Math.random().toString(36).slice(2),
          name: 'INP',
          value: maxDuration,
          rating: getRating(maxDuration, 'INP'),
          entries,
        });
      }
    });
  });

  observer.observe({ entryTypes: ['event'] });
}

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const reportMetric = useCallback((metric: WebVitalsMetric) => {
    sendToAnalytics(metric);

    // Send to Vercel Analytics if available
    if (typeof window !== 'undefined' && (window as Window & { vercelAnalytics?: unknown }).vercelAnalytics) {
      // Access Vercel Analytics - type assertion needed for external API
      (window as Window & { vercelAnalytics?: { track: (name: string, data: Record<string, unknown>) => void } }).vercelAnalytics?.track?.(metric.name, {
        value: metric.value,
        rating: metric.rating,
      });
    }
  }, []);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Report Core Web Vitals
    reportLCP(reportMetric);
    reportFID(reportMetric);
    reportCLS(reportMetric);
    reportFCP(reportMetric);
    reportTTFB(reportMetric);
    reportINP(reportMetric);

    // Report resource loading performance
    const reportResources = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter((r) => r.duration > 1000);

      if (slowResources.length > 0 && process.env.NODE_ENV === 'development') {
        console.warn('[Performance] Slow resources:', slowResources.map((r) => ({ name: r.name, duration: r.duration })));
      }
    };

    // Report after page load
    window.addEventListener('load', () => {
      setTimeout(reportResources, 0);
    });

    // Cleanup
    return () => {
      // Observers are automatically disconnected when navigating away
    };
  }, [reportMetric]);

  return <>{children}</>;
}

// Performance hook for components
export function usePerformance() {
  const measure = useCallback((name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
    }
  }, []);

  const mark = useCallback((name: string) => {
    performance.mark(name);
  }, []);

  const measureMarks = useCallback((startMark: string, endMark: string, metricName: string) => {
    try {
      performance.measure(metricName, startMark, endMark);
      const entries = performance.getEntriesByName(metricName);
      const lastEntry = entries[entries.length - 1];

      if (lastEntry && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`[Performance] ${metricName}: ${lastEntry.duration.toFixed(2)}ms`);
      }
    } catch {
      // Ignore if marks don't exist
    }
  }, []);

  return { measure, mark, measureMarks };
}
