'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    q: 'What is your main beauty goal?',
    options: [
      { label: 'Look more refreshed & youthful', value: 'anti-aging' },
      { label: 'Enhance my natural features', value: 'enhance' },
      { label: 'Fix a specific concern', value: 'fix' },
      { label: 'Treat myself to luxury', value: 'luxury' },
    ],
  },
  {
    q: 'Which area interests you most?',
    options: [
      { label: 'Face & Skin',  value: 'face' },
      { label: 'Eyes & Brows', value: 'eyes' },
      { label: 'Hair',         value: 'hair' },
      { label: 'Nails',        value: 'nails' },
    ],
  },
  {
    q: 'What is your comfort level with procedures?',
    options: [
      { label: 'Non-invasive only',          value: 'non-invasive' },
      { label: 'Open to minor treatments',   value: 'minor' },
      { label: 'Medical treatments are fine', value: 'medical' },
      { label: 'Not sure, need consultation', value: 'consult' },
    ],
  },
];

const RESULTS: Record<string, { title: string; desc: string; treatments: string[] }> = {
  'anti-aging+face+medical': {
    title: 'Rejuvenation Protocol',
    desc: 'Based on your goals, our anti-aging injectables and skin treatments are the perfect fit.',
    treatments: ['Botox – Full Face', 'HydraFacial', 'Skin Booster'],
  },
  'enhance+eyes+non-invasive': {
    title: 'Eye Artistry',
    desc: 'Enhance your natural eye beauty with our signature lash and brow services.',
    treatments: ['Russian Volume Lashes', 'Brow Lamination', 'Lash Lift & Tint'],
  },
  default: {
    title: 'Personalised Consultation',
    desc: 'Based on your answers, we recommend a personalised consultation with one of our specialists.',
    treatments: ['Free Consultation', 'HydraFacial', 'Lash Lift & Tint'],
  },
};

function getResult(answers: string[]) {
  const key = answers.join('+');
  return RESULTS[key] ?? RESULTS['default'];
}

export default function AestheticQuiz({ locale }: { locale: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function pick(value: string) {
    const next = [...answers, value];
    if (step < steps.length - 1) {
      setAnswers(next);
      setStep(step + 1);
    } else {
      setAnswers(next);
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setDone(false);
  }

  const result = done ? getResult(answers) : null;
  const progress = ((step) / steps.length) * 100;

  return (
    <section
      className="px-6 py-24"
      style={{ background: 'linear-gradient(180deg, #111009 0%, #0d0a08 100%)' }}
    >
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-3">Personalised</p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Find Your Perfect
            <br />Treatment
          </h2>
          <p className="text-stone-500 mt-4 text-sm">Answer 3 quick questions for a tailored recommendation.</p>
        </div>

        <div
          className="rounded-3xl border border-stone-800 p-8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {/* Progress */}
          {!done && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-stone-600 mb-2">
                <span>Question {step + 1} of {steps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #C9A96E, #a07840)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white font-display text-xl font-bold mb-6">
                  {steps[step].q}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps[step].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => pick(opt.value)}
                      className="text-left px-5 py-4 rounded-2xl border border-stone-800 text-stone-300 text-sm hover:border-amber-400/40 hover:text-amber-300 hover:bg-amber-400/5 transition-all"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(201,169,110,0.15)' }}
                >
                  ✨
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-3">{result!.title}</h3>
                <p className="text-stone-400 text-sm mb-6">{result!.desc}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {result!.treatments.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-amber-400/20 text-amber-400 bg-amber-400/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/${locale}/contact`}
                    className="px-7 py-3 rounded-full text-sm font-semibold text-stone-900 transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                  >
                    Book Now
                  </Link>
                  <button
                    onClick={reset}
                    className="px-7 py-3 rounded-full text-sm text-stone-400 border border-stone-700 hover:border-stone-500 transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
