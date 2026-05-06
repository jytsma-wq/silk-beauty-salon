import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <section className="bg-[#f7f2eb] pt-[170px] md:pt-[188px]">
        <div className="container-custom py-16 md:py-20">
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-[#241f1b]">
              {tCommon('home')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#241f1b]">{t('breadcrumb')}</span>
          </nav>

          <div className="max-w-4xl">
            <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
              Legal information
            </p>
            <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.4vw,5.4rem)] font-light leading-[1.02] text-[#241f1b]">
              {t('title')}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl border-t border-[#e8e4df] pt-10">
            <div className="prose prose-slate max-w-none">
              <p className="mb-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-stone-500">
                {t('lastUpdated')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('introTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('introText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('collectTitle')}
              </h2>
              <p className="mb-4 text-base leading-8 text-stone-700">
                {t('collectIntro')}
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-8 text-stone-700 marker:text-[#8d6f58]">
                <li>{t('collectItem1')}</li>
                <li>{t('collectItem2')}</li>
                <li>{t('collectItem3')}</li>
                <li>{t('collectItem4')}</li>
              </ul>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('useTitle')}
              </h2>
              <p className="mb-4 text-base leading-8 text-stone-700">
                {t('useIntro')}
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-8 text-stone-700 marker:text-[#8d6f58]">
                <li>{t('useItem1')}</li>
                <li>{t('useItem2')}</li>
                <li>{t('useItem3')}</li>
                <li>{t('useItem4')}</li>
                <li>{t('useItem5')}</li>
              </ul>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('sharingTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('sharingText')}
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-8 text-stone-700 marker:text-[#8d6f58]">
                <li>{t('sharingItem1')}</li>
                <li>{t('sharingItem2')}</li>
                <li>{t('sharingItem3')}</li>
              </ul>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('securityTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('securityText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('rightsTitle')}
              </h2>
              <p className="mb-4 text-base leading-8 text-stone-700">
                {t('rightsIntro')}
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-8 text-stone-700 marker:text-[#8d6f58]">
                <li>{t('rightsItem1')}</li>
                <li>{t('rightsItem2')}</li>
                <li>{t('rightsItem3')}</li>
                <li>{t('rightsItem4')}</li>
                <li>{t('rightsItem5')}</li>
              </ul>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('contactTitle')}
              </h2>
              <p className="mb-4 text-base leading-8 text-stone-700">
                {t('contactIntro')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('changesTitle')}
              </h2>
              <p className="text-base leading-8 text-stone-700">
                {t('changesText')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
