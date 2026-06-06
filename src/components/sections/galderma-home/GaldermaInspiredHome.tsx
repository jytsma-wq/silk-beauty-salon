'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
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
      <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#765946]">
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
  const t = useTranslations('homeEditorial');

  return (
    <section className="bg-white px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[42%_58%] lg:items-end">
        <SectionHeading
          eyebrow={t('philosophy.eyebrow')}
          title={t('philosophy.title')}
          description={t('philosophy.description')}
        />
        <div className="border-t border-stone-200 pt-8">
          <p className="font-sans text-[clamp(2rem,3.8vw,3.8rem)] font-light leading-tight text-[#241f1b]">
            {t('philosophy.statement')}
          </p>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const t = useTranslations('homeEditorial');
  const items = portfolioHighlights.map((item, index) => ({
    ...item,
    title: t(`portfolio.items.item${index + 1}.title`),
    description: t(`portfolio.items.item${index + 1}.description`),
  }));

  return (
    <section className="bg-white px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t('portfolio.eyebrow')}
            title={t('portfolio.title')}
            description={t('portfolio.description')}
          />
          <Link
            href="/treatments"
            className="inline-flex h-12 items-center self-start border border-[#241f1b] px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
          >
            {t('portfolio.viewAll')}
          </Link>
        </div>

        <div className="grid gap-px bg-stone-200 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.title} href={item.href} className="group bg-white">
              <div className="relative aspect-4/5 overflow-hidden bg-stone-100">
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
                <span className="mt-7 inline-block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#765946]">
                  {t('portfolio.explore')}
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
  const t = useTranslations('homeEditorial');

  return (
    <section className="bg-[#f7f2eb] px-6 py-20 md:px-12 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-px bg-stone-200 md:grid-cols-3">
        {proofStats.map((stat, index) => (
          <div key={stat.value} className="bg-[#f7f2eb] px-8 py-12 text-center">
            <p className="font-sans text-6xl font-light leading-none text-[#241f1b]">
              {stat.value}
            </p>
            <p className="mt-4 text-[0.68rem] uppercase tracking-[0.22em] text-stone-700">
              {t(`stats.item${index + 1}.label`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpecialistCta() {
  const t = useTranslations('homeEditorial');

  return (
    <section className="bg-[#241f1b] px-6 py-24 text-white md:px-12 md:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[55%_45%] lg:items-center">
        <div>
          <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#d8cbbb]">
            {t('cta.eyebrow')}
          </p>
          <h2 className="font-sans text-[clamp(3rem,6vw,6rem)] font-light leading-[0.95]">
            {t('cta.title')}
          </h2>
        </div>
        <div>
          <p className="max-w-lg text-base leading-8 text-stone-200 md:text-lg">
            {t('cta.description', { clinicName: siteConfig.name })}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#f7f2eb]"
            >
              {t('cta.bookNow')}
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex h-12 items-center justify-center border border-white/60 px-7 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#241f1b]"
            >
              {t('cta.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GaldermaInspiredHome() {
  const t = useTranslations('homeEditorial');
  return (
    <>
      <ClinicalHeroCarousel />
      <PhilosophySection />

      <section className="bg-[#f7f2eb] px-6 py-24 md:px-12 md:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <SectionHeading
              eyebrow={t('concerns.eyebrow')}
              title={t('concerns.title')}
              description={t('concerns.description')}
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
              eyebrow={t('results.eyebrow')}
              title={t('results.title')}
              description={t('results.description')}
            />
            <Link
              href="/before-after"
              className="inline-flex h-12 items-center self-start border border-[#241f1b] px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
            >
              {t('results.cta')}
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
              eyebrow={t('journal.eyebrow')}
              title={t('journal.title')}
              description={t('journal.description')}
            />
            <Link
              href="/blog"
              className="inline-flex h-12 items-center self-start border border-[#241f1b] px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
            >
              {t('journal.cta')}
            </Link>
          </div>
          <TrendsCarousel />
        </div>
      </section>
    </>
  );
}
