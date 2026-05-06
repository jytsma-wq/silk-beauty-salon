import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { portfolioHighlights, proofStats } from '@/data/homepage';
import {
  ClinicalHeroCarousel,
  ConcernCarousel,
  ResultsCarousel,
  TrendsCarousel,
} from './GaldermaHomeCarousels';

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
        {eyebrow}
      </p>
      <h2 className="font-sans text-[clamp(2.6rem,5vw,5.2rem)] font-light leading-[0.98] text-[#241f1b]">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PhilosophySection() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[42%_58%] lg:items-end">
        <SectionHeading
          eyebrow="Our approach"
          title="A skin-first aesthetic practice."
          description="The Galderma-inspired direction is clean, clinical, and product-aware: fewer decorative effects, more trust, more education, and a calmer visual rhythm."
        />
        <div className="border-t border-stone-200 pt-8">
          <p className="font-sans text-[clamp(2rem,3.8vw,3.8rem)] font-light leading-tight text-[#241f1b]">
            We study your skin, facial structure, and goals before recommending a treatment.
            The result should look considered, balanced, and quietly confident.
          </p>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Holistic aesthetic treatments."
            description="A considered portfolio for facial balance, skin quality, and long-term confidence."
          />
          <Link
            href="/treatments"
            className="inline-flex h-12 items-center self-start border border-[#241f1b] px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
          >
            View all treatments
          </Link>
        </div>

        <div className="grid gap-px bg-stone-200 lg:grid-cols-3">
          {portfolioHighlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="min-h-56 p-7 md:p-9">
                <h3 className="font-sans text-4xl font-light text-[#241f1b]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {item.description}
                </p>
                <span className="mt-7 inline-block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#8d6f58]">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-[#f7f2eb] px-6 py-20 md:px-12 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-px bg-stone-200 md:grid-cols-3">
        {proofStats.map((stat) => (
          <div key={stat.label} className="bg-[#f7f2eb] px-8 py-12 text-center">
            <p className="font-sans text-6xl font-light leading-none text-[#241f1b]">
              {stat.value}
            </p>
            <p className="mt-4 text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpecialistCta() {
  return (
    <section className="bg-[#241f1b] px-6 py-24 text-white md:px-12 md:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[55%_45%] lg:items-center">
        <div>
          <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#d8cbbb]">
            Find your specialist
          </p>
          <h2 className="font-sans text-[clamp(3rem,6vw,6rem)] font-light leading-[0.95]">
            Begin with a clinical consultation.
          </h2>
        </div>
        <div>
          <p className="max-w-lg text-base leading-8 text-stone-200 md:text-lg">
            Visit {siteConfig.name} in Batumi for a structured assessment and a treatment
            plan tailored to your skin, anatomy, timing, and comfort.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#f7f2eb]"
            >
              Book now
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex h-12 items-center justify-center border border-white/60 px-7 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#241f1b]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GaldermaInspiredHome() {
  return (
    <>
      <ClinicalHeroCarousel />
      <PhilosophySection />

      <section className="bg-[#f7f2eb] px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Skin concerns"
              title="Real solutions for real skin concerns."
              description="Explore common concerns and the treatment pathways that can support healthier, more confident skin."
            />
          </div>
          <ConcernCarousel />
        </div>
      </section>

      <PortfolioSection />
      <StatsSection />

      <section className="bg-[#f7f2eb] px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Real results"
              title="The proof is in the plan."
              description="Before-and-after stories should be read as clinical examples, not promises. Your result depends on anatomy, product choice, dosage, and aftercare."
            />
            <Link
              href="/before-after"
              className="inline-flex h-12 items-center self-start border border-[#241f1b] px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
            >
              See results
            </Link>
          </div>
          <ResultsCarousel />
        </div>
      </section>

      <SpecialistCta />

      <section className="bg-white px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Skin trends"
              title="Aesthetic insight, without the noise."
              description="Educational notes for patients who want to understand treatment planning before they book."
            />
            <Link
              href="/blog"
              className="inline-flex h-12 items-center self-start border border-[#241f1b] px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
            >
              Read journal
            </Link>
          </div>
          <TrendsCarousel />
        </div>
      </section>
    </>
  );
}
