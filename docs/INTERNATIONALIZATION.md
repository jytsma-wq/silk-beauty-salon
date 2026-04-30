# Internationalization Documentation

## Overview

Silk Beauty Salon uses **next-intl** with 6 supported languages: English (en), Georgian (ka), Russian (ru), Arabic (ar), Hebrew (he), and Turkish (tr).

## Supported Locales

| Locale | Language | Direction | Flag |
|--------|----------|-----------|------|
| en | English | LTR | 🇬🇧 |
| ka | Georgian | LTR | 🇬🇪 |
| ru | Russian | LTR | 🇷🇺 |
| ar | Arabic | RTL | 🇸🇦 |
| he | Hebrew | RTL | 🇮🇱 |
| tr | Turkish | LTR | 🇹🇷 |

## Architecture

### File Structure

```
/messages/              # Translation files (en.json, ka.json, etc.)
/src/i18n/              # i18n configuration
  ├── index.ts          # Locale exports
  ├── routing.ts        # Next.js routing config
  └── request.ts        # Request-time locale detection
/src/lib/               # Utilities
  ├── i18n-formatters.ts    # Number, date, currency formatters
  ├── i18n-icu.ts           # ICU message format support
  ├── locale-detector.ts    # Smart locale detection
  └── rtl-utils.ts          # RTL support utilities
```

### Translation Files

Translations are stored in `/messages/{locale}.json` with nested JSON structure:

```json
{
  "site": {
    "title": "Premier Beauty Salon in Batumi"
  },
  "nav": {
    "treatments": "Treatments",
    "contact": "Contact"
  }
}
```

## Translation Management

### Validation Script

The translation validation script ensures translation quality:

```bash
npm run validate-translations
```

Checks performed:
- Missing translations
- Extra/unused keys
- Interpolation placeholder mismatches
- Type consistency (string vs array vs object)
- Array length mismatches
- Character encoding issues
- Length constraints

### Pre-commit Hooks

Translations are automatically validated on every commit:

```bash
# .husky/pre-commit
npx tsx scripts/validate-translations.ts || exit 1
npx lint-staged
```

Failing validation will block the commit.

## ICU Message Format

Support for advanced message formatting with `src/lib/i18n-icu.ts`:

### Pluralization

```json
{
  "items": "{count, plural, one {# item} other {# items}}"
}
```

Usage:
```typescript
import { formatIcuMessage } from '@/lib/i18n-icu';

formatIcuMessage(t('items'), { count: 5 });
// "5 items"
```

### Select (Gender)

```json
{
  "welcome": "{gender, select, male {Welcome sir} female {Welcome madam} other {Welcome}}"
}
```

### Number Formatting

```json
{
  "price": "Price: {amount, number}"
}
```

### Date/Time

```json
{
  "date": "Today: {today, date}",
  "time": "Current time: {now, time}"
}
```

## Smart Locale Detection

Automatic locale detection with priority:
1. User preference (cookie)
2. Browser Accept-Language header
3. Geolocation (IP-based country detection)
4. Default locale (en)

### Client-side API

```typescript
import { 
  getClientPreferredLocale, 
  setClientPreferredLocale 
} from '@/lib/locale-detector';

// Get stored preference
const locale = getClientPreferredLocale();

// Save preference
setClientPreferredLocale('ka');
```

### Server-side API

```typescript
import { detectLocaleFromRequest } from '@/lib/locale-detector';

const result = detectLocaleFromRequest(request);
// { locale: 'ka', source: 'cookie', confidence: 1.0 }
```

## RTL Support

### RTL Utilities

```typescript
import { 
  isRTL, 
  getTextDirection, 
  getRTLContext,
  getArrow,
  getRTLClass 
} from '@/lib/rtl-utils';

const rtl = isRTL('ar'); // true
const dir = getTextDirection('he'); // 'rtl'

// Get arrow based on direction
const arrow = getArrow('arrowRight', 'ar'); // '←' (mirrored)

// Apply RTL class
const className = getRTLClass('nav-item', 'ar'); 
// "nav-item nav-item-rtl"
```

### RTL Context Hook

```typescript
import { getRTLContext } from '@/lib/rtl-utils';

const context = getRTLContext('ar');
// {
//   isRTL: true,
//   direction: 'rtl',
//   textAlign: 'right',
//   flip: (value) => mirrored,
//   getArrow: (dir) => arrow,
//   ...
// }
```

