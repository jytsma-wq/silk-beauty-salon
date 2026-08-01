import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const locales = ['en', 'ka', 'ru', 'tr', 'ar', 'he'] as const;
const expectedDurations = {
  facial: 45,
  skin: 45,
  body: 45,
  virtual: 30,
} as const;

type BookingMessages = {
  bookingPage: {
    consultations: Record<keyof typeof expectedDurations, { duration: string }>;
    faq: { a2: string; a3: string; a4: string };
  };
  beforeAfterPage: { sectionLabel: string; startJourney: string };
};

describe('localized booking copy', () => {
  it.each(locales)('%s preserves the published booking facts', async (locale) => {
    const messages = JSON.parse(
      await readFile(join(process.cwd(), 'messages', `${locale}.json`), 'utf8'),
    ) as BookingMessages;

    for (const [key, minutes] of Object.entries(expectedDurations)) {
      const duration = messages.bookingPage.consultations[
        key as keyof typeof expectedDurations
      ].duration;

      expect(Number(duration.match(/\d+/u)?.[0])).toBe(minutes);
    }

    const policyAnswers = [
      messages.bookingPage.faq.a2,
      messages.bookingPage.faq.a3,
      messages.bookingPage.faq.a4,
    ].join(' ');

    expect(policyAnswers).not.toMatch(/(?:20\s*%|\b48\b|\b24\b)/u);
    expect(messages.beforeAfterPage.startJourney.trim()).not.toBe('');
    expect(messages.beforeAfterPage.startJourney).not.toBe(
      messages.beforeAfterPage.sectionLabel,
    );
  });
});
