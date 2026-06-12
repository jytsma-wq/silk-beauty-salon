# Testing Documentation

Comprehensive testing strategy for Silk Beauty Salon application.

## Table of Contents

- [Overview](#overview)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Coverage Goals](#coverage-goals)
- [CI/CD Integration](#cicd-integration)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)

## Overview

This project uses a multi-layered testing approach:

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit Tests | Vitest | Test utility functions, business logic |
| Component Tests | React Testing Library | Test React components in isolation |
| Integration Tests | Vitest + MSW | Test API routes and data flow |
| E2E Tests | Playwright | Test complete user flows |
| Accessibility Tests | axe-core + Playwright | Test WCAG compliance |
| Performance Tests | Lighthouse CI | Test Core Web Vitals |

## Test Types

### 1. Unit Tests (`src/**/*.test.ts`)

Test pure functions, utilities, and business logic.

```bash
npm run test           # Run unit tests
npm run test:watch     # Run in watch mode
npm run test:coverage  # Run with coverage report
```

**Coverage Areas:**
- `/src/lib/` - Utility functions
- `/src/lib/sanitize.ts` - Input sanitization
- `/src/lib/rate-limit.ts` - Rate limiting logic
- `/src/lib/csrf.ts` - CSRF protection
- `/src/lib/i18n-formatters.ts` - Locale formatting

### 2. Component Tests (`src/components/**/*.test.tsx`)

Test React components with React Testing Library.

```bash
npm run test -- src/components/ui/button.test.tsx
```

**Key Principles:**
- Test behavior, not implementation
- Use `screen` queries for accessibility
- Mock external dependencies
- Test user interactions

### 3. Integration Tests (`src/app/api/**/__tests__/*.test.ts`)

Test API routes and server-side logic.

```bash
npm run test -- src/app/api/__tests__
```

**Test Coverage:**
- Request validation
- Response formatting
- Error handling
- Authentication/authorization
- Rate limiting

### 4. E2E Tests (`e2e/*.spec.ts`)

Test complete user journeys with Playwright.

```bash
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Run with UI mode
npm run test:e2e -- --grep "booking"  # Run specific test
```

**Test Scenarios:**
- Homepage navigation
- Booking flow
- Contact form submission
- Newsletter signup
- Language switching
- Mobile responsiveness

### 5. Accessibility Tests

Automated accessibility testing with axe-core.

```bash
npm run test:e2e -- e2e/accessibility.spec.ts
```

**Checks:**
- WCAG 2.1 AA compliance
- Color contrast ratios
- Keyboard navigation
- ARIA labels and roles
- Screen reader compatibility

### 6. Performance Tests

Lighthouse CI for performance monitoring.

```bash
npm run test:lighthouse  # Run Lighthouse CI locally
```

**Metrics:**
- Performance: 80+ score
- Accessibility: 95+ score
- Best Practices: 90+ score
- SEO: 90+ score

## Running Tests

### Quick Commands

```bash
# All tests
npm test                    # Unit tests
npm run test:e2e           # E2E tests

# Specific test types
npm run test -- src/lib/__tests__/sanitize.test.ts
npm run test:e2e -- --project=chromium
npm run test:e2e -- --grep "booking"

# Coverage
npm run test:coverage      # Generate coverage report
open coverage/index.html   # View HTML report
```

### Development Workflow

```bash
# 1. Start development server
npm run dev

# 2. Run unit tests in watch mode
npm run test:watch

# 3. In another terminal, run E2E tests
npm run test:e2e
```

## Coverage Goals

Minimum thresholds enforced in CI:

| Metric | Threshold |
|--------|-----------|
| Statements | 80% |
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |

### Viewing Coverage

```bash
npm run test:coverage
```

Reports generated in `/coverage/`:
- `index.html` - Interactive HTML report
- `lcov.info` - LCOV format for CI integration
- `coverage-summary.json` - JSON summary

## CI/CD Integration

Tests run automatically on:
- Every Pull Request
- Push to main/master branch
- Nightly scheduled runs

### GitHub Actions Workflow

```yaml
name: Test & Build
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
```

### Required Status Checks

1. **Lint & Type Check** - ESLint and TypeScript validation
2. **Unit Tests** - Vitest with 80% coverage
3. **Build** - Production build verification
4. **E2E Tests** - Playwright tests
5. **Lighthouse CI** - Performance audit
6. **Accessibility** - WCAG compliance

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { sanitizeHtml, isValidEmail } from '@/lib/sanitize';

describe('sanitize', () => {
  it('removes dangerous HTML', () => {
    const input = '<script>alert(1)</script>Hello';
    expect(sanitizeHtml(input)).toBe('alert(1)Hello');
  });

  it('validates email format', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
  });
});
```

### Component Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i }))
      .toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('user can submit contact form', async ({ page }) => {
  await page.goto('/en/contact');
  
  await page.getByLabel(/name/i).fill('John Doe');
  await page.getByLabel(/email/i).fill('john@example.com');
  await page.getByLabel(/message/i).fill('Test message');
  
  await page.getByRole('button', { name: /send/i }).click();
  
  await expect(page.getByText(/thank you/i)).toBeVisible();
});
```

### API Test Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/contact/route';

vi.mock('@/lib/db', () => ({
  db: { contactSubmission: { create: vi.fn() } }
}));

describe('Contact API', () => {
  it('creates submission with valid data', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello'
      })
    });
    
    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

