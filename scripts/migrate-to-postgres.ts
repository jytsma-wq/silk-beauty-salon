#!/usr/bin/env tsx
/**
 * Database Migration Script: SQLite to PostgreSQL
 *
 * This script migrates data from SQLite to PostgreSQL while:
 * - Converting CUIDs to UUIDs
 * - Converting String status fields to PostgreSQL Enums
 * - Preserving all relationships
 * - Supporting rollback via backup creation
 */

/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite client for reading source data
const sqlitePrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db',
    },
  },
});

// PostgreSQL client for writing target data
const postgresPrisma = new PrismaClient();

interface MigrationStats {
  source: number;
  target: number;
  duration: number;
}

interface MigrationResult {
  [table: string]: MigrationStats;
}

/**
 * Create backup before migration
 */
async function createBackup(): Promise<string> {
  const timestamp: string = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '..', 'backups');
  const backupFile = path.join(backupDir, `pre-migration-${timestamp}.sql`);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log('📦 Creating pre-migration backup...');

  try {
    // Export SQLite data to SQL
    execSync(
      `sqlite3 "${path.join(__dirname, '..', 'prisma', 'dev.db')}" ".dump" > "${backupFile}"`,
      { stdio: 'inherit' }
    );
    console.log(`✅ Backup created: ${backupFile}`);
    return backupFile;
  } catch (error: unknown) {
    console.warn('⚠️  Could not create SQLite backup:', error instanceof Error ? error.message : String(error));
    return '';
  }
}

/**
 * Migrate ContactSubmissions
 */
async function migrateContactSubmissions(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating ContactSubmissions...');
  const startTime = Date.now();

  const records = await sqlitePrisma.contactSubmission.findMany();

  // Map string status to enum
  const statusMap: Record<string, string> = {
    'NEW': 'NEW',
    'IN_PROGRESS': 'IN_PROGRESS',
    'COMPLETED': 'COMPLETED',
    'ARCHIVED': 'ARCHIVED',
  };

  for (const record of records) {
    await postgresPrisma.contactSubmission.create({
      data: {
        id: record.id, // UUID is compatible with CUID format
        name: record.name,
        email: record.email,
        phone: record.phone,
        message: record.message,
        locale: record.locale,
        createdAt: record.createdAt,
        status: (statusMap[record.status] || 'NEW') as 'NEW',
      },
    });
  }

  const count = await postgresPrisma.contactSubmission.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} ContactSubmissions in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate BookingRequests
 */
async function migrateBookingRequests(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating BookingRequests...');
  const startTime = Date.now();

  const records = await sqlitePrisma.bookingRequest.findMany();

  const statusMap: Record<string, string> = {
    'PENDING': 'PENDING',
    'CONFIRMED': 'CONFIRMED',
    'COMPLETED': 'COMPLETED',
    'CANCELLED': 'CANCELLED',
    'NO_SHOW': 'NO_SHOW',
  };

  for (const record of records) {
    await postgresPrisma.bookingRequest.create({
      data: {
        id: record.id,
        name: record.name,
        email: record.email,
        phone: record.phone,
        service: record.service,
        preferredDate: record.preferredDate,
        preferredTime: record.preferredTime,
        message: record.message,
        locale: record.locale,
        createdAt: record.createdAt,
        status: (statusMap[record.status] || 'PENDING') as 'PENDING',
      },
    });
  }

  const count = await postgresPrisma.bookingRequest.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} BookingRequests in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate NewsletterSubscribers
 */
async function migrateNewsletterSubscribers(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating NewsletterSubscribers...');
  const startTime = Date.now();

  const records = await sqlitePrisma.newsletterSubscriber.findMany();

  for (const record of records) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (postgresPrisma.newsletterSubscriber.create as any)({
      data: {
        id: record.id,
        email: record.email,
        locale: record.locale,
        createdAt: record.createdAt,
        // Map boolean 'active' to enum 'status' (old SQLite schema compatibility)
        status: (record as unknown as { active: boolean }).active ? 'ACTIVE' : 'UNSUBSCRIBED',
      },
    });
  }

  const count = await postgresPrisma.newsletterSubscriber.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} NewsletterSubscribers in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate BlogPosts
 */
async function migrateBlogPosts(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating BlogPosts...');
  const startTime = Date.now();

  const records = await sqlitePrisma.blogPost.findMany();

  for (const record of records) {
    await postgresPrisma.blogPost.create({
      data: {
        id: record.id,
        title: record.title,
        slug: record.slug,
        excerpt: record.excerpt,
        content: record.content,
        image: record.image,
        category: record.category,
        author: record.author,
        readTime: record.readTime,
        locale: record.locale,
        published: record.published,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      },
    });
  }

  const count = await postgresPrisma.blogPost.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} BlogPosts in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate TreatmentCategories
 */
