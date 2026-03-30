'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Shield, Leaf } from 'lucide-react';

// Product brands organized by category
const productBrands = {
  fillers: [
    {
      name: 'Juvederm',
      manufacturer: 'Allergan (USA)',
      origin: '🇺🇸 United States',
      description: 'World-leading hyaluronic acid fillers with Vycross technology for natural, long-lasting results',
      popular: true,
      logo: 'Juvederm',
    },
    {
      name: 'Restylane',
      manufacturer: 'Galderma (Switzerland)',
      origin: '🇨🇭 Switzerland',
      description: 'Pioneering HA fillers with NASHA technology for precise facial contouring',
      popular: true,
      logo: 'Restylane',
    },
    {
      name: 'Stylage',
      manufacturer: 'Vivacy (France)',
      origin: '🇫🇷 France',
      description: 'French excellence in dermal fillers with IPN-Like technology',
      popular: false,
      logo: 'Stylage',
    },
    {
      name: 'Teosyal',
      manufacturer: 'Teoxane (Switzerland)',
      origin: '🇨🇭 Switzerland',
      description: 'Premium Swiss dermal fillers known for purity and safety',
      popular: false,
      logo: 'Teosyal',
    },
  ],
  botox: [
    {
      name: 'Botox®',
      manufacturer: 'Allergan (USA)',
      origin: '🇺🇸 United States',
      description: 'The original and most trusted botulinum toxin type A worldwide',
      popular: true,
      logo: 'Botox',
    },
    {
      name: 'Dysport',
      manufacturer: 'Galderma (Switzerland)',
      origin: '🇨🇭 Switzerland',
      description: 'Fast-acting botulinum toxin for natural facial rejuvenation',
      popular: false,
      logo: 'Dysport',
    },
    {
      name: 'Xeomin',
      manufacturer: 'Merz (Germany)',
      origin: '🇩🇪 Germany',
      description: 'Pure botulinum toxin without complexing proteins',
      popular: false,
      logo: 'Xeomin',
    },
  ],
  skincare: [
    {
      name: 'HydraFacial',
      manufacturer: 'Edge Systems (USA)',
      origin: '🇺🇸 United States',
      description: 'Medical-grade hydradermabrasion system for deep cleansing and hydration',
      popular: true,
      logo: 'HydraFacial',
    },
    {
      name: 'BioRePeel',
      manufacturer: 'CMC Beauty (Italy)',
      origin: '🇮🇹 Italy',
      description: 'Italian bio-stimulating peel for skin rejuvenation without downtime',
      popular: false,
      logo: 'BioRePeel',
    },
    {
      name: 'Mesoestetic',
      manufacturer: 'Mesoestetic (Spain)',
      origin: '🇪🇸 Spain',
      description: 'Professional medical skincare solutions from Spain',
      popular: false,
      logo: 'Mesoestetic',
    },
  ],
  lashes: [
    {
      name: 'Borboleta',
      manufacturer: 'Borboleta Beauty (USA)',
      origin: '🇺🇸 United States',
      description: 'Premium lash extension adhesives and products',
      popular: true,
      logo: 'Borboleta',
    },
    {
      name: 'Lash Perfect',
      manufacturer: 'Lash Perfect (UK)',
      origin: '🇬🇧 United Kingdom',
      description: 'Professional lash products for flawless extensions',
      popular: false,
      logo: 'Lash Perfect',
    },
  ],
  hair: [
    {
      name: 'Kerastase',
      manufacturer: "L'Oréal (France)",
      origin: '🇫🇷 France',
      description: 'Luxury professional haircare for all hair types',
      popular: true,
      logo: 'Kerastase',
    },
    {
      name: 'Olaplex',
      manufacturer: 'Olaplex (USA)',
      origin: '🇺🇸 United States',
      description: 'Bond-building technology for damaged hair repair',
      popular: true,
      logo: 'Olaplex',
    },
    {
      name: 'Schwarzkopf',
      manufacturer: 'Henkel (Germany)',
      origin: '🇩🇪 Germany',
      description: 'Professional hair color and care products',
      popular: false,
      logo: 'Schwarzkopf',
    },
  ],
  nails: [
    {
      name: 'OPI',
      manufacturer: 'OPI (USA)',
      origin: '🇺🇸 United States',
      description: 'World-famous nail lacquers and treatments',
      popular: true,
      logo: 'OPI',
    },
    {
      name: 'CND Shellac',
      manufacturer: 'CND (USA)',
      origin: '🇺🇸 United States',
      description: 'Original power polish for 14+ day wear',
      popular: false,
      logo: 'CND',
    },
  ],
};

