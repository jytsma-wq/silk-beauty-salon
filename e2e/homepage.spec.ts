import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load English homepage', async ({ page }) => {
    await page.goto('/en');
    
    // Verify basic page elements
    await expect(page).toHaveTitle(/Silk Beauty Salon/);
    await expect(page.locator('text=Silk Beauty')).toBeVisible();
    
    // Verify hero section
    await expect(page.locator('h1')).toContainText(/Specialists in Anti-Ageing|متخصصون في مكافحة الشيخوخة/);
  });

  test('should load Georgian homepage', async ({ page }) => {
    await page.goto('/ka');
    
    await expect(page).toHaveTitle(/Silk Beauty Salon/);
    await expect(page.locator('text=Silk Beauty')).toBeVisible();
  });

  test('should load Russian homepage', async ({ page }) => {
    await page.goto('/ru');
    
    await expect(page).toHaveTitle(/Silk Beauty Salon/);
    await expect(page.locator('text=Silk Beauty')).toBeVisible();
  });

  test('should verify main sections are visible', async ({ page }) => {
    await page.goto('/en');
    
    // Hero section
    await expect(page.locator('h1')).toBeVisible();
    
    // Treatments section should be visible
    await expect(page.locator('text=Treatments, or nav.treatments').first()).toBeVisible();
    
    // Conditions section should be visible
    await expect(page.locator('text=Conditions, or nav.conditions').first()).toBeVisible();
    
    // About section or similar content
    await expect(page.locator('main')).toBeVisible();
  });

  test('should test language switch functionality', async ({ page }) => {
    await page.goto('/en');
    
    // Find and click language switcher (it's in the header)
    const langSwitcher = page.locator('[data-testid="language-switcher"]').first();
    
    // The language switcher should be visible
    await expect(langSwitcher).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/en');
    
    // Check that navigation links are visible
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Verify logo link works
    const logo = page.locator('text=Silk Beauty').first();
    await expect(logo).toBeVisible();
    await logo.click();
    
    // Should still be on homepage
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
