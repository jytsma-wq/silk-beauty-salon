'use client';

import { motion } from 'framer-motion';
import { Award, BadgeCheck, Star, MapPin } from 'lucide-react';

// Team member data - photos to be added by client
const teamMembers = [
  {
    id: 'nana',
    name: 'Dr. Nana Gviniashvili',
    role: {
      en: 'Owner & Medical Director',
      ru: 'Владелец и Медицинский директор',
      ka: 'მფლობელი და სამედიცინო დირექტორი',
      he: 'בעלים ומנהלת רפואית',
      ar: 'صاحبة المركز والمديرة الطبية',
      tr: 'Sahibi ve Tıbbi Direktör',
    },
    specialty: 'Dermatologist · Botox · Fillers · Facial Treatments',
    bio: {
      en: 'Dr. Nana Gviniashvili is the visionary founder and medical director of Silk Beauty Salon. With extensive training across Europe and 8 prestigious certifications in aesthetic medicine, she brings world-class expertise to Batumi. Her specialties include advanced injectable techniques, facial rejuvenation, and personalized treatment planning.',
      ru: 'Доктор Нана Гвиниашвили — основатель и медицинский директор Silk Beauty Salon. С обширной подготовкой в Европе и 8 престижными сертификатами в эстетической медицине, она приносит мировую экспертизу в Батуми.',
      ka: 'დოქტორი ნანა გვინიაშვილი არის Silk Beauty Salon-ის დამაარსებელი და სამედიცინო დირექტორი. ევროპაში გავრცობილი განათლებით და 8 პრესტიჟული სერტიფიკატით.',
      he: 'ד"ר ננה גוויניאשווילי היא המייסדת והמנהלת הרפואית של סלון סילק ביוטי. עם 8 תעודות יוקרה ברפואה אסתטית.',
      ar: 'الدكتورة نانا غفينياشفيلي هي المؤسسة والمديرة الطبية لصالون سيلك بيوتي. مع 8 شهادات مرموقة في الطب التجميلي.',
      tr: 'Dr. Nana Gviniashvili, Silk Beauty Salon\'un kurucusu ve tıbbi direktörüdür. Estetik tıpta 8 prestijli sertifika ile.',
    },
    certifications: [
      'Advanced Aesthetic Medicine Certification',
      'Botulinum Toxin Administration BadgeCheck',
      'Dermal Filler Techniques Diploma',
      'Facial Anatomy & Injection Safety',
      'European Academy of Dermatology',
      'Advanced Lip Enhancement Techniques',
      'Non-Surgical Facial Rejuvenation',
      'Medical Skincare Specialist',
    ],
    // Placeholder for photo - client will provide
    photo: '/team/nana-gviniashvili.jpg',
    photoPlaceholder: true,
  },
  {
    id: 'tamar',
    name: 'Tamara Beridze',
    role: {
      en: 'Senior Lash & Brow Artist',
      ru: 'Старший мастер по ресницам и бровям',
      ka: 'უფროსი წამწამებისა და წვეროების ოსტატი',
      he: 'אמנית ריסים וגבות בכירה',
      ar: 'فنانة رموش وحواجب أولى',
      tr: 'Kıdemli Kirpik ve Kaş Sanatçısı',
    },
    specialty: 'Russian Volume · Microblading · PMU · Lamination',
    bio: {
      en: 'International lash artist and certified PMU technician. Tamara has competed in European lash championships and brings 8 years of expertise in mega-volume and hybrid lash sets.',
      ru: 'Международный мастер по ресницам и сертифицированный техник ПМУ. Тамара участвовала в европейских чемпионатах.',
      ka: 'საერთაშორისო წამწამების ოსტატი და სერტიფიცირებული PMU ტექნიკოსი. 8 წლის გამოცდილება.',
      he: 'אמנית ריסים בינלאומית וטכנאית PMU מוסמכת. 8 שנות ניסיון.',
      ar: 'فنانة رموش دولية وفنية PMU معتمدة. 8 سنوات خبرة.',
      tr: 'Uluslararası kirpik sanatçısı ve sertifikalı PMU teknisyeni. 8 yıllık deneyim.',
    },
    certifications: ['Certified Lash Artist', 'PMU Technician', 'Brow Lamination Specialist'],
    photo: '/team/tamara-beridze.jpg',
    photoPlaceholder: true,
  },
  {
    id: 'salome',
    name: 'Salome Kvaratskhelia',
    role: {
      en: 'Senior Hair Colorist & Stylist',
      ru: 'Старший колорист и стилист',
      ka: 'უფროსი თმის კოლორისტი და სტილისტი',
      he: 'קולוריסטית ומעצבת שיער בכירה',
      ar: 'خبيرة ألوان وتصفيف شعر أولى',
      tr: 'Kıdemli Saç Renk Uzmanı ve Stilist',
    },
    specialty: 'Balayage · Color Correction · Extensions · Keratin',
    bio: {
      en: 'Balayage specialist trained in Milan with expertise in color correction and lived-in blonde. 6 years of experience with clients from Israel, UAE, and across Europe.',
      ru: 'Специалист по балаяжу, обучавшийся в Милане. 6 лет опыта.',
      ka: 'მილანში გაწვრთნილი ბალაიაჟის სპეციალისტი. 6 წლის გამოცდილება.',
      he: 'מומחית בלאיאז\' שהוכשרה במילאנו. 6 שנות ניסיון.',
      ar: 'متخصصة بالاياج مدربة في ميلانو. 6 سنوات خبرة.',
      tr: 'Milan\'da eğitim almış balayage uzmanı. 6 yıllık deneyim.',
    },
    certifications: ['Milan Color Academy', 'Balayage Master', 'Keratin Treatment Certified'],
    photo: '/team/salome-kvaratskhelia.jpg',
    photoPlaceholder: true,
  },
  {
    id: 'maya',
    name: 'Maya Tsiklauri',
    role: {
      en: 'Nail Artist & Technician',
      ru: 'Мастер маникюра и нейл-арта',
      ka: 'ფრჩხილების ოსტატი და ტექნიკოსი',
      he: 'אמנית ציפורניים',
      ar: 'فنانة أظافر',
      tr: 'Tırnak Sanatçısı ve Teknisyeni',
    },
    specialty: 'Gel · Acrylic · Nail Art · Extensions',
    bio: {
      en: 'Certified nail artist with a passion for intricate detail work. Portfolio spans minimalist geometric art to elaborate 3D designs.',
      ru: 'Сертифицированный нейл-художник с страстью к детальной работе.',
      ka: 'სერტიფიცირებული ფრჩხილების ოსტატი.',
      he: 'אמנית ציפורניים מוסמכת עם תשוקה לפרטים.',
      ar: 'فنانة أظافر معتمدة.',
      tr: 'Sertifikalı tırnak sanatçısı.',
    },
    certifications: ['Nail Technology BadgeCheck', 'Gel & Acrylic Specialist', 'Nail Art Master'],
    photo: '/team/maya-tsiklauri.jpg',
    photoPlaceholder: true,
  },
];

