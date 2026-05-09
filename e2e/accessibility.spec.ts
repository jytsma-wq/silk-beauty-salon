import { test, expect } from '@playwright/test';
import { injectAxe, getViolations } from 'axe-playwright';
import type { RunOptions } from 'axe-core';

// All supported locales
const locales = ['en', 'ka', 'ru', 'tr', 'ar', 'he'] as const;
type Locale = typeof locales[number];

// RTL locales
const rtlLocales: Locale[] = ['ar', 'he'];

// WCAG 2.1 AA run options with specific rules
const wcagOptions: RunOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  },
};

// Specific accessibility rules to check
const criticalRules = [
  'color-contrast',
  'landmark-one-main',
  'region',
  'html-has-lang',
  'document-title',
];

test.describe('Accessibility Audit - All Locales', () => {
  // Test each locale's homepage
  for (const locale of locales) {
    test.describe(`Locale: ${locale}`, () => {
      test(`homepage (${locale}) should pass accessibility checks`, async ({ page }) => {
        await page.goto(`/${locale}`);

        // Inject axe-core
        await injectAxe(page);

        // Check for RTL on Arabic and Hebrew
        if (rtlLocales.includes(locale)) {
          const dir = await page.evaluate(() => document.documentElement.dir);
          expect(dir).toBe('rtl');
        }

        // Run axe checks with specific rules
        const violations = await getViolations(page, undefined, {
          ...wcagOptions,
          rules: criticalRules.reduce((acc, rule) => ({ ...acc, [rule]: { enabled: true } }), {}),
        });

        // Filter for critical and serious violations
        const criticalViolations = violations.filter(
          (v) => v.impact === 'critical' || v.impact === 'serious'
        );

        // Generate detailed report
        if (criticalViolations.length > 0) {
          console.error(`Critical/Serious violations on ${locale} homepage:`);
          criticalViolations.forEach((v) => {
            console.error(`  - ${v.id}: ${v.help} (${v.impact})`);
            v.nodes.forEach((node) => {
              console.error(`    Target: ${node.target.join(', ')}`);
              console.error(`    HTML: ${node.html.substring(0, 100)}...`);
            });
          });
        }

        expect(criticalViolations).toHaveLength(0);
      });

      test(`treatments page (${locale}) should pass accessibility checks`, async ({ page }) => {
        await page.goto(`/${locale}/treatments`);

        await injectAxe(page);

        // Run same axe audit as homepage
        const violations = await getViolations(page, undefined, wcagOptions);

        const criticalViolations = violations.filter(
          (v) => v.impact === 'critical' || v.impact === 'serious'
        );

        expect(criticalViolations).toHaveLength(0);
      });

      test(`contact form (${locale}) should have accessible inputs`, async ({ page }) => {
        // Navigate to contact page
        await page.goto(`/${locale}/contact-us`);

        // Wait for form to be visible
        await page.waitForSelector('form, input, textarea', { timeout: 5000 });

        // Check every input and textarea has associated label
        const inputs = page.locator('input:not([type="hidden"]), textarea');
        const inputCount = await inputs.count();

        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          const inputId = await input.getAttribute('id');
          const ariaLabel = await input.getAttribute('aria-label');
          const ariaLabelledBy = await input.getAttribute('aria-labelledby');
          const hasLabel = await input.getAttribute('placeholder');

          // Input must have label association via one of these methods
          let hasAssociatedLabel = false;

          if (inputId) {
            // Check for label with matching 'for' attribute
            const label = page.locator(`label[for="${inputId}"]`);
            hasAssociatedLabel = await label.isVisible().catch(() => false);
          }

          // Also check aria-label, aria-labelledby, or placeholder
          hasAssociatedLabel = hasAssociatedLabel || !!ariaLabel || !!ariaLabelledBy || !!hasLabel;

          expect(hasAssociatedLabel, `Input ${i + 1} must have an associated label`).toBe(true);
        }

        // Check submit button has visible accessible name
        const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
        if (await submitButton.isVisible().catch(() => false)) {
          // Check for accessible name via text content, aria-label, or value
          const buttonText = await submitButton.textContent().catch(() => '');
          const ariaLabel = await submitButton.getAttribute('aria-label');
          const value = await submitButton.getAttribute('value');

          const accessibleName = (buttonText?.trim() || ariaLabel?.trim() || value?.trim() || '');
          expect(accessibleName.length).toBeGreaterThan(0);
        }
      });
    });
  }

  test.describe('Focus Visibility', () => {
    for (const locale of locales) {
      test(`focus should be visible on interactive elements (${locale})`, async ({ page }) => {
        await page.goto(`/${locale}`);

        // Tab three times to reach interactive elements
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('Tab');
        }

        // Check that document.activeElement has visible outline
        const focusStyle = await page.evaluate(() => {
          const activeElement = document.activeElement;
          if (!activeElement || activeElement === document.body) {
            return null;
          }
          const style = window.getComputedStyle(activeElement);
          return {
            outline: style.outline,
            outlineWidth: style.outlineWidth,
            outlineStyle: style.outlineStyle,
            boxShadow: style.boxShadow,
          };
        });

        // If we have a focused element, check it has visible focus indicator
        if (focusStyle) {
          const hasVisibleOutline = focusStyle.outlineStyle !== 'none' &&
                                    focusStyle.outlineWidth !== '0px' &&
                                    focusStyle.outline !== '0px none rgb(0, 0, 0)';

          const hasVisibleShadow = focusStyle.boxShadow && focusStyle.boxShadow !== 'none';

          expect(
            hasVisibleOutline || hasVisibleShadow,
            'Focused element should have visible outline or box-shadow'
          ).toBe(true);
        }
      });
    }
  });

  test.describe('Specific Axe Rules', () => {
    test('should pass color-contrast check', async ({ page }) => {
      await page.goto('/en');
      await injectAxe(page);

      const violations = await getViolations(page, undefined, {
        runOnly: ['color-contrast'],
      });

      const criticalViolations = violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('should have landmark-one-main', async ({ page }) => {
      await page.goto('/en');
      await injectAxe(page);

      const violations = await getViolations(page, undefined, {
        runOnly: ['landmark-one-main'],
      });

      expect(violations).toHaveLength(0);
    });

    test('should have html-has-lang', async ({ page }) => {
      await page.goto('/en');
      await injectAxe(page);

      const violations = await getViolations(page, undefined, {
        runOnly: ['html-has-lang'],
      });

      expect(violations).toHaveLength(0);
    });

    test('should have document-title', async ({ page }) => {
      await page.goto('/en');
      await injectAxe(page);

      const violations = await getViolations(page, undefined, {
        runOnly: ['document-title'],
      });

      expect(violations).toHaveLength(0);
    });
  });
});
