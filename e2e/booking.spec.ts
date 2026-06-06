import { test, expect } from '@playwright/test';

test.describe('Appointment booking page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/csrf', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'test-csrf-token' }),
      });
    });

    await page.route('**/api/bookings?date=*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ bookedSlots: [] }),
      });
    });
  });

  test('renders the appointment app as the booking entry point', async ({ page }) => {
    await page.goto('/en/book');

    await expect(page.getByRole('link', { name: /silk beauty salon/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /^services$/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^staff$/i })).toBeVisible();
    await expect(page.getByPlaceholder(/search for service/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /consultation services/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /botox injectables/i })).toBeVisible();
  });

  test('service selection opens the staff step', async ({ page }) => {
    await page.goto('/en/book');

    await page.getByRole('button', { name: /facial consultation/i }).first().click();

    await expect(page.getByText(/1 service selected/i)).toBeVisible();
    await page.getByRole('button', { name: /^details$/i }).click();
    await expect(page.getByText(/discuss anti-wrinkle treatments/i)).toBeVisible();

    await page.getByRole('button', { name: /^book$/i }).click();

    await expect(page.getByRole('heading', { name: /select staff/i })).toBeVisible();
    await expect(page.getByPlaceholder(/search for staff member/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /no preference/i })).toBeVisible();
  });

  test('submits an appointment request through the slot-based API', async ({ page }) => {
    let postedBody: Record<string, unknown> | undefined;

    await page.route('**/api/bookings', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.fallback();
        return;
      }

      postedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'booking-123', status: 'PENDING' }),
      });
    });

    await page.goto('/en/book');
    await page.getByRole('button', { name: /facial consultation/i }).first().click();
    await page.getByRole('button', { name: /^book$/i }).click();
    await page.getByRole('button', { name: /no preference/i }).click();

    await expect(page.getByRole('heading', { name: /select date & time/i })).toBeVisible();
    await page.locator('[role="gridcell"] button:not([disabled])').nth(2).click();

    const firstSlot = page.getByRole('button', { name: /\d{2}:00 - \d{2}:00/ }).first();
    const selectedSlot = (await firstSlot.textContent())?.trim() ?? '';
    await firstSlot.click();

    await page.getByLabel(/full name/i).fill('Test User');
    await page.getByLabel(/phone number/i).fill('+995 599 123 456');
    await page.getByLabel(/email address/i).fill('test@example.com');
    await page.getByRole('button', { name: /request booking/i }).click();

    await expect(page.getByText(/booking request submitted/i)).toBeVisible();
    expect(postedBody).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+995 599 123 456',
      service: 'Facial Consultation',
      timeSlot: selectedSlot,
      message: 'Staff preference: No preference',
    });
  });
});
