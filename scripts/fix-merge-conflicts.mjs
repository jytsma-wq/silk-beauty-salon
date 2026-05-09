#!/usr/bin/env node
/**
 * Fix git merge conflicts in JSON files
 * Keeps the second version (more complete) from each conflict
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const files = [
  'messages/ar.json',
  'messages/he.json',
  'messages/ka.json',
  'messages/ru.json',
  'messages/tr.json',
];

for (const file of files) {
  const filePath = join(process.cwd(), file);
  let content = readFileSync(filePath, 'utf-8');

  // Find and fix all merge conflicts
  // Pattern: <<<<<<< HEAD\n...content1...\n=======\n...content2...\n>>>>>>> ...
  const conflictRegex = /<<<<<<< HEAD\n([\s\S]*?)=======\n([\s\S]*?)>>>>>>> [a-f0-9]+/g;

  let match;
  let replacements = [];

  while ((match = conflictRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const headContent = match[1];
    const branchContent = match[2];

    // Keep the branch content (usually more complete)
    // Remove trailing comma from headContent if present for comparison
    const cleanHead = headContent.trim().replace(/,$/, '');
    const cleanBranch = branchContent.trim().replace(/,$/, '');

    // Check if branch content has more keys (count commas)
    const headKeys = (cleanHead.match(/"/g) || []).length / 2;
    const branchKeys = (cleanBranch.match(/"/g) || []).length / 2;

    console.log(`  Conflict: HEAD has ~${headKeys} keys, branch has ~${branchKeys} keys`);

    // Use branch content (more complete)
    let replacement = branchContent;

    // Ensure proper trailing comma handling
    if (replacement.trim().endsWith(',') && branchContent.trim().endsWith(',')) {
      // Keep as is
    } else if (!replacement.trim().endsWith(',') && branchContent.trim().endsWith(',')) {
      replacement = replacement.trim() + ',';
    }

    replacements.push({ fullMatch, replacement });
  }

  // Apply replacements
  for (const { fullMatch, replacement } of replacements) {
    content = content.replace(fullMatch, replacement);
  }

  // Check for any remaining conflicts
  if (content.includes('<<<<<<<')) {
    console.error(`  ERROR: Still has conflicts in ${file}`);
    process.exit(1);
  }

  writeFileSync(filePath, content, 'utf-8');
  console.log(`Fixed ${replacements.length} conflicts in ${file}`);
}

console.log('\nAll merge conflicts fixed!');
