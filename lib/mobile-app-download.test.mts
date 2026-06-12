import assert from 'node:assert/strict';
import test from 'node:test';
import { androidApkFileName, androidApkUrl, androidInstallSteps } from './mobile-app-download.ts';

test('android download metadata points to an APK artifact', () => {
  assert.equal(androidApkFileName, 'silk-beauty-salon.apk');
  assert.match(androidApkUrl, /\.apk(?:$|\?)/);
});

test('android install instructions cover sideloading flow', () => {
  assert.ok(androidInstallSteps.length >= 3);
  assert.ok(androidInstallSteps.some((step) => /unknown apps/i.test(step)));
  assert.ok(androidInstallSteps.some((step) => /install/i.test(step)));
});
