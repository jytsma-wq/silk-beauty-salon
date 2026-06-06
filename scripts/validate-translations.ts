#!/usr/bin/env tsx
/* eslint-disable no-console */
/**
 * Translation Validation Script
 * Validates all translation files against en.json (source of truth)
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  file: string;
  valid: boolean;
  missingKeys: string[];
  extraKeys: string[];
  unusedKeys: string[];
  interpolationIssues: string[];
  structureIssues: string[];
  lengthIssues: string[];
  encodingIssues: string[];
  duplicateKeyIssues: string[];
  coverage: number;
  qualityScore: number;
}

/**
 * Recursively get all keys from an object with dot notation
 */
function getAllKeys(obj: unknown, prefix = ''): string[] {
  const keys: string[] = [];
  
  if (obj === null || typeof obj !== 'object') {
    return keys;
  }
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    }
  }
  
  return keys;
}

/**
 * Extract interpolation variables from a string (e.g., {name}, {count})
 */
function getInterpolationVars(str: string): string[] {
  const matches = str.match(/\{([^}]+)\}/g);
  return matches ? matches.sort() : [];
}

/**
 * Get value at a nested key path
 */
function getValueAtPath(obj: unknown, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = obj;
  
  for (const part of parts) {
    if (current === null || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  
  return current;
}

/**
 * Detect duplicated top-level JSON namespaces before JSON.parse drops them.
 */
function findDuplicateTopLevelKeys(content: string): string[] {
  const keys = new Map<string, number[]>();
  let depth = 0;
  let inString = false;
  let escaped = false;
  let stringStart = -1;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;

        if (depth === 1) {
          let cursor = i + 1;
          while (/\s/.test(content[cursor] ?? '')) cursor++;

          if (content[cursor] === ':') {
            const key = content.slice(stringStart + 1, i);
            const line = content.slice(0, stringStart).split(/\r?\n/).length;
            keys.set(key, [...(keys.get(key) ?? []), line]);
          }
        }
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      stringStart = i;
    } else if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
    }
  }

  return [...keys.entries()]
    .filter(([, lines]) => lines.length > 1)
    .map(([key, lines]) => `${key} duplicated at lines ${lines.join(', ')}`);
}

/**
 * Compare interpolation variables between source and target
 */
function validateInterpolation(
  sourceValue: string,
  targetValue: string,
  key: string
): string | null {
  if (typeof sourceValue !== 'string' || typeof targetValue !== 'string') {
    return null;
  }
  
  const sourceVars = getInterpolationVars(sourceValue);
  const targetVars = getInterpolationVars(targetValue);
  
  if (sourceVars.length === 0 && targetVars.length === 0) {
    return null;
  }
  
  const missingVars = sourceVars.filter(v => !targetVars.includes(v));
  const extraVars = targetVars.filter(v => !sourceVars.includes(v));
  
  if (missingVars.length > 0 || extraVars.length > 0) {
    const issues: string[] = [];
    if (missingVars.length > 0) issues.push(`missing vars: ${missingVars.join(', ')}`);
    if (extraVars.length > 0) issues.push(`extra vars: ${extraVars.join(', ')}`);
    return `${key} - ${issues.join('; ')}`;
  }
  
  return null;
}

/**
 * Check for encoding issues in translation strings
 */
function checkEncoding(value: string, key: string): string | null {
  // Check for non-UTF8 characters or encoding issues
  const problematicChars = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
  if (problematicChars.test(value)) {
    return `${key} - contains control characters`;
  }
  const mojibakePatterns = [
    /\?{2,}/,
    /�/,
    /[A-Za-zÀ-ž]\?[A-Za-zÀ-ž]/u,
    /\?[A-Za-zÀ-ž]/u,
  ];
  if (mojibakePatterns.some((pattern) => pattern.test(value))) {
    return `${key} - contains visible replacement characters`;
  }
  return null;
}

/**
 * Check for length constraints
 */
function checkLength(sourceValue: string, targetValue: string, key: string): string | null {
  // Flag if target is significantly longer than source (could indicate issues)
  if (targetValue.length > sourceValue.length * 1.5 && targetValue.length > 100) {
    return `${key} - translation is 50%+ longer than source`;
  }
  return null;
}

/**
 * Validate a single translation file against source
 */
