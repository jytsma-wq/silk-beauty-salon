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

    await expect(page.getByRole('heading', { name: /book an appointment/i })).toBeVisible();
    await expect(page.getByLabel(/select service/i)).toBeVisible();
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/phone number/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByText(/consultation types/i)).toBeVisible();
  });

  test('sidebar consultation cards prefill the service draft', async ({ page }) => {
    await page.goto('/en/book');

    await page.getByRole('button', { name: /facial consultation/i }).first().click();

    await expect(page.getByLabel(/select service/i)).toHaveValue('Facial Consultation');
  });

  test('submits an appointment request through the slot-based API', async ({ page }) => {
    let postedBody: Record<string, unknown> | undefined;

    await page.route('**/api/bookings', async (route) => {
      postedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'booking-123', status: 'PENDING' }),
      });
    });

    await page.goto('/en/book');
    await page.getByLabel(/select service/i).selectOption('Facial Consultation');
    await page.getByLabel(/full name/i).fill('Test User');
    await page.getByLabel(/phone number/i).fill('+995 599 123 456');
    await page.getByLabel(/email address/i).fill('test@example.com');

    await page.locator('[role="gridcell"] button:not([disabled])').first().click();

    const firstSlot = page.locator('button').filter({ hasText: /\d{2}:00 - \d{2}:00/ }).first();
    const selectedSlot = (await firstSlot.textContent())?.trim() ?? '';
    await firstSlot.click();
    await page.getByRole('button', { name: /request booking/i }).click();

    await expect(page.getByText(/booking request submitted/i)).toBeVisible();
    expect(postedBody).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+995 599 123 456',
      service: 'Facial Consultation',
      timeSlot: selectedSlot,
      message: '',
    });
  });
});
