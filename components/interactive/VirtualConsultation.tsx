'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Upload, X, ChevronRight, Check, Clock, 
  Sparkles, MessageCircle, Phone, ArrowRight, Loader2 
} from 'lucide-react';

interface VirtualConsultationProps {
  locale: string;
}

const translations = {
  en: {
    title: 'Virtual Consultation',
    subtitle: 'Get expert advice from Dr. Nana before your visit',
    step1Title: 'Your Concerns',
    step2Title: 'Upload Photos',
    step3Title: 'Contact Info',
    step4Title: 'Confirmation',
    concerns: ['Fine lines & wrinkles', 'Volume loss', 'Lip enhancement', 'Under-eye circles', 'Jawline definition', 'Skin texture', 'Acne scarring', 'Other'],
    photoHint: 'Upload a clear front-facing photo. Your images are confidential and only viewed by Dr. Nana.',
    nameLabel: 'Your Name',
    phoneLabel: 'WhatsApp Number',
    emailLabel: 'Email (optional)',
    messageLabel: 'Additional message (optional)',
    submit: 'Request Consultation',
    success: 'Consultation Request Sent!',
    successMessage: 'Dr. Nana will review your photos and contact you within 24 hours via WhatsApp.',
    responseTime: 'Response within 24 hours',
    free: 'FREE',
    privacy: 'Your photos are 100% confidential',
    selectConcerns: 'Select your primary concerns (choose up to 3)',
    uploadPhoto: 'Upload Your Photo',
    dragDrop: 'Drag & drop or click to upload',
    formats: 'JPG, PNG up to 5MB',
  },
  ru: {
    title: 'Виртуальная консультация',
    subtitle: 'Получите совет от доктора Наны до визита',
    step1Title: 'Ваши проблемы',
    step2Title: 'Загрузить фото',
    step3Title: 'Контакты',
    step4Title: 'Подтверждение',
    concerns: ['Морщины', 'Потеря объема', 'Увеличение губ', 'Темные круги', 'Овал лица', 'Текстура кожи', 'Шрамы от акне', 'Другое'],
    photoHint: 'Загрузите четкое фото анфас. Ваши фото конфиденциальны.',
    nameLabel: 'Ваше имя',
    phoneLabel: 'WhatsApp номер',
    emailLabel: 'Email (необязательно)',
    messageLabel: 'Сообщение (необязательно)',
    submit: 'Запросить консультацию',
    success: 'Запрос отправлен!',
    successMessage: 'Доктор Нана свяжется с вами в течение 24 часов.',
    responseTime: 'Ответ в течение 24 часов',
    free: 'БЕСПЛАТНО',
    privacy: 'Ваши фото 100% конфиденциальны',
    selectConcerns: 'Выберите основные проблемы (до 3)',
    uploadPhoto: 'Загрузите фото',
    dragDrop: 'Перетащите или нажмите для загрузки',
    formats: 'JPG, PNG до 5MB',
  },
  ka: {
    title: 'ვირტუალური კონსულტაცია',
    subtitle: 'მიიღეთ ექსპერტის რჩევა ვიზიტამდე',
    step1Title: 'თქვენი პრობლემები',
    step2Title: 'ატვირთეთ ფოტო',
    step3Title: 'კონტაქტი',
    step4Title: 'დადასტურება',
    concerns: ['ნაოჭები', 'მოცულობის დაკარგვა', 'ტუჩების გაზრდა', 'თვალის ქვეშ წრეები', 'სახის ოვალი', 'კანის ტექსტურა', 'აკნეს ნაკვთები', 'სხვა'],
    photoHint: 'ატვირთეთ მკაფიო ფოტო.',
    nameLabel: 'თქვენი სახელი',
    phoneLabel: 'WhatsApp ნომერი',
    emailLabel: 'Email (არასავალდებულო)',
    messageLabel: 'შეტყობინება (არასავალდებულო)',
    submit: 'მოითხოვეთ კონსულტაცია',
    success: 'მოთხოვნა გაგზავნილია!',
    successMessage: 'დოქტორი ნანა დაგიკავშირდება 24 საათში.',
    responseTime: 'პასუხი 24 საათში',
    free: 'უფასო',
    privacy: 'ფოტოები 100% კონფიდენციალურია',
    selectConcerns: 'აირჩიეთ ძირითადი პრობლემები (მაქს 3)',
    uploadPhoto: 'ატვირთეთ ფოტო',
    dragDrop: 'გადაათრიეთ ან დააჭირეთ',
    formats: 'JPG, PNG 5MB-მდე',
  },
  he: {
    title: 'ייעוץ וירטואלי',
    subtitle: 'קבלי ייעוץ מד"ר ננה לפני הביקור',
    step1Title: 'החששות שלך',
    step2Title: 'העלאת תמונה',
    step3Title: 'פרטי קשר',
    step4Title: 'אישור',
    concerns: ['קמטים', 'אובדן נפח', 'הגדלת שפתיים', 'כהות תחת העיניים', 'הגדרת לסת', 'מרקם עור', 'צלקות אקנה', 'אחר'],
    photoHint: 'העלי תמונה ברורה.',
    nameLabel: 'שם',
    phoneLabel: 'מספר WhatsApp',
    emailLabel: 'אימייל (אופציונלי)',
    messageLabel: 'הודעה (אופציונלי)',
    submit: 'בקשי ייעוץ',
    success: 'הבקשה נשלחה!',
    successMessage: 'ד"ר ננה תיצור איתך קשר תוך 24 שעות.',
    responseTime: 'מענה תוך 24 שעות',
    free: 'חינם',
    privacy: 'התמונות שלך 100% חסויות',
    selectConcerns: 'בחרי את החששות העיקריים (עד 3)',
    uploadPhoto: 'העלי תמונה',
    dragDrop: 'גררי או לחצי להעלאה',
    formats: 'JPG, PNG עד 5MB',
  },
  ar: {
    title: 'استشارة افتراضية',
    subtitle: 'احصلي على نصيحة الخبيرة قبل زيارتك',
    step1Title: 'اهتماماتك',
    step2Title: 'رفع صورة',
    step3Title: 'معلومات الاتصال',
    step4Title: 'التأكيد',
    concerns: ['تجاعيد', 'فقدان الحجم', 'تكبير الشفاه', 'الهالات السوداء', 'تحديد الفك', 'ملمس البشرة', 'ندبات حب الشباب', 'أخرى'],
    photoHint: 'ارفعي صورة واضحة.',
    nameLabel: 'الاسم',
    phoneLabel: 'رقم واتساب',
    emailLabel: 'البريد (اختياري)',
    messageLabel: 'رسالة (اختياري)',
    submit: 'طلب استشارة',
    success: 'تم إرسال الطلب!',
    successMessage: 'ستتواصل معك الدكتورة نانا خلال 24 ساعة.',
    responseTime: 'رد خلال 24 ساعة',
    free: 'مجاني',
    privacy: 'صورك 100% سرية',
    selectConcerns: 'اختاري اهتماماتك (حتى 3)',
    uploadPhoto: 'ارفعي صورتك',
    dragDrop: 'اسحبي أو اضغطي للرفع',
    formats: 'JPG, PNG حتى 5MB',
  },
  tr: {
    title: 'Sanal Danışmanlık',
    subtitle: 'Ziyaretinizden önce Dr. Nana\'dan uzman tavsiyesi alın',
    step1Title: 'Endişeleriniz',
    step2Title: 'Fotoğraf Yükle',
    step3Title: 'İletişim',
    step4Title: 'Onay',
    concerns: ['Kırışıklıklar', 'Hacim kaybı', 'Dudak dolgusu', 'Göz altı torbaları', 'Çene hattı', 'Cilt dokusu', 'Akne izleri', 'Diğer'],
    photoHint: 'Net bir ön yüz fotoğrafı yükleyin.',
    nameLabel: 'Adınız',
    phoneLabel: 'WhatsApp Numarası',
    emailLabel: 'Email (isteğe bağlı)',
    messageLabel: 'Mesaj (isteğe bağlı)',
    submit: 'Danışmanlık İste',
    success: 'İstek Gönderildi!',
    successMessage: 'Dr. Nana 24 saat içinde sizinle iletişime geçecek.',
    responseTime: '24 saat içinde yanıt',
    free: 'ÜCRETSİZ',
    privacy: 'Fotoğraflarınız %100 gizlidir',
    selectConcerns: 'Ana endişelerinizi seçin (en fazla 3)',
    uploadPhoto: 'Fotoğrafınızı Yükleyin',
    dragDrop: 'Sürükle bırak veya tıkla',
    formats: 'JPG, PNG maks 5MB',
  },
};

