// Analytics configuration and tracking utilities
// These functions work with Google Analytics 4, GTM, and Facebook Pixel

interface AnalyticsConfig {
  gaId?: string
  gtmId?: string
  fbPixelId?: string
}

let config: AnalyticsConfig = {}

/**
 * Initialize analytics configuration with actual IDs from environment
 * Called by AnalyticsScripts after scripts load
 */
export function initAnalyticsConfig(newConfig: AnalyticsConfig) {
  config = { ...config, ...newConfig }
}

/**
 * Check if analytics is properly configured
 */
export function isAnalyticsInitialized(): boolean {
  return !!(config.gaId || config.gtmId || config.fbPixelId)
}

// ============================================================================
// Google Analytics 4 Tracking
// ============================================================================

/**
 * Track a custom event with GA4
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  
  // Check if gtag is available
  if (window.gtag && config.gaId) {
    window.gtag('event', eventName, params)
  }
  
  // Also push to dataLayer for GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params
    })
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') return
  
  if (window.gtag && config.gaId) {
    window.gtag('config', config.gaId, {
      page_path: path,
      page_title: title
    })
  }
}

/**
 * Track language change
 */
export function trackLanguageChange(fromLocale: string, toLocale: string) {
  trackEvent('language_change', {
    from_language: fromLocale,
    to_language: toLocale
  })
}

/**
 * Track contact click (WhatsApp, phone, email)
 */
export function trackContactClick(type: 'whatsapp' | 'phone' | 'email' | 'form') {
  trackEvent('contact_click', { type })
}

/**
 * Track newsletter subscription
 */
export function trackNewsletterSubscription(source: string) {
  trackEvent('newsletter_subscribe', { source })
}

/**
 * Track booking click
 */
export function trackBookingClick(source: string) {
  trackEvent('booking_click', { source })
}

/**
 * Track treatment view
 */
export function trackTreatmentView(treatmentSlug: string, treatmentName: string) {
  trackEvent('treatment_view', {
    treatment_slug: treatmentSlug,
    treatment_name: treatmentName
  })
}

/**
 * Track treatment category view
 */
export function trackCategoryView(categorySlug: string, categoryName: string) {
  trackEvent('category_view', {
    category_slug: categorySlug,
    category_name: categoryName
  })
}

// ============================================================================
// Facebook Pixel Tracking
// ============================================================================

/**
 * Track Facebook Pixel event
 */
export function trackFacebookEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  
  if (window.fbq && config.fbPixelId) {
    window.fbq('track', eventName, params)
  }
}

/**
 * Track contact event for Facebook
 */
export function trackFacebookContact(method: string) {
  trackFacebookEvent('Contact', { method })
}

/**
 * Track lead event for Facebook (newsletter, booking intent)
 */
export function trackFacebookLead(source: string) {
  trackFacebookEvent('Lead', { source })
}

// ============================================================================
// E-commerce / Conversion Tracking
// ============================================================================

/**
 * Track begin checkout (booking intent)
 */
export function trackBeginCheckout(value?: number, currency: string = 'GEL') {
  trackEvent('begin_checkout', { value, currency })
  trackFacebookEvent('InitiateCheckout', { value, currency })
}

// ============================================================================
// Type declarations for global window objects
// ============================================================================

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      target: string,
      params?: Record<string, unknown>
    ) => void
    dataLayer?: Record<string, unknown>[]
    fbq?: (
      command: 'track' | 'trackCustom',
      event: string,
      params?: Record<string, unknown>
    ) => void
    _fbq?: Window['fbq']
  }
}

export { config as ANALYTICS_CONFIG }
