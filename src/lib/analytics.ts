/**
 * Analytics Utilities for Silk Beauty Salon
 * 
 * This module provides type-safe tracking functions for:
 * - Google Analytics 4 (GA4)
 * - Google Tag Manager (GTM)
 * - Facebook Pixel
 * 
 * Usage:
 * 1. Set environment variables in .env:
 *    - NEXT_PUBLIC_GA_ID (e.g., G-XXXXXXXXXX)
 *    - NEXT_PUBLIC_GTM_ID (e.g., GTM-XXXXXXX)
 *    - NEXT_PUBLIC_FB_PIXEL_ID
 * 
 * 2. Import and call tracking functions as needed
 */

// Analytics configuration - values are injected at runtime by AnalyticsScripts component
// The actual env vars are accessed in AnalyticsScripts.tsx which runs client-side
export const ANALYTICS_CONFIG = {
  // These will be populated by the AnalyticsScripts component
  gaId: '',
  gtmId: '',
  fbPixelId: '',
} as const;

// Initialize analytics config from window (called by AnalyticsScripts)
export function initAnalyticsConfig(config: { gaId?: string; gtmId?: string; fbPixelId?: string }) {
  Object.assign(ANALYTICS_CONFIG, config);
}

// Check if analytics is enabled
export const isAnalyticsEnabled = () => {
  return Boolean(ANALYTICS_CONFIG.gaId || ANALYTICS_CONFIG.gtmId);
};

// GA4 Event Types
export type GAEventName = 
  | 'page_view'
  | 'book_consultation'
  | 'contact_form_submit'
  | 'newsletter_subscribe'
  | 'view_treatment'
  | 'view_condition'
  | 'click_phone'
  | 'click_email'
  | 'click_whatsapp'
  | 'click_social'
  | 'search'
  | 'language_change';

export interface GAEvent {
  event_name: GAEventName;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | undefined;
}

// Push event to dataLayer (GTM)
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Track a page view
 */
export function trackPageView(url: string, locale?: string) {
  if (typeof window === 'undefined') return;

  // GA4
  if (window.gtag && ANALYTICS_CONFIG.gaId) {
    window.gtag('config', ANALYTICS_CONFIG.gaId, {
      page_path: url,
      language: locale,
    });
  }

  // GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
      language: locale,
    });
  }

  // Facebook Pixel
  if (window.fbq && ANALYTICS_CONFIG.fbPixelId) {
    window.fbq('track', 'PageView');
  }
}

/**
 * Track a custom event
 */
export function trackEvent(event: GAEvent) {
  if (typeof window === 'undefined') return;

  const { event_name, event_category, event_label, value, ...rest } = event;

  // GA4
  if (window.gtag && ANALYTICS_CONFIG.gaId) {
    window.gtag('event', event_name, {
      event_category,
      event_label,
      value,
      ...rest,
    });
  }

  // GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: event_name,
      event_category: event_category,
      event_label: event_label,
      value: value,
      ...rest,
    });
  }
}

/**
 * Track a conversion (for Facebook Pixel and GA4)
 */
export function trackConversion(conversionType: 'booking' | 'contact' | 'newsletter', value?: number) {
  if (typeof window === 'undefined') return;

  // Facebook Pixel Standard Events
  if (window.fbq && ANALYTICS_CONFIG.fbPixelId) {
    switch (conversionType) {
      case 'booking':
        window.fbq('track', 'Schedule', { value, currency: 'GEL' });
        break;
      case 'contact':
        window.fbq('track', 'Contact');
        break;
      case 'newsletter':
        window.fbq('track', 'CompleteRegistration');
        break;
    }
  }

  // GA4
  if (window.gtag && ANALYTICS_CONFIG.gaId) {
    window.gtag('event', 'conversion', {
      conversion_type: conversionType,
      value,
    });
  }
}

/**
 * Track booking intent
 */
export function trackBookingIntent(treatment?: string, practitioner?: string) {
  trackEvent({
    event_name: 'book_consultation',
    event_category: 'engagement',
    event_label: treatment,
    treatment,
    practitioner,
  });
  trackConversion('booking');
}

/**
 * Track contact form submission
 */
export function trackContactForm(source: string) {
  trackEvent({
    event_name: 'contact_form_submit',
    event_category: 'engagement',
    event_label: source,
    form_source: source,
  });
  trackConversion('contact');
}

/**
 * Track newsletter subscription
 */
export function trackNewsletterSubscription(source: string) {
  trackEvent({
    event_name: 'newsletter_subscribe',
    event_category: 'engagement',
    event_label: source,
    form_source: source,
  });
  trackConversion('newsletter');
}

/**
 * Track treatment view
 */
export function trackTreatmentView(treatmentName: string, category: string) {
  trackEvent({
    event_name: 'view_treatment',
    event_category: 'content',
    event_label: treatmentName,
    treatment_name: treatmentName,
    treatment_category: category,
  });
}

/**
 * Track condition view
 */
export function trackConditionView(conditionName: string) {
  trackEvent({
    event_name: 'view_condition',
    event_category: 'content',
    event_label: conditionName,
    condition_name: conditionName,
  });
}

/**
 * Track click on contact method
 */
export function trackContactClick(method: 'phone' | 'email' | 'whatsapp') {
  trackEvent({
    event_name: `click_${method}` as GAEventName,
    event_category: 'contact',
    event_label: method,
  });
}

/**
 * Track social media click
 */
export function trackSocialClick(platform: 'instagram' | 'facebook' | 'tiktok') {
  trackEvent({
    event_name: 'click_social',
    event_category: 'engagement',
    event_label: platform,
    social_platform: platform,
  });
}

/**
 * Track language change
 */
export function trackLanguageChange(fromLocale: string, toLocale: string) {
  trackEvent({
    event_name: 'language_change',
    event_category: 'navigation',
    event_label: toLocale,
    from_language: fromLocale,
    to_language: toLocale,
  });
}

/**
 * Track search
 */
export function trackSearch(query: string, resultsCount?: number) {
  trackEvent({
    event_name: 'search',
    event_category: 'engagement',
    event_label: query,
    search_term: query,
    results_count: resultsCount,
  });
}
