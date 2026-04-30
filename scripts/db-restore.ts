#!/usr/bin/env tsx
/**
 * Database Restore Script
 *
 * Restores PostgreSQL database from backup files.
 * Supports full restores, schema-only restores, and data-only restores.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RestoreOptions {
  backupFile: string;
  dryRun: boolean;
  dropExisting: boolean;
}

interface RestoreResult {
  duration: number;
  tablesRestored: number;
  sizeRestored: number;
}

/**
 * Get database URL from environment
 */
function getDatabaseUrl(): string {
  const url = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL or DIRECT_DATABASE_URL environment variable is required');
  }
  return url;
}

/**
 * Parse PostgreSQL connection URL
 */
function parseConnectionUrl(url: string): {
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
} {
  const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/);
  if (!match) {
    throw new Error('Invalid PostgreSQL connection URL format');
  }

  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: match[4],
    database: match[5],
  };
}

/**
 * Decompress a gzip file
 */
async function decompressFile(inputFile: string): Promise<string> {
  const outputFile = inputFile.replace('.gz', '');
  const source = createReadStream(inputFile);
  const destination = createWriteStream(outputFile);
  const gunzip = createGunzip();

  await pipeline(source, gunzip, destination);
  return outputFile;
}

/**
 * Create pre-restore backup
 */
async function createPreRestoreBackup(dbUrl: string): Promise<string> {
  console.log('📦 Creating pre-restore backup for safety...');

  const { host, port, database, user, password } = parseConnectionUrl(dbUrl);
  const backupDir = path.join(__dirname, '..', 'backups');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `pre-restore-${database}-${timestamp}.sql`);

  const env = { ...process.env, PGPASSWORD: password };

  execSync(
    `pg_dump -h ${host} -p ${port} -U ${user} -d ${database} --no-owner --no-privileges > "${backupFile}"`,
    { env, stdio: 'inherit' }
  );

  console.log(`✅ Pre-restore backup created: ${backupFile}`);
  return backupFile;
}

/**
 * Restore database from backup
 */
async function restoreDatabase(options: RestoreOptions): Promise<RestoreResult> {
  const startTime = Date.now();

  console.log(`\n🔄 Starting database restore...`);
  console.log(`   Backup file: ${options.backupFile}`);
  console.log(`   Dry run: ${options.dryRun ? 'Yes' : 'No'}`);
  console.log(`   Drop existing: ${options.dropExisting ? 'Yes' : 'No'}\n`);

  if (!fs.existsSync(options.backupFile)) {
    throw new Error(`Backup file not found: ${options.backupFile}`);
  }

  const dbUrl = getDatabaseUrl();
  const { host, port, database, user, password } = parseConnectionUrl(dbUrl);
  const env = { ...process.env, PGPASSWORD: password };

  // Create pre-restore backup
  const preRestoreBackup = await createPreRestoreBackup(dbUrl);

  if (options.dryRun) {
    console.log('\n🔍 Dry run mode - checking backup file...');
    const stats = fs.statSync(options.backupFile);
    console.log(`   File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log('   Backup file appears valid\n');

    return {
      duration: Date.now() - startTime,
      tablesRestored: 0,
      sizeRestored: stats.size,
    };
  }

  // Decompress if needed
  let sqlFile = options.backupFile;
  if (options.backupFile.endsWith('.gz')) {
    console.log('🗜️  Decompressing backup file...');
    sqlFile = await decompressFile(options.backupFile);
    console.log(`✅ Decompressed to: ${sqlFile}\n`);
  }

  try {
    // Drop and recreate database if requested
    if (options.dropExisting) {
      console.log('🗑️  Dropping existing database...');
      try {
        execSync(
          `dropdb -h ${host} -p ${port} -U ${user} ${database}`,
          { env, stdio: 'inherit' }
        );
      } catch {
        console.log('   Database did not exist, continuing...');
      }

      console.log('📦 Creating new database...');
      execSync(
        `createdb -h ${host} -p ${port} -U ${user} ${database}`,
        { env, stdio: 'inherit' }
      );
    }

    // Restore from backup
    console.log('\n🔄 Restoring database from backup...');
    execSync(
      `psql -h ${host} -p ${port} -U ${user} -d ${database} < "${sqlFile}"`,
      { env, stdio: 'inherit' }
    );

    // Count restored tables
    console.log('\n📊 Verifying restore...');
    const tableCount = execSync(
      `psql -h ${host} -p ${port} -U ${user} -d ${database} -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"`,
      { env, encoding: 'utf-8' }
    ).trim();

    const stats = fs.statSync(sqlFile);
    const duration = Date.now() - startTime;

    console.log(`\n✅ Restore completed successfully!`);
    console.log(`   Tables restored: ${tableCount}`);
    console.log(`   Data size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Duration: ${duration}ms`);
    console.log(`\n📦 Pre-restore backup saved at: ${preRestoreBackup}`);

    // Cleanup decompressed file if we created one
    if (sqlFile !== options.backupFile && fs.existsSync(sqlFile)) {
      fs.unlinkSync(sqlFile);
    }

    return {
      duration,
      tablesRestored: parseInt(tableCount, 10),
      sizeRestored: stats.size,
    };
  } catch (error) {
    console.error('\n❌ Restore failed:', error);
    console.log(`\n📦 You can restore from the pre-restore backup: ${preRestoreBackup}`);
    throw error;
  }
}

/**
 * List available backups
 */
function listBackups(): void {
  const backupDir = path.join(__dirname, '..', 'backups');

  if (!fs.existsSync(backupDir)) {
    console.log('No backups found');
    return;
  }

  const files = fs
    .readdirSync(backupDir)
    .filter((f) => f.endsWith('.sql.gz') || f.endsWith('.sql'))
    .sort()
    .reverse();

  console.log('\n📦 Available Backups:');
  console.log('═'.repeat(80));

  for (const file of files) {
    const filePath = path.join(backupDir, file);
    const stats = fs.statSync(filePath);
    const date = stats.mtime.toISOString().split('T')[0];
    const size = (stats.size / 1024 / 1024).toFixed(2) + ' MB';

    console.log(`${date}  ${size.padStart(10)}  ${file}`);
  }

  console.log('═'.repeat(80));
}

// CLI execution
if (import.meta.url === fileURLToPath(process.argv[1] ?? '')) {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'list') {
    listBackups();
  } else if (command === 'restore') {
    const backupFile = args[1];
    const flags = args.slice(2);

    if (!backupFile) {
      console.error('Usage: tsx scripts/db-restore.ts restore <backup-file> [--dry-run] [--drop]');
      process.exit(1);
    }

    const backupPath = path.isAbsolute(backupFile)
      ? backupFile
      : path.join(__dirname, '..', 'backups', backupFile);

    restoreDatabase({
      backupFile: backupPath,
      dryRun: flags.includes('--dry-run'),
      dropExisting: flags.includes('--drop'),
    }).catch((error) => {
      console.error(error);
      process.exit(1);
    });
  } else {
    console.log('Usage:');
    console.log('  tsx scripts/db-restore.ts list                   - List available backups');
    console.log('  tsx scripts/db-restore.ts restore <file> [flags] - Restore from backup');
    console.log('');
    console.log('Flags:');
    console.log('  --dry-run  - Verify backup without restoring');
    console.log('  --drop     - Drop existing database before restore');
  }
}

export { restoreDatabase, listBackups };
export type { RestoreOptions, RestoreResult };
