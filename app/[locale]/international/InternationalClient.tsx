'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plane, Sparkles, DollarSign, Award, MapPin, Clock,
  Shield, Heart, Camera, Star, ChevronRight, Globe,
  Building2, Users, Calendar, Check, ArrowRight, Phone,
  Mail, MessageCircle, Sun, Palmtree, Umbrella
} from 'lucide-react';

interface InternationalClientProps {
  locale: string;
}

const translations = {
  en: {
    // Hero
    heroTitle: 'Beauty Tourism in Batumi',
    heroSubtitle: 'Combine your vacation with premium aesthetic treatments at a fraction of European prices',
    heroCta: 'Plan Your Visit',
    heroCta2: 'View Treatments',
    
    // Stats
    savingsUpTo: 'Up to',
    savingsPercent: '70% savings',
    comparedEurope: 'compared to Europe',
    clientsFrom: 'Clients from',
    countries: 'countries',
    yearsExperience: 'Years',
    experience: 'experience',
    treatmentsDone: 'Treatments',
    doneYearly: 'yearly',
    
    // Why Batumi
    whyTitle: 'Why Choose Batumi?',
    whySubtitle: 'Georgia\'s pearl on the Black Sea coast is becoming Europe\'s hottest beauty destination',
    whyBatumi: [
      {
        title: 'Unbeatable Prices',
        desc: 'Save 50-70% compared to Western European clinics without compromising quality. Premium treatments at accessible prices.',
        icon: 'dollar',
      },
      {
        title: 'EU-Standard Quality',
        desc: 'All our specialists are internationally certified. We use the same premium products as top European clinics.',
        icon: 'award',
      },
      {
        title: 'No Waiting Lists',
        desc: 'Book your treatment within days, not months. We respect your time and schedule.',
        icon: 'clock',
      },
      {
        title: 'Vacation Destination',
        desc: 'Batumi offers beautiful beaches, delicious cuisine, and rich culture. Recover in paradise.',
        icon: 'palm',
      },
      {
        title: 'Visa-Free Travel',
        desc: 'Many nationalities can visit Georgia visa-free for up to 1 year. Easy access from Europe, Middle East & Asia.',
        icon: 'globe',
      },
      {
        title: 'Privacy & Discretion',
        desc: 'Enjoy complete anonymity. Recover in luxury hotels away from prying eyes.',
        icon: 'shield',
      },
    ],
    
    // Compare prices
    compareTitle: 'Price Comparison',
    compareSubtitle: 'Same premium quality, significantly lower prices',
    compareNote: 'Prices in EUR for comparison',
    treatment: 'Treatment',
    europePrice: 'Europe Avg.',
    ourPrice: 'Batumi',
    savings: 'Savings',
    treatments: [
      { name: 'Botox (3 areas)', europe: 450, batumi: 180 },
      { name: 'Lip Filler (1ml)', europe: 350, batumi: 150 },
      { name: 'HydraFacial', europe: 250, batumi: 90 },
      { name: 'Cheek Filler (1ml)', europe: 500, batumi: 200 },
      { name: 'Chemical Peel', europe: 200, batumi: 70 },
      { name: 'Lash Extensions', europe: 150, batumi: 50 },
    ],
    
    // How it works
    processTitle: 'How It Works',
    processSubtitle: 'We make medical tourism simple and stress-free',
    steps: [
      {
        number: '01',
        title: 'Free Consultation',
        desc: 'Send us your photos via WhatsApp or email. Dr. Nana will review and create your personalized treatment plan.',
      },
      {
        number: '02',
        title: 'Plan Your Trip',
        desc: 'We help with hotel recommendations, airport transfers, and scheduling. Book flights to Batumi International Airport.',
      },
      {
        number: '03',
        title: 'Arrive & Treat',
        desc: 'Meet your specialist, undergo your treatment in our luxurious clinic, and enjoy your recovery in beautiful Batumi.',
      },
      {
        number: '04',
        title: 'Follow-Up Care',
        desc: 'We provide 24/7 post-treatment support. Follow-up consultations via video call after you return home.',
      },
    ],
    
    // Packages
    packagesTitle: 'Beauty Vacation Packages',
    packagesSubtitle: 'All-inclusive treatment + accommodation packages',
    packages: [
      {
        name: 'Quick Refresh',
        duration: '3 days',
        treatments: ['Botox (2 areas)', 'Lip Filler', 'HydraFacial'],
        hotel: '4-star hotel',
        price: 599,
        popular: false,
      },
      {
        name: 'Full Transformation',
        duration: '5 days',
        treatments: ['Botox (3 areas)', 'Lip Filler', 'Cheek Filler', 'HydraFacial', 'Chemical Peel'],
        hotel: '5-star hotel',
        price: 1299,
        popular: true,
      },
      {
        name: 'Ultimate Experience',
        duration: '7 days',
        treatments: ['Full face fillers', 'Botox', 'Skin boosters', 'HydraFacial', 'Chemical Peel', 'Lash lift + tint'],
        hotel: '5-star luxury resort',
        price: 2499,
        popular: false,
      },
    ],
    includes: 'Package includes',
    hotelAccommodation: 'Hotel accommodation',
    airportTransfers: 'Airport transfers',
    postCare: 'Post-treatment care kit',
    support: '24/7 WhatsApp support',
    inquire: 'Inquire Now',
    
    // Testimonials
    testimonialsTitle: 'What Our International Clients Say',
    testimonials: [
      {
        name: 'Sarah M.',
        country: 'United Kingdom',
        flag: '🇬🇧',
        text: 'I saved over £2,000 on my treatments and had an amazing vacation. Dr. Nana is incredibly skilled - results better than my London clinic!',
        treatment: 'Botox + Fillers',
      },
      {
        name: 'Anna K.',
        country: 'Germany',
        flag: '🇩🇪',
        text: 'Professional, clean, and luxurious. The prices are unbelievable for the quality. Batumi is beautiful and the food is amazing!',
        treatment: 'HydraFacial + Peels',
      },
      {
        name: 'Fatima A.',
        country: 'UAE',
        flag: '🇦🇪',
        text: 'Only 3 hours flight from Dubai! I come every few months now. The team speaks English perfectly and makes me feel so comfortable.',
        treatment: 'Full face rejuvenation',
      },
    ],
    
    // CTA
    ctaTitle: 'Ready to Start Your Beauty Journey?',
    ctaSubtitle: 'Get a free virtual consultation and personalized quote',
    ctaButton: 'Contact Us on WhatsApp',
    ctaEmail: 'Or email us',
    
    // Footer info
    weSpeak: 'We speak',
    languages: 'English, Russian, Georgian, Turkish, Hebrew, Arabic',
    responseTime: 'We respond within',
    hours: 'hours',
  },
  ru: {
    // Hero
    heroTitle: 'Бьюти-туризм в Батуми',
    heroSubtitle: 'Сочетайте отпуск с премиальными косметическими процедурами по доступным ценам',
    heroCta: 'Запланировать визит',
    heroCta2: 'Смотреть процедуры',
    
    // Stats
    savingsUpTo: 'До',
    savingsPercent: '70% экономии',
    comparedEurope: 'по сравнению с Европой',
    clientsFrom: 'Клиенты из',
    countries: 'стран',
    yearsExperience: 'Лет',
    experience: 'опыта',
    treatmentsDone: 'Процедур',
    doneYearly: 'ежегодно',
    
    // Why Batumi
    whyTitle: 'Почему Батуми?',
    whySubtitle: 'Жемчужина Грузии на побережье Чёрного моря становится популярным бьюти-направлением',
    whyBatumi: [
      {
        title: 'Непревзойдённые цены',
        desc: 'Экономьте 50-70% по сравнению с западноевропейскими клиниками без потери качества.',
        icon: 'dollar',
      },
      {
        title: 'Качество по стандартам ЕС',
        desc: 'Все специалисты имеют международную сертификацию. Используем те же премиум-продукты.',
        icon: 'award',
      },
      {
        title: 'Без очередей',
        desc: 'Запишитесь на процедуру за дни, а не месяцы. Мы ценим ваше время.',
        icon: 'clock',
      },
      {
        title: 'Курортный город',
        desc: 'Батуми предлагает прекрасные пляжи, вкусную кухню и богатую культуру.',
        icon: 'palm',
      },
      {
        title: 'Без виз',
        desc: 'Многие национальности могут посетить Грузию без визы до 1 года.',
        icon: 'globe',
      },
      {
        title: 'Приватность',
        desc: 'Наслаждайтесь полной анонимностью. Восстанавливайтесь в роскошных отелях.',
        icon: 'shield',
      },
    ],
    
    // Compare prices
    compareTitle: 'Сравнение цен',
    compareSubtitle: 'То же премиум качество, значительно ниже цены',
    compareNote: 'Цены в EUR для сравнения',
    treatment: 'Процедура',
    europePrice: 'Европа',
    ourPrice: 'Батуми',
    savings: 'Экономия',
    treatments: [
      { name: 'Ботокс (3 зоны)', europe: 450, batumi: 180 },
      { name: 'Увеличение губ (1мл)', europe: 350, batumi: 150 },
      { name: 'HydraFacial', europe: 250, batumi: 90 },
      { name: 'Скуловые филлеры (1мл)', europe: 500, batumi: 200 },
      { name: 'Химический пилинг', europe: 200, batumi: 70 },
      { name: 'Наращивание ресниц', europe: 150, batumi: 50 },
    ],
    
    // How it works
    processTitle: 'Как это работает',
    processSubtitle: 'Мы делаем медицинский туризм простым',
    steps: [
      {
        number: '01',
        title: 'Бесплатная консультация',
        desc: 'Отправьте фото через WhatsApp или email. Доктор Нана создаст персональный план лечения.',
      },
      {
        number: '02',
        title: 'Планирование поездки',
        desc: 'Мы поможем с отелями, трансферами и расписанием. Батумский аэропорт принимает рейсы со всего мира.',
      },
      {
        number: '03',
        title: 'Прибытие и процедура',
        desc: 'Познакомьтесь со специалистом, пройдите процедуру в нашей роскошной клинике.',
      },
      {
        number: '04',
        title: 'Последующее наблюдение',
        desc: 'Круглосуточная поддержка после процедуры. Консультации по видеосвязи после возвращения.',
      },
    ],
    
    // Packages
    packagesTitle: 'Пакеты красоты',
    packagesSubtitle: 'Все включено: лечение + проживание',
    packages: [
      {
        name: 'Быстрое обновление',
        duration: '3 дня',
        treatments: ['Ботокс (2 зоны)', 'Увеличение губ', 'HydraFacial'],
        hotel: 'Отель 4 звезды',
        price: 599,
        popular: false,
      },
      {
        name: 'Полная трансформация',
        duration: '5 дней',
        treatments: ['Ботокс (3 зоны)', 'Губы', 'Скулы', 'HydraFacial', 'Пилинг'],
        hotel: 'Отель 5 звёзд',
        price: 1299,
        popular: true,
      },
      {
        name: 'Максимальный опыт',
        duration: '7 дней',
        treatments: ['Филлеры для лица', 'Ботокс', 'Skin boosters', 'HydraFacial', 'Пилинг', 'Ламинирование ресниц'],
        hotel: 'Роскошный курорт 5★',
        price: 2499,
        popular: false,
      },
    ],
    includes: 'В пакет входит',
    hotelAccommodation: 'Проживание в отеле',
    airportTransfers: 'Трансфер из аэропорта',
    postCare: 'Набор для ухода',
    support: 'Поддержка 24/7',
    inquire: 'Узнать подробнее',
    
    // Testimonials
    testimonialsTitle: 'Отзывы наших клиентов',
    testimonials: [
      {
        name: 'Сара М.',
        country: 'Великобритания',
        flag: '🇬🇧',
        text: 'Сэкономила более £2000 и отлично провела отпуск. Доктор Нана невероятно профессиональна!',
        treatment: 'Ботокс + Филлеры',
      },
      {
        name: 'Анна К.',
        country: 'Германия',
        flag: '🇩🇪',
        text: 'Профессионально, чисто, роскошно. Цены невероятные для такого качества. Батуми прекрасен!',
        treatment: 'HydraFacial + Пилинги',
      },
      {
        name: 'Фатима А.',
        country: 'ОАЭ',
        flag: '🇦🇪',
        text: 'Всего 3 часа полёта от Дубая! Теперь приезжаю каждые несколько месяцев.',
        treatment: 'Омоложение лица',
      },
    ],
    
    // CTA
    ctaTitle: 'Готовы начать путь к красоте?',
    ctaSubtitle: 'Получите бесплатную консультацию и персональное предложение',
    ctaButton: 'Написать в WhatsApp',
    ctaEmail: 'Или напишите нам',
    
    // Footer info
    weSpeak: 'Мы говорим',
    languages: 'Английский, Русский, Грузинский, Турецкий, Иврит, Арабский',
    responseTime: 'Отвечаем в течение',
    hours: 'часов',
  },
  ka: {
    // Hero
    heroTitle: 'სილამაზის ტურიზმი ბათუმში',
    heroSubtitle: 'შეუთავსეთ დასვენება პრემიუმ სილამაზის პროცედურებს ხელმისაწვდომ ფასებში',
    heroCta: 'დაგეგმეთ ვიზიტი',
    heroCta2: 'იხილეთ პროცედურები',
    
    // Stats
    savingsUpTo: 'მდე',
    savingsPercent: '70% დაზოგვა',
    comparedEurope: 'ევროპასთან შედარებით',
    clientsFrom: 'კლიენტები',
    countries: 'ქვეყნიდან',
    yearsExperience: 'წელი',
    experience: 'გამოცდილება',
    treatmentsDone: 'პროცედურა',
    doneYearly: 'წლიურად',
    
    // Why Batumi
    whyTitle: 'რატომ აირჩიოთ ბათუმი?',
    whySubtitle: 'საქართველოს მარგალიტი შავი ზღვის სანაპიროზე ხდება ევროპის ყველაზე პოპულარული სილამაზის დანიშნულება',
    whyBatumi: [
      {
        title: 'დაუჯერებელი ფასები',
        desc: 'დაზოგეთ 50-70% დასავლეთ ევროპის კლინიკებთან შედარებით, ხარისხის დათმობის გარეშე.',
        icon: 'dollar',
      },
      {
        title: 'ევროპული სტანდარტები',
        desc: 'ყველა ჩვენი სპეციალისტი საერთაშორისო სერტიფიკატით არის აღჭურვილი.',
        icon: 'award',
      },
      {
        title: 'გარეშე რიგისა',
        desc: 'დაჯავშნეთ პროცედურა დღეებში, არა თვეებში.',
        icon: 'clock',
      },
      {
        title: 'დასვენების ადგილი',
        desc: 'ბათუმი გთავაზობთ ლამაზ პლაჟებს, გემრიელ სამზარეულოს და მდიდარ კულტურას.',
        icon: 'palm',
      },
      {
        title: 'ვიზის გარეშე',
        desc: 'მრავალი ეროვნება შეძლებს საქართველოს მონახულებას ვიზის გარეშე 1 წლამდე.',
        icon: 'globe',
      },
      {
        title: 'კონფიდენციალურობა',
        desc: 'ისიამოვნეთ სრული ანონიმურობით. გამოჯანმრთელდეთ მდიდრულ სასტუმროებში.',
        icon: 'shield',
      },
    ],
    
    // Compare prices
    compareTitle: 'ფასების შედარება',
    compareSubtitle: 'იგივე პრემიუმ ხარისხი, მნიშვნელოვნად დაბალი ფასები',
    compareNote: 'ფასები EUR-ში შედარებისთვის',
    treatment: 'პროცედურა',
    europePrice: 'ევროპა',
    ourPrice: 'ბათუმი',
    savings: 'დაზოგვა',
    treatments: [
      { name: 'ბოტოქსი (3 არეალი)', europe: 450, batumi: 180 },
      { name: 'ტუჩის ფილერი (1მლ)', europe: 350, batumi: 150 },
      { name: 'HydraFacial', europe: 250, batumi: 90 },
      { name: 'ყვავილის ფილერი (1მლ)', europe: 500, batumi: 200 },
      { name: 'ქიმიური პილინგი', europe: 200, batumi: 70 },
      { name: 'წამწამების გაწელვა', europe: 150, batumi: 50 },
    ],
    
    // How it works
    processTitle: 'როგორ მუშაობს',
    processSubtitle: 'ჩვენ ვხდით სამედიცინო ტურიზმს მარტივს',
    steps: [
      {
        number: '01',
        title: 'უფასო კონსულტაცია',
        desc: 'გამოგვიგზავნეთ ფოტოები WhatsApp-ით ან ელ-ფოსტით. დოქტორი ნანა შეიმუშავებს თქვენს პერსონალურ გეგმას.',
      },
      {
        number: '02',
        title: 'დაგეგმეთ მოგზაურობა',
        desc: 'ჩვენ დაგეხმარებით სასტუმროს რეკომენდაციებით, ტრანსფერებით და განრიგით.',
      },
      {
        number: '03',
        title: 'ჩამოდით და მკურნალობა',
        desc: 'გაიცანით თქვენი სპეციალისტი, გაიარეთ პროცედურა ჩვენს მდიდრულ კლინიკაში.',
      },
      {
        number: '04',
        title: 'შემდგომი მოვლა',
        desc: 'ჩვენ ვაძლევთ 24/7 მხარდაჭერას. ვიდეო კონსულტაციები სახლში დაბრუნების შემდეგ.',
      },
    ],
    
    // Packages
    packagesTitle: 'სილამაზის პაკეტები',
    packagesSubtitle: 'ყველაფერი ჩათვლით: მკურნალობა + განთავსება',
    packages: [
      {
        name: 'სწრაფი განახლება',
        duration: '3 დღე',
        treatments: ['ბოტოქსი (2 არეალი)', 'ტუჩის ფილერი', 'HydraFacial'],
        hotel: '4-ვარსკვლავიანი სასტუმრო',
        price: 599,
        popular: false,
      },
      {
        name: 'სრული ტრანსფორმაცია',
        duration: '5 დღე',
        treatments: ['ბოტოქსი (3 არეალი)', 'ტუჩები', 'ყვავილები', 'HydraFacial', 'პილინგი'],
        hotel: '5-ვარსკვლავიანი სასტუმრო',
        price: 1299,
        popular: true,
      },
      {
        name: 'მაქსიმალური გამოცდილება',
        duration: '7 დღე',
        treatments: ['სახის ფილერები', 'ბოტოქსი', 'Skin boosters', 'HydraFacial', 'პილინგი', 'წამწამები'],
        hotel: 'მდიდრული კურორტი 5★',
        price: 2499,
        popular: false,
      },
    ],
    includes: 'პაკეტში შედის',
    hotelAccommodation: 'სასტუმროში განთავსება',
    airportTransfers: 'აეროპორტიდან ტრანსფერი',
    postCare: 'მოვლის ნაკრები',
    support: 'მხარდაჭერა 24/7',
    inquire: 'გაიგეთ მეტი',
    
    // Testimonials
    testimonialsTitle: 'რას ამბობენ ჩვენი კლიენტები',
    testimonials: [
      {
        name: 'სარა მ.',
        country: 'გაერთიანებული სამეფო',
        flag: '🇬🇧',
        text: 'დაზოგე £2000-ზე მეტი და შესანიშნავი დასვენება გავიფარეს. დოქტორი ნანა გასაოცრად პროფესიონალია!',
        treatment: 'ბოტოქსი + ფილერები',
      },
      {
        name: 'ანა კ.',
        country: 'გერმანია',
        flag: '🇩🇪',
        text: 'პროფესიონალური, სუფთა და მდიდრული. ფასები დაუჯერებელია ასეთი ხარისხისთვის.',
        treatment: 'HydraFacial + პილინგები',
      },
      {
        name: 'ფატიმა ა.',
        country: 'არაბეთის გაერთიანებული საამიროები',
        flag: '🇦🇪',
        text: 'მხოლოდ 3 საათის ფრენა დუბაიდან! ახლა ყოველ რამდენიმე თვეში მოვდივარ.',
        treatment: 'სახის გაახალგაზრდავება',
      },
    ],
    
    // CTA
    ctaTitle: 'მზად ხართ დაიწყოთ სილამაზის მოგზაურობა?',
    ctaSubtitle: 'მიიღეთ უფასო კონსულტაცია და პერსონალური შეთავაზება',
    ctaButton: 'დაგვიკავშირდით WhatsApp-ზე',
    ctaEmail: 'ან მოგვწერეთ',
    
    // Footer info
    weSpeak: 'ჩვენ ვსაუბრობთ',
    languages: 'ინგლისურად, რუსულად, ქართულად, თურქულად, ებრაულად, არაბულად',
    responseTime: 'პასუხობთ',
    hours: 'საათში',
  },
  he: {
    // Hero
    heroTitle: 'תיירות יופי בבאטומי',
    heroSubtitle: 'שלבי חופשה עם טיפולי אסתטיקה פרימיום במחירים נוחים',
    heroCta: 'תכני את הביקור',
    heroCta2: 'צפי בטיפולים',
    
    // Stats
    savingsUpTo: 'עד',
    savingsPercent: '70% חיסכון',
    comparedEurope: 'בהשוואה לאירופה',
    clientsFrom: 'לקוחות מ',
    countries: 'מדינות',
    yearsExperience: 'שנות',
    experience: 'ניסיון',
    treatmentsDone: 'טיפולים',
    doneYearly: 'בשנה',
    
    // Why Batumi
    whyTitle: 'למה לבחור בבאטומי?',
    whySubtitle: 'פנינת גיאורגיה על חוף הים השחור הופכת ליעד היופי החם של אירופה',
    whyBatumi: [
      {
        title: 'מחירים ללא תחרות',
        desc: 'חסכי 50-70% בהשוואה למרפאות במערב אירופה ללא פשרה על איכות.',
        icon: 'dollar',
      },
      {
        title: 'איכות בסטנדרט אירופאי',
        desc: 'כל המומחים שלנו מוסמכים בינלאומית. משתמשים באותם מוצרים פרימיום.',
        icon: 'award',
      },
      {
        title: 'בלי רשימות המתנה',
        desc: 'קבעי תור תוך ימים, לא חודשים. אנחנו מכבדים את הזמן שלך.',
        icon: 'clock',
      },
      {
        title: 'יעד נופש',
        desc: 'באטומי מציעה חופים יפים, מטבח טעים ותרבות עשירה.',
        icon: 'palm',
      },
      {
        title: 'נסיעה ללא ויזה',
        desc: 'אזרחים רבים יכולים לבקר בגיאורגיה ללא ויזה עד שנה.',
        icon: 'globe',
      },
      {
        title: 'פרטיות ודיסקרטיות',
        desc: 'תיהני מאנונימיות מלאה. החלמי במלונות יוקרה הרחק מעיניים סקרניות.',
        icon: 'shield',
      },
    ],
    
    // Compare prices
    compareTitle: 'השוואת מחירים',
    compareSubtitle: 'אותה איכות פרימיום, מחירים נמוכים משמעותית',
    compareNote: 'מחירים באירו להשוואה',
    treatment: 'טיפול',
    europePrice: 'אירופה',
    ourPrice: 'באטומי',
    savings: 'חיסכון',
    treatments: [
      { name: 'בוטוקס (3 אזורים)', europe: 450, batumi: 180 },
      { name: 'מילוי שפתיים (1מ"ל)', europe: 350, batumi: 150 },
      { name: 'HydraFacial', europe: 250, batumi: 90 },
      { name: 'מילוי לחיים (1מ"ל)', europe: 500, batumi: 200 },
      { name: 'פילינג כימי', europe: 200, batumi: 70 },
      { name: 'הארכת ריסים', europe: 150, batumi: 50 },
    ],
    
    // How it works
    processTitle: 'איך זה עובד',
    processSubtitle: 'אנחנו הופכים תיירות רפואית לפשוטה',
    steps: [
      {
        number: '01',
        title: 'ייעוץ חינם',
        desc: 'שלחי תמונות דרך וואטסאפ או אימייל. ד"ר ננה תכין תוכנית טיפול מותאמת אישית.',
      },
      {
        number: '02',
        title: 'תכנון הטיול',
        desc: 'נעזור בהמלצות מלונות, הסעות מהשדה ותיאום לוחות זמנים.',
      },
      {
        number: '03',
        title: 'הגעה וטיפול',
        desc: 'פגשי את המומחית, עברי את הטיפול בקליניקה המפוארת שלנו.',
      },
      {
        number: '04',
        title: 'מעקב',
        desc: 'אנחנו מספקים תמיכה 24/7. ייעוצי מעקב בווידאו לאחר החזרה הביתה.',
      },
    ],
    
    // Packages
    packagesTitle: 'חבילות חופשת יופי',
    packagesSubtitle: 'חבילות טיפול + לינה הכל כלול',
    packages: [
      {
        name: 'רענון מהיר',
        duration: '3 ימים',
        treatments: ['בוטוקס (2 אזורים)', 'מילוי שפתיים', 'HydraFacial'],
        hotel: 'מלון 4 כוכבים',
        price: 599,
        popular: false,
      },
      {
        name: 'שינוי מלא',
        duration: '5 ימים',
        treatments: ['בוטוקס (3 אזורים)', 'שפתיים', 'לחיים', 'HydraFacial', 'פילינג'],
        hotel: 'מלון 5 כוכבים',
        price: 1299,
        popular: true,
      },
      {
        name: 'חוויה מושלמת',
        duration: '7 ימים',
        treatments: ['מילוי פנים מלא', 'בוטוקס', 'Skin boosters', 'HydraFacial', 'פילינג', 'הרמת ריסים'],
        hotel: 'אתר נופש יוקרה 5★',
        price: 2499,
        popular: false,
      },
    ],
    includes: 'החבילה כוללת',
    hotelAccommodation: 'לינה במלון',
    airportTransfers: 'הסעות מהשדה',
    postCare: 'ערכת טיפול לאחר',
    support: 'תמיכת וואטסאפ 24/7',
    inquire: 'פני לפרטים',
    
    // Testimonials
    testimonialsTitle: 'מה הלקוחות הבינלאומיים אומרים',
    testimonials: [
      {
        name: 'שרה מ.',
        country: 'בריטניה',
        flag: '🇬🇧',
        text: 'חסכתי יותר מ-£2,000 והייתה לי חופשה מדהימה. ד"ר ננה מיומנת להפליא!',
        treatment: 'בוטוקס + מילוי',
      },
      {
        name: 'אנה ק.',
        country: 'גרמניה',
        flag: '🇩🇪',
        text: 'מקצועי, נקי ומפואר. המחירים בלתי ייאמנו לאיכות הזו.',
        treatment: 'HydraFacial + פילינגים',
      },
      {
        name: 'פטימה א.',
        country: 'איחוד האמירויות',
        flag: '🇦🇪',
        text: 'רק 3 שעות טיסה מדובאי! עכשיו אני באה כל כמה חודשים.',
        treatment: 'חידוש פנים מלא',
      },
    ],
    
    // CTA
    ctaTitle: 'מוכנה להתחיל את מסע היופי שלך?',
    ctaSubtitle: 'קבלי ייעוץ וירטואלי חינם והצעת מחיר מותאמת אישית',
    ctaButton: 'צרי קשר בוואטסאפ',
    ctaEmail: 'או שלחי לנו אימייל',
    
    // Footer info
    weSpeak: 'אנחנו מדברים',
    languages: 'אנגלית, רוסית, גיאורגית, טורקית, עברית, ערבית',
    responseTime: 'אנחנו משיבים תוך',
    hours: 'שעות',
  },
  ar: {
    // Hero
    heroTitle: 'سياحة الجمال في باتومي',
    heroSubtitle: 'اجمعي بين إجازتك وعلاجات التجميل الفاخرة بأسعار معقولة',
    heroCta: 'خططي لزيارتك',
    heroCta2: 'عرض العلاجات',
    
    // Stats
    savingsUpTo: 'تصل إلى',
    savingsPercent: '70% توفير',
    comparedEurope: 'مقارنة بأوروبا',
    clientsFrom: 'عملاء من',
    countries: 'دولة',
    yearsExperience: 'سنوات',
    experience: 'خبرة',
    treatmentsDone: 'علاج',
    doneYearly: 'سنوياً',
    
    // Why Batumi
    whyTitle: 'لماذا تختارين باتومي؟',
    whySubtitle: 'لؤلؤة جورجيا على ساحل البحر الأسود تصبح وجهة الجمال الأكثر رواجاً في أوروبا',
    whyBatumi: [
      {
        title: 'أسعار لا تُقاوم',
        desc: 'وفرّي 50-70% مقارنة بعيادات أوروبا الغربية دون التنازل عن الجودة.',
        icon: 'dollar',
      },
      {
        title: 'جودة معيار الاتحاد الأوروبي',
        desc: 'جميع متخصصينا حاصلون على شهادات دولية. نستخدم نفس المنتجات الفاخرة.',
        icon: 'award',
      },
      {
        title: 'بدون قوائم انتظار',
        desc: 'احجزي موعدك خلال أيام وليس أشهر. نحترم وقتك.',
        icon: 'clock',
      },
      {
        title: 'وجهة عطلات',
        desc: 'باتومي تقدم شواطئ جميلة ومأكولات لذيذة وثقافة غنية.',
        icon: 'palm',
      },
      {
        title: 'سفر بدون تأشيرة',
        desc: 'العديد من الجنسيات يمكنها زيارة جورجيا بدون تأشيرة لمدة تصل إلى سنة.',
        icon: 'globe',
      },
      {
        title: 'خصوصية تامة',
        desc: 'استمتعي بسرية تامة. تعافي في فنادق فاخرة بعيداً عن الأنظار.',
        icon: 'shield',
      },
    ],
    
    // Compare prices
    compareTitle: 'مقارنة الأسعار',
    compareSubtitle: 'نفس الجودة الفاخرة، أسعار أقل بكثير',
    compareNote: 'الأسعار باليورو للمقارنة',
    treatment: 'العلاج',
    europePrice: 'أوروبا',
    ourPrice: 'باتومي',
    savings: 'التوفير',
    treatments: [
      { name: 'البوتوكس (3 مناطق)', europe: 450, batumi: 180 },
      { name: 'تعبئة الشفاه (1مل)', europe: 350, batumi: 150 },
      { name: 'HydraFacial', europe: 250, batumi: 90 },
      { name: 'تعبئة الخدود (1مل)', europe: 500, batumi: 200 },
      { name: 'التقشير الكيميائي', europe: 200, batumi: 70 },
      { name: 'تمديد الرموش', europe: 150, batumi: 50 },
    ],
    
    // How it works
    processTitle: 'كيف يعمل',
    processSubtitle: 'نجعل السياحة العلاجية بسيطة وخالية من التوتر',
    steps: [
      {
        number: '01',
        title: 'استشارة مجانية',
        desc: 'أرسلي صورك عبر واتساب أو البريد الإلكتروني. الدكتورة نانا ستعد خطة علاج مخصصة.',
      },
      {
        number: '02',
        title: 'خططي رحلتك',
        desc: 'نساعدك في توصيات الفنادق والنقل من المطار والجدولة.',
      },
      {
        number: '03',
        title: 'الوصول والعلاج',
        desc: 'قابلي المتخصصة، undergo علاجك في عيادتنا الفاخرة.',
      },
      {
        number: '04',
        title: 'المتابعة',
        desc: 'نوفر دعماً على مدار الساعة. استشارات متابعة عبر الفيديو بعد عودتك.',
      },
    ],
    
    // Packages
    packagesTitle: 'باقات إجازة الجمال',
    packagesSubtitle: 'باقات شاملة: علاج + إقامة',
    packages: [
      {
        name: 'تجديد سريع',
        duration: '3 أيام',
        treatments: ['البوتوكس (2 منطقة)', 'تعبئة الشفاه', 'HydraFacial'],
        hotel: 'فندق 4 نجوم',
        price: 599,
        popular: false,
      },
      {
        name: 'تحول كامل',
        duration: '5 أيام',
        treatments: ['البوتوكس (3 مناطق)', 'الشفاه', 'الخدود', 'HydraFacial', 'التقشير'],
        hotel: 'فندق 5 نجوم',
        price: 1299,
        popular: true,
      },
      {
        name: 'التجربة المثالية',
        duration: '7 أيام',
        treatments: ['تعبئة الوجه الكامل', 'البوتوكس', 'Skin boosters', 'HydraFacial', 'التقشير', 'رفع الرموش'],
        hotel: 'منتجع فاخر 5★',
        price: 2499,
        popular: false,
      },
    ],
    includes: 'الباقة تشمل',
    hotelAccommodation: 'الإقامة في الفندق',
    airportTransfers: 'النقل من المطار',
    postCare: 'مجموعة العناية',
    support: 'دعم واتساب 24/7',
    inquire: 'استفسري الآن',
    
    // Testimonials
    testimonialsTitle: 'ماذا يقول عملاؤنا الدوليون',
    testimonials: [
      {
        name: 'سارة م.',
        country: 'المملكة المتحدة',
        flag: '🇬🇧',
        text: 'وفرت أكثر من £2000 وكانت إجازة رائعة. الدكتورة نانا محترفة بشكل لا يصدق!',
        treatment: 'البوتوكس + التعبئة',
      },
      {
        name: 'آنا ك.',
        country: 'ألمانيا',
        flag: '🇩🇪',
        text: 'احترافية ونظافة وفخامة. الأسعار لا تُصدق لهذه الجودة.',
        treatment: 'HydraFacial + التقشير',
      },
      {
        name: 'فاطمة أ.',
        country: 'الإمارات',
        flag: '🇦🇪',
        text: '3 ساعات طيران فقط من دبي! الآن آتي كل بضعة أشهر.',
        treatment: 'تجديد الوجه الكامل',
      },
    ],
    
    // CTA
    ctaTitle: 'مستعدة لبدء رحلة الجمال؟',
    ctaSubtitle: 'احصلي على استشارة افتراضية مجانية وعرض سعر مخصص',
    ctaButton: 'تواصلي عبر واتساب',
    ctaEmail: 'أو راسلينا',
    
    // Footer info
    weSpeak: 'نتحدث',
    languages: 'الإنجليزية، الروسية، الجورجية، التركية، العبرية، العربية',
    responseTime: 'نرد خلال',
    hours: 'ساعات',
  },
  tr: {
    // Hero
    heroTitle: 'Batumi\'de Güzellik Turizmi',
    heroSubtitle: 'Tatilinizi premium estetik tedavilerle uygun fiyatlarla birleştirin',
    heroCta: 'Ziyaretinizi Planlayın',
    heroCta2: 'Tedavileri Görün',
    
    // Stats
    savingsUpTo: 'Kadar',
    savingsPercent: '%70 tasarruf',
    comparedEurope: 'Avrupa\'ya kıyasla',
    clientsFrom: 'Müşteri',
    countries: 'ülkeden',
    yearsExperience: 'Yıl',
    experience: 'deneyim',
    treatmentsDone: 'Tedavi',
    doneYearly: 'yıllık',
    
    // Why Batumi
    whyTitle: 'Neden Batumi\'yi Seçmelisiniz?',
    whySubtitle: 'Karadeniz kıyısındaki Gürcistan\'ın incisi, Avrupa\'nın en popüler güzellik destinasyonu oluyor',
    whyBatumi: [
      {
        title: 'Rakipsiz Fiyatlar',
        desc: 'Kaliteden ödün vermeden Batı Avrupa kliniklerine kıyasla %50-70 tasarruf edin.',
        icon: 'dollar',
      },
      {
        title: 'AB Standartlarında Kalite',
        desc: 'Tüm uzmanlarımız uluslararası sertifikalı. Aynı premium ürünleri kullanıyoruz.',
        icon: 'award',
      },
      {
        title: 'Bekleme Listesi Yok',
        desc: 'Randevunuzu günler içinde alın, aylar değil. Zamanınıza saygı duyuyoruz.',
        icon: 'clock',
      },
      {
        title: 'Tatil Destinasyonu',
        desc: 'Batumi güzel plajlar, lezzetli mutfak ve zengin kültür sunuyor.',
        icon: 'palm',
      },
      {
        title: 'Vizesiz Seyahat',
        desc: 'Birçok uyruk 1 yıla kadar vizesiz Gürcistan\'ı ziyaret edebilir.',
        icon: 'globe',
      },
      {
        title: 'Gizlilik',
        desc: 'Tam anonimliğin keyfini çıkarın. Lüks otellerde iyileşin.',
        icon: 'shield',
      },
    ],
    
    // Compare prices
    compareTitle: 'Fiyat Karşılaştırması',
    compareSubtitle: 'Aynı premium kalite, önemli ölçüde düşük fiyatlar',
    compareNote: 'Karşılaştırma için EUR cinsinden fiyatlar',
    treatment: 'Tedavi',
    europePrice: 'Avrupa',
    ourPrice: 'Batumi',
    savings: 'Tasarruf',
    treatments: [
      { name: 'Botox (3 bölge)', europe: 450, batumi: 180 },
      { name: 'Dudak Dolgusu (1ml)', europe: 350, batumi: 150 },
      { name: 'HydraFacial', europe: 250, batumi: 90 },
      { name: 'Elmacık Dolgusu (1ml)', europe: 500, batumi: 200 },
      { name: 'Kimyasal Peeling', europe: 200, batumi: 70 },
      { name: 'Kirpik Uzatma', europe: 150, batumi: 50 },
    ],
    
    // How it works
    processTitle: 'Nasıl Çalışır',
    processSubtitle: 'Medikal turizmi basit ve stresiz hale getiriyoruz',
    steps: [
      {
        number: '01',
        title: 'Ücretsiz Danışmanlık',
        desc: 'Fotoğraflarınızı WhatsApp veya e-posta ile gönderin. Dr. Nana kişiselleştirilmiş tedavi planınızı oluşturacak.',
      },
      {
        number: '02',
        title: 'Seyahatinizi Planlayın',
        desc: 'Otel önerileri, havalimanı transferleri ve planlama konusunda yardımcı oluyoruz.',
      },
      {
        number: '03',
        title: 'Varın ve Tedavi Olun',
        desc: 'Uzmanınızla tanışın, lüks kliniğimizde tedavinizi olun.',
      },
      {
        number: '04',
        title: 'Takip Bakımı',
        desc: '7/24 tedavi sonrası destek sağlıyoruz. Eve döndükten sonra video görüşmeler.',
      },
    ],
    
    // Packages
    packagesTitle: 'Güzellik Tatil Paketleri',
    packagesSubtitle: 'Her şey dahil tedavi + konaklama paketleri',
    packages: [
      {
        name: 'Hızlı Yenilenme',
        duration: '3 gün',
        treatments: ['Botox (2 bölge)', 'Dudak Dolgusu', 'HydraFacial'],
        hotel: '4 yıldızlı otel',
        price: 599,
        popular: false,
      },
      {
        name: 'Tam Dönüşüm',
        duration: '5 gün',
        treatments: ['Botox (3 bölge)', 'Dudaklar', 'Elmacıklar', 'HydraFacial', 'Peeling'],
        hotel: '5 yıldızlı otel',
        price: 1299,
        popular: true,
      },
      {
        name: 'Nihai Deneyim',
        duration: '7 gün',
        treatments: ['Tam yüz dolgusu', 'Botox', 'Skin boosters', 'HydraFacial', 'Peeling', 'Kirpik kaldırma'],
        hotel: '5★ lüks resort',
        price: 2499,
        popular: false,
      },
    ],
    includes: 'Paket içerir',
    hotelAccommodation: 'Otel konaklaması',
    airportTransfers: 'Havalimanı transferleri',
    postCare: 'Tedavi sonrası bakım seti',
    support: '7/24 WhatsApp desteği',
    inquire: 'Sorunuz',
    
    // Testimonials
    testimonialsTitle: 'Uluslararası Müşterilerimiz Ne Diyor',
    testimonials: [
      {
        name: 'Sarah M.',
        country: 'İngiltere',
        flag: '🇬🇧',
        text: 'Tedavilerimde £2.000\'den fazla tasarruf ettim ve harika bir tatil geçirdim. Dr. Nana inanılmaz derecede yetenekli!',
        treatment: 'Botox + Dolgular',
      },
      {
        name: 'Anna K.',
        country: 'Almanya',
        flag: '🇩🇪',
        text: 'Profesyonel, temiz ve lüks. Bu kalite için fiyatlar inanılmaz.',
        treatment: 'HydraFacial + Peelingler',
      },
      {
        name: 'Fatima A.',
        country: 'BAE',
        flag: '🇦🇪',
        text: 'Dubai\'den sadece 3 saatlik uçuş! Artık her birkaç ayda bir geliyorum.',
        treatment: 'Tam yüz gençleştirme',
      },
    ],
    
    // CTA
    ctaTitle: 'Güzellik Yolculuğunuza Başlamaya Hazır mısınız?',
    ctaSubtitle: 'Ücretsiz sanal danışmanlık ve kişiselleştirilmiş teklif alın',
    ctaButton: 'WhatsApp\'tan Bize Ulaşın',
    ctaEmail: 'Veya bize e-posta gönderin',
    
    // Footer info
    weSpeak: 'Konuşuyoruz',
    languages: 'İngilizce, Rusça, Gürcüce, Türkçe, İbranice, Arapça',
    responseTime: 'İçinde yanıtlıyoruz',
    hours: 'saat',
  },
};

