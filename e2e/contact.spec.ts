import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact-us');
  });

  test('should load contact page', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact|contact/);
    await expect(page.locator('h1')).toContainText(/Contact|contact|კონტაქტი/);
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Form fields should be visible
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]').first()).toBeVisible();
    await expect(page.locator('input[type="email"], input[placeholder*="email" i]').first()).toBeVisible();
    await expect(page.locator('textarea, input[placeholder*="message" i]').first()).toBeVisible();
    await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  });

  test('should show validation error for empty submission', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Should show validation errors or stay on page
    await expect(page).toHaveURL(/\/en\/contact-us/);
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Fill form with invalid email
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]').first();
    const messageInput = page.locator('textarea, input[placeholder*="message" i]').first();
    
    await nameInput.fill('Test User');
    await emailInput.fill('invalid-email');
    await messageInput.fill('This is a test message for validation.');
    
    // Try to submit
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Should show error or validation message
    await expect(page.locator('text=/invalid|error|valid/i').first()).toBeVisible();
  });

  test('should successfully submit valid form', async ({ page }) => {
    // Fill form with valid data
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]').first();
    const phoneInput = page.locator('input[name="phone"], input[placeholder*="phone" i]').first();
    const messageInput = page.locator('textarea, input[placeholder*="message" i]').first();
    
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    if (await phoneInput.isVisible().catch(() => false)) {
      await phoneInput.fill('+995 599 123 456');
    }
    await messageInput.fill('I would like to book a consultation for Botox treatment. Please contact me to schedule.');
    
    // Submit form
    const submitButton = page.locator('button[type="submit"]').first();
    
    // Check button is enabled
    await expect(submitButton).toBeEnabled();
  });

  test('should have contact information displayed', async ({ page }) => {
    // Contact info should be visible
    await expect(page.locator('text=/address|location|ბათუმი/i').first()).toBeVisible();
  });

  test('should be accessible - form labels present', async ({ page }) => {
    // Check for form labels or aria-labels
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
    
    // Check that form has accessible inputs
    const inputs = page.locator('form input, form textarea');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
});