function validateFile(
  source: unknown,
  target: unknown,
  fileName: string,
  duplicateKeyIssues: string[] = []
): ValidationResult {
  const sourceKeys = new Set(getAllKeys(source));
  const targetKeys = new Set(getAllKeys(target));
  
  const missingKeys: string[] = [];
  const extraKeys: string[] = [];
  const unusedKeys: string[] = []; // Would require code analysis to detect
  const interpolationIssues: string[] = [];
  const structureIssues: string[] = [];
  const lengthIssues: string[] = [];
  const encodingIssues: string[] = [];
  
  // Find missing keys and validate existing ones
  for (const key of sourceKeys) {
    if (!targetKeys.has(key)) {
      missingKeys.push(key);
    } else {
      // Check interpolation if both values are strings
      const sourceValue = getValueAtPath(source, key);
      const targetValue = getValueAtPath(target, key);
      
      if (typeof sourceValue === 'string' && typeof targetValue === 'string') {
        const issue = validateInterpolation(sourceValue, targetValue, key);
        if (issue) interpolationIssues.push(issue);
        
        // Check length constraints
        const lengthIssue = checkLength(sourceValue, targetValue, key);
        if (lengthIssue) lengthIssues.push(lengthIssue);
        
        // Check encoding
        const encodingIssue = checkEncoding(targetValue, key);
        if (encodingIssue) encodingIssues.push(encodingIssue);
      }
      
      // Check type consistency
      if (typeof sourceValue !== typeof targetValue) {
        structureIssues.push(`${key} - type mismatch: source is ${typeof sourceValue}, target is ${typeof targetValue}`);
      }
      
      // Check if array lengths match for arrays
      if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
        if (sourceValue.length !== targetValue.length) {
          structureIssues.push(`${key} - array length mismatch: source ${sourceValue.length}, target ${targetValue.length}`);
        }
      }
    }
  }
  
  // Find extra keys
  for (const key of targetKeys) {
    if (!sourceKeys.has(key)) {
      extraKeys.push(key);
    }
  }
  
  // Calculate coverage percentage
  const coverage = sourceKeys.size > 0 
    ? Math.round(((sourceKeys.size - missingKeys.length) / sourceKeys.size) * 100)
    : 100;
  
  // Calculate quality score (0-100)
  const totalIssues = interpolationIssues.length + structureIssues.length + lengthIssues.length + encodingIssues.length + duplicateKeyIssues.length;
  const qualityScore = Math.max(0, 100 - (totalIssues * 2));
  
  return {
    file: fileName,
    valid: missingKeys.length === 0 && interpolationIssues.length === 0 && structureIssues.length === 0 && encodingIssues.length === 0 && duplicateKeyIssues.length === 0,
    missingKeys,
    extraKeys,
    unusedKeys,
    interpolationIssues,
    structureIssues,
    lengthIssues,
    encodingIssues,
    duplicateKeyIssues,
    coverage,
    qualityScore,
  };
}

/**
 * Print validation results in human-readable format
 */
function printResults(results: ValidationResult[]): void {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║        TRANSLATION VALIDATION REPORT                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  let totalMissing = 0;
  let totalIssues = 0;
  
  for (const result of results) {
    const status = result.valid ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${result.file}`);
    console.log(`   Coverage: ${result.coverage}% | Quality: ${result.qualityScore}/100`);
    
    if (result.missingKeys.length > 0) {
      console.log(`   Missing keys: ${result.missingKeys.length}`);
      for (const key of result.missingKeys.slice(0, 5)) {
        console.log(`     - ${key}`);
      }
      if (result.missingKeys.length > 5) {
        console.log(`     ... and ${result.missingKeys.length - 5} more`);
      }
      totalMissing += result.missingKeys.length;
    }
    
    if (result.extraKeys.length > 0) {
      console.log(`   Extra keys: ${result.extraKeys.length} (not in source)`);
      totalIssues += result.extraKeys.length;
    }
    
    if (result.interpolationIssues.length > 0) {
      console.log(`   Interpolation issues: ${result.interpolationIssues.length}`);
      for (const issue of result.interpolationIssues) {
        console.log(`     - ${issue}`);
      }
      totalIssues += result.interpolationIssues.length;
    }
    
    if (result.structureIssues.length > 0) {
      console.log(`   Structure issues: ${result.structureIssues.length}`);
      for (const issue of result.structureIssues.slice(0, 3)) {
        console.log(`     - ${issue}`);
      }
      if (result.structureIssues.length > 3) {
        console.log(`     ... and ${result.structureIssues.length - 3} more`);
      }
      totalIssues += result.structureIssues.length;
    }
    
    if (result.lengthIssues.length > 0) {
      console.log(`   Length issues: ${result.lengthIssues.length}`);
      totalIssues += result.lengthIssues.length;
    }
    
    if (result.encodingIssues.length > 0) {
      console.log(`   Encoding issues: ${result.encodingIssues.length}`);
      for (const issue of result.encodingIssues.slice(0, 5)) {
        console.log(`     - ${issue}`);
      }
      if (result.encodingIssues.length > 5) {
        console.log(`     ... and ${result.encodingIssues.length - 5} more`);
      }
      totalIssues += result.encodingIssues.length;
    }

    if (result.duplicateKeyIssues.length > 0) {
      console.log(`   Duplicate top-level keys: ${result.duplicateKeyIssues.length}`);
      for (const issue of result.duplicateKeyIssues) {
        console.log(`     - ${issue}`);
      }
      totalIssues += result.duplicateKeyIssues.length;
    }
    
    console.log('');
  }
  
  // Summary
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                      SUMMARY                               ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Total missing keys: ${totalMissing}`);
  console.log(`Total other issues: ${totalIssues}`);
  console.log(`Files with problems: ${results.filter(r => !r.valid).length}/${results.length}`);
  console.log('');
}

