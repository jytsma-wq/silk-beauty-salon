#!/usr/bin/env node
/**
 * Fix missing translation keys by copying from the English version.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const BLOCKED_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

function cloneTranslationValue(value) {
  if (Array.isArray(value)) {
    return value.map(cloneTranslationValue);
  }

  if (typeof value === 'object' && value !== null) {
    const clone = {};

    for (const key of Object.keys(value)) {
      if (BLOCKED_KEYS.has(key)) {
        continue;
      }

      Object.defineProperty(clone, key, {
        value: cloneTranslationValue(value[key]),
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }

    return clone;
  }

  return value;
}

export function copyMissingKeys(source, target, path = '') {
  let missingCount = 0;

  for (const key of Object.keys(source)) {
    if (BLOCKED_KEYS.has(key)) {
      console.warn(`Skipping unsafe translation key: ${key}`);
      continue;
    }

    const currentPath = path ? `${path}.${key}` : key;
    const sourceValue = source[key];
    const targetHasKey = Object.hasOwn(target, key);

    if (
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      !Array.isArray(sourceValue)
    ) {
      const targetValue = targetHasKey ? target[key] : undefined;

      if (
        typeof targetValue !== 'object' ||
        targetValue === null ||
        Array.isArray(targetValue)
      ) {
        console.log(`Adding missing object: ${currentPath}`);
        Object.defineProperty(target, key, {
          value: cloneTranslationValue(sourceValue),
          enumerable: true,
          configurable: true,
          writable: true,
        });
        missingCount++;
      } else {
        missingCount += copyMissingKeys(sourceValue, targetValue, currentPath);
      }
    } else if (!targetHasKey) {
      console.log(`Adding missing key: ${currentPath}`);
      Object.defineProperty(target, key, {
        value: cloneTranslationValue(sourceValue),
        enumerable: true,
        configurable: true,
        writable: true,
      });
      missingCount++;
    }
  }

  return missingCount;
}

function main() {
  const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));
  const ar = JSON.parse(readFileSync('messages/ar.json', 'utf8'));
  const totalMissing = copyMissingKeys(en, ar);

  console.log(`Fixed ${totalMissing} missing keys in ar.json`);
  writeFileSync('messages/ar.json', JSON.stringify(ar, null, 2));
  console.log('Updated ar.json file');
}

const entryPoint = process.argv[1];
if (entryPoint && import.meta.url === pathToFileURL(resolve(entryPoint)).href) {
  main();
}
