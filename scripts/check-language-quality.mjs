#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const messagesDir = path.join(root, "messages");
const locales = ["ka", "ru", "tr", "ar", "he"];

const allowedEnglishIdenticalValues = new Set([
  "+1 234 567 890",
  "+995 599 123 456",
  "Blog",
  "Blog | Silk Beauty Salon",
  "BBL HERO",
  "Candela VBeam Laser",
  "Clear + Brilliant",
  "CoolSculpting",
  "Cutera AviClear",
  "Cutera CO2 Laser",
  "Cutera Excel V+ IPL",
  "Cutera Secret PRO RF Microneedling",
  "Dermamelan Intimate Peel",
  "Dermaplaning",
  "Emtone",
  "Endolift",
  "English",
  "Escape",
  "FAQ",
  "Facebook",
  "HydraFacial",
  "Hydrafacial",
  "Instagram",
  "Masseter Botox",
  "Melasma",
  "Mesoestetic Cosmelan Peel",
  "MOXI Laser",
  "Nana Gviniashvili",
  "Obagi Blue Radiance Peel",
  "Obagi Nu-Derm",
  "Observe Skin Scanner",
  "Sarah Mitchell",
  "Silk Beauty",
  "Silk Beauty Salon",
  "SkinPen Microneedling",
  "Tab",
  "Tel: +995 599 123 456",
  "Telegram",
  "TikTok",
  "Türkçe",
  "WhatsApp",
  "iS Clinical Fire & Ice Peel",
  "info@silkbeautysalon.online",
  "john@example.com",
  "your@email.com",
  "Русский",
  "עברית",
  "العربية",
  "ქართული",
]);

const corruptionPatterns = [
  { label: "replacement character", pattern: /\uFFFD/u },
  { label: "repeated question marks", pattern: /\?{2,}/u },
  { label: "lost Latin diacritic", pattern: /[A-Za-z]\?[A-Za-z]/u },
  { label: "common UTF-8 mojibake", pattern: /(?:Ã.|Â.|â€|ðŸ)/u },
  { label: "control character", pattern: /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u },
];

const forbiddenMixedEnglish = /\b(?:anti-wrinkle|choose a service|book a consultation|consultation types|facial consultation|body consultation|ready to transform|facial assessment|downtime|delivers)\b/iu;

function flatten(value, prefix = "", output = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}[${index}]`, output));
    return output;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      flatten(item, prefix ? `${prefix}.${key}` : key, output);
    }
    return output;
  }

  output.set(prefix, value);
  return output;
}

function placeholders(value) {
  if (typeof value !== "string") return [];
  return [...value.matchAll(/\{([A-Za-z0-9_]+)(?:,|\})/gu)]
    .map((match) => match[1])
    .sort();
}

const english = flatten(
  JSON.parse(fs.readFileSync(path.join(messagesDir, "en.json"), "utf8")),
);

let failed = false;

for (const locale of locales) {
  const target = flatten(
    JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), "utf8")),
  );
  const issues = [];

  for (const key of english.keys()) {
    if (!target.has(key)) {
      issues.push(`${key}: missing value`);
      continue;
    }

    const sourceValue = english.get(key);
    const targetValue = target.get(key);

    if (typeof targetValue === "string" && targetValue.trim() === "") {
      issues.push(`${key}: empty value`);
    }

    if (typeof sourceValue !== typeof targetValue) {
      issues.push(`${key}: type differs from English`);
      continue;
    }

    if (
      typeof sourceValue === "string" &&
      sourceValue === targetValue &&
      !allowedEnglishIdenticalValues.has(sourceValue)
    ) {
      issues.push(`${key}: untranslated English value ${JSON.stringify(sourceValue)}`);
    }

    if (typeof targetValue === "string") {
      for (const { label, pattern } of corruptionPatterns) {
        if (pattern.test(targetValue)) {
          issues.push(`${key}: ${label}`);
        }
      }

      if (forbiddenMixedEnglish.test(targetValue)) {
        issues.push(`${key}: mixed English phrase`);
      }

      if (
        JSON.stringify(placeholders(sourceValue)) !==
        JSON.stringify(placeholders(targetValue))
      ) {
        issues.push(`${key}: placeholder mismatch`);
      }
    }
  }

  for (const key of target.keys()) {
    if (!english.has(key)) issues.push(`${key}: extra value`);
  }

  if (issues.length) {
    failed = true;
    console.error(`\n${locale}: ${issues.length} issue(s)`);
    issues.forEach((issue) => console.error(`  - ${issue}`));
  } else {
    console.log(`${locale}: ${target.size} values checked`);
  }
}

if (failed) process.exit(1);

console.log("Language quality gate passed");
