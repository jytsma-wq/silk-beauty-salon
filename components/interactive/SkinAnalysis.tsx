'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, RefreshCw,
  Droplets, Sun, Zap, Leaf, Shield, Heart
} from 'lucide-react';

interface SkinAnalysisProps {
  locale: string;
}

const translations = {
  en: {
    title: 'AI Skin Analysis',
    subtitle: 'Discover your skin type and get personalized treatment recommendations',
    startAnalysis: 'Start Analysis',
    yourResults: 'Your Skin Profile',
    retake: 'Retake Quiz',
    bookTreatment: 'Book Recommended Treatment',
    questions: {
      skinType: {
        question: 'How does your skin feel after cleansing?',
        options: [
          { text: 'Tight and dry', value: 'dry' },
          { text: 'Comfortable, slightly hydrated', value: 'normal' },
          { text: 'Oily in T-zone only', value: 'combination' },
          { text: 'Oily all over', value: 'oily' },
        ],
      },
      sensitivity: {
        question: 'How does your skin react to new products?',
        options: [
          { text: 'Often irritated or red', value: 'sensitive' },
          { text: 'Sometimes reacts', value: 'moderate' },
          { text: 'Rarely has reactions', value: 'resilient' },
        ],
      },
      concern: {
        question: 'What is your main skin concern?',
        options: [
          { text: 'Fine lines & wrinkles', value: 'aging', icon: '⏰' },
          { text: 'Acne & breakouts', value: 'acne', icon: '🔴' },
          { text: 'Dark spots & pigmentation', value: 'pigmentation', icon: '🌟' },
          { text: 'Dullness & uneven texture', value: 'texture', icon: '✨' },
          { text: 'Large pores', value: 'pores', icon: '🔍' },
          { text: 'Dehydration', value: 'dehydration', icon: '💧' },
        ],
      },
      age: {
        question: 'What is your age range?',
        options: [
          { text: 'Under 25', value: 'under25' },
          { text: '25-35', value: '25-35' },
          { text: '35-45', value: '35-45' },
          { text: '45+', value: '45plus' },
        ],
      },
      sun: {
        question: 'How often are you exposed to the sun?',
        options: [
          { text: 'Daily, outdoor activities', value: 'high' },
          { text: 'Moderate exposure', value: 'moderate' },
          { text: 'Minimal, mostly indoors', value: 'low' },
        ],
      },
    },
    results: {
      dry: {
        type: 'Dry Skin',
        description: 'Your skin needs intensive hydration and barrier repair.',
        treatments: ['HydraFacial', 'Skin Boosters', 'Mesotherapy', 'BioRePeel'],
        tips: ['Use gentle, cream-based cleansers', 'Apply hyaluronic acid serums', 'Consider monthly hydrating facials'],
      },
      normal: {
        type: 'Normal Skin',
        description: 'Lucky you! Focus on maintenance and prevention.',
        treatments: ['HydraFacial', 'Chemical Peel', 'Microneedling', 'LED Therapy'],
        tips: ['Maintain your current routine', 'Focus on anti-aging prevention', 'Monthly facials recommended'],
      },
      combination: {
        type: 'Combination Skin',
        description: 'Balance is key. Target different zones differently.',
        treatments: ['HydraFacial', 'Chemical Peel', 'Dermaplaning', 'LED Therapy'],
        tips: ['Use oil-free products on T-zone', 'Hydrate dry areas more', 'Balancing facials monthly'],
      },
      oily: {
        type: 'Oily Skin',
        description: 'Control excess sebum while maintaining hydration.',
        treatments: ['Chemical Peel', 'Microneedling', 'HydraFacial', 'LED Therapy'],
        tips: ['Use salicylic acid products', 'Don\'t skip moisturizer', 'Regular exfoliation is key'],
      },
    },
    concerns: {
      aging: { title: 'Anti-Aging Focus', extra: ['Botox', 'Fillers', 'Skin Boosters', 'RF Treatment'] },
      acne: { title: 'Acne Management', extra: ['Chemical Peel', 'LED Therapy', 'Extraction Facial'] },
      pigmentation: { title: 'Brightening Focus', extra: ['Chemical Peel', 'Laser Treatment', 'Vitamin C Infusion'] },
      texture: { title: 'Texture Improvement', extra: ['Microneedling', 'Dermaplaning', 'Chemical Peel'] },
      pores: { title: 'Pore Refinement', extra: ['HydraFacial', 'Chemical Peel', 'LED Therapy'] },
      dehydration: { title: 'Hydration Boost', extra: ['HydraFacial', 'Skin Boosters', 'Mesotherapy'] },
    },
  },
  ru: {
    title: 'AI Анализ кожи',
    subtitle: 'Узнайте свой тип кожи и получите персональные рекомендации',
    startAnalysis: 'Начать анализ',
    yourResults: 'Ваш профиль кожи',
    retake: 'Пройти снова',
    bookTreatment: 'Записаться на процедуру',
    questions: {
      skinType: {
        question: 'Как ощущается кожа после умывания?',
        options: [
          { text: 'Стянутая и сухая', value: 'dry' },
          { text: 'Комфортная, увлажненная', value: 'normal' },
          { text: 'Жирная в Т-зоне', value: 'combination' },
          { text: 'Жирная вся', value: 'oily' },
        ],
      },
      sensitivity: {
        question: 'Как кожа реагирует на новые средства?',
        options: [
          { text: 'Часто раздражается', value: 'sensitive' },
          { text: 'Иногда реагирует', value: 'moderate' },
          { text: 'Редко реагирует', value: 'resilient' },
        ],
      },
      concern: {
        question: 'Какая ваша основная проблема с кожей?',
        options: [
          { text: 'Морщины', value: 'aging', icon: '⏰' },
          { text: 'Акне и высыпания', value: 'acne', icon: '🔴' },
          { text: 'Пигментация', value: 'pigmentation', icon: '🌟' },
          { text: 'Текстура и тусклость', value: 'texture', icon: '✨' },
          { text: 'Расширенные поры', value: 'pores', icon: '🔍' },
          { text: 'Обезвоживание', value: 'dehydration', icon: '💧' },
        ],
      },
      age: {
        question: 'Ваш возраст?',
        options: [
          { text: 'До 25', value: 'under25' },
          { text: '25-35', value: '25-35' },
          { text: '35-45', value: '35-45' },
          { text: '45+', value: '45plus' },
        ],
      },
      sun: {
        question: 'Как часто вы на солнце?',
        options: [
          { text: 'Ежедневно', value: 'high' },
          { text: 'Умеренно', value: 'moderate' },
          { text: 'Минимально', value: 'low' },
        ],
      },
    },
    results: {
      dry: {
        type: 'Сухая кожа',
        description: 'Ваша кожа нуждается в интенсивном увлажнении.',
        treatments: ['HydraFacial', 'Skin Boosters', 'Мезотерапия', 'BioRePeel'],
        tips: ['Используйте мягкие очищающие средства', 'Сыворотки с гиалуроновой кислотой', 'Ежемесячные увлажняющие маски'],
      },
      normal: {
        type: 'Нормальная кожа',
        description: 'Вам повезло! Фокус на поддержании.',
        treatments: ['HydraFacial', 'Химический пилинг', 'Микроиглы', 'LED терапия'],
        tips: ['Поддерживайте текущий уход', 'Фокус на профилактике старения', 'Ежемесячные уходовые процедуры'],
      },
      combination: {
        type: 'Комбинированная кожа',
        description: 'Баланс — ключ к успеху.',
        treatments: ['HydraFacial', 'Химический пилинг', 'Дермапланинг', 'LED терапия'],
        tips: ['Бесспиртовые средства для Т-зоны', 'Увлажняйте сухие зоны', 'Балансирующие процедуры ежемесячно'],
      },
      oily: {
        type: 'Жирная кожа',
        description: 'Контролируйте себум, не пересушивая.',
        treatments: ['Химический пилинг', 'Микроиглы', 'HydraFacial', 'LED терапия'],
        tips: ['Средства с салициловой кислотой', 'Не пропускайте увлажнение', 'Регулярное отшелушивание'],
      },
    },
    concerns: {
      aging: { title: 'Анти-эйдж фокус', extra: ['Ботокс', 'Филлеры', 'Skin Boosters', 'RF лечение'] },
      acne: { title: 'Лечение акне', extra: ['Химический пилинг', 'LED терапия', 'Чистка лица'] },
      pigmentation: { title: 'Осветление', extra: ['Химический пилинг', 'Лазер', 'Витамин С'] },
      texture: { title: 'Улучшение текстуры', extra: ['Микроиглы', 'Дермапланинг', 'Пилинг'] },
      pores: { title: 'Сужение пор', extra: ['HydraFacial', 'Пилинг', 'LED терапия'] },
      dehydration: { title: 'Увлажнение', extra: ['HydraFacial', 'Skin Boosters', 'Мезотерапия'] },
    },
  },
  ka: {
    title: 'AI კანის ანალიზი',
    subtitle: 'აღმოაჩინეთ თქვენი კანის ტიპი და მიიღეთ პერსონალური რეკომენდაციები',
    startAnalysis: 'დაწყება',
    yourResults: 'თქვენი კანის პროფილი',
    retake: 'თავიდან',
    bookTreatment: 'დაჯავშნა',
    questions: {
      skinType: {
        question: 'როგორ გრძნობთ კანს გაწმენდის შემდეგ?',
        options: [
          { text: 'მჭიდრო და მშრალი', value: 'dry' },
          { text: 'კომფორტული', value: 'normal' },
          { text: 'ცხიმოვანი T-ზონაში', value: 'combination' },
          { text: 'ცხიმოვანი ყველგან', value: 'oily' },
        ],
      },
      sensitivity: {
        question: 'როგორ რეაგირებს კანი ახალ პროდუქტებზე?',
        options: [
          { text: 'ხშირად ირიტაცია', value: 'sensitive' },
          { text: 'ზოგჯერ', value: 'moderate' },
          { text: 'იშვიათად', value: 'resilient' },
        ],
      },
      concern: {
        question: 'რა არის თქვენი მთავარი პრობლემა?',
        options: [
          { text: 'ნაოჭები', value: 'aging', icon: '⏰' },
          { text: 'აკნე', value: 'acne', icon: '🔴' },
          { text: 'პიგმენტაცია', value: 'pigmentation', icon: '🌟' },
          { text: 'ტექსტურა', value: 'texture', icon: '✨' },
          { text: 'ფორები', value: 'pores', icon: '🔍' },
          { text: 'დეჰიდრატაცია', value: 'dehydration', icon: '💧' },
        ],
      },
      age: {
        question: 'თქვენი ასაკი?',
        options: [
          { text: '25-მდე', value: 'under25' },
          { text: '25-35', value: '25-35' },
          { text: '35-45', value: '35-45' },
          { text: '45+', value: '45plus' },
        ],
      },
      sun: {
        question: 'რამდენად ხშირად ხართ მზეზე?',
        options: [
          { text: 'ყოველდღე', value: 'high' },
          { text: 'ზომიერად', value: 'moderate' },
          { text: 'მინიმალურად', value: 'low' },
        ],
      },
    },
    results: {
      dry: {
        type: 'მშრალი კანი',
        description: 'თქვენი კანი საჭიროებს ინტენსიურ დატენიანებას.',
        treatments: ['HydraFacial', 'Skin Boosters', 'მეზოთერაპია', 'BioRePeel'],
        tips: ['გამოიყენეთ რბილი საწმენდი საშუალებები', 'ჰიალურონის სერუმები', 'თვეში ერთხელ დამატენიანებელი მასკები'],
      },
      normal: {
        type: 'ნორმალური კანი',
        description: 'გიხაროდეთ! ფოკუსი მხარდაჭერაზე.',
        treatments: ['HydraFacial', 'ქიმიური პილინგი', 'მიკროიგლები', 'LED თერაპია'],
        tips: ['შეინარჩუნეთ მიმდინარე მოვლა', 'ფოკუსი ანტი-ეიჯ პრევენციაზე', 'თვეში ერთხელ მოვლის პროცედურები'],
      },
      combination: {
        type: 'კომბინირებული კანი',
        description: 'ბალანსი არის გასაღები.',
        treatments: ['HydraFacial', 'ქიმიური პილინგი', 'დერმაპლანინგი', 'LED თერაპია'],
        tips: ['უალკოჰოლო საშუალებები T-ზონისთვის', 'დაატენიანეთ მშრალი ზონები', 'ბალანსირებადი პროცედურები'],
      },
      oily: {
        type: 'ცხიმოვანი კანი',
        description: 'აკონტროლეთ სებუმი, არ გააშროთ.',
        treatments: ['ქიმიური პილინგი', 'მიკროიგლები', 'HydraFacial', 'LED თერაპია'],
        tips: ['სალიცილის მჟავას პროდუქტები', 'არ გამოტოვოთ დამატენიანებელი', 'რეგულარული ექსფოლიაცია'],
      },
    },
    concerns: {
      aging: { title: 'ანტი-ეიჯ ფოკუსი', extra: ['ბოტოქსი', 'ფილერები', 'Skin Boosters', 'RF მკურნალობა'] },
      acne: { title: 'აკნეს მკურნალობა', extra: ['ქიმიური პილინგი', 'LED თერაპია', 'სახის გაწმენდა'] },
      pigmentation: { title: 'განათება', extra: ['ქიმიური პილინგი', 'ლაზერი', 'ვიტამინი C'] },
      texture: { title: 'ტექსტურის გაუმჯობესება', extra: ['მიკროიგლები', 'დერმაპლანინგი', 'პილინგი'] },
      pores: { title: 'ფორების შევიწროება', extra: ['HydraFacial', 'პილინგი', 'LED თერაპია'] },
      dehydration: { title: 'დატენიანება', extra: ['HydraFacial', 'Skin Boosters', 'მეზოთერაპია'] },
    },
  },
  he: {
    title: 'ניתוח עור AI',
    subtitle: 'גלי את סוג העור שלך וקבלי המלצות מותאמות אישית',
    startAnalysis: 'התחל ניתוח',
    yourResults: 'פרופיל העור שלך',
    retake: 'התחל מחדש',
    bookTreatment: 'הזמן טיפול',
    questions: {
      skinType: {
        question: 'איך העור שלך מרגיש לאחר הניקוי?',
        options: [
          { text: 'מתוח ויבש', value: 'dry' },
          { text: 'נוח, מעט לח', value: 'normal' },
          { text: 'שמן באזור T בלבד', value: 'combination' },
          { text: 'שמן בכל מקום', value: 'oily' },
        ],
      },
      sensitivity: {
        question: 'איך העור שלך מגיב למוצרים חדשים?',
        options: [
          { text: 'לעתים קרובות מגורה', value: 'sensitive' },
          { text: 'לפעמים מגיב', value: 'moderate' },
          { text: 'לעתים נדירות מגיב', value: 'resilient' },
        ],
      },
      concern: {
        question: 'מה הדאגה העיקרית שלך מהעור?',
        options: [
          { text: 'קמטים וקווים דקים', value: 'aging', icon: '⏰' },
          { text: 'אקנה ופצעים', value: 'acne', icon: '🔴' },
          { text: 'כתמים כהים', value: 'pigmentation', icon: '🌟' },
          { text: 'מרקם לא אחיד', value: 'texture', icon: '✨' },
          { text: 'נקבוביות גדולות', value: 'pores', icon: '🔍' },
          { text: 'יובש', value: 'dehydration', icon: '💧' },
        ],
      },
      age: {
        question: 'מהו טווח הגילאים שלך?',
        options: [
          { text: 'מתחת ל-25', value: 'under25' },
          { text: '25-35', value: '25-35' },
          { text: '35-45', value: '35-45' },
          { text: '45+', value: '45plus' },
        ],
      },
      sun: {
        question: 'כמה לעתים את חשופה לשמש?',
        options: [
          { text: 'יומיות, פעילויות חוצות', value: 'high' },
          { text: 'חשיפה מתונה', value: 'moderate' },
          { text: 'מינימלית, בעיקר בפנים', value: 'low' },
        ],
      },
    },
    results: {
      dry: {
        type: 'עור יבש',
        description: 'העור שלך זקוק ללחות אינטנסיבית.',
        treatments: ['HydraFacial', 'Skin Boosters', 'מזותרפיה', 'BioRePeel'],
        tips: ['השתמש במנקים עדינים', 'סרומים עם חומצה היאלורונית', 'טיפולי לחות חודשיים'],
      },
      normal: {
        type: 'עור נורמלי',
        description: 'בת מזל! התמקדי בתחזוקה.',
        treatments: ['HydraFacial', 'פילינג כימי', 'מיקרונידלינג', 'LED'],
        tips: ['שמרי על שגרה נוכחית', 'התמקדי במניעת הזדקנות', 'טיפולים חודשיים'],
      },
      combination: {
        type: 'עור מעורב',
        description: 'איזון הוא המפתח.',
        treatments: ['HydraFacial', 'פילינג כימי', 'דרמה-פלנינג', 'LED'],
        tips: ['מוצרים ללא שמן באזור T', 'לחות לאזורים יבשים', 'טיפולים מאזנים'],
      },
      oily: {
        type: 'עור שמן',
        description: 'שליטה בסבום מבלי לייבש.',
        treatments: ['פילינג כימי', 'מיקרונידלינג', 'HydraFacial', 'LED'],
        tips: ['מוצרים עם חומצה סליצילית', 'אל תדלגי על לחות', 'קילוף קבוע'],
      },
    },
    concerns: {
      aging: { title: 'מיקוד אנטי-אייג\'ינג', extra: ['בוטוקס', 'פילרים', 'Skin Boosters', 'RF'] },
      acne: { title: 'טיפול באקנה', extra: ['פילינג כימי', 'LED', 'ניקוי עור'] },
      pigmentation: { title: 'הבהרה', extra: ['פילינג כימי', 'לייזר', 'ויטמין C'] },
      texture: { title: 'שיפור מרקם', extra: ['מיקרונידלינג', 'דרמה-פלנינג', 'פילינג'] },
      pores: { title: 'צמצום נקבוביות', extra: ['HydraFacial', 'פילינג', 'LED'] },
      dehydration: { title: 'לחות', extra: ['HydraFacial', 'Skin Boosters', 'מזותרפיה'] },
    },
  },
  ar: {
    title: 'تحليل البشرة بالذكاء الاصطناعي',
    subtitle: 'اكتشفي نوع بشرتك واحصلي على توصيات مخصصة',
    startAnalysis: 'ابدأ التحليل',
    yourResults: 'ملف بشرتك',
    retake: 'أعد الاختبار',
    bookTreatment: 'احجزي العلاج',
    questions: {
      skinType: {
        question: 'كيف تشعر بشرتك بعد التنظيف؟',
        options: [
          { text: 'مشدودة وجافة', value: 'dry' },
          { text: 'مريحة، مرطبة قليلاً', value: 'normal' },
          { text: 'دهنية في منطقة T فقط', value: 'combination' },
          { text: 'دهنية في كل مكان', value: 'oily' },
        ],
      },
      sensitivity: {
        question: 'كيف تتفاعل بشرتك مع المنتجات الجديدة؟',
        options: [
          { text: 'غالباً ما تتهيج', value: 'sensitive' },
          { text: 'أحياناً تتفاعل', value: 'moderate' },
          { text: 'نادراً ما تتفاعل', value: 'resilient' },
        ],
      },
      concern: {
        question: 'ما هو هاجسك الرئيسي من البشرة؟',
        options: [
          { text: 'التجاعيد والخطوط الدقيقة', value: 'aging', icon: '⏰' },
          { text: 'حب الشباب', value: 'acne', icon: '🔴' },
          { text: 'البقع الداكنة', value: 'pigmentation', icon: '🌟' },
          { text: 'ملمس غير متساوٍ', value: 'texture', icon: '✨' },
          { text: 'مسام واسعة', value: 'pores', icon: '🔍' },
          { text: 'جفاف', value: 'dehydration', icon: '💧' },
        ],
      },
      age: {
        question: 'ما هو نطاق عمرك؟',
        options: [
          { text: 'أقل من 25', value: 'under25' },
          { text: '25-35', value: '25-35' },
          { text: '35-45', value: '35-45' },
          { text: '45+', value: '45plus' },
        ],
      },
      sun: {
        question: 'كم مرة تتعرضين للشمس؟',
        options: [
          { text: 'يومياً، أنشطة خارجية', value: 'high' },
          { text: 'تعرض معتدل', value: 'moderate' },
          { text: 'قليل، في الغالب بالداخل', value: 'low' },
        ],
      },
    },
    results: {
      dry: {
        type: 'بشرة جافة',
        description: 'بشرتك تحتاج ترطيب مكثف.',
        treatments: ['HydraFacial', 'Skin Boosters', 'الميزوثيرابي', 'BioRePeel'],
        tips: ['استخدمي منظفات لطيفة', 'سيروم حمض الهيالورونيك', 'علاجات ترطيب شهرية'],
      },
      normal: {
        type: 'بشرة طبيعية',
        description: 'محظوظة! ركزي على الصيانة.',
        treatments: ['HydraFacial', 'تقشير كيميائي', 'الميكرونيدلينج', 'LED'],
        tips: ['حافظي على روتينك الحالي', 'ركزي على منع الشيخوخة', 'علاجات شهرية'],
      },
      combination: {
        type: 'بشرة مختلطة',
        description: 'التوازن هو المفتاح.',
        treatments: ['HydraFacial', 'تقشير كيميائي', 'ديرمابلانينج', 'LED'],
        tips: ['منتجات خالية من الزيت لمنطقة T', 'رطبي المناطق الجافة', 'علاجات موازنة'],
      },
      oily: {
        type: 'بشرة دهنية',
        description: 'تحكمي في الدهون دون تجفيف.',
        treatments: ['تقشير كيميائي', 'الميكرونيدلينج', 'HydraFacial', 'LED'],
        tips: ['منتجات حمض الساليسيليك', 'لا تتركي المرطب', 'تقشير منتظم'],
      },
    },
    concerns: {
      aging: { title: 'مكافحة الشيخوخة', extra: ['البوتوكس', 'الفيلر', 'Skin Boosters', 'RF'] },
      acne: { title: 'علاج حب الشباب', extra: ['تقشير كيميائي', 'LED', 'تنظيف البشرة'] },
      pigmentation: { title: 'تفتيح', extra: ['تقشير كيميائي', 'ليزر', 'فيتامين C'] },
      texture: { title: 'تحسين الملمس', extra: ['الميكرونيدلينج', 'ديرمابلانينج', 'تقشير'] },
      pores: { title: 'تضييق المسام', extra: ['HydraFacial', 'تقشير', 'LED'] },
      dehydration: { title: 'ترطيب', extra: ['HydraFacial', 'Skin Boosters', 'الميزوثيرابي'] },
    },
  },
  tr: {
    title: 'AI Cilt Analizi',
    subtitle: 'Cilt tipinizi keşfedin ve kişiselleştirilmiş öneriler alın',
    startAnalysis: 'Analizi Başlat',
    yourResults: 'Cilt Profiliniz',
    retake: 'Tekrar Dene',
    bookTreatment: 'Tedavi Rezervasyonu',
    questions: {
      skinType: {
        question: 'Temizlikten sonra cildiniz nasıl hissediyor?',
        options: [
          { text: 'Gergin ve kuru', value: 'dry' },
          { text: 'Rahat, hafif nemli', value: 'normal' },
          { text: 'Sadece T bölgesinde yağlı', value: 'combination' },
          { text: 'Her yerde yağlı', value: 'oily' },
        ],
      },
      sensitivity: {
        question: 'Cildiniz yeni ürünlere nasıl tepki veriyor?',
        options: [
          { text: 'Sık sık tahriş olur', value: 'sensitive' },
          { text: 'Bazen tepki verir', value: 'moderate' },
          { text: 'Nadiren tepki verir', value: 'resilient' },
        ],
      },
      concern: {
        question: 'Ana cilt endişeniz nedir?',
        options: [
          { text: 'Kırışıklıklar', value: 'aging', icon: '⏰' },
          { text: 'Akne ve sivilceler', value: 'acne', icon: '🔴' },
          { text: 'Koyu lekeler', value: 'pigmentation', icon: '🌟' },
          { text: 'Düzgün olmayan doku', value: 'texture', icon: '✨' },
          { text: 'Geniş gözenekler', value: 'pores', icon: '🔍' },
          { text: 'Dehidrasyon', value: 'dehydration', icon: '💧' },
        ],
      },
      age: {
        question: 'Yaş aralığınız nedir?',
        options: [
          { text: '25 altı', value: 'under25' },
          { text: '25-35', value: '25-35' },
          { text: '35-45', value: '35-45' },
          { text: '45+', value: '45plus' },
        ],
      },
      sun: {
        question: 'Güneşe ne sıklıkla maruz kalıyorsunuz?',
        options: [
          { text: 'Günlük, açık hava aktiviteleri', value: 'high' },
          { text: 'Orta düzey maruziyet', value: 'moderate' },
          { text: 'Minimal, çoğunlukla kapalı', value: 'low' },
        ],
      },
    },
    results: {
      dry: {
        type: 'Kuru Cilt',
        description: 'Cildiniz yoğun nemlendirmeye ihtiyaç duyuyor.',
        treatments: ['HydraFacial', 'Skin Boosters', 'Mezoterapi', 'BioRePeel'],
        tips: ['Yumuşak temizleyiciler kullanın', 'Hiyaluronik asit serumları', 'Aylık nemlendirici tedaviler'],
      },
      normal: {
        type: 'Normal Cilt',
        description: 'Şanslısınız! Bakıma odaklanın.',
        treatments: ['HydraFacial', 'Kimyasal Peeling', 'Mikroigneleme', 'LED'],
        tips: ['Mevcut rutini koruyun', 'Yaşlanma önlemeye odaklanın', 'Aylık tedaviler'],
      },
      combination: {
        type: 'Karma Cilt',
        description: 'Denge anahtardır.',
        treatments: ['HydraFacial', 'Kimyasal Peeling', 'Dermaplaning', 'LED'],
        tips: ['T bölgesi için yağsız ürünler', 'Kuru bölgeleri nemlendirin', 'Dengeleyici tedaviler'],
      },
      oily: {
        type: 'Yağlı Cilt',
        description: 'Sebumu kontrol edin, kurutmadan.',
        treatments: ['Kimyasal Peeling', 'Mikroigneleme', 'HydraFacial', 'LED'],
        tips: ['Salisilik asit ürünleri', 'Nemlendirmeyi atlamayın', 'Düzenli peeling'],
      },
    },
    concerns: {
      aging: { title: 'Anti-Aging Odak', extra: ['Botox', 'Dolgular', 'Skin Boosters', 'RF'] },
      acne: { title: 'Akne Tedavisi', extra: ['Kimyasal Peeling', 'LED', 'Cilt Temizliği'] },
      pigmentation: { title: 'Aydınlatma', extra: ['Kimyasal Peeling', 'Lazer', 'C Vitamini'] },
      texture: { title: 'Doku İyileştirme', extra: ['Mikroigneleme', 'Dermaplaning', 'Peeling'] },
      pores: { title: 'Gözenek Sıkılaştırma', extra: ['HydraFacial', 'Peeling', 'LED'] },
      dehydration: { title: 'Nemlendirme', extra: ['HydraFacial', 'Skin Boosters', 'Mezoterapi'] },
    },
  },
};