interface BrandCardProps {
  brand: typeof productBrands.fillers[0];
  index: number;
}

function BrandCard({ brand, index }: BrandCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative p-4 rounded-2xl border border-stone-800 hover:border-amber-400/30 transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      {/* Popular Badge */}
      {brand.popular && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-stone-900" style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}>
          Popular
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Logo Placeholder */}
        <div className="w-16 h-16 rounded-xl bg-stone-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-700/50 transition-colors">
          <span className="text-stone-400 font-display font-bold text-xs text-center leading-tight">
            {brand.logo}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm">{brand.name}</h4>
          <p className="text-amber-400/70 text-xs mb-1">{brand.manufacturer}</p>
          <p className="text-stone-500 text-xs mb-2">{brand.origin}</p>
          <p className="text-stone-400 text-xs leading-relaxed line-clamp-2">{brand.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface ProductBrandsProps {
  locale: string;
}

const translations = {
  en: {
    title: 'Premium Products',
    subtitle: 'We use only FDA-approved, CE-certified products from world-leading manufacturers',
    fillers: 'Dermal Fillers',
    botox: 'Botulinum Toxin',
    skincare: 'Medical Skincare',
    lashes: 'Lash Products',
    hair: 'Hair Care',
    nails: 'Nail Products',
    guarantee: 'Our Guarantee',
    guaranteeText: 'All products are authentic, imported through official channels, and stored according to manufacturer specifications.',
    certified: 'CE Certified',
    fda: 'FDA Approved',
    cruelty: 'Cruelty-Free',
    safety: 'Safety Tested',
  },
  ru: {
    title: 'Премиум продукты',
    subtitle: 'Мы используем только сертифицированные продукты от ведущих мировых производителей',
    fillers: 'Дермальные филлеры',
    botox: 'Ботулотоксин',
    skincare: 'Медицинский уход',
    lashes: 'Продукты для ресниц',
    hair: 'Уход за волосами',
    nails: 'Продукты для ногтей',
    guarantee: 'Наша гарантия',
    guaranteeText: 'Все продукты оригинальные, импортированы через официальные каналы.',
    certified: 'CE Сертификат',
    fda: 'FDA Одобрено',
    cruelty: 'Без тестов на животных',
    safety: 'Проверено на безопасность',
  },
  ka: {
    title: 'პრემიუმ პროდუქტები',
    subtitle: 'ჩვენ ვიყენებთ მხოლოდ სერტიფიცირებულ პროდუქტებს მსოფლიოს წამყვანი მწარმოებლებისგან',
    fillers: 'დერმალური შემვსებები',
    botox: 'ბოტულოტოქსინი',
    skincare: 'სამედიცინო მოვლა',
    lashes: 'წამწამების პროდუქტები',
    hair: 'თმის მოვლა',
    nails: 'ფრჩხილის პროდუქტები',
    guarantee: 'ჩვენი გარანტია',
    guaranteeText: 'ყველა პროდუქტი ორიგინალურია, იმპორტირებულია ოფიციალური არხებით.',
    certified: 'CE სერტიფიკატი',
    fda: 'FDA დამტკიცებული',
    cruelty: 'ცხოველებზე გამოუცდელი',
    safety: 'უსაფრთხოების ტესტირებული',
  },
  he: {
    title: 'מוצרים פרימיום',
    subtitle: 'אנו משתמשים רק במוצרים מאושרים מיצרנים מובילים',
    fillers: 'מילוי עור',
    botox: 'בוטולינום טוקסין',
    skincare: 'טיפוח רפואי',
    lashes: 'מוצרי ריסים',
    hair: 'טיפוח שיער',
    nails: 'מוצרי ציפורניים',
    guarantee: 'האחריות שלנו',
    guaranteeText: 'כל המוצרים מקוריים, מיובאים דרך ערוצים רשמיים.',
    certified: 'מאושר CE',
    fda: 'מאושר FDA',
    cruelty: 'ללא ניסויים בבעלי חיים',
    safety: 'נבדק לבטיחות',
  },
  ar: {
    title: 'منتجات مميزة',
    subtitle: 'نستخدم فقط المنتجات المعتمدة من الشركات المصنعة الرائدة عالمياً',
    fillers: 'حشوات الجلد',
    botox: 'البوتولينوم توكسين',
    skincare: 'العناية الطبية',
    lashes: 'منتجات الرموش',
    hair: 'العناية بالشعر',
    nails: 'منتجات الأظافر',
    guarantee: 'ضماننا',
    guaranteeText: 'جميع المنتجات أصلية ومستوردة عبر قنوات رسمية.',
    certified: 'معتمد CE',
    fda: 'معتمد FDA',
    cruelty: 'خالي من التجارب',
    safety: 'مختبر السلامة',
  },
  tr: {
    title: 'Premium Ürünler',
    subtitle: 'Dünyanın önde gelen üreticilerinden sadece onaylı ürünler kullanıyoruz',
    fillers: 'Dermal Dolgular',
    botox: 'Botulinum Toksin',
    skincare: 'Tıbbi Cilt Bakımı',
    lashes: 'Kirpik Ürünleri',
    hair: 'Saç Bakımı',
    nails: 'Tırnak Ürünleri',
    guarantee: 'Garantimiz',
    guaranteeText: 'Tüm ürünler orijinal ve resmi kanallardan ithal edilmiştir.',
    certified: 'CE Onaylı',
    fda: 'FDA Onaylı',
    cruelty: 'Hayvan Deneyi Yok',
    safety: 'Güvenlik Testi',
  },
};

export default function ProductBrands({ locale }: ProductBrandsProps) {
  const t = translations[locale as keyof typeof translations] || translations.en;

  const categories = [
    { id: 'fillers', title: t.fillers, brands: productBrands.fillers },
    { id: 'botox', title: t.botox, brands: productBrands.botox },
    { id: 'skincare', title: t.skincare, brands: productBrands.skincare },
    { id: 'lashes', title: t.lashes, brands: productBrands.lashes },
    { id: 'hair', title: t.hair, brands: productBrands.hair },
    { id: 'nails', title: t.nails, brands: productBrands.nails },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-4">
            {locale === 'en' ? 'Quality Assured' : locale === 'ru' ? 'Гарантия качества' : locale === 'ka' ? 'ხარისხის გარანტია' : locale === 'he' ? 'איכות מובטחת' : locale === 'ar' ? 'جودة مضمونة' : 'Kalite Garantisi'}
          </p>
          <h2 className="font-display font-bold mb-4" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t.title}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-white font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-amber-400" />
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.brands.map((brand, index) => (
                  <BrandCard key={brand.name} brand={brand} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-amber-400/20"
          style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.05), rgba(160,120,64,0.02))' }}
        >
          <h3 className="text-white font-display text-xl font-bold mb-4 text-center">{t.guarantee}</h3>
          <p className="text-stone-400 text-center mb-8 max-w-2xl mx-auto">{t.guaranteeText}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: t.certified },
              { icon: CheckCircle, label: t.fda },
              { icon: Leaf, label: t.cruelty },
              { icon: Award, label: t.safety },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-stone-800/20">
                <item.icon size={24} className="text-amber-400" />
                <span className="text-stone-300 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