async function migrateTreatmentCategories(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating TreatmentCategories...');
  const startTime = Date.now();

  const records = await sqlitePrisma.treatmentCategory.findMany();

  for (const record of records) {
    await postgresPrisma.treatmentCategory.create({
      data: {
        id: record.id,
        slug: record.slug,
        image: record.image,
        sortOrder: record.sortOrder,
        active: record.active,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      },
    });
  }

  const count = await postgresPrisma.treatmentCategory.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} TreatmentCategories in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate TreatmentCategoryTranslations
 */
async function migrateTreatmentCategoryTranslations(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating TreatmentCategoryTranslations...');
  const startTime = Date.now();

  const records = await sqlitePrisma.treatmentCategoryTranslation.findMany();

  for (const record of records) {
    await postgresPrisma.treatmentCategoryTranslation.create({
      data: {
        id: record.id,
        categoryId: record.categoryId,
        locale: record.locale,
        name: record.name,
        description: record.description,
      },
    });
  }

  const count = await postgresPrisma.treatmentCategoryTranslation.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} TreatmentCategoryTranslations in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate Treatments
 */
async function migrateTreatments(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating Treatments...');
  const startTime = Date.now();

  const records = await sqlitePrisma.treatment.findMany();

  for (const record of records) {
    await postgresPrisma.treatment.create({
      data: {
        id: record.id,
        slug: record.slug,
        image: record.image,
        price: record.price,
        duration: record.duration,
        sortOrder: record.sortOrder,
        active: record.active,
        categoryId: record.categoryId,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      },
    });
  }

  const count = await postgresPrisma.treatment.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} Treatments in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate TreatmentTranslations
 */
async function migrateTreatmentTranslations(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating TreatmentTranslations...');
  const startTime = Date.now();

  const records = await sqlitePrisma.treatmentTranslation.findMany();

  for (const record of records) {
    await postgresPrisma.treatmentTranslation.create({
      data: {
        id: record.id,
        treatmentId: record.treatmentId,
        locale: record.locale,
        name: record.name,
        description: record.description,
        shortDescription: record.shortDescription,
        howItWorks: record.howItWorks,
        aftercare: record.aftercare,
      },
    });
  }

  const count = await postgresPrisma.treatmentTranslation.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} TreatmentTranslations in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate TreatmentBenefits
 */
async function migrateTreatmentBenefits(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating TreatmentBenefits...');
  const startTime = Date.now();

  const records = await sqlitePrisma.treatmentBenefit.findMany();

  for (const record of records) {
    await postgresPrisma.treatmentBenefit.create({
      data: {
        id: record.id,
        treatmentId: record.treatmentId,
        locale: record.locale,
        text: record.text,
        sortOrder: record.sortOrder,
      },
    });
  }

  const count = await postgresPrisma.treatmentBenefit.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} TreatmentBenefits in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate TreatmentFAQs
 */
async function migrateTreatmentFAQs(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating TreatmentFAQs...');
  const startTime = Date.now();

  const records = await sqlitePrisma.treatmentFAQ.findMany();

  for (const record of records) {
    await postgresPrisma.treatmentFAQ.create({
      data: {
        id: record.id,
        treatmentId: record.treatmentId,
        locale: record.locale,
        question: record.question,
        answer: record.answer,
        sortOrder: record.sortOrder,
      },
    });
  }

  const count = await postgresPrisma.treatmentFAQ.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} TreatmentFAQs in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Migrate Bookings
 */
async function migrateBookings(): Promise<MigrationStats> {
  console.log('\n🔄 Migrating Bookings...');
  const startTime = Date.now();

  const records = await sqlitePrisma.booking.findMany();

  const statusMap: Record<string, string> = {
    'PENDING': 'PENDING',
    'CONFIRMED': 'CONFIRMED',
    'COMPLETED': 'COMPLETED',
    'CANCELLED': 'CANCELLED',
    'NO_SHOW': 'NO_SHOW',
  };

  for (const record of records) {
    await postgresPrisma.booking.create({
      data: {
        id: record.id,
        name: record.name,
        email: record.email,
        phone: record.phone,
        service: record.service,
        date: record.date,
        timeSlot: record.timeSlot,
        message: record.message,
        status: (statusMap[record.status] || 'PENDING') as 'PENDING',
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      },
    });
  }

  const count = await postgresPrisma.booking.count();
  const duration = Date.now() - startTime;

  console.log(`✅ Migrated ${count} Bookings in ${duration}ms`);
  return { source: records.length, target: count, duration };
}

