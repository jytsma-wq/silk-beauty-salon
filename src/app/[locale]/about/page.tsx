import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Award, Heart, Shield, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'About Us | Silk Beauty Salon',
  description: 'Learn about our award-winning aesthetic clinic and meet our team of expert practitioners.',
};

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
      <section className="relative h-screen min-h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
          alt="Silk Beauty Salon Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 
              className="text-4xl md:text-6xl font-serif font-semibold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
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
                style={{ fontFamily: "'Playfair Display', serif" }}
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
            <div className="relative aspect-4/5 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="Silk Beauty Salon Clinic"
                fill
                className="object-cover"
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
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('ourValues')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.titleKey} className="bg-white rounded-lg p-6 text-center card-hover">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
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
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('meetTeam')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('teamSubtitle')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Nino', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
              { name: 'Ketevan', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80' },
              { name: 'Mariam', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80' },
              { name: 'Sophia', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-serif font-semibold text-primary text-lg">{member.name}</h3>
                <p className="text-gold text-sm mb-2">{t(`team.${member.name.toLowerCase()}Role`)}</p>
                <p className="text-sm text-muted-foreground">{t(`team.${member.name.toLowerCase()}Bio`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-spacing bg-primary">
        <div className="container-custom text-center">
          <h2 
            className="text-3xl font-serif font-semibold text-white mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('awards')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              'awardWinning',
              'premierSalon',
              'featuredIn'
            ].map((awardKey) => (
              <div key={awardKey} className="bg-white/10 rounded-lg px-6 py-3">
                <span className="text-white">{t(`awards.${awardKey}`)}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-300 text-sm">
            {t('featuredIn')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-custom text-center">
          <h2 
            className="text-3xl font-serif font-semibold text-primary mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
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
