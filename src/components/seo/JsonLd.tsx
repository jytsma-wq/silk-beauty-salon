import { siteConfig } from "@/data/site-config"

export function generateLocalBusinessSchema(locale: string = "en") {
  const localeNames: Record<string, string> = {
    en: "Silk Beauty Salon",
    ka: "სილქ ბიუთი სალონი",
    ru: "Салон Красоты Силк",
    tr: "Silk Beauty Salon",
    ar: "صالون الجمال سيلك",
    he: "סלון יופי סילק"
  }

  const descriptions: Record<string, string> = {
    en: "Premier medical aesthetic clinic in Batumi, Georgia offering Botox, dermal fillers, laser treatments, and advanced skin care.",
    ka: "ბათუმის წამალი ესთეტიკის კლინიკა, ბოტოქსი, დერმალური ფილერები, ლაზერული მკურნალობა და გაუმჯობესებული კანის მოვლა.",
    ru: "Ведущая клиника медицинской эстетики в Батуми, Грузия. Предлагаем ботокс, дермальные наполнители, лазерные процедуры и уход за кожей.",
    tr: "Batumi'de Botox, dermal dolgular, lazer tedavileri ve ileri cilt bakimi sunan premier tibbi estetik klinigi.",
    ar: "عيادة الجمال الطبي الرائدة في باتومي جورجيا تقدم البوتوكس والحشوات الجلدية وعلاجات الليزر والعناية المتقدمة بالبشرة.",
    he: "קליניקת אסתטיקה רפואית מובילה בבטומי גאורגיה המציעה בוטוקס, מילוי עור, טיפולי לייזר וטיפוח עור מתקדם."
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "BeautySalon"],
    "name": localeNames[locale] || localeNames.en,
    "description": descriptions[locale] || descriptions.en,
    "url": siteConfig.url,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "postalCode": siteConfig.contact.postcode,
      "addressCountry": siteConfig.contact.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.6417",
      "longitude": "41.6372"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "10:00", "closes": "19:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "10:00", "closes": "19:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "10:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "10:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "10:00", "closes": "19:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "11:00", "closes": "16:00" }
    ],
    "priceRange": "$$",
    "image": `${siteConfig.url}/opengraph-image.png`,
    "sameAs": [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      "https://www.tiktok.com/@silkbeautybatumi"
    ].filter(Boolean)
  }

  return JSON.stringify(schema)
}

/**
 * Generate FAQ Schema for treatment pages
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return JSON.stringify(schema)
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return JSON.stringify(schema)
}

/**
 * Generate Medical Procedure Schema for treatments
 */
export function generateTreatmentSchema(treatment: {
  name: string
  description: string
  image?: string
  price?: string
  duration?: string
  benefits?: string[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": treatment.name,
    "description": treatment.description,
    "image": treatment.image,
    "procedureType": "Aesthetic",
    "howPerformed": treatment.benefits?.join('. ') || undefined,
    "procedureFollowUp": treatment.duration ? `Takes approximately ${treatment.duration}` : undefined,
    "status": "https://schema.org/ActiveNotRecruiting",
    "study": {
      "@type": "MedicalStudy",
      "status": "completed"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/treatments/${treatment.name.toLowerCase().replace(/\s+/g, '-')}`
    },
    "provider": {
      "@type": "MedicalBusiness",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "offers": treatment.price ? {
      "@type": "Offer",
      "price": treatment.price.replace(/[^0-9.]/g, ''),
      "priceCurrency": "GEL",
      "availability": "https://schema.org/InStock"
    } : undefined
  }

  return JSON.stringify(schema)
}

/**
 * Generate Review Schema for testimonials
 */
export function generateReviewSchema(reviews: Array<{
  author: string
  rating: number
  text: string
  date?: string
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text,
      "datePublished": review.date || new Date().toISOString()
    }))
  }

  return JSON.stringify(schema)
}

/**
 * Generate Service Schema for treatment categories
 */
export function generateServiceSchema(service: {
  name: string
  description: string
  image?: string
  treatments: Array<{ name: string; url: string }>
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "image": service.image,
    "provider": {
      "@type": "MedicalBusiness",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "areaServed": {
      "@type": "City",
      "name": "Batumi",
      "containedInPlace": {
        "@type": "Country",
        "name": "Georgia"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.name,
      "itemListElement": service.treatments.map((treatment) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": treatment.name,
          "url": `${siteConfig.url}${treatment.url}`
        }
      }))
    }
  }

  return JSON.stringify(schema)
}

export function JsonLd({ schema }: { schema: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  )
}
