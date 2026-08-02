#!/usr/bin/env node

import { spawnSync } from 'node:child_process';

const AUDIT_LEVEL = 'moderate';
const ENFORCED_SEVERITIES = new Set(['moderate', 'high', 'critical']);
const ALLOWED_ADVISORY = 'GHSA-F88M-G3JW-G9CJ';
const ALLOWED_DEPENDENCY = 'sharp';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const audit = spawnSync(
  npmCommand,
  ['audit', '--json', `--audit-level=${AUDIT_LEVEL}`],
  {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  },
);

if (audit.error) {
  console.error(`npm audit could not start: ${audit.error.message}`);
  process.exit(1);
}

let report;
try {
  report = JSON.parse(audit.stdout);
} catch {
  console.error('npm audit did not return valid JSON.');
  if (audit.stderr) console.error(audit.stderr.trim());
  process.exit(1);
}

if (report.error) {
  console.error(`npm audit failed: ${report.error.summary ?? report.error.code ?? 'unknown error'}`);
  process.exit(1);
}

if (audit.status !== 0 && audit.status !== 1) {
  console.error(`npm audit exited unexpectedly with status ${audit.status}.`);
  if (audit.stderr) console.error(audit.stderr.trim());
  process.exit(1);
}

if (!report.vulnerabilities || typeof report.vulnerabilities !== 'object') {
  console.error('npm audit returned no vulnerability map; refusing to pass the security gate.');
  process.exit(1);
}

const advisoryId = (url) => {
  if (typeof url !== 'string') return null;
  const match = url.match(/github\.com\/advisories\/(GHSA-[0-9A-Za-z-]+)$/);
  return match?.[1]?.toUpperCase() ?? null;
};

const resolveAdvisories = (packageName, trail = new Set()) => {
  if (trail.has(packageName)) {
    return { advisories: [], errors: [`cyclic vulnerability reference through ${packageName}`] };
  }

  const vulnerability = report.vulnerabilities[packageName];
  if (!vulnerability || !Array.isArray(vulnerability.via)) {
    return { advisories: [], errors: [`unresolved vulnerability reference: ${packageName}`] };
  }

  const nextTrail = new Set(trail);
  nextTrail.add(packageName);

  const advisories = [];
  const errors = [];

  for (const cause of vulnerability.via) {
    if (typeof cause === 'string') {
      const nested = resolveAdvisories(cause, nextTrail);
      advisories.push(...nested.advisories);
      errors.push(...nested.errors);
      continue;
    }

    const id = advisoryId(cause?.url);
    if (!id) {
      errors.push(`unidentified advisory for ${packageName}`);
      continue;
    }

    advisories.push({
      id,
      dependency: cause.dependency ?? cause.name ?? packageName,
    });
  }

  return { advisories, errors };
};

const violations = [];
const temporaryAllowances = [];

for (const [packageName, vulnerability] of Object.entries(report.vulnerabilities)) {
  if (!ENFORCED_SEVERITIES.has(String(vulnerability.severity).toLowerCase())) continue;

  const resolved = resolveAdvisories(packageName);
  const disallowed = resolved.advisories.filter(
    ({ id, dependency }) => id !== ALLOWED_ADVISORY || dependency !== ALLOWED_DEPENDENCY,
  );

  if (resolved.errors.length > 0 || resolved.advisories.length === 0 || disallowed.length > 0) {
    violations.push({ packageName, vulnerability, resolved, disallowed });
    continue;
  }

  temporaryAllowances.push(packageName);
}

if (violations.length > 0) {
  console.error('npm audit found non-allowlisted moderate/high/critical vulnerabilities:');
  for (const { packageName, vulnerability, resolved, disallowed } of violations) {
    const references = disallowed.length > 0 ? disallowed : resolved.advisories;
    const details = references.map(({ id, dependency }) => `${id} (${dependency})`).join(', ');
    const unresolved = resolved.errors.join(', ');
    console.error(
      `- ${packageName} [${vulnerability.severity}]: ${details || unresolved || 'unknown advisory'}`,
    );
  }
  process.exit(1);
}

if (temporaryAllowances.length > 0) {
  console.log(
    `npm audit passed with temporary allowance ${ALLOWED_ADVISORY} (${ALLOWED_DEPENDENCY}); affected entries: ${temporaryAllowances.sort().join(', ')}`,
  );
} else {
  console.log('npm audit passed with no moderate/high/critical vulnerabilities.');
}
