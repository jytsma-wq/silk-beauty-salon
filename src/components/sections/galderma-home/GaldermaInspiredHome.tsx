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
      <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#76563f]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-[clamp(2.45rem,4.2vw,4.8rem)] font-normal leading-[1.06] text-[#241f1b]">
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
    <section className="bg-[#050505] px-6 py-20 text-white md:px-12 md:py-28 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[44%_56%] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden bg-stone-900 md:min-h-[560px]">
          <Image
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200&q=85"
            alt=""
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 1024px) 100vw, 44vw"
          />
        </div>
        <div className="lg:pl-10">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/55">
            {t('philosophy.eyebrow')}
          </p>
          <h2 className="max-w-2xl font-serif text-[clamp(2.7rem,4.8vw,5.3rem)] font-normal leading-[1.06] text-white/75">
            {t('philosophy.title')}
          </h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            {t('philosophy.statement')}
          </p>
          <Link
            href="/conditions"
            className="mt-10 inline-flex h-12 items-center border border-white/35 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition-colors hover:border-white hover:bg-white hover:text-[#241f1b]"
          >
            {t('concerns.title')}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const t = useTranslations('home');
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

        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.title} href={item.href} className="group relative block min-h-[560px] overflow-hidden bg-[#050505]">
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.035]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/88 via-[#050505]/22 to-transparent" />
              </div>
              <div className="relative z-10 flex min-h-[560px] flex-col justify-end p-7 md:p-9">
                <h3 className="font-serif text-4xl font-normal leading-tight text-white/85">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
                  {item.description}
                </p>
                <span className="mt-7 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/75">
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
            <p className="font-serif text-6xl font-normal leading-none text-[#241f1b]">
              {stat.value}
            </p>
            <p className="mt-4 text-[0.68rem] uppercase tracking-[0.22em] text-stone-600">
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
    <section className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-16 xl:px-24">
      <div className="relative mx-auto min-h-[460px] max-w-7xl overflow-hidden bg-[#f7f2eb]">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=85"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        <div className="relative z-10 flex min-h-[460px] max-w-2xl flex-col justify-center px-7 py-14 md:px-12 lg:px-16">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#76563f]">
            {t('cta.eyebrow')}
          </p>
          <h2 className="font-serif text-[clamp(2.6rem,4.6vw,4.9rem)] font-normal leading-[1.06] text-[#241f1b]">
            {t('cta.title')}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-stone-700 md:text-lg">
            {t('cta.description', { clinicName: siteConfig.name })}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex h-12 items-center justify-center bg-[#241f1b] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#76563f]"
            >
              {t('cta.bookNow')}
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex h-12 items-center justify-center border border-[#241f1b] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
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
  const t = useTranslations('home');
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