interface TeamSectionProps {
  locale: string;
}

export default function TeamSection({ locale }: TeamSectionProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-4">
            {locale === 'en' ? 'Our Experts' : locale === 'ru' ? 'Наши эксперты' : locale === 'ka' ? 'ჩვენი ექსპერტები' : locale === 'he' ? 'המומחים שלנו' : locale === 'ar' ? 'خبراؤنا' : 'Uzmanlarımız'}
          </p>
          <h2 className="font-display font-bold mb-4" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {locale === 'en' ? 'Meet the Team' : locale === 'ru' ? 'Познакомьтесь с командой' : locale === 'ka' ? 'გაიცანით გუნდი' : locale === 'he' ? 'פגשו את הצוות' : locale === 'ar' ? 'تعرّف على الفريق' : 'Ekiple Tanışın'}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            {locale === 'en' 
              ? 'Internationally trained specialists committed to excellence in every treatment.'
              : locale === 'ru'
              ? 'Специалисты с международной подготовкой, приверженные совершенству.'
              : locale === 'ka'
              ? 'საერთაშორისოდ გაწვრთნილი სპეციალისტები.'
              : locale === 'he'
              ? 'מומחים שהוכשרו בינלאומית.'
              : locale === 'ar'
              ? 'متخصصون مدربون دولياً.'
              : 'Uluslararası eğitimli uzmanlar.'}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="rounded-3xl border border-gray-200 overflow-hidden hover:border-teal-300 transition-all duration-500 bg-white shadow-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Photo Section */}
                  <div className="relative md:w-72 flex-shrink-0">
                    <div className="aspect-[3/4] md:h-full bg-gray-100 relative overflow-hidden">
                      {member.photoPlaceholder ? (
                        // Placeholder until real photo is added
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                            <span className="text-4xl font-display text-gray-500">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">{locale === 'en' ? 'Photo Coming Soon' : locale === 'ru' ? 'Фото скоро' : locale === 'ka' ? 'ფოტო მალე' : locale === 'he' ? 'תמונה בקרוב' : locale === 'ar' ? 'الصورة قريباً' : 'Foto Yakında'}</p>
                        </div>
                      ) : (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-stone-900" style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}>
                      {member.role[locale as keyof typeof member.role] || member.role.en}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6 flex-1">
                    <h3 className="text-gray-900 font-display text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-teal-600/70 text-sm mb-4">{member.specialty}</p>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {member.bio[locale as keyof typeof member.bio] || member.bio.en}
                    </p>

                    {/* Certifications */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider mb-2">
                        <BadgeCheck size={14} className="text-teal-500" />
                        <span>{locale === 'en' ? 'Certifications' : locale === 'ru' ? 'Сертификаты' : locale === 'ka' ? 'სერტიფიკატები' : locale === 'he' ? 'תעודות' : locale === 'ar' ? 'الشهادات' : 'Sertifikalar'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.certifications.slice(0, 3).map((cert, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg text-xs bg-gray-100 text-gray-600 border border-gray-200">
                            {cert}
                          </span>
                        ))}
                        {member.certifications.length > 3 && (
                          <span className="px-2 py-1 rounded-lg text-xs bg-teal-50 text-teal-600 border border-teal-200">
                            +{member.certifications.length - 3} {locale === 'en' ? 'more' : locale === 'ru' ? 'ещё' : locale === 'ka' ? 'მეტი' : locale === 'he' ? 'עוד' : locale === 'ar' ? 'أكثر' : 'daha fazla'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Owner Spotlight - Nana Gviniashvili */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="rounded-3xl border border-amber-400/20 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.05), rgba(160,120,64,0.02))' }}>
            <div className="flex flex-col lg:flex-row">
              {/* Photo Section */}
              <div className="relative lg:w-96 flex-shrink-0">
                <div className="aspect-square lg:h-full bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center mb-4 border-2 border-amber-400/30">
                      <span className="text-5xl font-display text-amber-400/60">NG</span>
                    </div>
                    <p className="text-amber-500 text-sm">{locale === 'en' ? 'Professional Photo' : locale === 'ru' ? 'Профессиональное фото' : locale === 'ka' ? 'პროფესიული ფოტო' : locale === 'he' ? 'תמונה מקצועית' : locale === 'ar' ? 'صورة احترافية' : 'Profesyonel Fotoğraf'}</p>
                    <p className="text-gray-500 text-xs mt-1">{locale === 'en' ? 'Coming Soon' : locale === 'ru' ? 'Скоро' : locale === 'ka' ? 'მალე' : locale === 'he' ? 'בקרוב' : locale === 'ar' ? 'قريباً' : 'Yakında'}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/10" />
                </div>
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/60 to-transparent">
                  <div className="flex items-center gap-2">
                    <Star className="text-amber-400" size={16} fill="currentColor" />
                    <span className="text-white text-sm font-medium">
                      {locale === 'en' ? 'Founder & Owner' : locale === 'ru' ? 'Основатель и владелец' : locale === 'ka' ? 'დამაარსებელი და მფლობელი' : locale === 'he' ? 'מייסדת ובעלים' : locale === 'ar' ? 'المؤسسة والمالكة' : 'Kurucu ve Sahip'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-8 flex-1">
                <h3 className="text-gray-900 font-display text-2xl font-bold mb-1">Dr. Nana Gviniashvili</h3>
                <p className="text-teal-600 text-lg mb-6">Dermatologist · Aesthetic Medicine Specialist</p>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {locale === 'en' 
                    ? 'With a passion for natural beauty and years of international training, Dr. Nana founded Silk Beauty Salon to bring world-class aesthetic treatments to Batumi. Her philosophy centers on enhancing each client\'s natural features with subtle, refined techniques that deliver stunning yet natural-looking results.'
                    : locale === 'ru'
                    ? 'Со страстью к естественной красоте и многолетней международной подготовкой, доктор Нана основала Silk Beauty Salon, чтобы привнести эстетические процедуры мирового уровня в Батуми.'
                    : locale === 'ka'
                    ? 'ბუნებრივი სილამაზის სიყვარულითა და წლების განმავლობაში საერთაშორისო განათლებით, დოქტორმა ნანამ დააარსა Silk Beauty Salon, რათა მიეტანა მსოფლიო დონის ესთეტიკური პროცედურები ბათუმისთვის.'
                    : locale === 'he'
                    ? 'מתשוקה ליופי טבעי ושנים של הכשרה בינלאומית, ד\'ר ננה ייסדה את Silk Beauty Salon כדי להביא טיפולי אסתטיקה ברמה עולמית לבתומי.'
                    : locale === 'ar'
                    ? 'بدافع الشغف بالجمال الطبيعي وسنوات من التدريب الدولي، أسست الدكتورة نانا صالون سيلك بيوتي لإحضار علاجات تجميل عالمية المستوى إلى باتومي.'
                    : 'Doğal güzelliğe tutkusu ve yılların uluslararası eğitimiyle, Dr. Nana Silk Beauty Salon\'u kurarak dünya standartlarında estetik tedavileri Batumi\'ye getirdi.'}
                </p>

                {/* Certifications Grid */}
                <div className="mb-6">
                  <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Award size={16} className="text-teal-500" />
                    {locale === 'en' ? '8 Professional Certifications' : locale === 'ru' ? '8 Профессиональных сертификатов' : locale === 'ka' ? '8 პროფესიული სერტიფიკატი' : locale === 'he' ? '8 תעודות מקצועיות' : locale === 'ar' ? '8 شهادات مهنية' : '8 Profesyonel Sertifika'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Advanced Aesthetic Medicine Certification',
                      'Botulinum Toxin Administration',
                      'Dermal Filler Techniques Diploma',
                      'Facial Anatomy & Injection Safety',
                      'European Academy of Dermatology',
                      'Advanced Lip Enhancement Techniques',
                      'Non-Surgical Facial Rejuvenation',
                      'Medical Skincare Specialist',
                    ].map((cert, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="w-2 h-2 rounded-full bg-teal-500" />
                        <span className="text-gray-700 text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={14} className="text-teal-500/60" />
                  <span className="text-sm">{locale === 'en' ? 'Based in Batumi, Georgia · Serving clients internationally' : locale === 'ru' ? 'Базируемся в Батуми, Грузия · Обслуживаем клиентов по всему миру' : locale === 'ka' ? 'მდებარეობს ბათუმში, საქართველო · ვემსახურებით მომხმარებლებს მსოფლიო მასშტაბით' : locale === 'he' ? 'מבוסס בבתומי, גאורגיה · משרתים לקוחות בינלאומיים' : locale === 'ar' ? 'مقرنا في باتومي، جورجيا · نخدم العملاء دولياً' : 'Batumi, Gürcistan merkezli · Uluslararası müşterilere hizmet'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
