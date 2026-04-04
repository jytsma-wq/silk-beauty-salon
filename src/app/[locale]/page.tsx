import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { TreatmentsSection } from '@/components/sections/TreatmentsSection';
import { ConditionsSection } from '@/components/sections/ConditionsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { QuickLinksSection } from '@/components/sections/QuickLinksSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  void params; // params is needed for Next.js
  
  return (
    <>
      <HeroSection />
      <TreatmentsSection />
      <ConditionsSection />
      <AboutSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <QuickLinksSection />
      <NewsletterSection />
    </>
  );
}
