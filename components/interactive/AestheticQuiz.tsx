'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const translations: Record<string, {
  subtitle: string;
  title: string[];
  desc: string;
  question: string;
  of: string;
  bookNow: string;
  retake: string;
  steps: { q: string; options: { label: string; value: string }[] }[];
  results: Record<string, { title: string; desc: string; treatments: string[] }>;
}> = {
  en: {
    subtitle: 'Personalised',
    title: ['Find Your Perfect', 'Treatment'],
    desc: 'Answer 3 quick questions for a tailored recommendation.',
    question: 'Question',
    of: 'of',
    bookNow: 'Book Now',
    retake: 'Retake Quiz',
    steps: [
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
          { label: 'Face & Skin', value: 'face' },
          { label: 'Eyes & Brows', value: 'eyes' },
          { label: 'Hair', value: 'hair' },
          { label: 'Nails', value: 'nails' },
        ],
      },
      {
        q: 'What is your comfort level with procedures?',
        options: [
          { label: 'Non-invasive only', value: 'non-invasive' },
          { label: 'Open to minor treatments', value: 'minor' },
          { label: 'Medical treatments are fine', value: 'medical' },
          { label: 'Not sure, need consultation', value: 'consult' },
        ],
      },
    ],
    results: {
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
    },
  },
  ru: {
    subtitle: 'Персональный',
    title: ['Найдите идеальную', 'процедуру'],
    desc: 'Ответьте на 3 вопроса для персональной рекомендации.',
    question: 'Вопрос',
    of: 'из',
    bookNow: 'Записаться',
    retake: 'Пройти снова',
    steps: [
      {
        q: 'Какая ваша главная цель?',
        options: [
          { label: 'Выглядеть моложе и свежее', value: 'anti-aging' },
          { label: 'Подчеркнуть естественную красоту', value: 'enhance' },
          { label: 'Исправить конкретную проблему', value: 'fix' },
          { label: 'Побаловать себя роскошью', value: 'luxury' },
        ],
      },
      {
        q: 'Какая зона вас интересует больше всего?',
        options: [
          { label: 'Лицо и кожа', value: 'face' },
          { label: 'Глаза и брови', value: 'eyes' },
          { label: 'Волосы', value: 'hair' },
          { label: 'Ногти', value: 'nails' },
        ],
      },
      {
        q: 'Какой уровень инвазивности вам комфортен?',
        options: [
          { label: 'Только неинвазивные процедуры', value: 'non-invasive' },
          { label: 'Открыта к легким процедурам', value: 'minor' },
          { label: 'Медицинские процедуры подходят', value: 'medical' },
          { label: 'Не уверена, нужна консультация', value: 'consult' },
        ],
      },
    ],
    results: {
      'anti-aging+face+medical': {
        title: 'Протокол омоложения',
        desc: 'На основе ваших целей, антивозрастные инъекции и уход за кожей — идеальный выбор.',
        treatments: ['Ботокс — полное лицо', 'HydraFacial', 'Skin Booster'],
      },
      'enhance+eyes+non-invasive': {
        title: 'Искусство глаз',
        desc: 'Подчеркните естественную красоту глаз с помощью ресниц и бровей.',
        treatments: ['Русский объем', 'Ламинирование бровей', 'Лифтинг ресниц'],
      },
      default: {
        title: 'Персональная консультация',
        desc: 'На основе ваших ответов мы рекомендуем персональную консультацию со специалистом.',
        treatments: ['Бесплатная консультация', 'HydraFacial', 'Лифтинг ресниц'],
      },
    },
  },
  ka: {
    subtitle: 'პერსონალიზებული',
    title: ['იპოვეთ თქვენი', 'იდეალური პროცედურა'],
    desc: 'უპასუხეთ 3 კითხვას პერსონალური რეკომენდაციისთვის.',
    question: 'კითხვა',
    of: '/',
    bookNow: 'დაჯავშნა',
    retake: 'ხელახლა გავლა',
    steps: [
      {
        q: 'რა არის თქვენი მთავარი მიზანი?',
        options: [
          { label: 'უფრო ახალგაზრდული გარეგნობა', value: 'anti-aging' },
          { label: 'ბუნებრივი მახასიათებლების გამოკვეთა', value: 'enhance' },
          { label: 'კონკრეტული პრობლემის გამოსწორება', value: 'fix' },
          { label: 'საკუთარი თავის ზეიმი', value: 'luxury' },
        ],
      },
      {
        q: 'რომელი ზონა განტვირთავთ ყველაზე მეტად?',
        options: [
          { label: 'სახე და კანი', value: 'face' },
          { label: 'თვალები და წარბები', value: 'eyes' },
          { label: 'თმა', value: 'hair' },
          { label: 'ფრჩხილები', value: 'nails' },
        ],
      },
      {
        q: 'რა დონის ჩარევა გაწონასწორებთ?',
        options: [
          { label: 'მხოლოდ არაინვაზიური', value: 'non-invasive' },
          { label: 'მსუბუქ პროცედურებს ვაპირებ', value: 'minor' },
          { label: 'მედიცინური პროცედურები მოსულება', value: 'medical' },
          { label: 'არ ვარ დარწმუნებული, კონსულტაცია მჭირდება', value: 'consult' },
        ],
      },
    ],
    results: {
      'anti-aging+face+medical': {
        title: 'ახალგაზრდობის პროტოკოლი',
        desc: 'თქვენი მიზნების გათვალისწინებით, ანტი-ეჯინგ ინექციები და კანის მოვლა იდეალურია.',
        treatments: ['ბოტოქსი — სრული სახე', 'HydraFacial', 'Skin Booster'],
      },
      'enhance+eyes+non-invasive': {
        title: 'თვალების ხელოვნება',
        desc: 'გამოაჩინეთ თვალების ბუნებრივი სილამაზე რესნიჩებით და წარბებით.',
        treatments: ['რუსული მოცულობა', 'წარბების ლამინაცია', 'რესნიჩების ლიფტინგი'],
      },
      default: {
        title: 'პერსონალური კონსულტაცია',
        desc: 'თქვენი პასუხების მიხედვით, გირჩევთ პერსონალურ კონსულტაციას სპეციალისტთან.',
        treatments: ['უფასო კონსულტაცია', 'HydraFacial', 'რესნიჩების ლიფტინგი'],
      },
    },
  },
  he: {
    subtitle: 'אישי',
    title: ['מצאי את הטיפול', 'המושלם עבורך'],
    desc: 'ענו על 3 שאלות קצרות לקבלת המלצה מותאמת אישית.',
    question: 'שאלה',
    of: 'מתוך',
    bookNow: 'הזמיני תור',
    retake: 'לעשות שוב',
    steps: [
      {
        q: 'מהי מטרת היופי העיקרית שלך?',
        options: [
          { label: 'להראות רעננה וצעירה יותר', value: 'anti-aging' },
          { label: 'להדגיש תכונות טבעיות', value: 'enhance' },
          { label: 'לתקן בעיה ספציפית', value: 'fix' },
          { label: 'לפנק את עצמי במותרות', value: 'luxury' },
        ],
      },
      {
        q: 'איזו אזור מעניין אותך הכי הרבה?',
        options: [
          { label: 'פנים ועור', value: 'face' },
          { label: 'עיניים וגבות', value: 'eyes' },
          { label: 'שיער', value: 'hair' },
          { label: 'ציפורניים', value: 'nails' },
        ],
      },
      {
        q: 'מהי רמת הנוחות שלך עם הליכים?',
        options: [
          { label: 'רק לא פולשני', value: 'non-invasive' },
          { label: 'פתוחה לטיפולים קלים', value: 'minor' },
          { label: 'טיפולים רפואיים בסדר', value: 'medical' },
          { label: 'לא בטוחה, צריכה ייעוץ', value: 'consult' },
        ],
      },
    ],
    results: {
      'anti-aging+face+medical': {
        title: 'פרוטוקול התחדשות',
        desc: 'בהתבסס על המטרות שלך, הזרקות אנטי-אייג׳ינג וטיפולי עור הם ההתאמה המושלמת.',
        treatments: ['בוטוקס — פנים מלאות', 'HydraFacial', 'Skin Booster'],
      },
      'enhance+eyes+non-invasive': {
        title: 'אומנות העין',
        desc: 'הדגישי את היופי הטבעי של העיניים עם ריסים וגבות.',
        treatments: ['נפח רוסי', 'למינציה לגבות', 'ליפטינג לריסים'],
      },
      default: {
        title: 'ייעוץ אישי',
        desc: 'בהתבסס על התשובות שלך, אנו ממליצים על ייעוץ אישי עם אחד המומחים שלנו.',
        treatments: ['ייעוץ חינם', 'HydraFacial', 'ליפטינג לריסים'],
      },
    },
  },
  ar: {
    subtitle: 'شخصي',
    title: ['جدي علاجك', 'المثالي'],
    desc: 'أجيبي عن 3 أسئلة سريعة للحصول على توصية مخصصة.',
    question: 'سؤال',
    of: 'من',
    bookNow: 'احجزي الآن',
    retake: 'إعادة الاختبار',
    steps: [
      {
        q: 'ما هو هدفك الرئيسي للجمال؟',
        options: [
          { label: 'أن أبدو منتعشة وأصغر سناً', value: 'anti-aging' },
          { label: 'تعزيز ملامحي الطبيعية', value: 'enhance' },
          { label: 'إصلاح مشكلة محددة', value: 'fix' },
          { label: 'أدلل نفسي بالفخامة', value: 'luxury' },
        ],
      },
      {
        q: 'أي منطقة تهمك أكثر؟',
        options: [
          { label: 'الوجه والبشرة', value: 'face' },
          { label: 'العيون والحواجب', value: 'eyes' },
          { label: 'الشعر', value: 'hair' },
          { label: 'الأظافر', value: 'nails' },
        ],
      },
      {
        q: 'ما هو مستوى راحتك مع الإجراءات؟',
        options: [
          { label: 'غير جراحية فقط', value: 'non-invasive' },
          { label: 'منفتحة على علاجات بسيطة', value: 'minor' },
          { label: 'العلاجات الطبية مقبولة', value: 'medical' },
          { label: 'لست متأكدة، أحتاج استشارة', value: 'consult' },
        ],
      },
    ],
    results: {
      'anti-aging+face+medical': {
        title: 'بروتوكول التجديد',
        desc: 'بناءً على أهدافك، الحقن المضادة للشيخوخة وعلاجات البشرة هي الخيار المثالي.',
        treatments: ['بوتوكس — الوجه كاملاً', 'HydraFacial', 'Skin Booster'],
      },
      'enhance+eyes+non-invasive': {
        title: 'فن العين',
        desc: 'عززي جمال عينيكِ الطبيعي مع رموش وحواجب مميزة.',
        treatments: ['الحجم الروسي', 'تثبيت الحواجب', 'رفع الرموش'],
      },
      default: {
        title: 'استشارة شخصية',
        desc: 'بناءً على إجاباتك، نوصي باستشارة شخصية مع أحد متخصصينا.',
        treatments: ['استشارة مجانية', 'HydraFacial', 'رفع الرموش'],
      },
    },
  },
  tr: {
    subtitle: 'Kişiselleştirilmiş',
    title: ['Mükemmel', 'Tedavinizi Bulun'],
    desc: 'Kişiselleştirilmiş bir öneri için 3 hızlı soruyu yanıtlayın.',
    question: 'Soru',
    of: '/',
    bookNow: 'Randevu Al',
    retake: 'Testi Tekrarla',
    steps: [
      {
        q: 'Ana güzellik hedefiniz nedir?',
        options: [
          { label: 'Daha genç ve canlı görünmek', value: 'anti-aging' },
          { label: 'Doğal özelliklerimi vurgulamak', value: 'enhance' },
          { label: 'Belirli bir sorunu düzeltmek', value: 'fix' },
          { label: 'Kendimi lüksle ödüllendirmek', value: 'luxury' },
        ],
      },
      {
        q: 'Hangi alan sizi en çok ilgilendiriyor?',
        options: [
          { label: 'Yüz ve Cilt', value: 'face' },
          { label: 'Gözler ve Kaşlar', value: 'eyes' },
          { label: 'Saç', value: 'hair' },
          { label: 'Tırnaklar', value: 'nails' },
        ],
      },
      {
        q: 'İşlemlerle ilgili rahatlık seviyeniz nedir?',
        options: [
          { label: 'Sadece non-invaziv', value: 'non-invasive' },
          { label: 'Hafif tedavilere açığım', value: 'minor' },
          { label: 'Medikal tedaviler uygun', value: 'medical' },
          { label: 'Emin değilim, danışmanlık gerekli', value: 'consult' },
        ],
      },
    ],
    results: {
      'anti-aging+face+medical': {
        title: 'Gençleşme Protokolü',
        desc: 'Hedeflerinize göre, anti-aging enjeksiyonları ve cilt tedavileri mükemmel uyum sağlıyor.',
        treatments: ['Botox — Tam Yüz', 'HydraFacial', 'Skin Booster'],
      },
      'enhance+eyes+non-invasive': {
        title: 'Göz Sanatı',
        desc: 'İmza kirpik ve kaş hizmetlerimizle doğal göz güzelliğinizi vurgulayın.',
        treatments: ['Rus Hacimi', 'Kaş Laminasyonu', 'Kirpik Lifting'],
      },
      default: {
        title: 'Kişiselleştirilmiş Danışmanlık',
        desc: 'Cevaplarınıza dayanarak, uzmanlarımızdan biriyle kişiselleştirilmiş bir danışmanlık öneriyoruz.',
        treatments: ['Ücretsiz Danışmanlık', 'HydraFacial', 'Kirpik Lifting'],
      },
    },
  },
};

