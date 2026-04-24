import { ImageResponse } from 'next/og';
import { routing } from '@/i18n/routing';

export const runtime = 'edge';

const fontRegular = fetch(new URL('https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYrEtFmS.woff2')).then((res) => res.arrayBuffer());
const fontBold = fetch(new URL('https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYqEfFmw.woff2')).then((res) => res.arrayBuffer());

export const alt = 'Blog - Silk Beauty Salon';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolvedLocale = routing.locales.includes(locale as typeof routing.locales[number]) ? (locale as typeof routing.locales[number]) : 'en';
  
  const titles: Record<string, string> = {
    en: 'Blog',
    ka: 'Blog',
    ru: 'Blog',
    tr: 'Blog',
    ar: 'Blog',
    he: 'Blog',
  };
  
  const subtitles: Record<string, string> = {
    en: 'Latest News & Beauty Tips from Batumi',
    ka: 'Latest News & Beauty Tips from Batumi',
    ru: 'Latest News & Beauty Tips from Batumi',
    tr: 'Latest News & Beauty Tips from Batumi',
    ar: 'Latest News & Beauty Tips from Batumi',
    he: 'Latest News & Beauty Tips from Batumi',
  };

  const [fontRegularData, fontBoldData] = await Promise.all([fontRegular, fontBold]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #c9a962, transparent)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #c9a962, transparent)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '80px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid rgba(201, 169, 98, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid rgba(201, 169, 98, 0.3)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '100px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid rgba(201, 169, 98, 0.15)',
          }}
        />

        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a962 0%, #a88b4a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <span
            style={{
              color: '#1a1a2e',
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'Cormorant Garamond',
            }}
          >
            S
          </span>
        </div>

        <div
          style={{
            color: '#ffffff',
            fontSize: '72px',
            fontWeight: 700,
            fontFamily: 'Cormorant Garamond',
            letterSpacing: '0.05em',
            textAlign: 'center',
            marginBottom: '16px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          {titles[resolvedLocale]}
        </div>

        <div
          style={{
            color: '#c9a962',
            fontSize: '24px',
            fontWeight: 400,
            fontFamily: 'Cormorant Garamond',
            letterSpacing: '0.1em',
            textAlign: 'center',
          }}
        >
          {subtitles[resolvedLocale]}
        </div>

        <div
          style={{
            width: '60px',
            height: '2px',
            background: '#c9a962',
            marginTop: '24px',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cormorant Garamond',
          data: fontRegularData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Cormorant Garamond',
          data: fontBoldData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
