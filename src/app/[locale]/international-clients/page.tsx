import { Metadata } from 'next';
import Image from 'next/image';
import { ChevronRight, Globe, Gift, CreditCard, Shield, Award, MessageCircle, Phone, MapPin, Mail, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { Link as I18nLink } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'internationalPage' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  return locales.map((locale) => ({ locale }));
}

export default async function InternationalClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'internationalPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tInternational = await getTranslations({ locale, namespace: 'international' });
  const tSocial = await getTranslations({ locale, namespace: 'social' });
  const tTreatment = await getTranslations({ locale, namespace: 'treatmentContent' });
  const team = siteConfig.team[0];
  const pricingData = [
    { treatment: `${t('services.botox.title')} (${t('pricing.oneArea')})`, priceGEL: '250-350', priceUSD: '$90-125' },
    { treatment: `${t('services.botox.title')} (${t('pricing.threeAreas')})`, priceGEL: '600-800', priceUSD: '$215-290' },
    { treatment: `${tTreatment('dermal-fillers.treatments.lip-fillers.name')} (1 ml)`, priceGEL: '500-800', priceUSD: '$180-290' },
    { treatment: `${tTreatment('dermal-fillers.treatments.cheek-fillers.name')} (1 ml)`, priceGEL: '600-900', priceUSD: '$215-325' },
    { treatment: `${tTreatment('tear-trough.name')} (1 ml)`, priceGEL: '600-900', priceUSD: '$215-325' },
    { treatment: tTreatment('skin-treatments.treatments.skin-boosters.name'), priceGEL: '400-600', priceUSD: '$145-215' },
    { treatment: tTreatment('skin-treatments.treatments.prp-therapy.name'), priceGEL: '400-600', priceUSD: '$145-215' },
    { treatment: tTreatment('skin-treatments.treatments.chemical-peels.name'), priceGEL: '200-400', priceUSD: '$70-145' },
  ];
  const timingData = [
    { treatment: t('services.botox.title'), minStay: t('timing.botoxStay'), reason: t('timing.botoxReason') },
    { treatment: t('services.fillers.title'), minStay: t('timing.fillersStay'), reason: t('timing.fillersReason') },
    { treatment: tTreatment('skin-treatments.treatments.chemical-peels.name'), minStay: t('timing.peelStay'), reason: t('timing.peelReason') },
    { treatment: `${tTreatment('skin-treatments.treatments.prp-therapy.name')} / ${tTreatment('skin-treatments.treatments.microneedling.name')}`, minStay: t('timing.prpStay'), reason: t('timing.prpReason') },
    { treatment: t('timing.combinationTreatments'), minStay: t('timing.comboStay'), reason: t('timing.comboReason') },
  ];
  const packagesData = [
    { name: t('packages.freshFace'), includes: t('packages.freshFaceDesc'), savings: '15%' },
    { name: t('packages.totalRejuvenation'), includes: t('packages.totalRejuvenationDesc'), savings: '20%' },
    { name: t('packages.nonSurgicalLift'), includes: t('packages.nonSurgicalLiftDesc'), savings: t('packages.savings') },
    { name: t('packages.vacationGlow'), includes: t('packages.vacationGlowDesc'), savings: '10%' },
  ];
  const faqData = Array.from({ length: 8 }, (_, index) => ({
    q: t(`faq.q${index + 1}`),
    a: t(`faq.a${index + 1}`),
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
            alt={tInternational('imageAlt')}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[#1c1c1c]/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-gold" />
                <span className="text-gold text-sm font-medium tracking-wider uppercase">
                  {t('welcomeText')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="btn-gold">
                  <a href={`https://wa.me/${siteConfig.contact.phone.replace(/\s/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('bookConsultation')}
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <I18nLink href="#packages">
                    {t('viewPackages')}
                  </I18nLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <I18nLink href="/" className="text-muted-foreground hover:text-gold">
              {tCommon('home')}
            </I18nLink>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">{t('title')}</span>
          </nav>
        </div>
      </div>

      {/* About Nana Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-semibold text-primary mb-2">
                {t('aboutNana.title')}
              </h2>
              <p className="text-gold mb-6">{t('aboutNana.subtitle')}</p>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('aboutNana.bio')}
              </p>

              <h3 className="font-semibold text-primary mb-3">{t('aboutNana.qualifications')}</h3>
              <ul className="space-y-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-gold" />
                    <span className="text-sm">{t(`aboutNana.qualification${i}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gold" />
                <span className="font-medium">{t('aboutNana.languages')}:</span>
                <span>{t('aboutNana.languagesText')}</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-4/5 overflow-hidden relative bg-[#f7f4f0]">
                <Image
                  src={team?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"}
                  alt={team?.name || tSocial('silkBeautySalon')}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={!!team?.image}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
              {t('whyChooseUs.title')}
            </h2>
            <p className="text-muted-foreground">{t('whyChooseUs.subtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { key: 'costSavings', icon: CreditCard },
              { key: 'premiumProducts', icon: Award },
              { key: 'personalizedCare', icon: Shield },
              { key: 'privacy', icon: Globe },
              { key: 'travelFriendly', icon: MapPin },
            ].map((item) => (
              <div key={item.key} className="p-8 text-center">
                <div className="mb-6">
                  <item.icon className="w-8 h-8 text-gold mx-auto" />
                </div>
                <h3 className="font-serif font-semibold text-primary mb-2">
                  {t(`whyChooseUs.${item.key}`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`whyChooseUs.${item.key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
              {t('services.title')}
            </h2>
            <p className="text-muted-foreground">{t('services.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['botox', 'fillers', 'facial'].map((service) => (
              <div key={service} className="py-8 border-t border-[#e8e4df]">
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  {t(`services.${service}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`services.${service}.description`)}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('services.durationLabel')}</span>
                    <span className="font-medium">{t(`services.${service}.duration`)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('services.recoveryLabel')}</span>
                    <span className="font-medium">{t(`services.${service}.recovery`)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('services.resultsLabel')}</span>
                    <span className="font-medium">{t(`services.${service}.results`)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-[#1c1c1c] mb-4">
              {t('packages.title')}
            </h2>
            <p className="text-[#6b6b6b]">{t('packages.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packagesData.map((pkg, index) => (
              <div key={index} className="p-8 text-center border-t border-[#e8e4df]">
                <Gift className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-[#1c1c1c] mb-2">{pkg.name}</h3>
                <p className="text-sm text-[#6b6b6b] mb-4">{pkg.includes}</p>
                <span className="text-xs tracking-[0.15em] uppercase text-gold">
                  {pkg.savings}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-muted-foreground">{t('pricing.subtitle')}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {pricingData.map((item, index) => (
              <div key={index} className="flex justify-between py-6 border-t border-[#e8e4df]">
                <span className="font-medium">{item.treatment}</span>
                <div className="text-right">
                  <span className="text-muted-foreground mr-4">{item.priceGEL} GEL</span>
                  <span className="font-semibold text-gold">{item.priceUSD}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">{t('pricing.note')}</p>
            <p className="text-xs text-muted-foreground">{t('pricing.finalNote')}</p>
          </div>
        </div>
      </section>

      {/* Treatment Timing */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
              {t('timing.title')}
            </h2>
            <p className="text-muted-foreground">{t('timing.subtitle')}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timingData.map((item, index) => (
              <div key={index} className="flex justify-between py-6 border-t border-[#e8e4df]">
                <span className="font-medium">{item.treatment}</span>
                <span className="text-muted-foreground">{item.minStay}</span>
                <span className="text-sm text-[#9a9a9a] max-w-xs text-right">{item.reason}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-[#9a9a9a] italic">{t('timing.seaWarning')}</p>
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
              {t('journey.title')}
            </h2>
            <p className="text-muted-foreground">{t('journey.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <div key={step} className="border-t border-[#e8e4df] pt-6">
                <span className="text-xs tracking-[0.15em] uppercase text-gold mb-4 block">
                  {String(step).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-lg text-primary mb-2">
                  {t(`journey.step${step}Title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`journey.step${step}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
              {t('trust.title')}
            </h2>
            <p className="text-muted-foreground">{t('trust.subtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {['licensed', 'certified', 'authentic', 'hygiene', 'emergency'].map((item) => (
              <div key={item} className="p-8 text-center border-t border-[#e8e4df]">
                <Shield className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-primary mb-2">
                  {t(`trust.${item}`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`trust.${item}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-muted-foreground">{t('faq.subtitle')}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item, index) => (
              <details key={index} className="border-t border-[#e8e4df] group">
                <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
                  <span className="font-medium text-primary">{item.q}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="pb-6">
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-[#1c1c1c] mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-[#6b6b6b]">{t('contact.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[
              { key: 'whatsapp', icon: MessageCircle },
              { key: 'telegram', icon: MessageCircle },
              { key: 'instagram', icon: Globe },
              { key: 'videoConsult', icon: Phone },
              { key: 'email', icon: Mail },
            ].map((item) => (
              <div key={item.key} className="p-6 text-center">
                <item.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-semibold text-[#1c1c1c] mb-1">{t(`contact.${item.key}`)}</h3>
                <p className="text-xs text-[#6b6b6b]">{t(`contact.${item.key}Desc`)}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#9a9a9a] text-sm">
            {t('contact.responseTime')}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif font-semibold text-primary mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button asChild className="btn-gold">
            <a href={`https://wa.me/${siteConfig.contact.phone.replace(/\s/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('cta.button')}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
