#!/usr/bin/env tsx
/**
 * Translation Merge Script
 * Merges missing keys from missing_*.json files into target translation files
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Deep merge two objects, preserving target structure but adding missing keys from source
 */
function deepMerge(target: unknown, source: unknown): unknown {
  if (source === null || typeof source !== 'object') {
    return target !== undefined ? target : source;
  }
  
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) {
      return source;
    }
    // For arrays, use target if it has items, otherwise use source
    return target.length > 0 ? target : source;
  }
  
  if (typeof target !== 'object' || target === null) {
    return source;
  }
  
  const result: Record<string, unknown> = { ...(target as Record<string, unknown>) };
  
  for (const [key, value] of Object.entries(source as Record<string, unknown>)) {
    if (key in result) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Load JSON file
 */
function loadJson(filePath: string): unknown {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load ${filePath}: ${error}`);
    return null;
  }
}

/**
 * Save JSON file with proper formatting
 */
function saveJson(filePath: string, data: unknown): void {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Saved: ${filePath}`);
  } catch (error) {
    console.error(`Failed to save ${filePath}: ${error}`);
  }
}

/**
 * Merge translations for a specific locale
 */
function mergeLocale(locale: string): void {
  const messagesDir = path.join(process.cwd(), 'messages');
  const targetFile = path.join(messagesDir, `${locale}.json`);
  const missingFile = path.join(messagesDir, `missing_${locale}.json`);
  
  // Check if files exist
  if (!fs.existsSync(targetFile)) {
    console.warn(`⚠️ Target file not found: ${targetFile}`);
    return;
  }
  
  if (!fs.existsSync(missingFile)) {
    console.warn(`⚠️ Missing file not found: ${missingFile}`);
    return;
  }
  
  // Load files
  const target = loadJson(targetFile);
  const missing = loadJson(missingFile);
  
  if (!target || !missing) {
    console.error(`❌ Failed to load files for ${locale}`);
    return;
  }
  
  // Merge
  const merged = deepMerge(target, missing);
  
  // Save
  saveJson(targetFile, merged);
  console.log(`✅ Merged ${locale}: added missing keys`);
}

/**
 * Main function
 */
function main(): void {
  const locales = ['ar', 'he', 'ru', 'tr'];
  
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           MERGING MISSING TRANSLATIONS                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  for (const locale of locales) {
    mergeLocale(locale);
  }
  
  console.log('\n✅ Merge complete!\n');
  console.log('Next steps:');
  console.log('  1. Review merged translations');
  console.log('  2. Run: npm run validate:i18n');
  console.log('  3. Commit changes\n');
}

main();
