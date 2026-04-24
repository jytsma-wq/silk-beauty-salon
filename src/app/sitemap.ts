import { MetadataRoute } from 'next';
import { baseTreatmentCategories } from '@/data/treatments';
import { getAllBlogSlugs } from '@/data/blog';

const BASE = 'https://www.silkbeauty.ge';
const LOCALES = ['en','ka','ru','tr','ar','he'];
const PAGES = [
  '','/about','/treatments','/conditions',
  '/pricelist','/offers','/before-after',
  '/blog','/faq','/contact-us','/gallery',
  '/careers','/media-press',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Generate static page URLs
  const staticPages = LOCALES.flatMap(locale =>
    PAGES.map(page => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  // Generate treatment URLs
  const treatmentPages = LOCALES.flatMap(locale =>
    baseTreatmentCategories.flatMap(category =>
      category.treatments.map(treatment => ({
        url: `${BASE}/${locale}/treatments/${category.slug}/${treatment.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as 'daily' | 'weekly' | 'monthly',
        priority: 0.7,
      }))
    )
  );

  // Generate blog URLs
  const blogSlugs = await getAllBlogSlugs();
  const blogPages = LOCALES.flatMap(locale =>
    blogSlugs.map(slug => ({
      url: `${BASE}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
      priority: 0.6,
    }))
  );

  return [...staticPages, ...treatmentPages, ...blogPages];
}
