'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Maria K.',
    location: 'Tbilisi, Georgia',
    flag: '🇬🇪',
    treatment: 'Lip Filler – Russian Technique',
    rating: 5,
    review: {
      en: 'Absolutely flawless results! Dr. Nana understood exactly what I wanted – natural, heart-shaped lips. The whole experience was professional and comfortable. Will definitely come back!',
      ru: 'Безупречный результат! Доктор Нана точно поняла, что я хотела – естественные губы формы сердца. Очень профессионально и комфортно. Обязательно вернусь!',
      ka: 'უბრალოდ ბრწყინვალე შედეგი! დოქტორმა ნანამ ზუსტად გაიგო რაც მინდოდა. ძალიან პროფესიონალური. მოუთმენლად ველოდები მომავალ ვიზიტს!',
      he: 'תוצאות מושלמות! ד"ר ננה הבינה בדיוק מה רציתי. מקצועי ונוח מאוד.',
      ar: 'نتائج لا تشوبها شائبة! الدكتورة نانا فهمت بالضبط ما أردت.',
      tr: 'Kusursuz sonuçlar! Dr. Nana tam olarak istediğimi anladı.',
    },
    date: '2024-11-15',
  },
  {
    id: 2,
    name: 'Sarah L.',
    location: 'Tel Aviv, Israel',
    flag: '🇮🇱',
    treatment: 'Botox – Full Face',
    rating: 5,
    review: {
      en: 'I travel from Israel specifically for Silk Beauty. The prices are incredibly competitive and the quality rivals top clinics in Tel Aviv. Dr. Nana is a true artist.',
      ru: 'Я езжу из Израиля специально в Silk Beauty. Цены невероятно конкурентные, а качество не уступает лучшим клиникам Тель-Авива.',
      ka: 'ისრაელიდან სპეციალურად მოვდივარ Silk Beauty-ში. ფასები ძალიან კონკურენტულია.',
      he: 'אני נוסעת מישראל במיוחד לסילק ביוטי. המחירים תחרותיים והאיכות מעולה.',
      ar: 'أسافر من إسرائيل خصيصاً إلى سيلك بيوتي. الأسعار تنافسية والجودة ممتازة.',
      tr: 'İsrail\'den özellikle Silk Beauty\'ye geliyorum. Fiyatlar rekabetçi ve kalite mükemmel.',
    },
    date: '2024-10-28',
  },
  {
    id: 3,
    name: 'Anna M.',
    location: 'Moscow, Russia',
    flag: '🇷🇺',
    treatment: 'Russian Volume Lashes',
    rating: 5,
    review: {
      en: 'Best lash work I\'ve ever had! Tamara is incredibly skilled. The lashes look so natural yet dramatic. Perfect for my vacation in Batumi.',
      ru: 'Лучшая работа с ресницами, которую я когда-либо видела! Тамара невероятно мастер. Ресницы выглядят естественно и драматично одновременно.',
      ka: 'საუკეთესო წამწამების მუშაობა! თამარა ძალიან გამოცდილია.',
      he: 'העבודה הטובה ביותר עם ריסים שהייתה לי!',
      ar: 'أفضل عمل رموش حصلت عليه!',
      tr: 'Şimdiye kadar gördüğüm en iyi kirpik işi!',
    },
    date: '2024-10-15',
  },
  {
    id: 4,
    name: 'Leyla A.',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    treatment: 'HydraFacial + Chemical Peel',
    rating: 5,
    review: {
      en: 'My skin has never looked better! The HydraFacial combined with the peel gave me that "glass skin" effect. Worth every lari!',
      ru: 'Моя кожа никогда не выглядела лучше! HydraFacial в сочетании с пилингом дал эффект "стеклянной кожи".',
      ka: 'ჩემი კანი არასოდეს ყოფილა ასე კარგად!',
      he: 'העור שלי מעולם לא נראה טוב יותר!',
      ar: 'لم يبد جلدي أفضل من هذا!',
      tr: 'Cildim hiç bu kadar iyi görünmemişti!',
    },
    date: '2024-09-22',
  },
  {
    id: 5,
    name: 'Elena P.',
    location: 'Kyiv, Ukraine',
    flag: '🇺🇦',
    treatment: 'Microblading',
    rating: 5,
    review: {
      en: 'After years of over-plucking, I finally have beautiful brows again. The hair strokes are so realistic, no one can tell they\'re not natural!',
      ru: 'После многолетнего выщипывания у меня наконец снова красивые брови. Штрихи настолько реалистичны!',
      ka: 'წლების შემდეგ მაინც მაქვს ლამაზი წვეროები!',
      he: 'אחרי שנים של תיקון יתר, סוף סוף יש לי גבות יפות שוב!',
      ar: 'بعد سنوات من الإفراط في النتف، لدي حواجب جميلة أخيراً!',
      tr: 'Yıllar sonra sonunda güzel kaşlarım var!',
    },
    date: '2024-09-10',
  },
  {
    id: 6,
    name: 'Katerina S.',
    location: 'Athens, Greece',
    flag: '🇬🇷',
    treatment: 'Balayage + Keratin',
    rating: 5,
    review: {
      en: 'Salome transformed my hair! The balayage is perfectly sun-kissed and the keratin treatment left it so smooth. I get compliments everywhere!',
      ru: 'Саломе преобразила мои волосы! Балаяж идеально выглядит, а кератин сделал их такими гладкими.',
      ka: 'სალომემ ჩემი თმა გარდაქმნა! ბალაიაჟი სრულყოფილია.',
      he: 'סלומה שינתה את השיער שלי לחלוטין!',
      ar: 'حوّلت سالومي شعري!',
      tr: 'Salome saçlarımı dönüştürdü!',
    },
    date: '2024-08-28',
  },
];

