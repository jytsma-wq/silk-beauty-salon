"use client"

import Script from "next/script"
import { useEffect } from "react"
import { useConsent } from "./ConsentProvider"
import { initAnalyticsConfig } from "@/lib/analytics"

interface ScriptLoaderProps {
  gtmId?: string
  gaId?: string
  fbPixelId?: string
  elfsightId?: string
}

export function AnalyticsScripts({ gtmId, gaId, fbPixelId, elfsightId }: ScriptLoaderProps) {
  const { consent, hasConsented } = useConsent()

  // Initialize analytics config when consent is given and IDs are available
  useEffect(() => {
    if (hasConsented && (gaId || gtmId || fbPixelId)) {
      initAnalyticsConfig({ gaId, gtmId, fbPixelId })
    }
  }, [hasConsented, gaId, gtmId, fbPixelId])

  if (!hasConsented) return null

  return (
    <>
      {/* Google Tag Manager - loads all tags based on dataLayer */}
      {consent.marketing && gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {/* Google Analytics 4 - requires marketing consent for ads */}
      {consent.analytics && gaId && (
        <>
          <Script id="ga-config" strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', {'allow_enhanced_conversions': ${consent.marketing}});`}
          </Script>
        </>
      )}

      {/* Facebook Pixel - requires explicit consent for marketing */}
      {consent.marketing && fbPixelId && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${fbPixelId}');
fbq('track', 'PageView');`}
        </Script>
      )}

      {/* Elfsight Reviews Widget - functional cookie - lazy load after page is idle */}
      {consent.functional && elfsightId && (
        <Script 
          src={`https://static.elfsight.com/platform/platform.js`} 
          strategy="lazyOnload" 
        />
      )}
    </>
  )
}

// Hook to check specific consent
export function useAnalytics() {
  const { consent, hasConsented } = useConsent()
  
  return {
    canTrackAnalytics: hasConsented && consent.analytics,
    canTrackMarketing: hasConsented && consent.marketing,
    canUseFunctional: hasConsented && consent.functional,
  }
}
