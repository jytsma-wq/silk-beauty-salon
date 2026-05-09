import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const revalidate = 86400;

const legacyCategoryAnchors: Record<string, string> = {
  botox: 'botox',
  'dermal-fillers': 'dermal-fillers',
  'skin-treatments': 'skin-treatments',
  'laser-treatments': 'laser-treatments',
  'hair-and-hair-extensions': 'hair-treatments',
  nails: 'nails',
  lashes: 'lashes',
};

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  const slugs = Object.keys(legacyCategoryAnchors);

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export default async function TreatmentCategoryRedirectPage({ params }: Props) {
  const { locale, slug } = await params;
  const anchor = legacyCategoryAnchors[slug] ?? 'botox';

  redirect(`/${locale}/treatments#${anchor}`);
}
