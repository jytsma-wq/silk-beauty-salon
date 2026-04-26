import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ChevronRight, Mail, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const benefits = [
    { title: t('benefit1Title'), description: t('benefit1Desc') },
    { title: t('benefit2Title'), description: t('benefit2Desc') },
    { title: t('benefit3Title'), description: t('benefit3Desc') },
    { title: t('benefit4Title'), description: t('benefit4Desc') },
  ];

  const openings = [
    {
      title: t('job1Title'),
      type: t('job1Type'),
      location: t('job1Location'),
      description: t('job1Desc'),
    },
    {
      title: t('job2Title'),
      type: t('job2Type'),
      location: t('job2Location'),
      description: t('job2Desc'),
    },
    {
      title: t('job3Title'),
      type: t('job3Type'),
      location: t('job3Location'),
      description: t('job3Desc'),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1c1c1c] py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
                      >
            {t('title')}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
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
            <span className="text-primary font-medium">{t('breadcrumb')}</span>
          </nav>
        </div>
      </div>

      {/* Introduction */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              className="text-3xl font-serif font-semibold text-primary mb-6"
                          >
              {t('whyWorkTitle')}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('whyWorkText')}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-serif font-semibold text-primary mb-4"
                          >
              {t('benefitsTitle')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-8 text-center border-t border-[#e8e4df]">
                <h3 className="font-serif font-semibold text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-serif font-semibold text-primary mb-4"
                          >
              {t('openingsTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('openingsSubtitle')}
            </p>
          </div>
          <div className="space-y-0 max-w-3xl mx-auto">
            {openings.map((job) => (
              <div key={job.title} className="py-8 border-t border-[#e8e4df]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="font-serif font-semibold text-primary text-lg">{job.title}</h3>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0 text-xs text-muted-foreground">
                    <span>{job.type}</span>
                    <span className="flex items-center gap-1 text-gold">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${siteConfig.contact.email}?subject=Application: ${job.title}`}>
                    {t('applyNow')}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#f7f4f0] py-12">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gold" />
              <div>
                <h2 className="text-lg font-serif font-semibold text-primary">
                  {t('noRoleTitle')}
                </h2>
                <p className="text-muted-foreground text-sm hidden sm:block">
                  {t('noRoleText')}
              </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/contact-us">
                  {t('contactUs')}
                </Link>
              </Button>
              <Button asChild size="sm" className="btn-gold">
                <a href={`mailto:${siteConfig.contact.email}?subject=General Application`} className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('sendCV')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
