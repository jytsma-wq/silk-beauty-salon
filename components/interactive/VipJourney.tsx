import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface VipJourneyProps {
  locale: string;
}

const translations: Record<string, {
  subtitle: string;
  title: string[];
  desc: string;
  startJourney: string;
  steps: { number: string; title: string; desc: string }[];
}> = {
  en: {
    subtitle: 'Your Experience',
    title: ['The Silk', 'VIP Journey'],
    desc: 'From first contact to aftercare, every step is crafted for a seamless, luxurious experience.',
    startJourney: 'Start Your Journey',
    steps: [
      {
        number: '01',
        title: 'Book a Consultation',
        desc: 'Fill in our booking form or WhatsApp us. We confirm within 1 hour.',
      },
      {
        number: '02',
        title: 'Meet Your Specialist',
        desc: 'Your expert reviews your goals, answers questions, and designs a personal treatment plan.',
      },
      {
        number: '03',
        title: 'The Treatment',
        desc: 'Relax in our luxury suite while your specialist works their magic.',
      },
      {
        number: '04',
        title: 'Aftercare & Follow-up',
        desc: 'We send aftercare instructions and check in 48 hours later to ensure you love your results.',
      },
    ],
  },
  ru: {
    subtitle: 'Ваш опыт',
    title: ['VIP-опыт', 'Silk'],
    desc: 'От первого контакта до послелечебного ухода — каждый шаг создан для безупречного, роскошного опыта.',
    startJourney: 'Начните путь',
    steps: [
      {
        number: '01',
        title: 'Запишитесь на консультацию',
        desc: 'Заполните форму или напишите нам в WhatsApp. Мы подтвердим в течение 1 часа.',
      },
      {
        number: '02',
        title: 'Встреча со специалистом',
        desc: 'Эксперт изучит ваши цели, ответит на вопросы и составит персональный план.',
      },
      {
        number: '03',
        title: 'Процедура',
        desc: 'Расслабьтесь в нашем роскошном кабинете, пока специалист творит чудеса.',
      },
      {
        number: '04',
        title: 'Послепроцедурный уход',
        desc: 'Мы отправим инструкции по уходу и проверим результаты через 48 часов.',
      },
    ],
  },
  ka: {
    subtitle: 'თქვენი გამოცდილება',
    title: ['Silk VIP', 'გამოცდილება'],
    desc: 'პირველი კონტაქტიდან მოვლამდე — ყოველი ნაბიჯი შექმნილია უნაკლო, კომფორტული გამოცდილებისთვის.',
    startJourney: 'დაიწყეთ მოგზაურობა',
    steps: [
      {
        number: '01',
        title: 'კონსულტაციის დაჯავშნა',
        desc: 'შეავსეთ ფორმა ან მოგვწერეთ WhatsApp-ზე. ჩვენ დაგადასტურებთ 1 საათში.',
      },
      {
        number: '02',
        title: 'სპეციალისტთან შეხვედრა',
        desc: 'ექსპერტი შეისწავლის თქვენს მიზნებს, უპასუხებს კითხვებს და შეადგენს პერსონალურ გეგმას.',
      },
      {
        number: '03',
        title: 'პროცედურა',
        desc: 'დაისვენეთ ჩვენს როსკოშ ლოჟაში, სანამ სპეციალისტი მუშაობს.',
      },
      {
        number: '04',
        title: 'მოვლა და გამოხმაურება',
        desc: 'ჩვენ გამოგიგზავნით მოვლის ინსტრუქციებს და შევამოწმებთ 48 საათში.',
      },
    ],
  },
  he: {
    subtitle: 'החוויה שלך',
    title: ['מסע ה-VIP', 'של סילק'],
    desc: 'מהקשר הראשון ועד הטיפול לאחר הטיפול, כל שלב מעוצב לחוויה חלקה ומפוארת.',
    startJourney: 'התחילי את המסע',
    steps: [
      {
        number: '01',
        title: 'קביעת ייעוץ',
        desc: 'מלאי את הטופס או כתבו לנו בוואטסאפ. אנו מאשרים תוך שעה.',
      },
      {
        number: '02',
        title: 'פגישה עם המומחה',
        desc: 'המומחה בודק את המטרות שלך, עונה על שאלות ומתכנן תוכנית טיפול אישית.',
      },
      {
        number: '03',
        title: 'הטיפול',
        desc: 'התרגעי בסוויטה היוקרתית שלנו בזמן שהמומחה עובד את הקסם.',
      },
      {
        number: '04',
        title: 'טיפול לאחר ומעקב',
        desc: 'אנו שולחים הוראות טיפול ולבדוק 48 שעות לאחר מכן.',
      },
    ],
  },
  ar: {
    subtitle: 'تجربتك',
    title: ['رحلة VIP', 'سيلك'],
    desc: 'من أول تواصل إلى الرعاية اللاحقة، كل خطوة مصممة لتجربة سلسة وفاخرة.',
    startJourney: 'ابدأي رحلتك',
    steps: [
      {
        number: '01',
        title: 'حجز استشارة',
        desc: 'املئي النموذج أو تواصلي معنا عبر واتساب. نؤكد خلال ساعة.',
      },
      {
        number: '02',
        title: 'لقاء الاختصاصي',
        desc: 'الخبيرة تستعرض أهدافكِ، تجيب على الأسئلة وتصمم خطة علاج شخصية.',
      },
      {
        number: '03',
        title: 'العلاج',
        desc: 'استرخي في جناحنا الفاخر بينما يعمل الاختصاصي سحره.',
      },
      {
        number: '04',
        title: 'العناية اللاحقة والمتابعة',
        desc: 'نرسل تعليمات العناية ونتحقق بعد 48 ساعة للتأكد من رضاكِ.',
      },
    ],
  },
  tr: {
    subtitle: 'Deneyiminiz',
    title: ['Silk VIP', 'Yolculuğu'],
    desc: 'İlk temasdan sonrası bakıma kadar, her adım kusursuz, lüks bir deneyim için tasarlandı.',
    startJourney: 'Yolculuğa Başla',
    steps: [
      {
        number: '01',
        title: 'Danışmanlık Alın',
        desc: 'Formu doldurun veya WhatsApp üzerinden bize yazın. 1 saat içinde onaylıyoruz.',
      },
      {
        number: '02',
        title: 'Uzmanınızla Tanışın',
        desc: 'Uzmanınız hedeflerinizi inceler, soruları yanıtlar ve kişisel tedavi planı hazırlar.',
      },
      {
        number: '03',
        title: 'Tedavi',
        desc: 'Uzmanınız sihrini yaparken lüks süitimizde dinlenin.',
      },
      {
        number: '04',
        title: 'Sonrası Bakım ve Takip',
        desc: 'Sonrası bakım talimatlarını gönderiyoruz ve 48 saat sonra kontrol ediyoruz.',
      },
    ],
  },
};

export default function VipJourney({ locale }: VipJourneyProps) {
  const t = translations[locale] || translations.en;

  return (
    <section
      className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-teal-500 text-xs tracking-[0.3em] uppercase mb-4">{t.subtitle}</p>
            <h2
              className="font-display font-bold mb-6 text-gray-900"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              {t.title[0]}
              <br />{t.title[1]}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              {t.desc}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
            >
              {t.startJourney} <ArrowRight size={16} />
            </Link>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {t.steps.map((s) => (
              <div
                key={s.number}
                className="flex gap-5 p-5 rounded-2xl border border-gray-200 transition-colors hover:border-teal-300 bg-white shadow-sm"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-accent font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(13, 148, 136, 0.08))',
                    color: '#14b8a6',
                    border: '1px solid rgba(20, 184, 166, 0.25)',
                  }}
                >
                  {s.number}
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold mb-1 text-sm">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
