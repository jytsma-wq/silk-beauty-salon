import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ChevronRight, Search, MapPin, Phone, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { treatmentCategories } from '@/data/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consultation' });
  
  return {
    title: t('metaTitle', { defaultValue: 'Find a Specialist | Silk Beauty Salon' }),
    description: t('metaDescription', { defaultValue: 'Book a consultation with our expert aesthetic practitioners. Start your journey to enhanced natural beauty.' }),
  };
}

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consultation' });

  const features = [
    {
      icon: Star,
      title: t('features.expert.title', { defaultValue: 'Expert Practitioners' }),
      description: t('features.expert.description', { defaultValue: 'Our team includes certified aesthetic doctors and nurses with extensive experience.' }),
    },
    {
      icon: Clock,
      title: t('features.personalized.title', { defaultValue: 'Personalized Approach' }),
      description: t('features.personalized.description', { defaultValue: 'Every treatment plan is tailored to your unique facial anatomy and aesthetic goals.' }),
    },
    {
      icon: MapPin,
      title: t('features.convenient.title', { defaultValue: 'Convenient Location' }),
      description: t('features.convenient.description', { defaultValue: 'Easy access in central Tbilisi with comfortable, private treatment rooms.' }),
    },
  ];

  const steps = [
    {
      number: '1',
      title: t('steps.consultation.title', { defaultValue: 'Initial Consultation' }),
      description: t('steps.consultation.description', { defaultValue: 'Discuss your concerns, goals, and medical history with our specialist.' }),
    },
    {
      number: '2',
      title: t('steps.assessment.title', { defaultValue: 'Facial Assessment' }),
      description: t('steps.assessment.description', { defaultValue: 'Comprehensive analysis of your facial structure and skin condition.' }),
    },
    {
      number: '3',
      title: t('steps.plan.title', { defaultValue: 'Treatment Plan' }),
      description: t('steps.plan.description', { defaultValue: 'Receive a personalized treatment plan with recommendations and pricing.' }),
    },
    {
      number: '4',
      title: t('steps.treatment.title', { defaultValue: 'Treatment' }),
      description: t('steps.treatment.description', { defaultValue: 'Schedule your treatment at your convenience with our caring team.' }),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1920&q=80"
            alt="Consultation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1c1c1c]/50" />
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl text-white">
            <nav className="flex items-center gap-2 text-sm mb-8 text-white/80">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#b5453a]">Consultation</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6">
              {t('hero.title', { defaultValue: 'Explore the possibilities with a treatment consultation' })}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {t('hero.description', { 
                defaultValue: 'An essential part of treatment, the aesthetic consultation is where your journey begins. The better we understand your needs and desires, the more likely you will achieve the results you want.' 
              })}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-[#b5453a] hover:bg-[#8e3229] text-white rounded-none px-8 py-6 text-sm tracking-widest uppercase"
              >
                <Link href="/book">
                  {t('hero.cta', { defaultValue: 'Book Consultation' })}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary rounded-none px-8 py-6 text-sm tracking-widest uppercase"
              >
                <Link href="tel:+995599123456">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('hero.call', { defaultValue: 'Call Us' })}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 border-t border-[#e8e4df]">
                <feature.icon className="w-6 h-6 text-[#b5453a] mb-6" />
                <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
              {t('journey.title', { defaultValue: 'Your Aesthetic Journey' })}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('journey.subtitle', { 
                defaultValue: 'From consultation to results, we guide you through every step of your transformation.' 
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="border-t border-[#e8e4df] pt-6">
                <span className="text-xs tracking-[0.15em] uppercase text-[#b5453a]">
                  {String(step.number).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
              {t('treatments.title', { defaultValue: 'Treatments We Offer' })}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('treatments.subtitle', { 
                defaultValue: 'Comprehensive aesthetic solutions for every concern.' 
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentCategories.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group block py-6 border-t border-[#e8e4df]"
              >
                <h3 className="font-serif text-xl font-semibold text-primary mb-2 group-hover:text-[#b5453a] transition-colors">
                  {category.name}
                </h3>
                <ul className="space-y-1 mb-3">
                  {category.items.slice(0, 3).map((item) => (
                    <li key={item.slug} className="text-sm text-muted-foreground">
                      {item.name}
                    </li>
                  ))}
                </ul>
                <span className="text-[#b5453a] text-sm">
                  Explore treatments →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80"
            alt="Book consultation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1c1c1c]/60" />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            {t('cta.title', { defaultValue: 'Ready to Start Your Journey?' })}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            {t('cta.description', { 
              defaultValue: 'Book your consultation today and take the first step towards enhanced natural beauty.' 
            })}
          </p>
          <Button
            asChild
            className="bg-[#b5453a] hover:bg-[#8e3229] text-white rounded-none px-8 py-6 text-sm tracking-widest uppercase"
          >
            <Link href="/book">
              {t('cta.button', { defaultValue: 'Find a Specialist' })}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
