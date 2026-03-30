import { Instagram } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';

const SPECIALIST_IMAGES = [
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=1920&q=90',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1920&q=90',
  'https://images.unsplash.com/photo-1629425703571-61e5f2952beb?w=1920&q=90',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=90',
];

const specialists = [
  {
    name: 'Dr. Nino Kalandadze',
    role: {
      en: 'Senior Aesthetic Doctor',
      ru: 'Старший врач-эстетист',
      ka: 'უფროსი ესთეტიკური ექიმი',
      he: 'רופאת אסתטיקה בכירה',
      ar: 'طبيبة تجميل أولى',
      tr: 'Kıdemli Estetik Doktoru',
    },
    specialty: 'Botox · Fillers · Skin Boosters',
    bio: {
      en: 'Board-certified aesthetic medicine physician with 12 years of experience. Trained in Paris and Istanbul, Dr. Nino specializes in the Russian lip technique and natural facial rejuvenation.',
      ru: 'Сертифицированный врач эстетической медицины с 12-летним опытом. Обучалась в Париже и Стамбуле, доктор Нино специализируется на русской технике губ и естественном омоложении лица.',
      ka: '12 წლის გამოცდილების მქონე სერტიფიცირებული ესთეტიკური მედიცინის ექიმი. გაწვრთნილია პარიზში და სტამბოლში, დოქტორ ნინო სპეციალიზებულია რუსულ ტექნიკასა და ბუნებრივ სახის გაახალგაზრდავებაში.',
      he: 'רופאת רפואה אסתטית מוסמכת עם 12 שנות ניסיון. הוכשרה בפריז ובאיסטנבול, ד"ר נינו מתמחה בטכניקת השפתיים הרוסית ובחידוש פנים טבעי.',
      ar: 'طبيبة طب تجميل معتمدة مع 12 عامًا من الخبرة. تدربت في باريس وإسطنبول، وتتخصص الدكتورة نينو في تقنية الشفاه الروسية وتجديد الوجه الطبيعي.',
      tr: "12 yıllık deneyime sahip board onaylı estetik tıp doktoru. Paris ve İstanbul'da eğitim aldı, Dr. Nino Rus dudak tekniği ve doğal yüz gençleştirmede uzmandır.",
    },
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    instagram: 'https://instagram.com/silkbeautybatumi',
    badge: {
      en: 'Medical Director',
      ru: 'Медицинский директор',
      ka: 'სამედიცინო დირექტორი',
      he: 'מנהלת רפואית',
      ar: 'مديرة طبية',
      tr: 'Tıbbi Direktör',
    },
  },
  {
    name: 'Tamara Beridze',
    role: {
      en: 'Lash & Brow Specialist',
      ru: 'Специалист по ресницам и бровям',
      ka: 'წამწამებისა და წვეროების სპეციალისტი',
      he: 'מומחית ריסים וגבות',
      ar: 'متخصصة الرموش والحواجب',
      tr: 'Kirpik ve Kaş Uzmanı',
    },
    specialty: 'Russian Volume · Microblading · PMU',
    bio: {
      en: 'International lash artist and certified PMU technician. Tamara has competed in European lash championships and brings 8 years of expertise in mega-volume and hybrid sets.',
      ru: 'Международный мастер по ресницам и сертифицированный техник ПМУ. Тамара участвовала в европейских чемпионатах по наращиванию ресниц и имеет 8 лет опыта в мега-объеме и гибридных наборах.',
      ka: 'საერთაშორისო წამწამების ოსტატი და სერტიფიცირებული PMU ტექნიკოსი. თამარა მონაწილეობდა ევროპულ წამწამების ჩემპიონატებში და აქვს 8 წლის გამოცდილება მეგა-მოცულობისა და ჰიბრიდულ ნაკრებებში.',
      he: 'אמנית ריסים בינלאומית וטכנאית PMU מוסמכת. תמרה התחרתה באליפויות ריסים אירופאיות ומביאה 8 שנות מומחיות בסטים מגה-ווליום והיברידיים.',
      ar: 'فنانة رموش دولية وفنية وشم تجميلي معتمدة. شاركت تامارا في بطولات الرموش الأوروبية وتتمتع بخبرة 8 سنوات في المجموعات المега فوليوم والهجينة.',
      tr: "Uluslararası kirpik sanatçısı ve sertifikalı PMU teknisyeni. Tamara Avrupa kirpik şampiyonalarına katıldı ve mega-hacim ve hibrit takımlarda 8 yıllık uzmanlık getiriyor.",
    },
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    instagram: 'https://instagram.com/silkbeautybatumi',
    badge: {
      en: 'Master Artist',
      ru: 'Мастер-художник',
      ka: 'ოსტატი არტისტი',
      he: 'אמנית מומחית',
      ar: 'فنانة ماستر',
      tr: 'Usta Sanatçı',
    },
  },
  {
    name: 'Salome Kvaratskhelia',
    role: {
      en: 'Hair Colorist & Stylist',
      ru: 'Колорист и стилист по волосам',
      ka: 'თმის კოლორისტი და სტილისტი',
      he: 'קולוריסטית ומעצבת שיער',
      ar: 'متخصصة صبغة وتصفيف الشعر',
      tr: 'Saç Renk Uzmanı ve Stilist',
    },
    specialty: 'Balayage · Color Correction · Extensions',
    bio: {
      en: 'Balayage specialist trained in Milan with expertise in color correction and lived-in blonde. 6 years of experience with clients from Israel, UAE, and across Europe.',
      ru: 'Специалист по балаяжу, обучавшийся в Милане, с опытом в коррекции цвета и натуральном блонде. 6 лет работы с клиентами из Израиля, ОАЭ и всей Европы.',
      ka: 'მილანში გაწვრთნილი ბალაიაჟის სპეციალისტი ფერის კორექციასა და ბუნებრივ ქერაში. 6 წლის გამოცდილება ისრაელიდან, არაბეთიდან და ევროპიდან კლიენტებთან.',
      he: 'מומחית בלאיאז\' שהוכשרה במילאנו עם מומחיות בתיקון צבע ובלונד טבעי. 6 שנות ניסיון עם לקוחות מישראל, איחוד האמירויות וברחבי אירופה.',
      ar: 'متخصصة بالاياج مدربة في ميلانو مع خبرة في تصحيح اللون والشقراوات الطبيعية. 6 سنوات من الخبرة مع عملاء من إسرائيل والإمارات وكل أنحاء أوروبا.',
      tr: "Milan'da eğitim almış balayage uzmanı, renk düzeltme ve doğal sarı konusunda uzman. İsrail, BAE ve Avrupa genelindeki müşterilerle 6 yıllık deneyim.",
    },
    img: 'https://images.unsplash.com/photo-1629425703571-61e5f2952beb?w=400&q=80',
    instagram: 'https://instagram.com/silkbeautybatumi',
    badge: {
      en: 'Color Expert',
      ru: 'Эксперт по цвету',
      ka: 'ფერის ექსპერტი',
      he: 'מומחית צבע',
      ar: 'خبيرة ألوان',
      tr: 'Renk Uzmanı',
    },
  },
  {
    name: 'Maya Tsiklauri',
    role: {
      en: 'Nail Technician & Artist',
      ru: 'Мастер маникюра и нейл-арта',
      ka: 'ფრჩხილების ტექნიკოსი და არტისტი',
      he: 'טכנאית ואמנית ציפורניים',
      ar: 'فنية وتصميم الأظافر',
      tr: 'Tırnak Teknisyeni ve Sanatçısı',
    },
    specialty: 'Gel · Acrylic · Nail Art',
    bio: {
      en: 'Nail artist and certified nail tech with a passion for intricate detail work. Maya has a portfolio spanning minimalist geometric art to elaborate 3D designs.',
      ru: 'Нейл-художник и сертифицированный мастер по маникюру с страстью к детальной работе. У Майи портфолио от минималистичного геометрического искусства до сложных 3D-дизайнов.',
      ka: 'ფრჩხილების არტისტი და სერტიფიცირებული ტექნიკოსი, რომელსაც სუფთა დეტალური მუშაობა უყვარს. მაიას პორტფოლიოშია მინიმალისტური გეომეტრიული ხელოვნებიდან რთულ 3D დიზაინებამდე.',
      he: 'אמנית ציפורניים וטכנאית מוסמכת עם תשוקה לעבודת פרטים מורכבת. למאיה תיק עבודות המשתרע מאמנות גאומטרית מינימליסטית לעיצובי תלת-ממד משוכללים.',
      ar: 'فنانة أظافر وفنية معتمدة مع شغف للعمل التفصيلي المعقد. لدى مايا محفظة تمتد من الفن الهندسي البسيط إلى التصاميم ثلاثية الأبعاد المعقدة.',
      tr: 'Karmaşık detay çalışmalarına tutkusu olan tırnak sanatçısı ve sertifikalı tırnak teknisyeni. Maya\'nın portföyü minimalist geometrik sanattan ayrıntılı 3D tasarımlara kadar uzanır.',
    },
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    instagram: 'https://instagram.com/silkbeautybatumi',
    badge: {
      en: 'Nail Artist',
      ru: 'Нейл-художник',
      ka: 'ფრჩხილების არტისტი',
      he: 'אמנית ציפורניים',
      ar: 'فنانة أظافر',
      tr: 'Tırnak Sanatçısı',
    },
  },
];

