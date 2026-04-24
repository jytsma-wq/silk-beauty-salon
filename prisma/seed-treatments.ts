#!/usr/bin/env tsx
/**
 * Seed script to migrate treatment data from treatments.ts to Prisma database
 */

import { PrismaClient } from '@prisma/client';
import { baseTreatmentCategories } from '../src/data/treatments';

const prisma = new PrismaClient();

const SUPPORTED_LOCALES = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];

async function main() {
  console.log('🌱 Starting treatment data seed...\n');

  let categoryCount = 0;
  let treatmentCount = 0;

  for (const category of baseTreatmentCategories) {
    // Create the base category
    const createdCategory = await prisma.treatmentCategory.create({
      data: {
        slug: category.slug,
        image: category.image,
        sortOrder: categoryCount,
        active: true,
        // Create English translation from the source data
        translations: {
          create: {
            locale: 'en',
            name: category.name,
            description: category.description,
          },
        },
      },
    });

    console.log(`✅ Created category: ${category.name} (${category.slug})`);
    categoryCount++;

    // Create treatments for this category
    for (let i = 0; i < category.treatments.length; i++) {
      const treatment = category.treatments[i];

      const createdTreatment = await prisma.treatment.create({
        data: {
          slug: treatment.slug,
          image: treatment.image,
          price: treatment.price,
          duration: treatment.duration,
          sortOrder: i,
          active: true,
          categoryId: createdCategory.id,
          // Create English translation
          translations: {
            create: {
              locale: 'en',
              name: treatment.name,
              description: treatment.description,
              shortDescription: treatment.shortDescription,
              howItWorks: treatment.howItWorks,
              aftercare: treatment.aftercare,
            },
          },
          // Create benefits
          benefits: treatment.benefits
            ? {
                create: treatment.benefits.map((text, idx) => ({
                  locale: 'en',
                  text,
                  sortOrder: idx,
                })),
              }
            : undefined,
          // Create FAQs
          faqs: treatment.faqs
            ? {
                create: treatment.faqs.map((faq, idx) => ({
                  locale: 'en',
                  question: faq.question,
                  answer: faq.answer,
                  sortOrder: idx,
                })),
              }
            : undefined,
        },
      });

      console.log(`   └─ Treatment: ${treatment.name} (${treatment.slug})`);
      treatmentCount++;
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Categories: ${categoryCount}`);
  console.log(`   Treatments: ${treatmentCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
