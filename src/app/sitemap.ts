import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const BASE = 'https://www.silkbeautysalon.online';
const LOCALES = [...locales];
const PAGES = [
  '','/about','/treatments','/conditions',
  '/pricelist','/offers','/before-after',
  '/blog','/faq','/contact-us','/book',
  '/consultation','/international-clients',
  '/privacy-policy','/terms-conditions',
  '/careers','/media-press',
];

// Reflects when this build was deployed — static pages "changed" at deploy time
const BUILD_TIME = new Date(process.env.BUILD_TIMESTAMP || Date.now());

// Revalidate sitemap at most once per hour to reduce DB load
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Generate static page URLs with build time
  const staticPages = LOCALES.flatMap(locale =>
    PAGES.map(page => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: BUILD_TIME,
      changeFrequency: (page === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  return staticPages;
}
