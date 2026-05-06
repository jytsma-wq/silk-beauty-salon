import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ChevronRight, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offersPage' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offersPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const offers = [
    { titleKey: 'newClient', discount: '20% OFF', highlight: true },
    { titleKey: 'antiWrinkle', discount: 'Save 100 GBP', highlight: false },
    { titleKey: 'dermalFiller', discount: 'Free Skin Booster', highlight: false },
    { titleKey: 'referral', discount: '50 GBP Credit', highlight: false },
    { titleKey: 'seasonal', discount: '15% OFF', highlight: false },
    { titleKey: 'loyalty', discount: 'Earn Points', highlight: false },
  ];

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

          <div className="grid items-center gap-12 lg:grid-cols-[48%_52%]">
            <div className="max-w-3xl">
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
                Current offers
              </p>
              <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b]">
                {t('title')}
              </h1>
              <p className="text-lg leading-8 text-stone-700">
                {t('subtitle')}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
                alt="Special Offers"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`relative border-t py-8 ${offer.highlight ? 'border-[#8d6f58]' : 'border-[#e8e4df]'}`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <Percent className={`h-5 w-5 ${offer.highlight ? 'text-[#8d6f58]' : 'text-primary'}`} />
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#8d6f58]">
                    {offer.discount}
                  </span>
                </div>
                <h2 className="mb-2 font-sans text-xl font-light text-[#241f1b]">
                  {t(`offers.${offer.titleKey}.title`)}
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t(`offers.${offer.titleKey}.description`)}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {t(`offers.${offer.titleKey}.terms`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-[#e8e4df] py-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              {t('ctaSubtitle')}
            </p>
            <Button asChild className="btn-gold">
              <Link href="/book">{t('ctaButton')}</Link>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">{t('termsText')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
