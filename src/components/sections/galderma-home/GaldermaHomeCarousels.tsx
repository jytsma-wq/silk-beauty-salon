'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import {
  homeHeroSlides,
  resultCases,
  skinConcernHighlights,
  skinTrendArticles,
} from '@/data/homepage';

function CarouselButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'previous' | 'next';
  onClick: () => void;
  disabled?: boolean;
}) {
  const t = useTranslations('accessibility');
  const Icon = direction === 'previous' ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'previous' ? t('previousSlide') : t('nextSlide')}
      className="grid size-11 place-items-center border border-stone-300 bg-white text-stone-950 transition-colors hover:border-stone-950 disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon className="size-4" strokeWidth={1.5} />
    </button>
  );
}

function useCarouselControls(options?: { loop?: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: options?.loop ?? false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = window.requestAnimationFrame(updateState);
    emblaApi.on('select', updateState);
    emblaApi.on('reInit', updateState);

    return () => {
      window.cancelAnimationFrame(frame);
      emblaApi.off('select', updateState);
      emblaApi.off('reInit', updateState);
    };
  }, [emblaApi, updateState]);

  return {
    emblaRef,
    emblaApi,
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
    canScrollPrev,
    canScrollNext,
    selectedIndex,
  };
}

export function ClinicalHeroCarousel() {
  const t = useTranslations('homeEditorial');
  const slides = homeHeroSlides.map((slide, index) => ({
    ...slide,
    eyebrow: t(`heroSlides.slide${index + 1}.eyebrow`),
    title: t(`heroSlides.slide${index + 1}.title`),
    description: t(`heroSlides.slide${index + 1}.description`),
    cta: t(`heroSlides.slide${index + 1}.cta`),
  }));
  const {
    emblaRef,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    selectedIndex,
  } = useCarouselControls();

  return (
    <section className="relative bg-[#f7f2eb] pt-42.5 md:pt-47">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <article key={slide.title} className="min-w-0 flex-[0_0_100%]">
              <div className="grid min-h-[calc(100svh-152px)] grid-cols-1 lg:grid-cols-[46%_54%]">
                <div className="order-2 flex items-center px-6 py-14 md:px-12 md:py-16 lg:order-1 lg:px-16 xl:px-24">
                  <div className="max-w-xl">
                    <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#765946]">
                      {slide.eyebrow}
                    </p>
                    {index === 0 ? (
                      <h1 className="font-sans text-[clamp(2.75rem,5.4vw,5.4rem)] font-light leading-[1.02] text-[#241f1b]">
                        {slide.title}
                      </h1>
                    ) : (
                      <h2 className="font-sans text-[clamp(2.75rem,5.4vw,5.4rem)] font-light leading-[1.02] text-[#241f1b]">
                        {slide.title}
                      </h2>
                    )}
                    <p className="mt-7 max-w-md text-base leading-8 text-stone-700 md:text-lg">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.href}
                      className="mt-10 inline-flex h-12 items-center border border-[#241f1b] px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
                <div className="relative order-1 min-h-[48svh] overflow-hidden lg:order-2 lg:min-h-0">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-3 md:bottom-10 md:right-10">
        <CarouselButton
          direction="previous"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
                  />
        <CarouselButton
          direction="next"
          onClick={scrollNext}
          disabled={!canScrollNext}
                  />
      </div>
      <div className="absolute bottom-8 left-6 flex gap-2 md:left-12 lg:left-16 xl:left-24">
        {slides.map((slide, index) => (
          <span
            key={slide.title}
            className={`h-px transition-all ${
              selectedIndex === index ? 'w-12 bg-[#241f1b]' : 'w-5 bg-stone-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function ConcernCarousel() {
  const t = useTranslations('homeEditorial');
  const concerns = skinConcernHighlights.map((item, index) => ({
    ...item,
    name: t(`concernItems.item${index + 1}.name`),
    description: t(`concernItems.item${index + 1}.description`),
  }));
  const { emblaRef, emblaApi, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarouselControls({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => window.clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <div>
      <div className="mb-8 flex justify-end gap-3">
        <CarouselButton
          direction="previous"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
                  />
        <CarouselButton
          direction="next"
          onClick={scrollNext}
          disabled={!canScrollNext}
                  />
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {concerns.map((item) => (
            <article
              key={item.name}
              className="min-w-0 flex-[0_0_86%] pl-5 sm:flex-[0_0_48%] lg:flex-[0_0_31%]"
            >
              <Link href={item.href} className="group block">
                <div className="relative aspect-4/5 overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 31vw"
                  />
                </div>
                <div className="border-b border-stone-200 py-6">
                  <h3 className="font-sans text-3xl font-light text-[#241f1b]">
                    {item.name}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResultsCarousel() {
  const t = useTranslations('homeEditorial');
  const cases = resultCases.map((item, index) => ({
    ...item,
    treatment: t(`resultItems.item${index + 1}.treatment`),
    detail: t(`resultItems.item${index + 1}.detail`),
  }));
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarouselControls();

  return (
    <div>
      <div className="mb-8 flex justify-end gap-3">
        <CarouselButton
          direction="previous"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
                  />
        <CarouselButton
          direction="next"
          onClick={scrollNext}
          disabled={!canScrollNext}
                  />
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex">
          {cases.map((item) => (
            <article
              key={item.treatment}
              className="min-w-0 flex-[0_0_92%] pl-6 md:flex-[0_0_58%] lg:flex-[0_0_42%]"
            >
              <div className="grid grid-cols-2 gap-1 bg-white">
                <div>
                  <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
                    <Image
                      src={item.beforeImage}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 46vw, 24vw"
                    />
                    <span className="absolute bottom-0 left-0 bg-[#241f1b] px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-white">
                      {t('results.before')}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
                    <Image
                      src={item.afterImage}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 46vw, 24vw"
                    />
                    <span className="absolute bottom-0 left-0 bg-[#765946] px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-white">
                      {t('results.after')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <h3 className="font-sans text-2xl font-light text-[#241f1b]">
                  {item.treatment}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-[0.68rem] uppercase tracking-[0.16em] text-stone-700">
        {t('results.disclaimer')}
      </p>
    </div>
  );
}

export function TrendsCarousel() {
  const t = useTranslations('homeEditorial');
  const articles = skinTrendArticles.map((article, index) => ({
    ...article,
    category: t(`trendItems.item${index + 1}.category`),
    title: t(`trendItems.item${index + 1}.title`),
  }));
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarouselControls();

  return (
    <div>
      <div className="mb-8 flex justify-end gap-3">
        <CarouselButton
          direction="previous"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
                  />
        <CarouselButton
          direction="next"
          onClick={scrollNext}
          disabled={!canScrollNext}
                  />
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {articles.map((article) => (
            <article
              key={article.title}
              className="min-w-0 flex-[0_0_88%] pl-5 md:flex-[0_0_48%] lg:flex-[0_0_32%]"
            >
              <Link href={article.href} className="group block">
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 88vw, 32vw"
                  />
                </div>
                <p className="mt-5 text-[0.68rem] uppercase tracking-[0.22em] text-[#765946]">
                  {article.category}
                </p>
                <h3 className="mt-3 font-sans text-3xl font-light leading-tight text-[#241f1b]">
                  {article.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