export default function VirtualConsultation({ locale }: VirtualConsultationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const t = translations[locale as keyof typeof translations] || translations.en;

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concern));
    } else if (selectedConcerns.length < 3) {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setStep(4);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedConcerns([]);
    setPhotoPreview(null);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setIsSuccess(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="rounded-3xl border border-amber-200/50 overflow-hidden bg-gradient-to-br from-white to-amber-50/30 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center">
                {/* Left Content */}
                <div className="flex-1 p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
                      <Sparkles size={14} className="text-amber-500" />
                      <span className="text-amber-600 text-sm font-medium">{t.free}</span>
                    </div>
                    
                    <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                      {t.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg mb-6 max-w-lg">
                      {t.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={16} className="text-amber-400" />
                        <span className="text-sm">{t.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Camera size={16} className="text-amber-400" />
                        <span className="text-sm">{t.privacy}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setIsOpen(true)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-stone-900 font-semibold text-lg transition-all"
                      style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(201, 169, 110, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t.submit}
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
                      className="w-48 h-48 rounded-full border border-amber-500/20 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        className="w-40 h-40 rounded-full border border-amber-500/30 flex items-center justify-center"
                      >
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                          <Camera size={48} className="text-amber-400" />
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Floating elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center"
                    >
                      <Sparkles size={24} className="text-amber-400" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center"
                    >
                      <Check size={20} className="text-amber-400" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-3xl overflow-hidden border border-amber-500/20"
              style={{ background: 'linear-gradient(180deg, #1a0a10 0%, #0d0608 100%)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-amber-500/10 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.15), rgba(160, 120, 64, 0.1))' }}>
                <div>
                  <h3 className="text-white font-display text-xl font-bold">{t.title}</h3>
                  <p className="text-amber-400/60 text-sm">{t.free}</p>
                </div>
                <button onClick={resetForm} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-4 border-b border-amber-500/10">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        s <= step ? 'text-white' : 'bg-stone-800 text-stone-500'
                      }`} style={s <= step ? { background: 'linear-gradient(135deg, #C9A96E, #a07840)' } : {}}>
                        {s < step ? <Check size={14} /> : s}
                      </div>
                      {s < 3 && (
                        <div className={`w-16 h-0.5 mx-2 transition-all ${s < step ? 'bg-amber-500' : 'bg-stone-800'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-stone-500">{t.step1Title}</span>
                  <span className="text-xs text-stone-500">{t.step2Title}</span>
                  <span className="text-xs text-stone-500">{t.step3Title}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Concerns */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-stone-400 text-sm mb-4">{t.selectConcerns}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {t.concerns.map((concern) => (
                          <button
                            key={concern}
                            onClick={() => toggleConcern(concern)}
                            className={`px-4 py-3 rounded-xl text-sm text-left transition-all ${
                              selectedConcerns.includes(concern)
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                                : 'bg-stone-800/50 border-stone-700/50 text-stone-400 hover:border-amber-500/30'
                            } border`}
                          >
                            {selectedConcerns.includes(concern) && <Check size={12} className="inline mr-2" />}
                            {concern}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Photo Upload */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-stone-400 text-sm mb-4">{t.photoHint}</p>
                      
                      {!photoPreview ? (
                        <label className="block border-2 border-dashed border-amber-500/30 rounded-2xl p-8 text-center cursor-pointer hover:border-amber-500/50 transition-all">
                          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                          <Camera size={40} className="mx-auto text-amber-400/50 mb-4" />
                          <p className="text-stone-300 mb-2">{t.dragDrop}</p>
                          <p className="text-stone-500 text-xs">{t.formats}</p>
                        </label>
                      ) : (
                        <div className="relative">
                          <img src={photoPreview} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />
                          <button
                            onClick={() => setPhotoPreview(null)}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-stone-400 text-sm mb-2 block">{t.nameLabel}</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-stone-400 text-sm mb-2 block">{t.phoneLabel}</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+995 5XX XXX XXX"
                          className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-stone-400 text-sm mb-2 block">{t.emailLabel}</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-stone-400 text-sm mb-2 block">{t.messageLabel}</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                          className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {step === 4 && isSuccess && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}
                      >
                        <Check size={36} className="text-white" />
                      </motion.div>
                      <h4 className="text-white text-2xl font-bold mb-2">{t.success}</h4>
                      <p className="text-stone-400 mb-6">{t.successMessage}</p>
                      <div className="flex items-center justify-center gap-2 text-pink-400">
                        <MessageCircle size={16} />
                        <span className="text-sm">WhatsApp: +995 599 123 456</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {step < 4 && (
                <div className="px-6 py-4 border-t border-amber-500/10 flex justify-between">
                  <button
                    onClick={() => step > 1 ? setStep(step - 1) : setIsOpen(false)}
                    className="px-6 py-2 rounded-xl text-stone-400 hover:text-white transition-all"
                  >
                    {step === 1 ? (locale === 'ru' ? 'Отмена' : locale === 'ka' ? 'გაუქმება' : locale === 'he' ? 'ביטול' : locale === 'ar' ? 'إلغاء' : locale === 'tr' ? 'İptal' : 'Cancel') : (locale === 'ru' ? 'Назад' : locale === 'ka' ? 'უკან' : locale === 'he' ? 'חזרה' : locale === 'ar' ? 'رجوع' : locale === 'tr' ? 'Geri' : 'Back')}
                  </button>
                  
                  {step < 3 ? (
                    <motion.button
                      onClick={() => setStep(step + 1)}
                      disabled={step === 1 && selectedConcerns.length === 0}
                      className="px-6 py-2 rounded-xl text-stone-900 font-medium flex items-center gap-2 disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {locale === 'ru' ? 'Далее' : locale === 'ka' ? 'შემდეგ' : locale === 'he' ? 'הבא' : locale === 'ar' ? 'التالي' : locale === 'tr' ? 'İleri' : 'Next'}
                      <ChevronRight size={16} />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.name || !formData.phone}
                      className="px-6 py-2 rounded-xl text-stone-900 font-medium flex items-center gap-2 disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : t.submit}
                    </motion.button>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="px-6 py-4 border-t border-amber-500/10 flex justify-center">
                  <motion.button
                    onClick={resetForm}
                    className="px-8 py-2 rounded-xl text-stone-900 font-medium"
                    style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {locale === 'ru' ? 'Закрыть' : locale === 'ka' ? 'დახურვა' : locale === 'he' ? 'סגור' : locale === 'ar' ? 'إغلاق' : locale === 'tr' ? 'Kapat' : 'Close'}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