interface TestimonialsProps {
  locale: string;
}

const translations = {
  en: {
    title: 'What Our Clients Say',
    subtitle: 'Real reviews from real clients',
    verified: 'Verified Client',
    googleReview: 'Google Review',
    writeReview: 'Leave a Review',
  },
  ru: {
    title: 'Отзывы наших клиентов',
    subtitle: 'Реальные отзывы реальных клиентов',
    verified: 'Проверенный клиент',
    googleReview: 'Отзыв Google',
    writeReview: 'Оставить отзыв',
  },
  ka: {
    title: 'რას ამბობენ ჩვენი კლიენტები',
    subtitle: 'რეალური მიმოხილვები რეალური კლიენტებისგან',
    verified: 'დადასტურებული კლიენტი',
    googleReview: 'Google მიმოხილვა',
    writeReview: 'დატოვეთ მიმოხილვა',
  },
  he: {
    title: 'מה הלקוחות שלנו אומרים',
    subtitle: 'ביקורות אמיתיות מלקוחות אמיתיים',
    verified: 'לקוח מאומת',
    googleReview: 'ביקורת גוגל',
    writeReview: 'כתוב ביקורת',
  },
  ar: {
    title: 'ماذا يقول عملاؤنا',
    subtitle: 'آراء حقيقية من عملاء حقيقيين',
    verified: 'عميل موثق',
    googleReview: 'تقييم Google',
    writeReview: 'اكتب مراجعة',
  },
  tr: {
    title: 'Müşterilerimiz Ne Diyor',
    subtitle: 'Gerçek müşterilerden gerçek yorumlar',
    verified: 'Doğrulanmış Müşteri',
    googleReview: 'Google Yorumu',
    writeReview: 'Yorum Yap',
  },
};

export default function Testimonials({ locale }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const t = translations[locale as keyof typeof translations] || translations.en;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-champagne to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-teal-500 text-xs tracking-[0.3em] uppercase mb-4">
            {locale === 'en' ? 'Testimonials' : locale === 'ru' ? 'Отзывы' : locale === 'ka' ? 'მიმოხილვები' : locale === 'he' ? 'המלצות' : locale === 'ar' ? 'الشهادات' : 'Yorumlar'}
          </p>
          <h2 className="font-display font-bold mb-4 text-gray-900" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          }}>
            {t.title}
          </h2>
          <p className="text-gray-500">{t.subtitle}</p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600">
              <Quote size={20} className="text-white" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="rounded-3xl border border-gray-200 p-8 md:p-12 text-center bg-white shadow-sm">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < currentTestimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto italic">
                  "{currentTestimonial.review[locale as keyof typeof currentTestimonial.review] || currentTestimonial.review.en}"
                </p>

                {/* Client Info */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{currentTestimonial.flag}</span>
                    <div className="text-left">
                      <p className="text-gray-900 font-semibold">{currentTestimonial.name}</p>
                      <p className="text-gray-500 text-sm">{currentTestimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-teal-600/70 text-sm mb-2">{currentTestimonial.treatment}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <MessageCircle size={12} />
                    <span>{t.verified}</span>
                    <span>•</span>
                    <span>{new Date(currentTestimonial.date).toLocaleDateString(locale === 'he' ? 'he-IL' : locale === 'ar' ? 'ar-SA' : locale === 'ru' ? 'ru-RU' : locale === 'ka' ? 'ka-GE' : locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 15000);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? 'w-6 h-2 bg-teal-500'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* All Reviews Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-2xl border border-gray-200 hover:border-teal-300 transition-all duration-300 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                "{testimonial.review[locale as keyof typeof testimonial.review] || testimonial.review.en}"
              </p>
              <div className="flex items-center gap-2">
                <span>{testimonial.flag}</span>
                <div>
                  <p className="text-gray-900 text-sm font-medium">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://g.page/r/silkbeautybatumi/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal-300 text-teal-600 hover:bg-teal-50 transition-all text-sm font-medium"
          >
            <MessageCircle size={16} />
            {t.writeReview}
          </a>
        </div>
      </div>
    </section>
  );
}
