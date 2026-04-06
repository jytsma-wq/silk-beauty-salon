import { siteConfig } from "@/data/site-config"

interface LocalBusinessSchema {
  locale?: string
}

export function generateLocalBusinessSchema(locale: string = "en") {
  const business = siteConfig
  
  const localeNames: Record<string, string> = {
    en: "Silk Beauty Salon",
    ka: "სილქ ბიუთი სალონი",
    ru: "Салон Красоты Silk Beauty",
    tr: "Silk Beauty Salon",
    ar: "صالون حرير للجمال",
    he: "סלון סילק ביוטי"
  }

  const descriptions: Record<string, string> = {
    en: "Premier medical aesthetic clinic in Batumi, Georgia offering Botox, dermal fillers, laser treatments, and advanced skin care.",
    ka: "პრემიური სამედიცინო-ესთეტიკური კლინიკა ბათუმში, ბოტოქსი, დერმალური ფილერები, ლაზერული მკურნალობები.",
    ru: "Премьер медицинская эстетическая клиника в Батуми, предлагающая ботокс, дермальные наполнители, лазерные процедуры.",
    tr: "Batumi'de Botox, dermal dolgular, lazer tedavileri ve ileri cilt bakımı sunan premier tıbbi estetik kliniği.",
    ar: "عيادة طبية تجميلية رائدة في باتومي تقدم البوتوكس والحشوات الجلدية والعلاجات بالليزر.",
    he: "קליניקה רפואית אסתטית מובילה בבטומי המציעה בוטוקס, מילויים דרמליים וטיפולי לייזר."
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
      "latitude": "41.6388",
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
    "image": `${siteConfig.url}/og-image.jpg`,
    "sameAs": [
      siteConfig.social.instagram,
      siteConfig.social.facebook
    ].filter(Boolean)
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
