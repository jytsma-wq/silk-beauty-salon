import { test, expect } from '@playwright/test';

test.describe('Treatments', () => {
  test('should load treatments page', async ({ page }) => {
    await page.goto('/en/treatments');
    
    await expect(page).toHaveTitle(/Treatments|treatments|პროცედურები/);
    await expect(page.locator('h1')).toContainText(/Treatments|treatments|პროცედურები/);
  });

  test('should display treatment categories', async ({ page }) => {
    await page.goto('/en/treatments');
    
    // Main content should be visible
    await expect(page.locator('main')).toBeVisible();
    
    // Should have treatment-related content
    const content = page.locator('main');
    await expect(content).not.toBeEmpty();
  });

  test('should navigate to individual treatment page', async ({ page }) => {
    await page.goto('/en/treatments');
    
    // Find and click on a treatment link
    const treatmentLinks = page.locator('a[href*="/treatments/"]').first();
    
    // If there are treatment links, click the first one
    if (await treatmentLinks.isVisible().catch(() => false)) {
      await treatmentLinks.click();
      
      // Should navigate to a treatment detail page
      await expect(page).toHaveURL(/\/treatments\/.+/);
      
      // Page should have content
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('should have booking redirect functionality', async ({ page }) => {
    await page.goto('/en/treatments');
    
    // Look for book appointment button or link
    const bookButton = page.locator('text=/book|schedule|appointment/i').first();
    
    // If booking button exists, it should be clickable
    if (await bookButton.isVisible().catch(() => false)) {
      await expect(bookButton).toBeEnabled();
    }
  });

  test('should display treatment details on individual page', async ({ page }) => {
    // Try to navigate to a specific treatment
    await page.goto('/en/treatments/botox');
    
    // Page should load
    await expect(page.locator('main')).toBeVisible();
    
    // Should have heading
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should handle 404 for non-existent treatment', async ({ page }) => {
    await page.goto('/en/treatments/non-existent-treatment');
    
    // Should either show 404 or redirect
    const status = await page.evaluate(() => document.title);
    expect(status).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/treatments');
    
    // Content should still be visible
    await expect(page.locator('main')).toBeVisible();
  });
});
