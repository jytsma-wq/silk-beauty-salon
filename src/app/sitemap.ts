import { MetadataRoute } from 'next';
import { baseTreatmentCategories } from '@/data/treatments';
import { locales } from '@/i18n';
import { db } from '@/lib/db';

const BASE = 'https://www.silkbeauty.ge';
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

  // Fetch real treatment update timestamps from database
  const treatmentUpdates = await db.treatment.findMany({
    select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
  });

  const treatmentUpdateMap = new Map(
    treatmentUpdates.map(t => [`${t.category.slug}/${t.slug}`, t.updatedAt])
  );

  // Generate treatment URLs with real timestamps
  const treatmentPages = LOCALES.flatMap(locale =>
    baseTreatmentCategories.flatMap(category =>
      category.treatments.map(treatment => {
        const key = `${category.slug}/${treatment.slug}`;
        return {
          url: `${BASE}/${locale}/treatments/${key}`,
          lastModified: treatmentUpdateMap.get(key) ?? BUILD_TIME,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      })
    )
  );

  // Fetch blog posts with real timestamps from database
  const blogPosts = await db.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  // Generate blog URLs with real timestamps
  const blogPages = LOCALES.flatMap(locale =>
    blogPosts.map(post => ({
      url: `${BASE}/${locale}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...treatmentPages, ...blogPages];
}