export default async function SpecialistsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titleLabel = locale === 'en' ? 'Meet Our Specialists' : locale === 'ru' ? 'Познакомьтесь с нашими специалистами' : locale === 'ka' ? 'გაიცანით ჩვენი სპეციალისტები' : locale === 'he' ? 'פגשו את המומחים שלנו' : locale === 'ar' ? 'تعرّف على متخصصينا' : 'Uzmanlarımızla Tanışın';
  
  const subtitleLabel = locale === 'en' ? 'International experts, each certified in their field and passionate about delivering outstanding results.' : locale === 'ru' ? 'Международные эксперты, сертифицированные в своих областях и страстно увлечённые выдающимися результатами.' : locale === 'ka' ? 'საერთაშორისო ექსპერტები, თითოეული სერტიფიცირებული თავის სფეროში და ვნებიანი გამორჩეული შედეგების მისაღწევად.' : locale === 'he' ? 'מומחים בינלאומיים, כל אחד מוסמך בתחומו ונלהב לספק תוצאות יוצאות דופן.' : locale === 'ar' ? 'خبراء دوليون، كل منهم معتمد في مجاله وشغوف بتقديم نتائج استثنائية.' : 'Her biri alanında sertifikalı ve olağanüstü sonuçlar sunma tutkusuyla uluslararası uzmanlar.';
  
  const followLabel = locale === 'en' ? 'Follow on Instagram' : locale === 'ru' ? 'Подписаться в Instagram' : locale === 'ka' ? 'გამოგვიეწერეთ Instagram-ზე' : locale === 'he' ? 'עקבו באינסטגרם' : locale === 'ar' ? 'تابعنا على انستغرام' : "Instagram'da Takip Et";

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Page Hero Slider */}
      <PageHero pageKey="specialists" images={SPECIALIST_IMAGES} />

      <div className="container mx-auto max-w-6xl px-6 pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-20 -mt-10 relative z-10">
          <h1
            className="font-display font-bold text-gray-900"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            {titleLabel}
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            {subtitleLabel}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialists.map((s) => (
            <div
              key={s.name}
              className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl border border-gray-200 hover:border-teal-300 transition-all duration-500 bg-white shadow-sm"
            >
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span
                  className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                >
                  {s.badge[locale as keyof typeof s.badge] || s.badge.en}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-gray-900 font-display text-xl font-bold mb-0.5">{s.name}</h2>
                <p className="text-teal-600/70 text-sm mb-1">{s.role[locale as keyof typeof s.role] || s.role.en}</p>
                <p className="text-gray-400 text-xs mb-3 border-b border-gray-100 pb-3">{s.specialty}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.bio[locale as keyof typeof s.bio] || s.bio.en}</p>
                <a
                  href={s.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-teal-600 transition-colors"
                >
                  <Instagram size={12} />
                  {followLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
