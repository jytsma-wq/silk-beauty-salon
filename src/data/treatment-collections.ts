export type TreatmentCollectionService = {
  title: string;
  description: string;
  duration?: string;
};

export type TreatmentCollection = {
  slug:
    | 'botox'
    | 'dermal-fillers'
    | 'skin-treatments'
    | 'laser-treatments'
    | 'hair-and-hair-extensions'
    | 'nails'
    | 'lashes';
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  treatmentSlugs?: string[];
  services?: TreatmentCollectionService[];
};

export const treatmentCollections: TreatmentCollection[] = [
  {
    slug: 'botox',
    title: 'Botox',
    eyebrow: 'Injectables',
    description:
      'A focused edit of anti-wrinkle, therapeutic, and facial-balancing neuromodulator treatments.',
    image:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1800&q=85',
    treatmentSlugs: ['anti-wrinkle', 'masseter-botox', 'hyperhidrosis', 'migraine-treatment'],
  },
  {
    slug: 'dermal-fillers',
    title: 'Dermal fillers',
    eyebrow: 'Volume and contour',
    description:
      'Lips, cheeks, chin, jawline, tear trough, and profile-balancing treatments built around facial harmony.',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1800&q=85',
    treatmentSlugs: [
      'lip-fillers',
      'cheek-fillers',
      'chin-fillers',
      'jaw-fillers',
      'tear-trough',
      'non-surgical-rhinoplasty',
    ],
  },
  {
    slug: 'skin-treatments',
    title: 'Skin treatments',
    eyebrow: 'Skin quality',
    description:
      'A curated mix of facials, peels, boosters, and collagen-renewal treatments for brighter, healthier skin.',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1800&q=85',
    treatmentSlugs: [
      'filter-facial',
      'caviar-peel',
      'skinpen-microneedling',
      'morpheus-8-treatment',
      'profhilo-body',
      'observe-skin-scanner',
    ],
  },
  {
    slug: 'laser-treatments',
    title: 'Laser treatments',
    eyebrow: 'Devices and resurfacing',
    description:
      'Laser-led resurfacing, pigmentation, vascular, and collagen-stimulation treatments selected for skin precision.',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1800&q=85',
    treatmentSlugs: [
      'cutera-c02-laser',
      'clear-brilliant',
      'moxi-laser',
      'cutera-excel-v-ipl',
      'bbl-hero',
      'neogen-plasma',
    ],
  },
  {
    slug: 'hair-and-hair-extensions',
    title: 'Hair and hair extensions',
    eyebrow: 'Hair services',
    description:
      'Scalp-led consultation, restoration planning, and in-salon beauty support for fuller, more polished hair.',
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1800&q=85',
    treatmentSlugs: ['hair-treatments'],
    services: [
      {
        title: 'Hair restoration consultation',
        description: 'Clinical scalp assessment and personalized treatment planning.',
        duration: '45-60 minutes',
      },
      {
        title: 'Hair extension consultation',
        description: 'Color match, blend planning, and maintenance guidance before application.',
        duration: '30 minutes',
      },
    ],
  },
  {
    slug: 'nails',
    title: 'Nails',
    eyebrow: 'Salon services',
    description:
      'Manicure and pedicure services are booked through consultation-first salon appointments.',
    image:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1800&q=85',
    services: [
      {
        title: 'Signature manicure',
        description: 'Shape, cuticle care, polish planning, and finish selection.',
        duration: '45 minutes',
      },
      {
        title: 'Luxury pedicure',
        description: 'Foot treatment, exfoliation, hydration, and long-wear polish finish.',
        duration: '60 minutes',
      },
    ],
  },
  {
    slug: 'lashes',
    title: 'Lashes',
    eyebrow: 'Beauty finishing',
    description:
      'Lash appointments are planned as dedicated beauty services with shape, lift, and finish options.',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1800&q=85',
    services: [
      {
        title: 'Lash lift consultation',
        description: 'Natural lift, curl direction, and aftercare planning.',
        duration: '30 minutes',
      },
      {
        title: 'Lash styling appointment',
        description: 'A fuller lash finish with personalized shape and maintenance guidance.',
        duration: '45 minutes',
      },
    ],
  },
];

export function getTreatmentCollectionBySlug(slug: string) {
  return treatmentCollections.find((collection) => collection.slug === slug);
}
