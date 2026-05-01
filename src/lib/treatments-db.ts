/**
 * Database layer for treatments using Prisma
 * React Server Component compatible
 * Falls back to static data when database is unavailable
 */

import { cache } from 'react';
import { db } from '@/lib/db';
import { baseTreatmentCategories } from '@/data/treatments';

// Cached function to get treatment categories by locale
export const getTreatmentCategoriesByLocale = cache(async (locale: string) => {
  try {
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
  } catch {
    // Fallback to static data when database is not available
    return getStaticCategories(locale);
  }
});

// Fallback function using static data
function getStaticCategories(_locale: string) {
  return baseTreatmentCategories.map((category) => ({
    slug: category.slug,
    image: category.image,
    name: category.name,
    description: category.description,
    treatments: category.treatments.map((treatment) => ({
      slug: treatment.slug,
      image: treatment.image,
      price: treatment.price,
      duration: treatment.duration,
      name: treatment.name,
      description: treatment.description,
      shortDescription: treatment.shortDescription,
      howItWorks: treatment.howItWorks,
      aftercare: treatment.aftercare,
      benefits: treatment.benefits || [],
      faqs: treatment.faqs || [],
    })),
  }));
}

// Cached function to get all treatment slugs (for generateStaticParams)
export const getAllTreatmentSlugs = cache(async () => {
  try {
    const treatments = await db.treatment.findMany({
      where: { active: true },
      select: { slug: true },
    });
    return treatments.map((t) => t.slug);
  } catch {
    // Fallback to static data slugs when database is not available
    return baseTreatmentCategories.flatMap((cat) => 
      cat.treatments.map((t) => t.slug)
    );
  }
});

// Cached function to get all category slugs (for generateStaticParams)
export const getAllCategorySlugs = cache(async () => {
  try {
    const categories = await db.treatmentCategory.findMany({
      where: { active: true },
      select: { slug: true },
    });
    return categories.map((c) => c.slug);
  } catch {
    // Fallback to static category slugs when database is not available
    return baseTreatmentCategories.map((c) => c.slug);
  }
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

  if (!treatment) {
    // Fallback to static data
    return getStaticTreatmentBySlug(slug);
  }

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

// Fallback function to get treatment from static data
function getStaticTreatmentBySlug(slug: string) {
  for (const category of baseTreatmentCategories) {
    const treatment = category.treatments.find((t) => t.slug === slug);
    if (treatment) {
      return {
        slug: treatment.slug,
        image: treatment.image,
        price: treatment.price,
        duration: treatment.duration,
        name: treatment.name,
        description: treatment.description,
        shortDescription: treatment.shortDescription,
        howItWorks: treatment.howItWorks,
        aftercare: treatment.aftercare,
        benefits: treatment.benefits || [],
        faqs: treatment.faqs || [],
        category: {
          slug: category.slug,
          name: category.name,
        },
      };
    }
  }
  return null;
}

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

  if (!category) {
    // Fallback to static data
    return getStaticCategoryBySlug(slug);
  }

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

// Fallback function to get category from static data
function getStaticCategoryBySlug(slug: string) {
  const category = baseTreatmentCategories.find((c) => c.slug === slug);
  if (!category) return null;

  return {
    slug: category.slug,
    image: category.image,
    name: category.name,
    description: category.description,
    treatments: category.treatments.map((treatment) => ({
      slug: treatment.slug,
      image: treatment.image,
      price: treatment.price,
      duration: treatment.duration,
      name: treatment.name,
      description: treatment.description,
      shortDescription: treatment.shortDescription,
    })),
  };
}

// Cached function to get category by treatment slug
export const getCategoryByTreatmentSlug = cache(async (treatmentSlug: string, _locale: string) => {
  const treatment = await db.treatment.findUnique({
    where: { slug: treatmentSlug },
    include: {
      category: {
        include: {
          translations: {
            where: { locale: _locale },
            take: 1,
          },
          treatments: {
            where: { active: true },
            orderBy: { sortOrder: 'asc' },
            include: {
              translations: {
                where: { locale: _locale },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!treatment) {
    // Fallback to static data
    return getStaticCategoryByTreatmentSlug(treatmentSlug);
  }

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

// Fallback function to get category by treatment slug from static data
function getStaticCategoryByTreatmentSlug(treatmentSlug: string) {
  for (const category of baseTreatmentCategories) {
    const treatment = category.treatments.find((t) => t.slug === treatmentSlug);
    if (treatment) {
      return {
        slug: category.slug,
        image: category.image,
        name: category.name,
        description: category.description,
        treatments: category.treatments.map((t) => ({
          slug: t.slug,
          image: t.image,
          price: t.price,
          duration: t.duration,
          name: t.name,
          description: t.description,
          shortDescription: t.shortDescription,
        })),
      };
    }
  }
  return null;
}
