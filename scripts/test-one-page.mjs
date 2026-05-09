#!/usr/bin/env node
import http from 'http';

const path = process.argv[2] || '/en/book';

async function testPage(pagePath) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: pagePath,
      method: 'GET',
      timeout: 15000,
    };

    const req = http.request(options, (res) => {
      const status = res.statusCode;
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`Status: ${status}`);
        resolve({ path: pagePath, status, body });
      });
    });

    req.on('error', (e) => {
      console.log(`Error: ${e.message}`);
      resolve({ path: pagePath, status: 0, body: '', error: e.message });
    });

    req.on('timeout', () => {
      req.destroy();
      console.log('Timeout');
      resolve({ path: pagePath, status: 0, body: '', error: 'timeout' });
    });

    req.setTimeout(15000);
    req.end();
  });
}

console.log(`Testing ${path}...\n`);
const result = await testPage(path);

// Look for error message in the HTML
const errorMatch = result.body.match(/Application error|Error:|error|"message":|"error":/i);
if (errorMatch) {
  console.log('\n--- Error found in response ---');
  // Find context around error
  const idx = result.body.toLowerCase().indexOf('error');
  console.log(result.body.substring(Math.max(0, idx - 200), idx + 500));
} else {
  console.log('\n--- Full Response (first 2000 chars) ---');
  console.log(result.body.substring(0, 2000));
}
