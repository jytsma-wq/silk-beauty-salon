#!/usr/bin/env node
import http from 'http';

const pages = [
  '/en',
  '/en/about',
  '/en/treatments',
  '/en/treatments/botox',
  '/en/contact-us',
  '/en/blog',
  '/en/conditions',
  '/en/conditions/acne',
  '/en/book',
  '/en/before-after',
  '/en/faq',
  '/en/pricelist',
  '/en/offers',
  '/en/consultation',
  '/en/international-clients',
  '/en/careers',
  '/en/media-press',
  '/en/privacy-policy',
  '/en/terms-conditions',
  '/en/accessibility',
];

async function testPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      timeout: 15000,
    };

    const req = http.request(options, (res) => {
      const status = res.statusCode;
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const hasError = body.includes('Application error') || body.includes('Internal Server Error') || status >= 500;
        resolve({ path, status, ok: status === 200 && !hasError, error: hasError ? 'server error' : null });
      });
    });

    req.on('error', (e) => {
      resolve({ path, status: 0, ok: false, error: e.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ path, status: 0, ok: false, error: 'timeout' });
    });

    req.setTimeout(15000);
    req.end();
  });
}

console.log('Testing pages sequentially...\n');
const results = [];
for (const page of pages) {
  const result = await testPage(page);
  results.push(result);
  console.log(`${result.ok ? '✅' : '❌'} ${result.status} ${result.path}${result.error ? ` (${result.error})` : ''}`);
}

const working = results.filter(r => r.ok);
const failing = results.filter(r => !r.ok);

console.log(`\n\nSummary: ${working.length}/${results.length} pages accessible`);
console.log(`Working: ${working.map(r => r.path).join(', ') || 'none'}`);
console.log(`Failing: ${failing.map(r => r.path).join(', ') || 'none'}`);
