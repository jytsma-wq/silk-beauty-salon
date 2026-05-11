/**
 * Dynamic Sitemap Generation
 * Generates locale-specific sitemaps with proper hreflang
 */

import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const defaultLocale = 'en';

// Static routes that exist in all locales
const STATIC_ROUTES = [
  '',
  '/about',
  '/conditions',
  '/results',
  '/team',
  '/contact',
  '/faq',
  '/press',
  '/blog',
  '/accessibility',
  '/privacy',
  '/terms',
];

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

/**
 * Generate sitemap entries for all locales
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://silkbeautysalon.com';
  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each static route in each locale
  for (const route of STATIC_ROUTES) {
    const routeEntries: SitemapEntry[] = [];
    const alternates: Record<string, string> = {};

    // Build alternates for all locales + x-default
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${route}`;
      alternates[locale] = url;
    }
    // Add x-default pointing to default locale
    alternates['x-default'] = `${baseUrl}/${defaultLocale}${route}`;

    // Create entry for each locale with alternates
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${route}`;
      
      // Determine change frequency based on route
      const changeFrequency = route === '/blog' ? 'weekly' : 
                             route === '' ? 'daily' : 'monthly';
      
      // Determine priority based on route depth and importance
      const priority = route === '' ? 1.0 :
                      route === '/about' ? 0.8 :
                      route === '/contact' ? 0.8 :
                      0.6;

      const entry: SitemapEntry = {
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: alternates,
        },
      };

      routeEntries.push(entry);
    }

    entries.push(...routeEntries);
  }

  return entries;
}