export default function SkinAnalysis({ locale }: SkinAnalysisProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const t = translations[locale as keyof typeof translations] || translations.en;
  const questionKeys = Object.keys(t.questions);
  const currentKey = questionKeys[currentQuestion];
  const currentQ = t.questions[currentKey as keyof typeof t.questions];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentKey]: value });
    
    if (currentQuestion < questionKeys.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const getResult = () => {
    const skinType = answers.skinType as keyof typeof t.results;
    return t.results[skinType] || t.results.normal;
  };

  const getConcernResult = () => {
    const concern = answers.concern as keyof typeof t.concerns;
    return t.concerns[concern] || t.concerns.aging;
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="rounded-3xl border border-teal-200 overflow-hidden bg-gradient-to-br from-teal-50 to-white shadow-lg">
              <div className="flex flex-col lg:flex-row items-center">
                {/* Left Content */}
                <div className="flex-1 p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 border border-teal-200 mb-6">
                      <Sparkles size={14} className="text-teal-600" />
                      <span className="text-teal-700 text-sm font-medium">AI Powered</span>
                    </div>
                    
                    <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                      {t.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg mb-6 max-w-lg">
                      {t.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Droplets size={16} className="text-teal-500" />
                        <span className="text-sm">{locale === 'ru' ? '2 минуты' : locale === 'ka' ? '2 წუთი' : '2 minutes'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Shield size={16} className="text-teal-500" />
                        <span className="text-sm">{locale === 'ru' ? 'Персональные рекомендации' : locale === 'ka' ? 'პერსონალური რეკომენდაციები' : 'Personalized results'}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setIsOpen(true)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all"
                      style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(20, 184, 166, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t.startAnalysis}
                      <ArrowRight size={20} />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right Visual */}
                <div className="lg:w-96 p-8 flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                      className="w-48 h-48 rounded-full border border-emerald-500/20 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        className="w-40 h-40 rounded-full border border-emerald-500/30 flex items-center justify-center"
                      >
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
                          <Leaf size={48} className="text-emerald-400" />
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    >
                      <Droplets size={24} className="text-emerald-400" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    >
                      <Sun size={20} className="text-emerald-400" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-3xl overflow-hidden border border-teal-200 shadow-2xl"
              style={{ background: 'white' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-teal-100 flex items-center justify-between bg-gradient-to-r from-teal-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <Sparkles size={18} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-display text-lg font-bold">{t.title}</h3>
                    <p className="text-teal-600/70 text-xs">{locale === 'ru' ? `${currentQuestion + 1} из ${questionKeys.length}` : locale === 'ka' ? `${currentQuestion + 1} / ${questionKeys.length}` : `${currentQuestion + 1} of ${questionKeys.length}`}</p>
                  </div>
                </div>
                <button onClick={reset} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all">
                  <RefreshCw size={16} />
                </button>
              </div>

              {/* Progress Bar */}
              {!showResults && (
                <div className="h-1 bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questionKeys.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {!showResults ? (
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h4 className="text-gray-900 text-xl font-medium mb-6">{currentQ.question}</h4>
                      <div className="space-y-2">
                        {currentQ.options.map((option, i) => (
                          <motion.button
                            key={option.value}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handleAnswer(option.value)}
                            className="w-full px-4 py-4 rounded-xl text-left text-gray-700 bg-gray-50 border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all flex items-center justify-between group"
                          >
                            <span className="flex items-center gap-2">
                              {'icon' in option && <span>{option.icon}</span>}
                              {option.text}
                            </span>
                            <ArrowRight size={16} className="text-teal-500/0 group-hover:text-teal-500 transition-all" />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {/* Results */}
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                          <Check size={32} className="text-teal-600" />
                        </div>
                        <h4 className="text-teal-600 text-sm uppercase tracking-wider mb-2">{t.yourResults}</h4>
                        <h3 className="text-gray-900 text-2xl font-bold mb-2">{getResult().type}</h3>
                        <p className="text-gray-500">{getResult().description}</p>
                      </div>

                      {/* Recommended Treatments */}
                      <div className="mb-6">
                        <h5 className="text-gray-700 text-sm font-medium mb-3 flex items-center gap-2">
                          <Zap size={14} className="text-teal-500" />
                          {locale === 'ru' ? 'Рекомендуемые процедуры:' : locale === 'ka' ? 'რეკომენდებული პროცედურები:' : 'Recommended Treatments:'}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {getResult().treatments.map((treatment, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-sm border border-teal-200"
                            >
                              {treatment}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Extra for concern */}
                      <div className="mb-6">
                        <h5 className="text-gray-700 text-sm font-medium mb-3 flex items-center gap-2">
                          <Heart size={14} className="text-rose-500" />
                          {getConcernResult().title}:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {getConcernResult().extra.map((treatment, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-sm border border-rose-200"
                            >
                              {treatment}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                        <h5 className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                          {locale === 'ru' ? 'Советы по уходу:' : locale === 'ka' ? 'მოვლის რჩევები:' : 'Skincare Tips:'}
                        </h5>
                        <ul className="space-y-1">
                          {getResult().tips.map((tip, i) => (
                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                              <Check size={12} className="text-teal-500 mt-1 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {showResults && (
                <div className="px-6 py-4 border-t border-teal-100 flex justify-center gap-4 bg-gray-50">
                  <motion.button
                    onClick={reset}
                    className="px-6 py-3 rounded-xl text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.retake}
                  </motion.button>
                  <motion.button
                    onClick={() => window.open('https://wa.me/995599123456?text=' + encodeURIComponent(locale === 'ru' ? 'Здравствуйте! Хочу записаться на консультацию.' : 'Hello! I would like to book a consultation.'), '_blank')}
                    className="px-6 py-3 rounded-xl text-white font-medium"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.bookTreatment}
                  </motion.button>
                </div>
              )}

              {!showResults && currentQuestion > 0 && (
                <div className="px-6 py-4 border-t border-teal-100 bg-gray-50">
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-all"
                  >
                    <ArrowLeft size={16} />
                    {locale === 'ru' ? 'Назад' : locale === 'ka' ? 'უკან' : 'Back'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
