import { describe, expect, it } from 'vitest';
import { androidApkFileName, androidApkUrl, androidInstallSteps } from '../mobile-app-download';

describe('mobile app download metadata', () => {
  it('points to an APK artifact', () => {
    expect(androidApkFileName).toBe('silk-beauty-salon.apk');
    expect(androidApkUrl).toMatch(/\.apk(?:$|\?)/);
  });

  it('documents the Android sideloading flow', () => {
    expect(androidInstallSteps.length).toBeGreaterThanOrEqual(3);
    expect(androidInstallSteps.some((step) => /unknown apps/i.test(step))).toBe(true);
    expect(androidInstallSteps.some((step) => /install/i.test(step))).toBe(true);
  });
});
