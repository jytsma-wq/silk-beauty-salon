import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS
 * Removes all dangerous HTML and scripts
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize HTML allowing basic formatting tags
 * For rich text inputs (comments, descriptions)
 */
export function sanitizeRichText(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitize plain text - removes all HTML
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).replace(/<[^>]*>/g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize and validate email
 */
export function sanitizeEmail(email: string): string | null {
  const sanitized = sanitizeText(email).toLowerCase().trim();
  return isValidEmail(sanitized) ? sanitized : null;
}

/**
 * Sanitize phone number - remove non-numeric chars
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '').slice(0, 20);
}

/**
 * Validate name - letters, spaces, hyphens only
 */
export function isValidName(name: string): boolean {
  const nameRegex = /^[\p{L}\s'-]+$/u;
  return nameRegex.test(name) && name.length <= 100;
}

/**
 * Sanitize name input
 */
export function sanitizeName(name: string): string {
  return sanitizeText(name).slice(0, 100).trim();
}

/**
 * Sanitize URL - validate and clean
 */
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Only allow http and https
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

// SQL injection patterns
const SQL_INJECTION_PATTERNS = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
  /((\%27)|(\'))union/i,
  /exec(\s|\+)+(s|x)p\w+/i,
  /UNION\s+SELECT/i,
  /INSERT\s+INTO/i,
  /DELETE\s+FROM/i,
  /DROP\s+TABLE/i,
];

/**
 * Check for SQL injection patterns
 */
export function containsSqlInjection(input: string): boolean {
  return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input));
}

// NoSQL injection patterns
const NOSQL_INJECTION_PATTERNS = [
  /\$where/i,
  /\$gt/i,
  /\$gte/i,
  /\$lt/i,
  /\$lte/i,
  /\$ne/i,
  /\$regex/i,
  /\$options/i,
  /\$or/i,
  /\$and/i,
  /\{.*\$.*:/,
];

/**
 * Check for NoSQL injection patterns
 */
export function containsNoSqlInjection(input: string): boolean {
  return NOSQL_INJECTION_PATTERNS.some(pattern => pattern.test(input));
}

/**
 * Comprehensive input validation
 * Returns sanitized value or null if invalid/dangerous
 */
export function validateInput(
  input: string,
  type: 'text' | 'email' | 'phone' | 'name' | 'html' | 'richtext' = 'text'
): string | null {
  // Check for injection attacks first
  if (containsSqlInjection(input) || containsNoSqlInjection(input)) {
    console.warn('Potential injection attack detected:', input.substring(0, 50));
    return null;
  }

  switch (type) {
    case 'email':
      return sanitizeEmail(input);
    case 'phone':
      const phone = sanitizePhone(input);
      return phone.length >= 7 ? phone : null;
    case 'name':
      const name = sanitizeName(input);
      return isValidName(name) ? name : null;
    case 'html':
      return sanitizeHtml(input);
    case 'richtext':
      return sanitizeRichText(input);
    case 'text':
    default:
      return sanitizeText(input);
  }
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null) {
      (result as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  
  return result;
}