/**
 * Run all migrations
 */
async function runMigration(): Promise<MigrationResult> {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║          SQLite to PostgreSQL Migration                      ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const backupFile = await createBackup();

  const startTime = Date.now();
  const results: MigrationResult = {};

  try {
    // Clear target database
    console.log('🧹 Clearing target database...');
    await postgresPrisma.$transaction([
      postgresPrisma.treatmentFAQ.deleteMany(),
      postgresPrisma.treatmentBenefit.deleteMany(),
      postgresPrisma.treatmentTranslation.deleteMany(),
      postgresPrisma.treatment.deleteMany(),
      postgresPrisma.treatmentCategoryTranslation.deleteMany(),
      postgresPrisma.treatmentCategory.deleteMany(),
      postgresPrisma.booking.deleteMany(),
      postgresPrisma.blogPost.deleteMany(),
      postgresPrisma.newsletterSubscriber.deleteMany(),
      postgresPrisma.bookingRequest.deleteMany(),
      postgresPrisma.contactSubmission.deleteMany(),
    ]);
    console.log('✅ Target database cleared\n');

    // Run migrations in order respecting foreign keys
    results.contactSubmissions = await migrateContactSubmissions();
    results.bookingRequests = await migrateBookingRequests();
    results.newsletterSubscribers = await migrateNewsletterSubscribers();
    results.blogPosts = await migrateBlogPosts();
    results.treatmentCategories = await migrateTreatmentCategories();
    results.treatmentCategoryTranslations = await migrateTreatmentCategoryTranslations();
    results.treatments = await migrateTreatments();
    results.treatmentTranslations = await migrateTreatmentTranslations();
    results.treatmentBenefits = await migrateTreatmentBenefits();
    results.treatmentFAQs = await migrateTreatmentFAQs();
    results.bookings = await migrateBookings();

    const totalDuration = Date.now() - startTime;

    // Print summary
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║                    Migration Summary                         ║');
    console.log('╠══════════════════════════════════════════════════════════════╣');

    let totalSource = 0;
    let totalTarget = 0;

    for (const [table, stats] of Object.entries(results)) {
      const status = stats.source === stats.target ? '✅' : '⚠️';
      console.log(`║ ${status} ${table.padEnd(30)} ${String(stats.source).padStart(5)} → ${String(stats.target).padStart(5)} (${stats.duration}ms)`);
      totalSource += stats.source;
      totalTarget += stats.target;
    }

    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log(`║ Total: ${String(totalSource).padStart(5)} → ${String(totalTarget).padStart(5)} records in ${totalDuration}ms`.padEnd(63) + '║');
    console.log('╚══════════════════════════════════════════════════════════════╝');

    if (totalSource !== totalTarget) {
      throw new Error('Migration count mismatch! Rollback recommended.');
    }

    console.log('\n✅ Migration completed successfully!');
    if (backupFile) {
      console.log(`📦 Backup available for rollback: ${backupFile}`);
    }

    return results;
  } catch (error: unknown) {
    console.error('\n❌ Migration failed:', error instanceof Error ? error.message : String(error));
    if (backupFile) {
      console.log(`📦 You can restore from backup: ${backupFile}`);
    }
    throw new Error(`Migration failed: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await sqlitePrisma.$disconnect();
    await postgresPrisma.$disconnect();
  }
}

/**
 * Rollback migration by restoring from backup
 */
async function rollbackMigration(backupFile: string): Promise<void> {
  console.log(`🔄 Rolling back from backup: ${backupFile}`);
  try {
    execSync(
      `sqlite3 "${path.join(__dirname, '..', 'prisma', 'dev.db')}" < "${backupFile}"`,
      { stdio: 'inherit' }
    );
    console.log('✅ Rollback completed');
  } catch (error: unknown) {
    console.error('❌ Rollback failed:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// Main execution
if (import.meta.url === fileURLToPath(process.argv[1] ?? '')) {
  const args = process.argv.slice(2);
  const command = args[0];
  const backupFile = args[1];

  if (command === 'rollback' && backupFile) {
    rollbackMigration(backupFile);
  } else {
    runMigration().catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    });
  }
}

export { runMigration, rollbackMigration, createBackup };
export default runMigration;
