import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load English homepage', async ({ page }) => {
    await page.goto('/en');

    await expect(page).toHaveTitle(/Silk Beauty Salon/);
    await expect(page.getByRole('link', { name: 'Silk Beauty Salon' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: /confidence in your skin/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /book a consultation/i })).toBeVisible();
  });

  test('should load Georgian homepage', async ({ page }) => {
    await page.goto('/ka');

    await expect(page).toHaveTitle(/Silk Beauty Salon/);
    await expect(page.getByRole('link', { name: 'Silk Beauty Salon' }).first()).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load Russian homepage', async ({ page }) => {
    await page.goto('/ru');

    await expect(page).toHaveTitle(/Silk Beauty Salon/);
    await expect(page.getByRole('link', { name: 'Silk Beauty Salon' }).first()).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should verify main sections are visible', async ({ page }) => {
    await page.goto('/en');

    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /skin-first aesthetic practice/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /holistic aesthetic treatments/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /view all/i })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should test language switch functionality', async ({ page }) => {
    await page.goto('/en');
    
    const langSwitcher = page.locator('[data-testid="language-switcher"]').first();

    await expect(langSwitcher).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/en');
    
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    const logo = page.getByRole('link', { name: 'Silk Beauty Salon' }).first();
    await expect(logo).toBeVisible();
    await logo.click();

    await expect(page).toHaveURL(/\/en/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    
    // Mobile menu button should be visible
    await expect(page.locator('button').first()).toBeVisible();
    
    // Main content should be visible
    await expect(page.locator('main')).toBeVisible();
  });
});