/**
 * Print CI-friendly summary (one line per issue)
 */
function printCISummary(results: ValidationResult[]): void {
  console.log('\n::group::CI Summary');
  
  for (const result of results) {
    for (const key of result.missingKeys) {
      console.log(`::error file=${result.file},title=Missing Key::${key}`);
    }
    for (const issue of result.interpolationIssues) {
      console.log(`::warning file=${result.file},title=Interpolation Issue::${issue}`);
    }
    for (const issue of result.structureIssues) {
      console.log(`::error file=${result.file},title=Structure Issue::${issue}`);
    }
    for (const issue of result.encodingIssues) {
      console.log(`::error file=${result.file},title=Encoding Issue::${issue}`);
    }
    for (const issue of result.duplicateKeyIssues) {
      console.log(`::error file=${result.file},title=Duplicate Key::${issue}`);
    }
  }
  
  console.log('::endgroup::');
}

/**
 * Main validation function
 */
function main(): void {
  const messagesDir = path.join(process.cwd(), 'messages');
  const sourceFile = 'en.json';
  
  // Check if messages directory exists
  if (!fs.existsSync(messagesDir)) {
    console.error('Error: messages directory not found');
    process.exit(1);
  }
  
  // Load source file
  const sourcePath = path.join(messagesDir, sourceFile);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source file ${sourceFile} not found`);
    process.exit(1);
  }
  
  let source: unknown;
  const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
  const sourceDuplicateIssues = findDuplicateTopLevelKeys(sourceContent);
  if (sourceDuplicateIssues.length > 0) {
    console.error(`Error: ${sourceFile} has duplicate top-level keys:`);
    for (const issue of sourceDuplicateIssues) {
      console.error(`  - ${issue}`);
    }
    process.exit(1);
  }

  try {
    source = JSON.parse(sourceContent);
  } catch (error) {
    console.error(`Error: Failed to parse ${sourceFile}: ${error}`);
    process.exit(1);
  }
  
  // Get all translation files
  const files = fs.readdirSync(messagesDir)
    .filter(f => f.endsWith('.json') && f !== sourceFile && !f.startsWith('missing_'));
  
  if (files.length === 0) {
    console.warn('No translation files found');
    process.exit(0);
  }
  
  // Validate each file
  const results: ValidationResult[] = [];
  
  for (const file of files) {
    const filePath = path.join(messagesDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const duplicateKeyIssues = findDuplicateTopLevelKeys(content);
      const target = JSON.parse(content);
      const result = validateFile(source, target, file, duplicateKeyIssues);
      results.push(result);
    } catch (error) {
      console.error(`Error validating ${file}: ${error}`);
      results.push({
        file,
        valid: false,
        missingKeys: [],
        extraKeys: [],
        unusedKeys: [],
        interpolationIssues: [],
        structureIssues: [`Failed to parse: ${error}`],
        lengthIssues: [],
        encodingIssues: [],
        duplicateKeyIssues: [],
        coverage: 0,
        qualityScore: 0,
      });
    }
  }
  
  // Print results
  printResults(results);
  
  // Print CI summary if in CI environment
  if (process.env.CI) {
    printCISummary(results);
  }
  
  // Exit with error if any file has missing keys or structure issues
  const hasCriticalIssues = results.some(
    r => r.missingKeys.length > 0 || r.structureIssues.length > 0 || r.encodingIssues.length > 0 || r.duplicateKeyIssues.length > 0
  );
  
  if (hasCriticalIssues) {
    console.log('❌ Validation failed - critical issues found\n');
    process.exit(1);
  }
  
  console.log('✅ All translations valid\n');
  process.exit(0);
}

main();
