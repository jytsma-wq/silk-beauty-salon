import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Award, Heart, Shield, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
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
    {
      icon: Heart,
      titleKey: 'patientCare',
    },
    {
      icon: Award,
      titleKey: 'excellence',
    },
    {
      icon: Shield,
      titleKey: 'safety',
    },
    {
      icon: Sparkles,
      titleKey: 'naturalResults',
    },
  ];

  return (
    <>
      {/* Full Screen Hero Image */}
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
          alt="Silk Beauty Salon Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1c1c1c]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 
              className="text-4xl md:text-6xl font-serif font-semibold text-white mb-4"
                          >
              {t('title')}
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-gold">
              {tCommon('home')}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">{t('title')}</span>
          </nav>
        </div>
      </div>

      {/* Our Story */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl font-serif font-semibold text-primary mb-6"
                              >
                {t('ourStory')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('storyP1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('storyP2')}
              </p>
              <p className="text-gray-300 text-sm">
                {t('storyP3')}
              </p>
            </div>
            <div className="relative aspect-4/5 overflow-hidden">
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

      {/* Our Values */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-serif font-semibold text-primary mb-4"
                          >
              {t('ourValues')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.titleKey} className="p-8 text-center border-t border-[#e8e4df]">
                <value.icon className="w-7 h-7 text-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-primary mb-2">{t(`values.${value.titleKey}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`values.${value.titleKey}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-spacing" id="team">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-serif font-semibold text-primary mb-4"
                          >
              {t('meetTeam')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('teamSubtitle')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {siteConfig.team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative aspect-4/5 overflow-hidden mb-4 max-w-xs mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, 400px"
                  />
                </div>
                <h3 className="font-serif font-semibold text-primary text-lg">{member.name}</h3>
                <p className="text-gold text-sm mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">{member.bio}</p>
                {member.languages && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Languages: {member.languages.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif font-semibold text-[#1c1c1c] mb-8">
            {t('awards')}
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              'awardWinning',
              'premierSalon',
              'featuredIn'
            ].map((awardKey) => (
              <span key={awardKey} className="text-[#1c1c1c] text-sm tracking-wider uppercase">
                {t(`awards.${awardKey}`)}
              </span>
            ))}
          </div>
          <p className="text-[#9a9a9a] text-sm">
            {t('featuredIn')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-custom text-center">
          <h2 
            className="text-3xl font-serif font-semibold text-primary mb-4"
                      >
            {t('ctaTitle')}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <Button asChild className="btn-gold">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              {t('ctaButton')}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
