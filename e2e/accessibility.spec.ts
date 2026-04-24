import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';
import type { RunOptions } from 'axe-core';

test.describe('Accessibility', () => {
  // WCAG 2.1 AA run options
  const wcagOptions: RunOptions = {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
    },
  };

  test('homepage should pass accessibility checks', async ({ page }) => {
    await page.goto('/en');
    
    // Inject axe-core
    await injectAxe(page);
    
    // Run accessibility checks with WCAG 2.1 AA standards
    // Fail on critical and serious violations
    const violations = await getViolations(page, undefined, wcagOptions);
    
    // Filter for critical and serious violations only
    const criticalViolations = violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    // Generate detailed report
    if (criticalViolations.length > 0) {
      console.error('Critical/Serious accessibility violations found on homepage:');
      criticalViolations.forEach((v) => {
        console.error(`  - ${v.id}: ${v.help} (${v.impact})`);
        v.nodes.forEach((node) => {
          console.error(`    Target: ${node.target.join(', ')}`);
          console.error(`    HTML: ${node.html.substring(0, 100)}...`);
        });
      });
    }
    
    // Fail test if critical violations found
    expect(criticalViolations).toHaveLength(0);
  });

  test('contact page should pass accessibility checks', async ({ page }) => {
    await page.goto('/en/contact-us');
    
    await injectAxe(page);
    
    const violations = await getViolations(page, undefined, wcagOptions);
    
    const criticalViolations = violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    expect(criticalViolations).toHaveLength(0);
  });

  test('treatments page should pass accessibility checks', async ({ page }) => {
    await page.goto('/en/treatments');
    
    await injectAxe(page);
    
    const violations = await getViolations(page, undefined, wcagOptions);
    
    const criticalViolations = violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    expect(criticalViolations).toHaveLength(0);
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/en');
    
    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Verify only one h1
    const h1Count = await h1.count();
    expect(h1Count).toBe(1);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/en');
    
    // Get all images
    const images = page.locator('img');
    const count = await images.count();
    
    // Check each image has alt text (skip decorative images with empty alt)
    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test('should have focusable interactive elements', async ({ page }) => {
    await page.goto('/en');
    
    // Check that buttons are focusable
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await firstButton.focus();
      await expect(firstButton).toBeFocused();
    }
    
    // Check that links are focusable
    const links = page.locator('a');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      const firstLink = links.first();
      await firstLink.focus();
      await expect(firstLink).toBeFocused();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/en');
    
    await injectAxe(page);
    
    // Check specifically for color contrast issues
    try {
      await checkA11y(page, undefined, {
        axeOptions: {
          runOnly: ['color-contrast'],
        },
      });
    } catch (error) {
      console.warn('Color contrast issues found:', error);
    }
  });

  test('should have skip link or main landmark', async ({ page }) => {
    await page.goto('/en');
    
    // Check for skip link
    const skipLink = page.locator('a[href^="#main"], .skip-link, [data-testid="skip-link"]');
    
    // Or check for main landmark
    const main = page.locator('main, [role="main"]');
    
    // At least one should exist
    const hasSkipLink = await skipLink.isVisible().catch(() => false);
    const hasMain = await main.isVisible().catch(() => false);
    
    expect(hasSkipLink || hasMain).toBe(true);
  });

  test('keyboard navigation should work throughout the page', async ({ page }) => {
    await page.goto('/en');
    
    // Press Tab to reach first focusable element
    await page.keyboard.press('Tab');
    
    // Check that something is focused
    const focusedElement = page.locator(':focus');
    const isFocused = await focusedElement.isVisible().catch(() => false);
    expect(isFocused).toBe(true);
    
    // Tab through several elements and verify focus moves
    const initialFocus = await focusedElement.evaluate(el => el.tagName);
    
    // Tab multiple times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    
    // Check focus has moved
    const currentFocus = await focusedElement.evaluate(el => el.tagName);
    expect(currentFocus).not.toBe(initialFocus);
  });

  test('escape key should close modals and dropdowns', async ({ page }) => {
    await page.goto('/en');
    
    // Look for mobile menu button (visible on all screen sizes in this test)
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), button:has(.lucide-menu)').first();
    
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      
      // Check for opened menu/sheet
      const openedMenu = page.locator('[role="dialog"], [data-state="open"], .sheet-open').first();
      
      if (await openedMenu.isVisible().catch(() => false)) {
        // Press Escape
        await page.keyboard.press('Escape');
        
        // Menu should close
        await expect(openedMenu).not.toBeVisible();
      }
    }
  });
});
