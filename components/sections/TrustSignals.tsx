import { Shield, Award, Globe, Clock } from 'lucide-react';

interface TrustSignalsProps {
  locale?: string;
}

const translations: Record<string, {
  signals: { title: string; desc: string }[];
}> = {
  en: {
    signals: [
      {
        title: 'Medical Grade',
        desc: 'EU-approved products only. All injectable treatments by licensed doctors.',
      },
      {
        title: 'Certified Specialists',
        desc: 'Internationally trained in Paris, Milan, Istanbul & Tel Aviv.',
      },
      {
        title: '6 Languages',
        desc: 'Georgian, Russian, English, Hebrew, Arabic, and Turkish spoken.',
      },
      {
        title: 'Open 7 Days',
        desc: 'Mon–Sat from 10:00, Sunday from 11:00. Late Fri & Sat until 21:00.',
      },
    ],
  },
  ru: {
    signals: [
      {
        title: 'Медицинский уровень',
        desc: 'Только одобренные ЕС продукты. Все инъекции — лицензированными врачами.',
      },
      {
        title: 'Сертифицированные специалисты',
        desc: 'Обучение в Париже, Милане, Стамбуле и Тель-Авиве.',
      },
      {
        title: '6 языков',
        desc: 'Говорим на грузинском, русском, английском, иврите, арабском и турецком.',
      },
      {
        title: 'Открыты 7 дней',
        desc: 'Пн–Сб с 10:00, Вс с 11:00. Пт и Сб до 21:00.',
      },
    ],
  },
  ka: {
    signals: [
      {
        title: 'სამედიცინო დონე',
        desc: 'მხოლოდ EU-ს მიერ დამოწმებული პროდუქტები. ინექციები ლიცენზირებული ექიმების მიერ.',
      },
      {
        title: 'სერტიფიცირებული სპეციალისტები',
        desc: 'საერთაშორისო განათლება პარიზში, მილანში, სტამბოლსა და თელ-ავივში.',
      },
      {
        title: '6 ენა',
        desc: 'ვსაუბრობთ ქართულად, რუსულად, ინგლისურად, ებრაულად, არაბულად და თურქულად.',
      },
      {
        title: 'ღიაა 7 დღე',
        desc: 'ორშ–შაბ 10:00-დან, კვი 11:00-დან. პარ და შაბ 21:00-მდე.',
      },
    ],
  },
  he: {
    signals: [
      {
        title: 'רמה רפואית',
        desc: 'מוצרים מוסמכי האיחוד האירופי בלבד. כל הזרקות על ידי רופאים מורשים.',
      },
      {
        title: 'מומחים מוסמכים',
        desc: 'הוכשרו בינלאומית בפריז, מילאנו, איסטנבול ותל אביב.',
      },
      {
        title: '6 שפות',
        desc: 'דוברים גאורגית, רוסית, אנגלית, עברית, ערבית וטורקית.',
      },
      {
        title: 'פתוח 7 ימים',
        desc: 'ב\'–שב\' מ-10:00, א\' מ-11:00. שישי ושבת עד 21:00.',
      },
    ],
  },
  ar: {
    signals: [
      {
        title: 'المستوى الطبي',
        desc: 'منتجات معتمدة من الاتحاد الأوروبي فقط. جميع الحقن بواسطة أطباء مرخصين.',
      },
      {
        title: 'متخصصون معتمدون',
        desc: 'تدريب دولي في باريس وميلانو وإسطنبول وتل أبيب.',
      },
      {
        title: '6 لغات',
        desc: 'نتحدث الجورجية والروسية والإنجليزية والعبرية والعربية والتركية.',
      },
      {
        title: 'مفتوح 7 أيام',
        desc: 'الإثن–السبت من 10:00، الأحد من 11:00. الجمعة والسبت حتى 21:00.',
      },
    ],
  },
  tr: {
    signals: [
      {
        title: 'Tıbbi Seviye',
        desc: 'Sadece AB onaylı ürünler. Tüm enjeksiyonlar lisanslı doktorlar tarafından.',
      },
      {
        title: 'Sertifikalı Uzmanlar',
        desc: 'Paris, Milano, İstanbul ve Tel Aviv\'de uluslararası eğitim.',
      },
      {
        title: '6 Dil',
        desc: 'Gürcüce, Rusça, İngilizce, İbranice, Arapça ve Türkçe konuşuyoruz.',
      },
      {
        title: '7 Gün Açık',
        desc: 'Pzt–Cmt 10:00\'dan, Pazar 11:00\'den. Cuma ve Cumartesi 21:00\'e kadar.',
      },
    ],
  },
};

export default function TrustSignals({ locale = 'en' }: TrustSignalsProps) {
  const t = translations[locale] || translations.en;
  const icons = [Shield, Award, Globe, Clock];

  return (
    <section
      className="px-6 py-16 border-y"
      style={{
        background: 'rgba(201,169,110,0.03)',
        borderColor: 'rgba(201,169,110,0.1)',
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {t.signals.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={s.title} className="flex flex-col items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,169,110,0.1)' }}
                >
                  <Icon size={18} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-stone-200 text-sm font-semibold mb-1">{s.title}</h3>
                  <p className="text-stone-600 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
