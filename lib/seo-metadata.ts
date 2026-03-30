import type { Metadata } from 'next';

interface GenerateMetadataProps {
  params: { slug: string; locale: string };
}

interface TreatmentData {
  name: string;
  description: string;
  image?: string;
  price?: number;
  duration?: string;
}

const baseUrl = 'https://silkbeautybatumi.ge';
const siteName = 'Silk Beauty Salon';
const locales = ['en', 'ka', 'ru', 'he', 'ar', 'tr'];
const defaultLocale = 'en';

/**
 * Dynamic metadata generator for treatment pages
 * Usage: export const generateMetadata = createTreatmentMetadata();
 */
export function createTreatmentMetadata(getTreatmentData: (slug: string, locale: string) => Promise<TreatmentData | null>) {
  return async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const { slug, locale } = params;
    const treatment = await getTreatmentData(slug, locale);

    if (!treatment) {
      return {
        title: 'Treatment Not Found',
        robots: { index: false, follow: false },
      };
    }

    const url = `${baseUrl}/${locale}/treatments/${slug}`;
    const title = `${treatment.name} | ${siteName}`;
    const description = treatment.description.slice(0, 160);

    return {
      title,
      description,
      keywords: [
        treatment.name.toLowerCase(),
        `${treatment.name.toLowerCase()} Batumi`,
        'aesthetic treatment',
        'beauty salon',
        'Batumi Georgia',
      ],
      alternates: {
        canonical: url,
        languages: locales.reduce(
          (acc, loc) => ({
            ...acc,
            [loc]: `${baseUrl}/${loc}/treatments/${slug}`,
          }),
          {}
        ),
      },
      openGraph: {
        title,
        description,
        url,
        siteName,
        locale: locale === 'en' ? 'en_US' : locale === 'ka' ? 'ka_GE' : locale === 'ru' ? 'ru_RU' : locale === 'he' ? 'he_IL' : locale === 'ar' ? 'ar_SA' : 'tr_TR',
        type: 'article',
        images: treatment.image
          ? [
              {
                url: treatment.image,
                width: 1200,
                height: 630,
                alt: `${treatment.name} at ${siteName}`,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: treatment.image ? [treatment.image] : undefined,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  };
}

/**
 * Static page metadata generator
 * Usage: export const metadata = createStaticMetadata('About Us', '/about', 'Learn about our luxury beauty salon...');
 */
export function createStaticMetadata(
  title: string,
  path: string,
  description: string,
  options?: {
    keywords?: string[];
    ogImage?: string;
    noIndex?: boolean;
  }
): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      siteName,
      'beauty salon Batumi',
      'aesthetic clinic Georgia',
      ...(options?.keywords || []),
    ],
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${baseUrl}/en${path}`,
        'ka-GE': `${baseUrl}/ka${path}`,
        'ru-RU': `${baseUrl}/ru${path}`,
        'he-IL': `${baseUrl}/he${path}`,
        'ar-SA': `${baseUrl}/ar${path}`,
        'tr-TR': `${baseUrl}/tr${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: 'website',
      images: options?.ogImage
        ? [
            {
              url: options.ogImage,
              width: 1200,
              height: 630,
              alt: fullTitle,
            },
          ]
        : [
            {
              url: '/og-image.jpg',
              width: 1200,
              height: 630,
              alt: fullTitle,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: options?.ogImage ? [options.ogImage] : ['/og-image.jpg'],
    },
    robots: options?.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
        },
  };
}
