import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Locale } from '@/i18n';

const fontFiles: Record<Locale, { regular: string; bold: string }> = {
  en: {
    regular: 'cormorant-garamond-latin-ext-400-normal.woff2',
    bold: 'cormorant-garamond-latin-ext-700-normal.woff2',
  },
  tr: {
    regular: 'cormorant-garamond-latin-ext-400-normal.woff2',
    bold: 'cormorant-garamond-latin-ext-700-normal.woff2',
  },
  ru: {
    regular: 'cormorant-garamond-cyrillic-400-normal.woff2',
    bold: 'cormorant-garamond-cyrillic-700-normal.woff2',
  },
  ka: {
    regular: 'noto-sans-georgian-georgian-400-normal.woff2',
    bold: 'noto-sans-georgian-georgian-700-normal.woff2',
  },
  ar: {
    regular: 'noto-sans-arabic-arabic-400-normal.woff2',
    bold: 'noto-sans-arabic-arabic-700-normal.woff2',
  },
  he: {
    regular: 'noto-sans-hebrew-hebrew-400-normal.woff2',
    bold: 'noto-sans-hebrew-hebrew-700-normal.woff2',
  },
};

async function readFont(filename: string): Promise<ArrayBuffer> {
  const font = await readFile(
    join(process.cwd(), 'public', 'fonts', 'opengraph', filename),
  );
  return font.buffer.slice(
    font.byteOffset,
    font.byteOffset + font.byteLength,
  ) as ArrayBuffer;
}

export async function getOpenGraphFonts(locale: Locale) {
  const files = fontFiles[locale];
  const [regular, bold] = await Promise.all([
    readFont(files.regular),
    readFont(files.bold),
  ]);

  return [
    {
      name: 'OpenGraphFont',
      data: regular,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'OpenGraphFont',
      data: bold,
      weight: 700 as const,
      style: 'normal' as const,
    },
  ];
}
