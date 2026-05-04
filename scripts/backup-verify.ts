#!/usr/bin/env tsx
/**
 * Backup Verification Script
 *
 * Verifies that recent database backups exist and are not stale.
 * Exits with code 1 if backups are missing or too old.
 */

import { statSync, readdirSync } from 'fs';
import { join } from 'path';

const BACKUP_DIR = process.env.BACKUP_DIR || './backups';
const MAX_AGE_HOURS = 25;

function main(): void {
  try {
    const files = readdirSync(BACKUP_DIR)
      .filter(f => f.endsWith('.sql') || f.endsWith('.dump') || f.endsWith('.sql.gz'))
      .sort()
      .reverse();

    if (files.length === 0) {
      console.error('[BACKUP CHECK] No backup files found in', BACKUP_DIR);
      process.exit(1);
    }

    const latest = files[0];
    const stats = statSync(join(BACKUP_DIR, latest));
    const ageHours = (Date.now() - stats.mtimeMs) / 3600000;

    if (ageHours > MAX_AGE_HOURS) {
      console.error(`[BACKUP CHECK] Latest backup is ${ageHours.toFixed(1)}h old (limit: ${MAX_AGE_HOURS}h)`);
      process.exit(1);
    }

    console.log(`[BACKUP CHECK] OK — latest backup: ${latest} (${ageHours.toFixed(1)}h ago)`);
  } catch (error) {
    console.error('[BACKUP CHECK] Failed:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
