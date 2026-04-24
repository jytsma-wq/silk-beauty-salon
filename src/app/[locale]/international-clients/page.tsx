import { Metadata } from 'next';
import Image from 'next/image';
import { ChevronRight, Globe, Gift, CreditCard, Shield, Award, MessageCircle, Phone, MapPin, Mail, CheckCircle, AlertCircle } from 'lucide-react';
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

const pricingData = [
  { treatment: 'Botox (1 area)', priceGEL: '250-350', priceUSD: '$90-125' },
  { treatment: 'Botox (3 areas)', priceGEL: '600-800', priceUSD: '$215-290' },
  { treatment: 'Lip Filler (1ml)', priceGEL: '500-800', priceUSD: '$180-290' },
  { treatment: 'Cheek Filler (1ml)', priceGEL: '600-900', priceUSD: '$215-325' },
  { treatment: 'Under-eye Filler (1ml)', priceGEL: '600-900', priceUSD: '$215-325' },
  { treatment: 'Skin Booster', priceGEL: '400-600', priceUSD: '$145-215' },
  { treatment: 'PRP Facial', priceGEL: '400-600', priceUSD: '$145-215' },
  { treatment: 'Chemical Peel', priceGEL: '200-400', priceUSD: '$70-145' },
];

const timingData = [
  { treatment: 'Botox', minStay: 'Same day OK', reason: 'No visible downtime' },
  { treatment: 'Fillers', minStay: '24-48 hours', reason: 'Allow swelling to subside' },
  { treatment: 'Chemical Peel (medium)', minStay: '5-7 days', reason: 'Peeling phase visible' },
  { treatment: 'PRP/Microneedling', minStay: '48 hours', reason: 'Redness, possible bruising' },
  { treatment: 'Combination treatments', minStay: '3-5 days', reason: 'Multiple recovery phases' },
];

const packagesData = [
  { name: 'Fresh Face', includes: 'Botox (3 areas) + Lip Filler', savings: '15% off' },
  { name: 'Total Rejuvenation', includes: 'Full face Botox + Cheek Filler + Skin Booster', savings: '20% off' },
  { name: 'Non-Surgical Lift', includes: '8-point lift (strategic filler placement)', savings: 'Special pricing' },
  { name: 'Vacation Glow', includes: 'Skin booster + Light chemical peel', savings: '10% off' },
];

const faqData = [
  { q: 'Is it safe to have treatments while traveling?', a: 'Yes, many treatments have minimal downtime. We provide detailed aftercare instructions and are available for follow-up support via WhatsApp or video call.' },
  { q: 'What languages does Nana speak?', a: 'Nana speaks Georgian, English, and Russian fluently, ensuring clear communication with international clients.' },
  { q: 'How do I book before arriving?', a: 'Contact us via WhatsApp for a free virtual consultation. We\'ll discuss your goals, provide a quote, and schedule your appointment.' },
  { q: 'Can I have treatment the day before a flight?', a: 'Botox treatments are fine for same-day travel. For fillers, we recommend 24-48 hours before flying to allow swelling to subside.' },
  { q: 'What if I have a reaction after I return home?', a: 'We provide 24/7 emergency contact and offer virtual follow-up consultations. For dermal fillers, we can provide guidance to local practitioners if needed.' },
  { q: 'Do you use authentic products?', a: 'Absolutely. We use only Allergan (Juvederm), Galderma (Restylane), and Merz products. You can see the packaging and lot numbers during your treatment.' },
  { q: 'What payment methods do you accept?', a: 'We accept cash (GEL, USD, EUR), Visa, Mastercard, and contactless payments including Apple Pay and Google Pay.' },
  { q: 'Do you offer virtual follow-ups?', a: 'Yes, we offer complimentary virtual follow-up consultations for all international clients at 2 weeks post-treatment.' },
];

export default async function InternationalClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'internationalPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const team = siteConfig.team[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-150 flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
          alt="Silk Beauty Salon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/60" />
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
                  <a href="#packages">
                    {t('viewPackages')}
                  </a>
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
              <div className="aspect-4/5 rounded-lg overflow-hidden relative bg-secondary">
                <Image
                  src={team?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"}
                  alt="Nana Gviniashvili"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/10 rounded-lg -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-lg -z-10" />
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
              <div key={item.key} className="bg-white rounded-lg p-6 text-center card-hover">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-gold" />
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
              <div key={service} className="bg-white rounded-lg border border-border overflow-hidden card-hover">
                <div className="p-6">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section-spacing bg-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-white mb-4">
              {t('packages.title')}
            </h2>
            <p className="text-gray-300">{t('packages.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packagesData.map((pkg, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center card-hover">
                <Gift className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.includes}</p>
                <div className="inline-block bg-gold/10 text-gold font-semibold px-4 py-2 rounded-full text-sm">
                  {pkg.savings}
                </div>
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

          <div className="bg-white rounded-lg border border-border overflow-hidden max-w-3xl mx-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left p-4 font-semibold">{t('pricing.treatment')}</th>
                  <th className="text-center p-4 font-semibold">{t('pricing.priceGEL')}</th>
                  <th className="text-right p-4 font-semibold">{t('pricing.priceUSD')}</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((item, index) => (
                  <tr key={index} className={`border-t border-border ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 font-medium">{item.treatment}</td>
                    <td className="p-4 text-center text-muted-foreground">{item.priceGEL}</td>
                    <td className="p-4 text-right font-semibold text-gold">{item.priceUSD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

          <div className="bg-white rounded-lg border border-border overflow-hidden max-w-3xl mx-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left p-4 font-semibold">{t('timing.treatment')}</th>
                  <th className="text-center p-4 font-semibold">{t('timing.minStay')}</th>
                  <th className="text-left p-4 font-semibold">{t('timing.reason')}</th>
                </tr>
              </thead>
              <tbody>
                {timingData.map((item, index) => (
                  <tr key={index} className={`border-t border-border ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 font-medium">{item.treatment}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${item.minStay === 'Same day OK' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.minStay}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{t('timing.seaWarning')}</span>
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <div key={step} className="relative">
                <div className="bg-white rounded-lg p-6 border border-border card-hover">
                  <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold mb-4">
                    {step}
                  </div>
                  <h3 className="font-semibold text-primary mb-2">
                    {t(`journey.step${step}Title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`journey.step${step}Desc`)}
                  </p>
                </div>
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
              <div key={item} className="bg-white rounded-lg p-6 text-center card-hover">
                <Shield className="w-10 h-10 text-gold mx-auto mb-4" />
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
              <details key={index} className="bg-white rounded-lg border border-border group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-medium text-primary">{item.q}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing bg-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-300">{t('contact.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[
              { key: 'whatsapp', icon: MessageCircle },
              { key: 'telegram', icon: MessageCircle },
              { key: 'instagram', icon: Globe },
              { key: 'videoConsult', icon: Phone },
              { key: 'email', icon: Mail },
            ].map((item) => (
              <div key={item.key} className="bg-white/10 rounded-lg p-6 text-center">
                <item.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-1">{t(`contact.${item.key}`)}</h3>
                <p className="text-xs text-gray-300">{t(`contact.${item.key}Desc`)}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-300 text-sm">
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
