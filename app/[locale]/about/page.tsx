import Link from 'next/link';
import { Award, Heart, Globe, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';

const ABOUT_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=90',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=90',
  'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=1920&q=90',
  'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=1920&q=90',
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Page Hero Slider */}
      <PageHero pageKey="about" images={ABOUT_IMAGES} />

      {/* Content Section */}
      <section className="relative px-6 py-20 overflow-hidden -mt-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: '#14b8a6' }} />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1
                className="font-display font-bold mb-6 text-gray-900"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.2,
                }}
              >
                {locale === 'en' && 'Born in Batumi, Built for the World'}
                {locale === 'ru' && 'Рождён в Батуми, создан для мира'}
                {locale === 'ka' && 'დაბადებული ბათუმში, შექმნილი მსოფლიოსთვის'}
                {locale === 'he' && 'נולד בבטומי, נבנה לעולם'}
                {locale === 'ar' && 'مولود في باتومي، بُني للعالم'}
                {locale === 'tr' && "Batum'da Doğdu, Dünya İçin Yaratıldı"}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-5">
                {locale === 'en' && 'Silk Beauty Salon was founded with one vision: to bring world-class aesthetic medicine and luxury beauty services to the heart of Batumi, Georgia.'}
                {locale === 'ru' && 'Салон красоты Silk Beauty был основан с одной целью: принести эстетическую медицину и люксовые услуги мирового класса в самое сердце Батуми, Грузия.'}
                {locale === 'ka' && 'Silk Beauty Salon დაარსდა ერთი ხედვით: მსოფლიო კლასის ესთეტიკური მედიცინისა და ლუქს სილამაზის მომსახურების მოტანა ბათუმის, საქართველოს გულში.'}
                {locale === 'he' && 'סלון היופי Silk Beauty נוסד עם חזון אחד: להביא רפואה אסתטית ושירותי יופי יוקרתיים ברמה עולמית ללב בטומי, גיאורגיה.'}
                {locale === 'ar' && 'تأسس صالون Silk Beauty برؤية واحدة: جلب الطب التجميلي وخدمات الجمال الفاخرة عالمية المستوى إلى قلب باتومي، جورجيا.'}
                {locale === 'tr' && "Silk Beauty Salon tek bir vizyonla kuruldu: Dünya standartlarında estetik tıp ve lüks güzellik hizmetlerini Batum, Gürcistan'ın kalbine getirmek."}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {locale === 'en' && "Our team of internationally certified specialists — trained across Europe, the Middle East, and beyond — believes that beauty is not a luxury. It's a form of self-expression, and everyone deserves the best."}
                {locale === 'ru' && 'Наша команда сертифицированных специалистов, прошедших обучение по всей Европе и Ближнему Востоку, считает, что красота — это не роскошь. Это форма самовыражения, и каждый заслуживает лучшего.'}
                {locale === 'ka' && 'ჩვენი საერთაშორისოდ სერტიფიცირებული სპეციალისტების გუნდი, რომლებიც გაწვრთნილნი არიან ევროპაში, ახლო აღმოსავლეთსა და მის ფარგლებს გარეთ, მიიჩნევს, რომ სილამაზე არ არის ლუქსი. ეს არის თვითგამოხატვის ფორმა და ყველას უღირს საუკეთესო.'}
                {locale === 'he' && 'הצוות שלנו של מומחים מוסמכים בינלאומיים, שהוכשרו ברחבי אירופה, המזרח התיכון ומעבר לו, מאמין שיופי אינו מותרות. זוהי צורה של ביטוי עצמי, וכולם ראויים לטוב ביותר.'}
                {locale === 'ar' && 'فريقنا من المتخصصين المعتمدين دولياً، الذين تدربوا في جميع أنحاء أوروبا والشرق الأوسط وخارجه، يؤمن بأن الجمال ليس رفاهية. إنه شكل من أشكال التعبير عن الذات، والجميع يستحق الأفضل.'}
                {locale === 'tr' && 'Avrupa, Orta Doğu ve ötesinde eğitim almış uluslararası sertifikalı uzmanlardan oluşan ekibimiz, güzelliğin bir lüks olmadığına inanıyor. Bu bir kendini ifade etme biçimidir ve herkes en iyiyi hak eder.'}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block px-8 py-3 rounded-full text-sm font-semibold tracking-wide text-white"
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
              >
                {locale === 'en' && 'Book a Consultation'}
                {locale === 'ru' && 'Записаться на консультацию'}
                {locale === 'ka' && 'დაჯავშნეთ კონსულტაცია'}
                {locale === 'he' && 'הזמינו ייעוץ'}
                {locale === 'ar' && 'احجز استشارة'}
                {locale === 'tr' && 'Danışmanlık Randevusu Al'}
              </Link>
            </div>

            {/* Image collage */}
            <div className="relative h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80"
                alt="Silk Beauty Salon interior"
                className="absolute top-0 right-0 w-3/4 h-72 object-cover rounded-2xl border border-gray-200 shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
                alt="Treatment in progress"
                className="absolute bottom-0 left-0 w-2/3 h-56 object-cover rounded-2xl border border-gray-200 shadow-lg"
              />
              <div
                className="absolute bottom-8 right-4 p-4 rounded-2xl border border-teal-200 text-center backdrop-blur-sm bg-white/90 shadow-lg"
              >
                <div className="text-3xl font-display font-bold text-teal-600">200+</div>
                <div className="text-gray-500 text-xs mt-1">
                  {locale === 'en' && 'Happy Clients'}
                  {locale === 'ru' && 'Довольных клиентов'}
                  {locale === 'ka' && 'კმაყოფილი კლიენტი'}
                  {locale === 'he' && 'לקוחות מרוצים'}
                  {locale === 'ar' && 'عميل سعيد'}
                  {locale === 'tr' && 'Mutlu Müşteri'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <h2
            className="font-display font-bold text-center mb-16 text-gray-900"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            }}
          >
            {locale === 'en' && 'What We Stand For'}
            {locale === 'ru' && 'Наши Принципы'}
            {locale === 'ka' && 'ჩვენი ღირებულებები'}
            {locale === 'he' && 'הערכים שלנו'}
            {locale === 'ar' && 'قيمنا'}
            {locale === 'tr' && 'Değerlerimiz'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { 
                icon: Award, 
                title: locale === 'en' ? 'Medical Excellence' : locale === 'ru' ? 'Медицинское Совершенство' : locale === 'ka' ? 'სამედიცინო ბრწყინვალება' : locale === 'he' ? 'מצוינות רפואית' : locale === 'ar' ? 'التميز الطبي' : 'Tıbbi Mükemmellik',
                desc: locale === 'en' ? 'All aesthetic treatments performed by certified medical specialists using EU-approved products.' : locale === 'ru' ? 'Все эстетические процедуры выполняются сертифицированными медицинскими специалистами с использованием продукции, одобренной ЕС.' : locale === 'ka' ? 'ყველა ესთეტიკური პროცედურა სრულდება სერტიფიცირებული სამედიცინო სპეციალისტების მიერ EU-ს მიერ დამტკიცებული პროდუქტების გამოყენებით.' : locale === 'he' ? 'כל הטיפולים האסתטיים מבוצעים על ידי מומחים רפואיים מוסמכים באמצעות מוצרים מאושרים על ידי האיחוד האירופי.' : locale === 'ar' ? 'جميع العلاجات التجميلية يؤديها متخصصون طبيون معتمدون باستخدام منتجات معتمدة من الاتحاد الأوروبي.' : 'Tüm estetik tedaviler, AB onaylı ürünler kullanılarak sertifikalı tıp uzmanları tarafından gerçekleştirilir.'
              },
              { 
                icon: Heart, 
                title: locale === 'en' ? 'Client First' : locale === 'ru' ? 'Клиент на Первом Месте' : locale === 'ka' ? 'კლიენტი პირველ ადგილზე' : locale === 'he' ? 'הלקוח קודם' : locale === 'ar' ? 'العميل أولاً' : 'Müşteri Öncelikli',
                desc: locale === 'en' ? 'Every appointment is tailored to your unique features, goals, and skin type. We never rush.' : locale === 'ru' ? 'Каждая встреча адаптирована к вашим уникальным чертам, целям и типу кожи. Мы никогда не торопимся.' : locale === 'ka' ? 'ყოველი შეხვედრა ადაპტირებულია თქვენს უნიკალურ ნიშნებს, მიზნებსა და კანის ტიპს. ჩვენ არასოდეს ვჩქარობთ.' : locale === 'he' ? 'כל פגישה מותאמת למאפיינים, למטרות ולסוג העור הייחודיים שלך. אנחנו לעולם לא ממהרים.' : locale === 'ar' ? 'كل موعد مُصمم خصيصاً لملامحك وأهدافك ونوع بشرتك. نحن لا نستعجل أبداً.' : 'Her randevu benzersiz özelliklerinize, hedeflerinize ve cilt tipinize göre özelleştirilir. Asla acele etmeyiz.'
              },
              { 
                icon: Globe, 
                title: locale === 'en' ? 'International Standards' : locale === 'ru' ? 'Международные Стандарты' : locale === 'ka' ? 'საერთაშორისო სტანდარტები' : locale === 'he' ? 'סטנדרטים בינלאומיים' : locale === 'ar' ? 'معايير دولية' : 'Uluslararası Standartlar',
                desc: locale === 'en' ? 'Our team trained in Paris, Istanbul, Milan, and Tel Aviv. Global expertise, Batumi roots.' : locale === 'ru' ? 'Наша команда прошла обучение в Париже, Стамбуле, Милане и Тель-Авиве. Глобальная экспертиза, корни в Батуми.' : locale === 'ka' ? 'ჩვენი გუნდი გაწვრთნილია პარიზში, სტამბოლში, მილანსა და თელ-ავივში. გლობალური ექსპერტიზა, ბათუმური ფესვები.' : locale === 'he' ? 'הצוות שלנו הוכשר בפריז, איסטנבול, מילאנו ותל אביב. מומחיות גלובלית, שורשים בבטומי.' : locale === 'ar' ? 'تدرب فريقنا في باريس وإسطنبول وميلانو وتل أبيب. خبرة عالمية، جذور باتومية.' : 'Ekibimiz Paris, İstanbul, Milano ve Tel Aviv\'de eğitim aldı. Küresel uzmanlık, Batum kökleri.'
              },
              { 
                icon: Leaf, 
                title: locale === 'en' ? 'Clean Beauty' : locale === 'ru' ? 'Чистая Красота' : locale === 'ka' ? 'სუფთა სილამაზე' : locale === 'he' ? 'יופי נקי' : locale === 'ar' ? 'الجمال النظيف' : 'Temiz Güzellik',
                desc: locale === 'en' ? 'We use cruelty-free, dermatologically tested products. No compromises on quality.' : locale === 'ru' ? 'Мы используем продукты без тестирования на животных, дерматологически проверенные. Никаких компромиссов в качестве.' : locale === 'ka' ? 'ჩვენ ვიყენებთ უძრავ ცხოველებზე არ გამოცდილ, დერმატოლოგიურად შემოწმებულ პროდუქტებს. ხარისხში კომპრომისები არ არსებობს.' : locale === 'he' ? 'אנחנו משתמשים במוצרים נטולי אכזריות, שנבדקו דרמטולוגית. אין פשרות על איכות.' : locale === 'ar' ? 'نستخدم منتجات خالية من القسوة، تم اختبارها جلدياً. لا تسوية في الجودة.' : 'Hayvan deneyi yapılmayan, dermatolojik olarak test edilmiş ürünler kullanıyoruz. Kaliteden ödün yok.'
              },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="flex gap-5 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-teal-50">
                    <Icon size={20} className="text-teal-500" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-2">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