const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, React.ReactNode> = {
    dollar: <DollarSign className={className} />,
    award: <Award className={className} />,
    clock: <Clock className={className} />,
    palm: <Palmtree className={className} />,
    globe: <Globe className={className} />,
    shield: <Shield className={className} />,
  };
  return icons[iconName] || <Star className={className} />;
};

export default function InternationalClient({ locale }: InternationalClientProps) {
  const t = translations[locale as keyof typeof translations] || translations.en;
  const isRTL = locale === 'he' || locale === 'ar';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/40 to-gray-900/70" />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 w-20 h-20 rounded-full bg-teal-300/20 blur-2xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-rose-300/20 blur-3xl"
        />

        <div className="container mx-auto max-w-6xl px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100/80 border border-teal-200 mb-8"
            >
              <Globe size={18} className="text-teal-600" />
              <span className="text-teal-700 font-medium">
                {locale === 'ru' ? 'Красота без границ' : locale === 'ka' ? 'სილამაზე საზღვრებს გარეშე' : 'Beauty Without Borders'}
              </span>
            </motion.div>

            <h1 
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              {t.heroTitle}
            </h1>

            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-10">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="https://wa.me/995599123456?text=Hello! I'm interested in international treatments"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(20, 184, 166, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Plane size={20} />
                {t.heroCta}
              </motion.a>

              <Link href={`/${locale}/treatments`}>
                <motion.button
                  className="px-8 py-4 rounded-full text-white font-semibold text-lg border border-white/30 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.heroCta2}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-amber-400/50 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-teal-100 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: t.savingsPercent, label: t.savingsUpTo + ' ' + t.comparedEurope, icon: DollarSign },
              { value: '25+', label: t.clientsFrom + ' ' + t.countries, icon: Globe },
              { value: '8+', label: t.yearsExperience + ' ' + t.experience, icon: Award },
              { value: '2000+', label: t.treatmentsDone + ' ' + t.doneYearly, icon: Sparkles },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon size={24} className="mx-auto text-teal-500 mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Batumi Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t.whyTitle}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t.whySubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whyBatumi.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-200 hover:border-teal-300 transition-all group bg-white shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 text-teal-500 group-hover:scale-110 transition-transform">
                  {getIcon(item.icon, 'w-6 h-6')}
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t.compareTitle}
            </h2>
            <p className="text-gray-500">{t.compareSubtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-teal-200 overflow-hidden bg-white shadow-sm"
          >
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-teal-50 border-b border-teal-100">
              <div className="text-gray-600 font-medium text-sm">{t.treatment}</div>
              <div className="text-gray-600 font-medium text-sm text-center">{t.europePrice}</div>
              <div className="text-teal-600 font-medium text-sm text-center">{t.ourPrice}</div>
              <div className="text-green-600 font-medium text-sm text-center">{t.savings}</div>
            </div>

            {/* Table Rows */}
            {t.treatments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 hover:bg-teal-50/50 transition-all"
              >
                <div className="text-gray-900 text-sm">{item.name}</div>
                <div className="text-gray-400 text-center line-through">€{item.europe}</div>
                <div className="text-teal-600 font-semibold text-center">€{item.batumi}</div>
                <div className="text-green-600 text-center font-medium">
                  {Math.round((1 - item.batumi / item.europe) * 100)}%
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-gray-400 text-xs text-center mt-4">{t.compareNote}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t.processTitle}
            </h2>
            <p className="text-gray-500">{t.processSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Connector Line */}
                {i < t.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-teal-300 to-transparent" style={{ width: 'calc(100% - 60px)', left: '60px' }} />
                )}

                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t.packagesTitle}
            </h2>
            <p className="text-gray-500">{t.packagesSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden transition-all bg-white shadow-sm ${
                  pkg.popular ? 'border-teal-400 scale-105' : 'border-gray-200 hover:border-teal-300'
                }`}
                style={{ 
                  borderWidth: pkg.popular ? '2px' : '1px',
                }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600">
                    {locale === 'ru' ? 'ПОПУЛЯРНЫЙ' : locale === 'ka' ? 'პოპულარული' : 'MOST POPULAR'}
                  </div>
                )}

                <div className={`p-6 ${pkg.popular ? 'pt-10' : ''}`}>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                    <Calendar size={14} />
                    {pkg.duration}
                  </p>

                  <div className="mb-6">
                    <p className="text-3xl font-bold text-teal-600">€{pkg.price}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.treatments.map((treatment, j) => (
                      <div key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                        <Check size={12} className="text-teal-500" />
                        {treatment}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">{t.includes}:</p>
                    <div className="space-y-1 text-gray-600 text-xs">
                      <div className="flex items-center gap-2">
                        <Building2 size={10} className="text-teal-500/60" />
                        {pkg.hotel}
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane size={10} className="text-teal-500/60" />
                        {t.airportTransfers}
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart size={10} className="text-teal-500/60" />
                        {t.postCare}
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle size={10} className="text-teal-500/60" />
                        {t.support}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => window.open(`https://wa.me/995599123456?text=${encodeURIComponent(`${t.inquire}: ${pkg.name} - €${pkg.price}`)}`, '_blank')}
                    className={`w-full mt-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                      pkg.popular ? 'text-white' : 'text-gray-700 border border-gray-200 hover:border-teal-300'
                    }`}
                    style={pkg.popular ? { background: 'linear-gradient(135deg, #14b8a6, #0d9488)' } : {}}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.inquire}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t.testimonialsTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{item.flag}</span>
                  <div>
                    <p className="text-gray-900 font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.country}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{item.text}"</p>
                <p className="text-teal-600 text-xs">{item.treatment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-teal-50/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t.ctaTitle}
            </h2>
            <p className="text-gray-500 mb-8">{t.ctaSubtitle}</p>

            <motion.a
              href="https://wa.me/995599123456?text=Hello! I'm interested in international beauty treatments in Batumi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-semibold text-lg"
              style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(20, 184, 166, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={22} />
              {t.ctaButton}
            </motion.a>

            <p className="text-gray-500 text-sm mt-6">
              {t.ctaEmail}: <a href="mailto:info@silkbeauty.ge" className="text-teal-600 hover:underline">info@silkbeauty.ge</a>
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
              <div className="p-4 rounded-xl border border-gray-200 text-center bg-white shadow-sm">
                <p className="text-gray-500 text-sm">{t.weSpeak}</p>
                <p className="text-gray-900 font-medium mt-1">{t.languages}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 text-center bg-white shadow-sm">
                <p className="text-gray-500 text-sm">{t.responseTime}</p>
                <p className="text-gray-900 font-medium mt-1">24 {t.hours}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
