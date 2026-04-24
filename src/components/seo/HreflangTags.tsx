import { routing } from '@/i18n/routing'
import { siteConfig } from '@/data/site-config'

interface HreflangTagsProps {
  currentPath: string
  currentLocale: string
}

/**
 * Generate hreflang tags for multilingual SEO
 * These help search engines understand the relationship between different language versions
 */
export function HreflangTags({ currentPath, currentLocale }: HreflangTagsProps) {
  const locales = routing.locales as readonly string[]
  const defaultLocale = routing.defaultLocale

  // Generate hreflang URLs for each locale
  const hreflangUrls = locales.map((locale) => {
    const url = `${siteConfig.url}/${locale}${currentPath}`
    return {
      hreflang: locale,
      href: url,
    }
  })

  // Add x-default for the default locale
  const xDefaultUrl = `${siteConfig.url}/${defaultLocale}${currentPath}`

  return (
    <>
      {/* Self-referencing canonical */}
      <link
        rel="canonical"
        href={`${siteConfig.url}/${currentLocale}${currentPath}`}
      />
      
      {/* Hreflang for each locale */}
      {hreflangUrls.map(({ hreflang, href }) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
      
      {/* x-default points to default locale */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={xDefaultUrl}
      />
    </>
  )
}

/**
 * Generate alternate language links for the header
 * This is useful for language switchers and SEO
 */
export function getAlternateLanguages(currentPath: string) {
  const locales = routing.locales as readonly string[]
  
  return locales.map((locale) => ({
    locale,
    href: `/${locale}${currentPath}`,
    hreflang: locale,
  }))
}

/**
 * Generate og:locale meta tags for social sharing
 */
export function getOgLocaleTags(currentLocale: string) {
  const locales = routing.locales as readonly string[]
  
  const localeMap: Record<string, string> = {
    en: 'en_US',
    ka: 'ka_GE',
    ru: 'ru_RU',
    tr: 'tr_TR',
    ar: 'ar_SA',
    he: 'he_IL',
  }

  return {
    'og:locale': localeMap[currentLocale] || 'en_US',
    'og:locale:alternate': locales
      .filter((l) => l !== currentLocale)
      .map((l) => localeMap[l])
      .filter(Boolean),
  }
}
