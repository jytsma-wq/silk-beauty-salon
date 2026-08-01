import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { locales } from '@/i18n';
import { getOpenGraphFonts } from '@/lib/opengraph-fonts';

const openGraphRoutes = [
  'src/app/[locale]/opengraph-image.tsx',
  'src/app/[locale]/before-after/opengraph-image.tsx',
  'src/app/[locale]/blog/opengraph-image.tsx',
  'src/app/[locale]/treatments/opengraph-image.tsx',
];

describe('Open Graph fonts', () => {
  it('loads regular and bold glyph coverage for every locale', async () => {
    for (const locale of locales) {
      const fonts = await getOpenGraphFonts(locale);

      expect(fonts).toHaveLength(2);
      expect(fonts.map((font) => font.weight)).toEqual([400, 700]);
      expect(fonts.every((font) => font.data.byteLength > 1_000)).toBe(true);
    }
  });

  it('keeps every localized share card independent of remote fonts', async () => {
    for (const route of openGraphRoutes) {
      const source = await readFile(join(process.cwd(), route), 'utf8');

      expect(source).toContain('getOpenGraphFonts');
      expect(source).not.toContain('fonts.gstatic.com');
    }
  });
});
