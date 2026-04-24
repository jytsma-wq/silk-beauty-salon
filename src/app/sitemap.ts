import { MetadataRoute } from 'next';
const BASE = 'https://www.silkbeauty.ge';
const LOCALES = ['en','ka','ru','tr','ar','he'];
const PAGES = [
  '','/about','/treatments','/conditions',
  '/pricelist','/offers','/before-after',
  '/blog','/faq','/contact-us','/gallery',
  '/careers','/media-press',
];
export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap(locale =>
    PAGES.map(page => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );
}