## Formatting

### Price/Currency

```typescript
import { formatPrice } from '@/lib/i18n-formatters';

formatPrice(150, 'ka', 'GEL'); // "150 ₾"
formatPrice(150, 'en', 'USD'); // "$150"
```

### Dates

```typescript
import { formatDate, formatRelativeTime } from '@/lib/i18n-formatters';

formatDate(new Date(), 'ka'); // "2024 წლის 15 იანვარი"
formatRelativeTime(pastDate, 'en'); // "2 days ago"
```

### Numbers

```typescript
import { formatNumber } from '@/lib/i18n-formatters';

formatNumber(1234567, 'en'); // "1,234,567"
formatNumber(1234567, 'ka'); // "1 234 567"
```

## SEO for Multilingual Sites

### Hreflang Tags

Automatically generated via Next.js metadata:

```typescript
// src/app/[locale]/layout.tsx
export async function generateMetadata({ params }: Props) {
  return {
    alternates: {
      canonical: `/${params.locale}/page`,
      languages: {
        'en': '/en/page',
        'ka': '/ka/page',
        'ru': '/ru/page',
        ...
      },
    },
  };
}
```

### Sitemap

Dynamic sitemap at `src/app/[locale]/sitemap.ts`:
- Locale-specific URLs
- Hreflang alternates
- Proper change frequencies
- Priority scoring

### x-default Hreflang

The default locale (en) is marked as `x-default` for language-agnostic matching:

```xml
<link rel="alternate" hreflang="x-default" href="https://silkbeautysalon.com/en" />
```

## Performance Optimization

### Translation Loading

- Next-intl automatically code-splits translations by locale
- Only the current locale's translations are loaded client-side
- Server-side rendering includes all translations for initial paint

### Caching

Translations are cached:
- Server: In-memory during request
- Client: React Query cache with stale-while-revalidate

### Pre-compilation

ICU messages can be pre-compiled for better performance:

```typescript
import { precompileIcuMessages } from '@/lib/i18n-icu';

const messages = precompileIcuMessages({
  items: "{count, plural, one {# item} other {# items}}"
});

// Use compiled version
messages.items({ count: 5 }); // "5 items"
```

## Best Practices

### Writing Translations

1. **Use keys hierarchically**: `nav.treatments` not `navTreatments`
2. **Keep it flat**: Avoid deeply nested objects (>3 levels)
3. **Consistent naming**: Use camelCase for keys
4. **Context comments**: Add translator context

```json
{
  "booking": {
    "_comment": "Booking form and confirmation",
    "title": "Book Appointment",
    "submit": "Submit Booking"
  }
}
```

### Code Usage

```typescript
// Server component
import { getTranslations } from 'next-intl/server';

const t = await getTranslations('nav');
<h1>{t('treatments')}</h1>

// Client component
import { useTranslations } from 'next-intl';

const t = useTranslations('nav');
<Link href="/treatments">{t('treatments')}</Link>
```

### RTL Considerations

1. Always use logical CSS properties:
   ```css
   .element {
     margin-inline-start: 1rem; /* not margin-left */
     padding-inline-end: 1rem;  /* not padding-right */
   }
   ```

2. Mirror directional icons:
   ```typescript
   <ArrowLeftIcon className={isRTL ? 'scale-x-[-1]' : ''} />
   ```

3. Test RTL layouts thoroughly with Arabic/Hebrew content

## Translation Workflow

### Adding a New Translation

1. Add key to `messages/en.json` (source of truth)
2. Run `npm run validate-translations` to check
3. Add translations to other locale files
4. Commit changes (validation runs automatically)

### Translator Guidelines

- Preserve HTML tags in translations
- Keep similar character count when possible
- Use native speaker review
- Test in context (preview deployment)

## Troubleshooting

### Missing Translations

```bash
# Check for missing keys
npm run validate-translations
```

### Encoding Issues

Ensure files are UTF-8 encoded:
```bash
file -i messages/ka.json
# Should show: charset=utf-8
```

### RTL Layout Issues

1. Check `dir="rtl"` is set on `<html>`
2. Verify logical CSS properties are used
3. Test with actual RTL content, not just `dir` attribute

## References

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
- [MDN Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [Google Internationalization](https://developers.google.com/search/docs/specialty/international/)