function getResult(answers: string[], locale: string) {
  const t = translations[locale] || translations.en;
  const key = answers.join('+');
  return t.results[key] ?? t.results['default'];
}

export default function AestheticQuiz({ locale }: { locale: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const t = translations[locale] || translations.en;

  function pick(value: string) {
    const next = [...answers, value];
    if (step < t.steps.length - 1) {
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

  const result = done ? getResult(answers, locale) : null;
  const progress = ((step) / t.steps.length) * 100;

  return (
    <section
      className="px-6 py-24"
      style={{ background: 'linear-gradient(180deg, #111009 0%, #0d0a08 100%)' }}
    >
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-3">{t.subtitle}</p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.title[0]}
            <br />{t.title[1]}
          </h2>
          <p className="text-stone-500 mt-4 text-sm">{t.desc}</p>
        </div>

        <div
          className="rounded-3xl border border-stone-800 p-8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {/* Progress */}
          {!done && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-stone-600 mb-2">
                <span>{t.question} {step + 1} {t.of} {t.steps.length}</span>
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
                  {t.steps[step].q}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.steps[step].options.map((opt) => (
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
                  {result!.treatments.map((treatment) => (
                    <span
                      key={treatment}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-amber-400/20 text-amber-400 bg-amber-400/5"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/${locale}/contact`}
                    className="px-7 py-3 rounded-full text-sm font-semibold text-stone-900 transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                  >
                    {t.bookNow}
                  </Link>
                  <button
                    onClick={reset}
                    className="px-7 py-3 rounded-full text-sm text-stone-400 border border-stone-700 hover:border-stone-500 transition-colors"
                  >
                    {t.retake}
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
