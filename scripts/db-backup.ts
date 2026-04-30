#!/usr/bin/env tsx
/**
 * Database Backup Script
 *
 * Creates compressed backups of the PostgreSQL database.
 * Supports full backups and incremental backups with retention policy.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BackupOptions {
  type: 'full' | 'schema' | 'data';
  compress: boolean;
  retentionDays: number;
}

interface BackupResult {
  file: string;
  size: number;
  duration: number;
  checksum: string;
}

const DEFAULT_OPTIONS: BackupOptions = {
  type: 'full',
  compress: true,
  retentionDays: 30,
};

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
  // postgresql://user:password@host:port/database
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
 * Ensure backup directory exists
 */
function ensureBackupDir(): string {
  const backupDir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  return backupDir;
}

/**
 * Calculate file checksum
 */
function calculateChecksum(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return createHash('sha256').update(content).digest('hex');
}

/**
 * Compress a file using gzip
 */
async function compressFile(inputFile: string): Promise<string> {
  const outputFile = `${inputFile}.gz`;
  const source = createReadStream(inputFile);
  const destination = createWriteStream(outputFile);
  const gzip = createGzip();

  await pipeline(source, gzip, destination);
  fs.unlinkSync(inputFile);
  return outputFile;
}

/**
 * Clean up old backups based on retention policy
 */
function cleanupOldBackups(backupDir: string, retentionDays: number): void {
  const files = fs.readdirSync(backupDir);
  const now = Date.now();
  const retentionMs = retentionDays * 24 * 60 * 60 * 1000;

  for (const file of files) {
    const filePath = path.join(backupDir, file);
    const stats = fs.statSync(filePath);
    const age = now - stats.mtime.getTime();

    if (age > retentionMs) {
      console.log(`🗑️  Removing old backup: ${file}`);
      fs.unlinkSync(filePath);
    }
  }
}

/**
 * Create database backup
 */
async function createBackup(options: Partial<BackupOptions> = {}): Promise<BackupResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const startTime = Date.now();

  console.log(`📦 Creating ${opts.type} backup...`);

  const dbUrl = getDatabaseUrl();
  const { host, port, database, user, password } = parseConnectionUrl(dbUrl);
  const backupDir = ensureBackupDir();

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseFileName = `backup-${database}-${opts.type}-${timestamp}`;
  const rawFile = path.join(backupDir, `${baseFileName}.sql`);

  const env = { ...process.env, PGPASSWORD: password };

  try {
    let command: string;

    switch (opts.type) {
      case 'schema':
        command = `pg_dump -h ${host} -p ${port} -U ${user} -d ${database} --schema-only --no-owner --no-privileges > "${rawFile}"`;
        break;
      case 'data':
        command = `pg_dump -h ${host} -p ${port} -U ${user} -d ${database} --data-only --no-owner --no-privileges > "${rawFile}"`;
        break;
      case 'full':
      default:
        command = `pg_dump -h ${host} -p ${port} -U ${user} -d ${database} --no-owner --no-privileges > "${rawFile}"`;
        break;
    }

    execSync(command, { env, stdio: 'inherit' });

    let finalFile = rawFile;
    if (opts.compress) {
      console.log('🗜️  Compressing backup...');
      finalFile = await compressFile(rawFile);
    }

    const stats = fs.statSync(finalFile);
    const checksum = calculateChecksum(finalFile);
    const duration = Date.now() - startTime;

    // Create metadata file
    const metaFile = `${finalFile}.json`;
    fs.writeFileSync(
      metaFile,
      JSON.stringify(
        {
          timestamp,
          type: opts.type,
          database,
          size: stats.size,
          checksum,
          duration,
          compressed: opts.compress,
        },
        null,
        2
      )
    );

    // Cleanup old backups
    cleanupOldBackups(backupDir, opts.retentionDays);

    console.log(`✅ Backup created: ${finalFile}`);
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Duration: ${duration}ms`);
    console.log(`   Checksum: ${checksum.substring(0, 16)}...`);

    return {
      file: finalFile,
      size: stats.size,
      duration,
      checksum,
    };
  } catch (error) {
    console.error('❌ Backup failed:', error);
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

  switch (command) {
    case 'list':
      listBackups();
      break;
    case 'schema':
      createBackup({ type: 'schema', compress: true, retentionDays: 30 });
      break;
    case 'data':
      createBackup({ type: 'data', compress: true, retentionDays: 30 });
      break;
    case 'full':
    default:
      createBackup({ type: 'full', compress: true, retentionDays: 30 });
      break;
  }
}

export { createBackup, listBackups, DEFAULT_OPTIONS };
export type { BackupOptions, BackupResult };
