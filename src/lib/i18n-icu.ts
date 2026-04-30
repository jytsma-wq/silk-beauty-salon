/**
 * ICU Message Format Parser for Silk Beauty Salon
 * Supports pluralization, gender, select, and number formatting
 */

export type IcuPluralType = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export interface IcuMessageOptions {
  count?: number;
  gender?: 'male' | 'female' | 'other';
  [key: string]: unknown;
}

/**
 * Parse and format an ICU message with variables
 * @param message - ICU message string
 * @param values - Values to interpolate
 * @returns Formatted string
 */
export function formatIcuMessage(
  message: string,
  values: Record<string, string | number>
): string {
  // Handle simple variable interpolation {variableName}
  let result = message.replace(/\{(\w+)\}/g, (match, key) => {
    if (key in values) {
      return String(values[key]);
    }
    return match; // Keep original if not found
  });

  // Handle plural forms: {count, plural, one {# item} other {# items}}
  result = result.replace(
    /\{(\w+),\s*plural,\s*([^}]+)\}/g,
    (match, countKey, pluralForms) => {
      const count = Number(values[countKey]);
      if (Number.isNaN(count)) {
        return match;
      }

      const forms = parsePluralForms(pluralForms);
      const form = selectPluralForm(count, forms);
      return form.replace(/#/g, String(count));
    }
  );

  // Handle select: {gender, select, male {he} female {she} other {they}}
  result = result.replace(
    /\{(\w+),\s*select,\s*([^}]+)\}/g,
    (match, selectKey, selectForms) => {
      const value = String(values[selectKey] || 'other');
      const forms = parseSelectForms(selectForms);
      return forms[value] || forms.other || match;
    }
  );

  // Handle number formatting: {num, number}
  result = result.replace(
    /\{(\w+),\s*number\}/g,
    (match, key) => {
      const num = Number(values[key]);
      if (Number.isNaN(num)) {
        return match;
      }
      return new Intl.NumberFormat().format(num);
    }
  );

  // Handle date formatting: {date, date}
  result = result.replace(
    /\{(\w+),\s*date\}/g,
    (match, key) => {
      const date = values[key];
      if (typeof date !== 'object' || date === null || !('getTime' in date)) {
        return match;
      }
      return (date as Date).toLocaleDateString();
    }
  );

  // Handle time formatting: {time, time}
  result = result.replace(
    /\{(\w+),\s*time\}/g,
    (match, key) => {
      const time = values[key];
      if (typeof time !== 'object' || time === null || !('getTime' in time)) {
        return match;
      }
      return (time as Date).toLocaleTimeString();
    }
  );

  return result;
}

/**
 * Parse plural forms from ICU string
 */
function parsePluralForms(pluralString: string): Record<IcuPluralType, string> {
  const forms: Partial<Record<IcuPluralType, string>> = {};
  const regex = /(\w+)\s*\{([^}]*)\}/g;
  let match;

  while ((match = regex.exec(pluralString)) !== null) {
    const type = match[1] as IcuPluralType;
    forms[type] = match[2].trim();
  }

  return forms as Record<IcuPluralType, string>;
}

/**
 * Parse select forms from ICU string
 */
function parseSelectForms(selectString: string): Record<string, string> {
  const forms: Record<string, string> = {};
  const regex = /(\w+)\s*\{([^}]*)\}/g;
  let match;

  while ((match = regex.exec(selectString)) !== null) {
    const key = match[1];
    forms[key] = match[2].trim();
  }

  return forms;
}

/**
 * Select the appropriate plural form based on count
 * Uses CLDR plural rules (simplified for major languages)
 */
function selectPluralForm(
  count: number,
  forms: Record<IcuPluralType, string | undefined>
): string {
  // Check specific forms first
  if (count === 0 && forms.zero) {
    return forms.zero;
  }
  if (count === 1 && forms.one) {
    return forms.one;
  }
  if (count === 2 && forms.two) {
    return forms.two;
  }
  if (forms.few || forms.many) {
    // Complex plural rules would go here
    // For simplicity, use 'few' for 2-4, 'many' for 5+
    if (count >= 2 && count <= 4 && forms.few) {
      return forms.few;
    }
    if (count >= 5 && forms.many) {
      return forms.many;
    }
  }

  // Fallback to 'other' (required)
  return forms.other || '';
}

/**
 * Create plural rules for a specific locale
 * @param locale - Locale code
 * @returns Plural rule function
 */
export function createPluralRule(locale: string): (n: number) => IcuPluralType {
  // CLDR plural rules (simplified)
  const rules: Record<string, (n: number) => IcuPluralType> = {
    // English, German, Dutch, Swedish, etc.
    en: (n) => (n === 1 ? 'one' : 'other'),
    de: (n) => (n === 1 ? 'one' : 'other'),
    nl: (n) => (n === 1 ? 'one' : 'other'),

    // French (0 treated as singular)
    fr: (n) => (n >= 0 && n < 2 ? 'one' : 'other'),

    // Russian, Ukrainian, Belarusian
    ru: (n) => {
      if (n % 10 === 1 && n % 100 !== 11) return 'one';
      if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return 'few';
      if (n % 10 === 0 || [5, 6, 7, 8, 9].includes(n % 10) || [11, 12, 13, 14].includes(n % 100)) return 'many';
      return 'other';
    },

    // Polish
    pl: (n) => {
      if (n === 1) return 'one';
      if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return 'few';
      return 'many';
    },

    // Arabic
    ar: (n) => {
      if (n === 0) return 'zero';
      if (n === 1) return 'one';
      if (n === 2) return 'two';
      if (n % 100 >= 3 && n % 100 <= 10) return 'few';
      if (n % 100 >= 11) return 'many';
      return 'other';
    },

    // Hebrew
    he: (n) => {
      if (n === 1) return 'one';
      if (n === 2) return 'two';
      if (n >= 3 && n <= 10) return 'many';
      return 'other';
    },

    // Turkish
    tr: (_n) => 'other',

    // Georgian
    ka: (_n) => 'other',
  };

  // Extract base locale
  const baseLocale = locale.split('-')[0];
  return rules[baseLocale] || rules.en;
}

/**
 * Format a message with ICU plural support
 * @param message - Message with ICU plural syntax
 * @param count - Count value
 * @param locale - Locale for plural rules
 * @param values - Additional values
 * @returns Formatted message
 */
export function formatPlural(
  message: string,
  count: number,
  locale: string,
  values?: Record<string, string | number>
): string {
  const allValues = { count, ...values };
  return formatIcuMessage(message, allValues);
}

/**
 * Precompile ICU messages for performance
 * @param messages - Record of ICU messages
 * @returns Compiled message functions
 */
export function precompileIcuMessages(
  messages: Record<string, string>
): Record<string, (values?: Record<string, string | number>) => string> {
  const compiled: Record<string, (values?: Record<string, string | number>) => string> = {};

  for (const [key, message] of Object.entries(messages)) {
    compiled[key] = (values = {}) => formatIcuMessage(message, values);
  }

  return compiled;
}
