'use client';

import { SALON_INFO, PRICE_RANGE } from '@/lib/constants';

interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface BeautySalonSchema {
  '@context': 'https://schema.org';
  '@type': 'BeautySalon' | 'MedicalClinic';
  name: string;
  image: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  openingHoursSpecification: OpeningHoursSpecification[];
  priceRange: string;
  currenciesAccepted: string;
  paymentAccepted: string;
  areaServed: {
    '@type': 'City';
    name: string;
  };
  sameAs: string[];
}

interface Offer {
  '@type': 'Offer';
  itemOffered: {
    '@type': 'Service';
    name: string;
    description: string;
  };
  price?: number;
  priceCurrency?: string;
}

interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'BeautySalon';
    name: string;
    url: string;
  };
  areaServed: {
    '@type': 'City';
    name: string;
  };
  offers?: Offer;
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

interface LocalBusinessSchemaProps {
  type?: 'BeautySalon' | 'MedicalClinic';
  additionalImages?: string[];
  breadcrumbItems?: BreadcrumbItem[];
  serviceData?: {
    name: string;
    description: string;
    price?: number;
  };
}

export function StructuredData({
  type = 'BeautySalon',
  additionalImages = [],
  breadcrumbItems,
  serviceData,
}: LocalBusinessSchemaProps) {
  const baseUrl = 'https://silkbeautybatumi.ge';
  const mainImage = `${baseUrl}/og-image.jpg`;
  const allImages = [mainImage, ...additionalImages];

  const openingHours: OpeningHoursSpecification[] = [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '10:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '11:00',
      closes: '19:00',
    },
  ];

  const address: PostalAddress = {
    '@type': 'PostalAddress',
    streetAddress: '28 Rustaveli Avenue',
    addressLocality: 'Batumi',
    addressRegion: 'Adjara',
    postalCode: '6010',
    addressCountry: 'GE',
  };

  const geo: GeoCoordinates = {
    '@type': 'GeoCoordinates',
    latitude: SALON_INFO.coordinates.lat,
    longitude: SALON_INFO.coordinates.lng,
  };

  const beautySalonSchema: BeautySalonSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: SALON_INFO.name,
    image: allImages[0],
    description:
      'Silk Beauty Salon in Batumi, Georgia offers world-class aesthetic medicine, lash extensions, microblading, hair, nails, and skincare services by certified international specialists.',
    url: baseUrl,
    telephone: SALON_INFO.phone,
    email: SALON_INFO.email,
    address,
    geo,
    openingHoursSpecification: openingHours,
    priceRange: `${PRICE_RANGE.min}-${PRICE_RANGE.max} ${PRICE_RANGE.currency}`,
    currenciesAccepted: 'GEL, USD, EUR',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    areaServed: {
      '@type': 'City',
      name: 'Batumi',
    },
    sameAs: [
      SALON_INFO.facebook,
      SALON_INFO.instagram,
      SALON_INFO.tiktok,
    ],
  };

  const schemas: (BeautySalonSchema | BreadcrumbSchema | ServiceSchema)[] = [
    beautySalonSchema,
  ];

  if (breadcrumbItems && breadcrumbItems.length > 0) {
    const breadcrumbSchema: BreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    };
    schemas.push(breadcrumbSchema);
  }

  if (serviceData) {
    const serviceSchema: ServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceData.name,
      description: serviceData.description,
      provider: {
        '@type': 'BeautySalon',
        name: SALON_INFO.name,
        url: baseUrl,
      },
      areaServed: {
        '@type': 'City',
        name: 'Batumi',
      },
      offers: serviceData.price
        ? {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: serviceData.name,
              description: serviceData.description,
            },
            price: serviceData.price,
            priceCurrency: PRICE_RANGE.currency,
          }
        : undefined,
    };
    schemas.push(serviceSchema);
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return <StructuredData type="BeautySalon" />;
}

export function MedicalClinicSchema() {
  return <StructuredData type="MedicalClinic" />;
}

export function TreatmentSchema({
  name,
  description,
  price,
  breadcrumbItems,
}: {
  name: string;
  description: string;
  price?: number;
  breadcrumbItems?: BreadcrumbItem[];
}) {
  return (
    <StructuredData
      type="MedicalClinic"
      serviceData={{ name, description, price }}
      breadcrumbItems={breadcrumbItems}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const schema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default StructuredData;