## Best Practices

### DO

- ✅ Test behavior, not implementation
- ✅ Use semantic queries (`getByRole`, `getByLabel`)
- ✅ Write tests before fixing bugs
- ✅ Keep tests focused and independent
- ✅ Use meaningful test descriptions
- ✅ Mock external dependencies
- ✅ Test edge cases and error states

### DON'T

- ❌ Test implementation details
- ❌ Write tests that pass trivially
- ❌ Ignore flaky tests - fix them
- ❌ Test multiple concerns in one test
- ❌ Use `getByTestId` as first choice
- ❌ Forget to clean up mocks
- ❌ Skip tests without good reason

### Test Organization

```
src/
├── lib/
│   ├── __tests__/
│   │   ├── sanitize.test.ts
│   │   ├── rate-limit.test.ts
│   │   └── csrf.test.ts
│   ├── sanitize.ts
│   └── ...
├── components/
│   ├── ui/
│   │   ├── __tests__/
│   │   │   └── button.test.tsx
│   │   └── button.tsx
│   └── ...
├── app/
│   └── api/
│       └── __tests__/
│           ├── contact.test.ts
│           └── csrf.test.ts
└── test/
    └── setup.ts          # Test configuration
```

### Mocking Guidelines

```typescript
// Mock SMTP delivery
vi.mock('@/lib/mailer', () => ({
  sendMail: vi.fn().mockResolvedValue({ skipped: false })
}));

// Mock database
vi.mock('@/lib/db', () => ({
  db: {
    contactSubmission: { create: vi.fn() }
  }
}));

// Mock browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn()
});
```

## Debugging Tests

### Vitest

```bash
# Debug specific test
npm run test -- --reporter=verbose src/lib/__tests__/sanitize.test.ts

# Debug with Node inspector
node --inspect-brk node_modules/vitest/vitest.mjs --run
```

### Playwright

```bash
# Debug mode
npm run test:e2e -- --debug

# Trace mode
npm run test:e2e -- --trace on

# UI mode
npm run test:e2e:ui
```

## Troubleshooting

### Common Issues

**Tests fail in CI but pass locally**
- Check for environment variable differences
- Ensure all dependencies are installed
- Verify browser versions match

**Flaky tests**
- Add explicit waits for async operations
- Use Playwright's auto-waiting features
- Avoid relying on specific timing

**Coverage not meeting thresholds**
- Check excluded files in `vitest.config.ts`
- Add tests for uncovered code paths
- Review coverage report for gaps

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [axe-core](https://www.deque.com/axe/)

---

For questions or issues with testing, please refer to the project README or create an issue.
