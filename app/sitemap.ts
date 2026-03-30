import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const baseUrl = 'https://silkbeautybatumi.ge';
const locales = ['en', 'ka', 'ru', 'he', 'ar', 'tr'];
const defaultLocale = 'en';

// Static routes for all locales
const staticRoutes = [
  '',
  '/treatments',
  '/specialists',
  '/about',
  '/contact',
  '/international',
  '/legal/terms',
  '/legal/privacy',
  '/legal/cookies',
];

// Change frequency and priority mapping
const routeConfig: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = {
  '': { changeFrequency: 'daily', priority: 1.0 },
  '/treatments': { changeFrequency: 'weekly', priority: 0.9 },
  '/specialists': { changeFrequency: 'weekly', priority: 0.8 },
  '/about': { changeFrequency: 'monthly', priority: 0.7 },
  '/contact': { changeFrequency: 'monthly', priority: 0.8 },
  '/international': { changeFrequency: 'weekly', priority: 0.8 },
  '/legal/terms': { changeFrequency: 'yearly', priority: 0.3 },
  '/legal/privacy': { changeFrequency: 'yearly', priority: 0.3 },
  '/legal/cookies': { changeFrequency: 'yearly', priority: 0.3 },
};

interface Treatment {
  slug: { current: string };
  _updatedAt: string;
}

async function getTreatments(): Promise<Treatment[]> {
  try {
    return await client.fetch(
      groq`*[_type == "treatment" && defined(slug.current)] | order(_updatedAt desc) {
        slug,
        _updatedAt
      }`
    );
  } catch (error) {
    console.error('Error fetching treatments for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const treatments = await getTreatments();
  const currentDate = new Date();

  // Generate static routes for all locales
  const staticEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      const config = routeConfig[route];
      const url = locale === defaultLocale 
        ? `${baseUrl}${route}` 
        : `${baseUrl}/${locale}${route}`;

      staticEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: config.changeFrequency,
        priority: config.priority,
      });
    }
  }

  // Generate dynamic treatment routes
  const treatmentEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const treatment of treatments) {
      const url = locale === defaultLocale
        ? `${baseUrl}/treatments/${treatment.slug.current}`
        : `${baseUrl}/${locale}/treatments/${treatment.slug.current}`;

      treatmentEntries.push({
        url,
        lastModified: new Date(treatment._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return [...staticEntries, ...treatmentEntries];
}
