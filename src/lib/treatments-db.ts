/**
 * Database layer for treatments using Prisma
 * React Server Component compatible
 */

import { cache } from 'react';
import { db } from '@/lib/db';

// Cached function to get treatment categories by locale
export const getTreatmentCategoriesByLocale = cache(async (locale: string) => {
  const categories = await db.treatmentCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      translations: {
        where: { locale },
        take: 1,
      },
      treatments: {
        where: { active: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          translations: {
            where: { locale },
            take: 1,
          },
          benefits: {
            where: { locale },
            orderBy: { sortOrder: 'asc' },
          },
          faqs: {
            where: { locale },
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  });

  // Transform to the format expected by components
  return categories.map((category) => ({
    slug: category.slug,
    image: category.image,
    name: category.translations[0]?.name ?? category.slug,
    description: category.translations[0]?.description ?? '',
    treatments: category.treatments.map((treatment) => ({
      slug: treatment.slug,
      image: treatment.image,
      price: treatment.price,
      duration: treatment.duration,
      name: treatment.translations[0]?.name ?? treatment.slug,
      description: treatment.translations[0]?.description ?? '',
      shortDescription: treatment.translations[0]?.shortDescription ?? '',
      howItWorks: treatment.translations[0]?.howItWorks,
      aftercare: treatment.translations[0]?.aftercare,
      benefits: treatment.benefits.map((b) => b.text),
      faqs: treatment.faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
    })),
  }));
});

// Cached function to get all treatment slugs (for generateStaticParams)
export const getAllTreatmentSlugs = cache(async () => {
  const treatments = await db.treatment.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return treatments.map((t) => t.slug);
});

// Cached function to get all category slugs (for generateStaticParams)
export const getAllCategorySlugs = cache(async () => {
  const categories = await db.treatmentCategory.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return categories.map((c) => c.slug);
});

// Cached function to get single treatment by slug
export const getTreatmentBySlug = cache(async (slug: string, locale: string) => {
  const treatment = await db.treatment.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
        take: 1,
      },
      benefits: {
        where: { locale },
        orderBy: { sortOrder: 'asc' },
      },
      faqs: {
        where: { locale },
        orderBy: { sortOrder: 'asc' },
      },
      category: {
        include: {
          translations: {
            where: { locale },
            take: 1,
          },
        },
      },
    },
  });

  if (!treatment) return null;

  return {
    slug: treatment.slug,
    image: treatment.image,
    price: treatment.price,
    duration: treatment.duration,
    name: treatment.translations[0]?.name ?? treatment.slug,
    description: treatment.translations[0]?.description ?? '',
    shortDescription: treatment.translations[0]?.shortDescription ?? '',
    howItWorks: treatment.translations[0]?.howItWorks,
    aftercare: treatment.translations[0]?.aftercare,
    benefits: treatment.benefits.map((b) => b.text),
    faqs: treatment.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
    category: {
      slug: treatment.category.slug,
      name: treatment.category.translations[0]?.name ?? treatment.category.slug,
    },
  };
});

// Cached function to get category by slug
export const getCategoryBySlug = cache(async (slug: string, locale: string) => {
  const category = await db.treatmentCategory.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
        take: 1,
      },
      treatments: {
        where: { active: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          translations: {
            where: { locale },
            take: 1,
          },
        },
      },
    },
  });

  if (!category) return null;

  return {
    slug: category.slug,
    image: category.image,
    name: category.translations[0]?.name ?? category.slug,
    description: category.translations[0]?.description ?? '',
    treatments: category.treatments.map((treatment) => ({
      slug: treatment.slug,
      image: treatment.image,
      price: treatment.price,
      duration: treatment.duration,
      name: treatment.translations[0]?.name ?? treatment.slug,
      description: treatment.translations[0]?.description ?? '',
      shortDescription: treatment.translations[0]?.shortDescription ?? '',
    })),
  };
});

// Cached function to get category by treatment slug
export const getCategoryByTreatmentSlug = cache(async (treatmentSlug: string, locale: string) => {
  const treatment = await db.treatment.findUnique({
    where: { slug: treatmentSlug },
    include: {
      category: {
        include: {
          translations: {
            where: { locale },
            take: 1,
          },
          treatments: {
            where: { active: true },
            orderBy: { sortOrder: 'asc' },
            include: {
              translations: {
                where: { locale },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!treatment) return null;

  return {
    slug: treatment.category.slug,
    image: treatment.category.image,
    name: treatment.category.translations[0]?.name ?? treatment.category.slug,
    description: treatment.category.translations[0]?.description ?? '',
    treatments: treatment.category.treatments.map((t) => ({
      slug: t.slug,
      image: t.image,
      price: t.price,
      duration: t.duration,
      name: t.translations[0]?.name ?? t.slug,
      description: t.translations[0]?.description ?? '',
      shortDescription: t.translations[0]?.shortDescription ?? '',
    })),
  };
});
