import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ChevronRight, Award, Heart, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const values = [
    { icon: Heart, titleKey: 'patientCare' },
    { icon: Award, titleKey: 'excellence' },
    { icon: Shield, titleKey: 'safety' },
    { icon: Sparkles, titleKey: 'naturalResults' },
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
            <span className="text-[#241f1b]">{t('title')}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
            <div className="max-w-3xl">
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
                About the clinic
              </p>
              <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b]">
                {t('title')}
              </h1>
              <p className="text-lg leading-8 text-stone-700">{t('subtitle')}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
                alt="Silk Beauty Salon Interior"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-sans text-3xl font-light text-[#241f1b] md:text-4xl">{t('ourStory')}</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">{t('storyP1')}</p>
              <p className="mb-4 leading-relaxed text-muted-foreground">{t('storyP2')}</p>
              <p className="text-sm text-stone-600">{t('storyP3')}</p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="Silk Beauty Salon Clinic"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-3xl font-light text-[#241f1b] md:text-4xl">{t('ourValues')}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.titleKey} className="border-t border-[#e8e4df] p-8 text-center">
                <value.icon className="mx-auto mb-4 h-7 w-7 text-[#8d6f58]" />
                <h3 className="mb-2 font-sans text-xl font-light text-[#241f1b]">{t(`values.${value.titleKey}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`values.${value.titleKey}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing" id="team">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-3xl font-light text-[#241f1b] md:text-4xl">{t('meetTeam')}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">{t('teamSubtitle')}</p>
          </div>
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {siteConfig.team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-4 aspect-[4/5] max-w-xs overflow-hidden rounded-[8px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, 400px"
                  />
                </div>
                <h3 className="text-lg font-light text-[#241f1b]">{member.name}</h3>
                <p className="mb-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#8d6f58]">
                  {member.role}
                </p>
                <p className="mx-auto max-w-sm text-sm text-muted-foreground">{member.bio}</p>
                {member.languages && (
                  <p className="mt-2 text-xs text-muted-foreground">Languages: {member.languages.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom text-center">
          <h2 className="mb-8 font-sans text-3xl font-light text-[#241f1b] md:text-4xl">{t('awards.title')}</h2>
          <div className="mb-8 flex flex-wrap justify-center gap-8">
            <span className="text-sm uppercase tracking-wider text-[#1c1c1c]">{t('awards.awardWinning')}</span>
            <span className="text-sm uppercase tracking-wider text-[#1c1c1c]">{t('awards.premierSalon')}</span>
            <span className="text-sm uppercase tracking-wider text-[#1c1c1c]">{t('awards.featuredIn')}</span>
          </div>
          <p className="text-sm text-[#9a9a9a]">{t('featuredIn')}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom text-center">
          <h2 className="mb-4 font-sans text-3xl font-light text-[#241f1b] md:text-4xl">{t('ctaTitle')}</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">{t('ctaSubtitle')}</p>
          <Button asChild className="btn-gold">
            <Link href="/book">{t('ctaButton')}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
