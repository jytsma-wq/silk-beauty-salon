import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const e2ePort = Number(process.env.E2E_PORT ?? 3100);
const e2eHost = process.env.E2E_HOST ?? '127.0.0.1';
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://${e2eHost}:${e2ePort}`;
const webServerEnv = Object.fromEntries(
  Object.entries(process.env).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report/', open: 'never' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }],
    ['list'],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: isCI
      ? 'npm run build && npm start'
      : `npx next dev -p ${e2ePort} --turbopack --hostname ${e2eHost}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: isCI ? 180_000 : 60_000,
    stdout: 'pipe',
    stderr: 'pipe',
    env: {
      ...webServerEnv,
      SKIP_ENV_VALIDATION: webServerEnv.SKIP_ENV_VALIDATION ?? '1',
      PORT: String(e2ePort),
      HOSTNAME: e2eHost,
    },
  },
});
