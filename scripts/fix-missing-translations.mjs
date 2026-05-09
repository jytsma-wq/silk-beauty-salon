#!/usr/bin/env node
/**
 * Fix missing translation keys by copying from English version
 */

import { readFileSync, writeFileSync } from 'fs';

const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));
const ar = JSON.parse(readFileSync('messages/ar.json', 'utf8'));

function copyMissingKeys(source, target, path = '') {
  let missingCount = 0;
  
  for (const key in source) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key] || typeof target[key] !== 'object') {
        console.log(`Adding missing object: ${currentPath}`);
        target[key] = source[key];
        missingCount++;
      } else {
        missingCount += copyMissingKeys(source[key], target[key], currentPath);
      }
    } else {
      if (!target.hasOwnProperty(key)) {
        console.log(`Adding missing key: ${currentPath}`);
        target[key] = source[key];
        missingCount++;
      }
    }
  }
  
  return missingCount;
}

const totalMissing = copyMissingKeys(en, ar);
console.log(`Fixed ${totalMissing} missing keys in ar.json`);

writeFileSync('messages/ar.json', JSON.stringify(ar, null, 2));
console.log('Updated ar.json file');
