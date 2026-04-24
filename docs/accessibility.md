# Accessibility Documentation

This document outlines the accessibility features implemented in the Silk Beauty Salon website and provides guidance for maintaining WCAG 2.1 AA compliance.

## Overview

The Silk Beauty Salon website is built with accessibility as a core requirement. We aim to meet WCAG 2.1 AA standards and provide an inclusive experience for all users.

## Implemented Features

### 1. Focus Management

#### Focus Trap (`use-focus-trap.ts`)
- Traps focus within modals and drawers
- Returns focus to the trigger element when closed
- Handles Tab and Shift+Tab cycling
- Disables body scroll when active
- Supports Escape key to close

#### Focus Visible (`use-focus-visible.ts`)
- Shows focus rings only for keyboard navigation
- Hides focus rings for mouse/touch users
- Applies proper `:focus-visible` behavior polyfill

### 2. ARIA & Form Error Handling

#### Contact Form (`contact-us/page.tsx`)
- `aria-required="true"` for required fields
- `aria-invalid` dynamically set based on validation
- `aria-describedby` linking to error messages
- `role="alert"` and `aria-live="polite"` for error announcements
- Field-level validation with clear error messaging
- Screen reader announcements for global errors

### 3. Semantic Landmarks

#### Header (`Header.tsx`)
- `role="banner"` on header element
- `aria-label` on navigation
- `aria-haspopup` and `aria-expanded` for dropdowns
- `role="menu"` for dropdown containers

#### Footer (`Footer.tsx`)
- `role="contentinfo"` on footer element

#### Layout (`layout.tsx`)
- `<main id="main-content">` landmark
- Skip links navigation for keyboard users

### 4. Skip Links

Enhanced skip navigation with multiple targets:
- Skip to main content (`#main-content`)
- Skip to treatments (`#treatments`)
- Skip to booking (`#booking`)

### 5. Screen Reader Announcements

#### Announcer Component (`announcer.tsx`)
- `useAnnouncer()` hook for programmatic announcements
- `aria-live="polite"` for success/loading states
- `aria-live="assertive"` for error states
- Auto-clearing messages after specified duration

## Automated Testing

### axe-playwright Integration

We use `axe-playwright` for automated accessibility testing:

```bash
# Run accessibility tests
npm run test:e2e

# Run specific accessibility tests
npx playwright test accessibility.spec.ts
```

### Test Coverage

Our E2E tests check:
- WCAG 2.1 AA compliance (critical/serious violations)
- Proper heading structure (single `<h1>`, no skipped levels)
- Alt text on images
- Focusable interactive elements
- Color contrast ratios
- Skip link presence
- Keyboard navigation
- Escape key functionality for modals

### CI/CD Integration

Tests fail on:
- Critical violations
- Serious violations
- Keyboard navigation failures

## Known Issues & Workarounds

None currently documented. Run `npm run test:e2e` to check for violations.

## Guidelines for Contributors

### When Adding New Components

1. **Use semantic HTML** - Prefer `<button>` over `div onClick`
2. **Add ARIA labels** - Always include `aria-label` for icon buttons
3. **Manage focus** - Use `use-focus-trap` for modals
4. **Announce changes** - Use `useAnnouncer` for dynamic content
5. **Test keyboard** - Verify Tab, Shift+Tab, Escape, Enter keys work

### Color Contrast

- Text: minimum 4.5:1 contrast ratio
- Large text (18pt+): minimum 3:1 contrast ratio
- UI components: minimum 3:1 contrast ratio

### Focus Indicators

- Visible focus rings for keyboard users
- Use `focus-visible:ring-2 focus-visible:ring-gold` pattern
- Never remove focus styles completely

### Motion & Animation

- Respect `prefers-reduced-motion`
- Disable non-essential animations when user prefers reduced motion

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://dequeuniversity.com/rules/axe/4.9)
- [MDN ARIA Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

## Contact

For accessibility concerns or issues, please contact the development team.
