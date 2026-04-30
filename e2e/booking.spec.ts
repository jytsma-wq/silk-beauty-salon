import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
  });

  test('can open booking dialog from homepage', async ({ page }) => {
    // Click the booking button
    const bookingButton = page.getByRole('button', { name: /book appointment/i });
    await expect(bookingButton).toBeVisible();
    await bookingButton.click();

    // Verify booking dialog opens
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(/book your appointment/i);
  });

  test('booking form has all required fields', async ({ page }) => {
    await page.getByRole('button', { name: /book appointment/i }).click();
    
    const dialog = page.getByRole('dialog');
    
    // Check form fields exist
    await expect(dialog.getByLabel(/full name/i)).toBeVisible();
    await expect(dialog.getByLabel(/email address/i)).toBeVisible();
    await expect(dialog.getByLabel(/phone number/i)).toBeVisible();
    await expect(dialog.getByLabel(/select service/i)).toBeVisible();
    await expect(dialog.getByLabel(/preferred date/i)).toBeVisible();
  });

  test('shows validation errors for empty form submission', async ({ page }) => {
    await page.getByRole('button', { name: /book appointment/i }).click();
    
    const dialog = page.getByRole('dialog');
    
    // Try to submit empty form
    await dialog.getByRole('button', { name: /confirm booking/i }).click();
    
    // Check validation messages
    await expect(dialog.getByText(/name must be at least 2 characters/i)).toBeVisible();
    await expect(dialog.getByText(/please enter a valid email/i)).toBeVisible();
  });

  test('can select a treatment from dropdown', async ({ page }) => {
    await page.getByRole('button', { name: /book appointment/i }).click();
    
    const dialog = page.getByRole('dialog');
    
    // Open service dropdown
    await dialog.getByLabel(/select service/i).click();
    
    // Select a treatment
    await page.getByRole('option', { name: /botox/i }).first().click();
    
    // Verify selection
    await expect(dialog.getByLabel(/select service/i)).toContainText(/botox/i);
  });

  test('can navigate calendar to select date', async ({ page }) => {
    await page.getByRole('button', { name: /book appointment/i }).click();
    
    const dialog = page.getByRole('dialog');
    
    // Open date picker
    await dialog.getByLabel(/preferred date/i).click();
    
    // Navigate to next month
    await page.getByRole('button', { name: /go to next month/i }).click();
    
    // Select a date
    await page.getByRole('gridcell').filter({ hasNot: page.locator('[aria-disabled="true"]') }).first().click();
    
    // Verify date is selected (dialog closes)
    await expect(page.getByRole('grid')).not.toBeVisible();
  });

  test('submits booking form successfully', async ({ page }) => {
    await page.getByRole('button', { name: /book appointment/i }).click();
    
    const dialog = page.getByRole('dialog');
    
    // Fill form
    await dialog.getByLabel(/full name/i).fill('Test User');
    await dialog.getByLabel(/email address/i).fill('test@example.com');
    await dialog.getByLabel(/phone number/i).fill('+995 599 123 456');
    
    // Select service
    await dialog.getByLabel(/select service/i).click();
    await page.getByRole('option').first().click();
    
    // Select date
    await dialog.getByLabel(/preferred date/i).click();
    await page.getByRole('gridcell').filter({ hasNot: page.locator('[aria-disabled="true"]') }).first().click();
    
    // Select time
    await dialog.getByLabel(/preferred time/i).click();
    await page.getByRole('option').first().click();
    
    // Submit form
    await dialog.getByRole('button', { name: /confirm booking/i }).click();
    
    // Wait for success message
    await expect(dialog.getByText(/booking confirmed/i)).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Mobile Booking', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  test('booking dialog is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.getByRole('button', { name: /book appointment/i }).click();
    
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Check dialog fits within viewport
    const box = await dialog.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });
});
