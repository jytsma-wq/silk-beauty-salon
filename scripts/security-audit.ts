#!/usr/bin/env node
/**
 * Security Audit Script
 * Run this to check security configuration
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

interface SecurityCheck {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
}

const checks: SecurityCheck[] = [];

function check(name: string, condition: boolean, passMsg: string, failMsg: string): void {
  checks.push({
    name,
    status: condition ? 'pass' : 'fail',
    message: condition ? passMsg : failMsg,
  });
}

function warn(name: string, condition: boolean, msg: string): void {
  if (condition) {
    checks.push({
      name,
      status: 'warn',
      message: msg,
    });
  }
}

console.log('🔒 Running security audit...\n');

// Check 1: Environment variables
check(
  'REDIS_URL configured',
  !!process.env.REDIS_URL,
  'Redis URL is configured',
  'REDIS_URL not set - Redis rate limiting will use in-memory fallback'
);

check(
  'NODE_ENV is production',
  process.env.NODE_ENV === 'production',
  'Running in production mode',
  'NODE_ENV should be "production" in production'
);

// Check 2: Security headers in next.config.js
const nextConfigPath = resolve(process.cwd(), 'next.config.ts');
if (existsSync(nextConfigPath)) {
  const configContent = readFileSync(nextConfigPath, 'utf8');
  
  check(
    'X-Frame-Options header configured',
    configContent.includes('X-Frame-Options'),
    'X-Frame-Options header is set',
    'X-Frame-Options header not found'
  );
  
  check(
    'HSTS header configured',
    configContent.includes('Strict-Transport-Security'),
    'HSTS (Strict-Transport-Security) header is set',
    'HSTS header not found - HTTPS not enforced'
  );
  
  check(
    'X-Content-Type-Options header configured',
    configContent.includes('X-Content-Type-Options'),
    'X-Content-Type-Options header is set',
    'X-Content-Type-Options header not found'
  );
  
  check(
    'Referrer-Policy header configured',
    configContent.includes('Referrer-Policy'),
    'Referrer-Policy header is set',
    'Referrer-Policy header not found'
  );
} else {
  checks.push({
    name: 'next.config.ts exists',
    status: 'fail',
    message: 'next.config.ts not found',
  });
}

// Check 3: Middleware security
check(
  'Rate limiting configured',
  existsSync(resolve(process.cwd(), 'src/lib/rate-limit.ts')),
  'Rate limiting module exists',
  'Rate limiting module not found'
);

check(
  'CSRF protection configured',
  existsSync(resolve(process.cwd(), 'src/lib/csrf.ts')),
  'CSRF protection module exists',
  'CSRF protection module not found'
);

check(
  'Input sanitization configured',
  existsSync(resolve(process.cwd(), 'src/lib/sanitize.ts')),
  'Input sanitization module exists',
  'Input sanitization module not found'
);

// Check 4: Dependencies
try {
  const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  check(
    'ioredis installed',
    !!deps.ioredis,
    'ioredis is installed for Redis support',
    'ioredis not installed - npm install ioredis'
  );
  
  check(
    'isomorphic-dompurify installed',
    !!deps['isomorphic-dompurify'],
    'isomorphic-dompurify is installed for XSS protection',
    'isomorphic-dompurify not installed - npm install isomorphic-dompurify'
  );
} catch {
  checks.push({
    name: 'package.json readable',
    status: 'fail',
    message: 'Could not read package.json',
  });
}

// Check 5: Environment file warnings
warn(
  '.env.local has sensitive data',
  existsSync(resolve(process.cwd(), '.env.local')),
  '.env.local exists - ensure it is in .gitignore'
);

// Check 6: Security headers middleware
check(
  'Middleware file exists',
  existsSync(resolve(process.cwd(), 'middleware.ts')),
  'Middleware file exists',
  'middleware.ts not found'
);

// Print results
console.log('Results:');
console.log('='.repeat(60));

const passed = checks.filter(c => c.status === 'pass');
const failed = checks.filter(c => c.status === 'fail');
const warnings = checks.filter(c => c.status === 'warn');

checks.forEach(check => {
  const icon = check.status === 'pass' ? '✅' : check.status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} ${check.name}`);
  console.log(`   ${check.message}\n`);
});

console.log('='.repeat(60));
console.log(`\n✅ Passed: ${passed.length}`);
console.log(`❌ Failed: ${failed.length}`);
console.log(`⚠️ Warnings: ${warnings.length}`);

// Exit with error code if there are failures
if (failed.length > 0) {
  console.log('\n❌ Security audit failed. Please fix the issues above.');
  process.exit(1);
} else if (warnings.length > 0) {
  console.log('\n⚠️ Security audit passed with warnings.');
  process.exit(0);
} else {
  console.log('\n✅ All security checks passed!');
  process.exit(0);
}
