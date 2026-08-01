import { describe, expect, it } from 'vitest';

import {
  baseTreatmentCategories,
  getLocalizedTreatmentCategories,
} from '../treatments';

const localizedLocales = ['ka', 'ru', 'tr', 'ar', 'he'];

describe('localized treatment catalogue', () => {
  it.each(localizedLocales)('%s has no empty or English fallback content', async locale => {
    const categories = await getLocalizedTreatmentCategories(locale);

    expect(categories).toHaveLength(baseTreatmentCategories.length);

    for (const [categoryIndex, category] of categories.entries()) {
      const englishCategory = baseTreatmentCategories[categoryIndex];

      expect(category.name.trim()).not.toBe('');
      expect(category.description.trim()).not.toBe('');
      expect(category.description).not.toBe(englishCategory.description);
      expect(category.treatments).toHaveLength(englishCategory.treatments.length);

      for (const [treatmentIndex, treatment] of category.treatments.entries()) {
        const englishTreatment = englishCategory.treatments[treatmentIndex];

        expect(treatment.name.trim()).not.toBe('');
        expect(treatment.description.trim()).not.toBe('');
        expect(treatment.shortDescription.trim()).not.toBe('');
        expect(treatment.description).not.toBe(englishTreatment.description);
        expect(treatment.shortDescription).not.toBe(englishTreatment.shortDescription);
        expect(treatment.price).not.toMatch(/^(?:From|Consultation required)\b/);
        expect(treatment.duration).not.toMatch(/\b(?:minutes|week program)\b/i);
      }
    }
  });
});
