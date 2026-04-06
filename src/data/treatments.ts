import { getMessages } from 'next-intl/server';

export interface Treatment {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  price?: string;
  duration?: string;
  benefits?: string[];
  howItWorks?: string;
  aftercare?: string;
  faqs?: { question: string; answer: string }[];
}

export interface TreatmentCategory {
  name: string;
  slug: string;
  description: string;
  image: string;
  treatments: Treatment[];
}

// Base treatment data
const baseTreatmentCategories: TreatmentCategory[] = [
  {
    name: "Botox, Fillers & Facial Dermatology",
    slug: "botox-fillers-facial-dermatology",
    description: "Advanced aesthetic treatments including anti-wrinkle injections, dermal fillers, and professional facial treatments for radiant, youthful skin.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    treatments: [
      {
        name: "Anti-Wrinkle Injections",
        slug: "anti-wrinkle-injections",
        description: "Anti-wrinkle injections using botulinum toxin to smooth fine lines and wrinkles. This popular treatment targets forehead lines, crow's feet, and frown lines, providing natural-looking results that last 3-6 months.",
        shortDescription: "Smooth away wrinkles and fine lines for a refreshed, youthful appearance.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾150",
        duration: "30 minutes",
        benefits: [
          "Reduces fine lines and wrinkles",
          "Prevents new wrinkles from forming",
          "Quick treatment with minimal downtime",
          "Natural-looking results",
          "Long-lasting effects (3-6 months)"
        ],
        howItWorks: "Botulinum toxin is injected into specific facial muscles using a fine needle. The toxin blocks nerve signals to these muscles, preventing them from contracting and creating wrinkles.",
        aftercare: "Avoid lying down for 4 hours, avoid exercise for 24 hours, and avoid rubbing the treated area."
      },
      {
        name: "Lip Fillers",
        slug: "lip-fillers",
        description: "Lip fillers using premium hyaluronic acid to enhance lip volume, shape, and definition. Whether you want subtle enhancement or more dramatic results, our expert practitioners create natural-looking, beautiful lips.",
        shortDescription: "Enhance lip volume and shape for beautiful, natural-looking results.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾200",
        duration: "45 minutes",
        benefits: [
          "Adds volume and definition",
          "Creates natural-looking enhancement",
          "Improves lip symmetry",
          "Hydrates and smooths lip texture",
          "Results last 6-12 months"
        ],
        howItWorks: "Hyaluronic acid filler is carefully injected into specific areas of the lips using a fine needle or cannula.",
        aftercare: "Apply ice to reduce swelling. Avoid strenuous exercise for 24 hours."
      },
      {
        name: "Cheek Fillers",
        slug: "cheek-fillers",
        description: "Cheek fillers restore volume to the mid-face, create beautiful cheekbone definition, and lift sagging skin. As we age, we lose volume in our cheeks - this treatment restores youthful contours.",
        shortDescription: "Restore volume and define cheekbones for a youthful, lifted appearance.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾250",
        duration: "45 minutes",
        benefits: [
          "Restores lost volume in cheeks",
          "Defines and enhances cheekbones",
          "Lifts mid-face area",
          "Results last 12-18 months"
        ],
        howItWorks: "Hyaluronic acid filler is injected deep into the cheek area to provide structural support and volume.",
        aftercare: "Avoid touching the treated area for 24 hours. Sleep on your back for the first few nights."
      },
      {
        name: "Facial Dermatology",
        slug: "facial-dermatology",
        description: "Professional facial treatments including chemical peels, skin analysis, and customized skincare protocols. Our medical-grade facials address various skin concerns from acne to aging.",
        shortDescription: "Professional skin treatments for a clear, radiant complexion.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾100",
        duration: "60 minutes",
        benefits: [
          "Deep cleansing and exfoliation",
          "Addresses specific skin concerns",
          "Professional-grade products",
          "Customized treatment plans"
        ],
        howItWorks: "Each treatment begins with a skin analysis, followed by customized protocols for your specific needs.",
        aftercare: "Follow the personalized skincare routine recommended by your practitioner."
      },
      {
        name: "Masseter Botox",
        slug: "masseter-botox",
        description: "Masseter Botox targets the jaw muscles to slim the face and relieve teeth grinding. This treatment creates a more oval or V-shaped facial contour while treating bruxism.",
        shortDescription: "Slim the jawline and relieve teeth grinding with targeted Botox treatment.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾200",
        duration: "30 minutes",
        benefits: [
          "Slims and contours the lower face",
          "Reduces jaw tension and pain",
          "Treats teeth grinding (bruxism)",
          "Non-surgical facial contouring"
        ],
        howItWorks: "Botox is injected into the masseter muscles on both sides of the jaw, causing them to reduce in size over time.",
        aftercare: "Avoid lying down for 4 hours. Full results develop over 4-6 weeks."
      },
      {
        name: "Hyperhidrosis Treatment",
        slug: "hyperhidrosis",
        description: "Botox treatment for excessive sweating is highly effective for underarms, palms, and feet. Results can last 6-12 months, significantly improving quality of life.",
        shortDescription: "Effectively treat excessive sweating with long-lasting results.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾300",
        duration: "45 minutes",
        benefits: [
          "Dramatically reduces excessive sweating",
          "Results last 6-12 months",
          "Quick and minimally invasive",
          "Improves confidence"
        ],
        howItWorks: "Multiple small injections of Botox block the chemical signals that stimulate sweat glands.",
        aftercare: "Avoid exercise and hot environments for 24 hours."
      },
      {
        name: "Skin Boosters",
        slug: "skin-boosters",
        description: "Skin boosters provide deep hydration from within, improving skin quality, texture, and radiance. Perfect for face, neck, and hands.",
        shortDescription: "Deep hydration for glowing, radiant skin.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾180",
        duration: "30 minutes",
        benefits: [
          "Deep hydration from within",
          "Improved skin texture",
          "Natural radiance",
          "Results last 6-9 months"
        ],
        howItWorks: "Micro-injections of hyaluronic acid deliver deep hydration throughout the skin.",
        aftercare: "Avoid makeup for 24 hours. Stay hydrated."
      }
    ]
  },
  {
    name: "Hair Procedures & Extensions",
    slug: "hair-procedures-extensions",
    description: "Complete hair services from premium hair extensions to coloring, styling, and specialized treatments for healthy, beautiful hair.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    treatments: [
      {
        name: "Hair Extensions",
        slug: "hair-extensions",
        description: "Premium quality hair extensions including tape-in, keratin bond, and clip-in methods. Add length, volume, and versatility to your natural hair with seamless results.",
        shortDescription: "Add length and volume with premium quality hair extensions.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        price: "From ₾300",
        duration: "2-3 hours",
        benefits: [
          "Instant length and volume",
          "Premium quality 100% human hair",
          "Various application methods",
          "Natural-looking results"
        ],
        howItWorks: "Extensions are carefully matched to your hair color and texture, then applied using your preferred method.",
        aftercare: "Use extension-safe products. Brush gently and avoid excessive heat."
      },
      {
        name: "Hair Coloring",
        slug: "hair-coloring",
        description: "Professional hair coloring services including full color, highlights, balayage, and ombre. Our expert colorists create beautiful, customized results.",
        shortDescription: "Beautiful hair color from subtle to dramatic.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        price: "From ₾80",
        duration: "1-2 hours",
        benefits: [
          "Custom color formulation",
          "Premium quality products",
          "Trendy techniques",
          "Long-lasting results"
        ],
        howItWorks: "Color is custom-mixed and applied using techniques suited to your desired result.",
        aftercare: "Use color-safe shampoo. Avoid washing for 48 hours after treatment."
      },
      {
        name: "Hair Styling",
        slug: "hair-styling",
        description: "Professional hair styling for any occasion. From everyday blowouts to elegant updos for special events, our stylists create the perfect look.",
        shortDescription: "Beautiful styles for every occasion.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        price: "From ₾50",
        duration: "45 minutes",
        benefits: [
          "Professional techniques",
          "Long-lasting styles",
          "Special occasion expertise",
          "Product recommendations"
        ],
        howItWorks: "Your stylist will discuss your desired look and create a style that suits your features and occasion.",
        aftercare: "Use recommended products to maintain your style."
      },
      {
        name: "Hair Treatments",
        slug: "hair-treatments",
        description: "Deep conditioning, repair treatments, and scalp therapies to restore health and vitality to your hair. Perfect for damaged or stressed hair.",
        shortDescription: "Restore health and vitality to your hair.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        price: "From ₾70",
        duration: "30 minutes",
        benefits: [
          "Deep hydration",
          "Damage repair",
          "Scalp health",
          "Improved texture"
        ],
        howItWorks: "Intensive treatments are applied and left to penetrate deeply into the hair shaft.",
        aftercare: "Use recommended home care products for best results."
      },
      {
        name: "Keratin Treatment",
        slug: "keratin-treatment",
        description: "Professional keratin smoothing treatment eliminates frizz and adds shine for months. Enjoy smooth, manageable hair with minimal styling time.",
        shortDescription: "Smooth, frizz-free hair for months.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        price: "From ₾200",
        duration: "2 hours",
        benefits: [
          "Eliminates frizz",
          "Adds shine",
          "Reduces styling time",
          "Results last 3-4 months"
        ],
        howItWorks: "Keratin solution is applied to hair and sealed with heat for smooth, sleek results.",
        aftercare: "Use sulfate-free products. Avoid washing for 72 hours after treatment."
      },
      {
        name: "Haircuts",
        slug: "haircuts",
        description: "Precision haircuts for women and men. Our experienced stylists create flattering cuts that suit your face shape, lifestyle, and personal style.",
        shortDescription: "Precision cuts by expert stylists.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        price: "From ₾40",
        duration: "30 minutes",
        benefits: [
          "Expert stylists",
          "Personalized consultation",
          "Precision techniques",
          "Styling tips included"
        ],
        howItWorks: "Your stylist will consult with you about the best cut for your face shape and lifestyle.",
        aftercare: "Follow recommended maintenance schedule for best results."
      }
    ]
  },
  {
    name: "Nails & Lashes",
    slug: "nails-lashes",
    description: "Complete nail and lash services including manicures, pedicures, nail art, eyelash extensions, and brow treatments for polished, beautiful results.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    treatments: [
      {
        name: "Manicure",
        slug: "manicure",
        description: "Professional manicure services including classic, gel, and acrylic options. Keep your hands looking polished and well-groomed.",
        shortDescription: "Beautiful, well-groomed nails and hands.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        price: "From ₾30",
        duration: "30 minutes",
        benefits: [
          "Clean, polished nails",
          "Cuticle care",
          "Hand massage",
          "Long-lasting polish options"
        ],
        howItWorks: "Nails are shaped, cuticles treated, and polish applied with professional techniques.",
        aftercare: "Wear gloves for cleaning. Moisturize hands regularly."
      },
      {
        name: "Pedicure",
        slug: "pedicure",
        description: "Relaxing pedicure treatments including spa pedicures with massage, exfoliation, and polish. Keep your feet beautiful and healthy.",
        shortDescription: "Relaxing foot care with beautiful results.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        price: "From ₾40",
        duration: "45 minutes",
        benefits: [
          "Foot soak and exfoliation",
          "Cuticle and callus care",
          "Relaxing massage",
          "Long-lasting polish"
        ],
        howItWorks: "Feet are soaked, exfoliated, nails shaped, and polish applied.",
        aftercare: "Moisturize feet daily. Avoid tight shoes."
      },
      {
        name: "Nail Art & Design",
        slug: "nail-art-design",
        description: "Custom nail art and designs from simple elegance to elaborate creations. Express your style with unique nail decorations.",
        shortDescription: "Creative nail designs for every style.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        price: "From ₾50",
        duration: "60 minutes",
        benefits: [
          "Custom designs",
          "Premium products",
          "Creative expression",
          "Long-lasting results"
        ],
        howItWorks: "Designs are hand-painted or applied using various techniques and sealed for durability.",
        aftercare: "Avoid using nails as tools. Apply cuticle oil daily."
      },
      {
        name: "Eyelash Extensions",
        slug: "eyelash-extensions",
        description: "Professional eyelash extensions in classic, volume, or hybrid styles. Wake up beautiful with lashes that last weeks.",
        shortDescription: "Beautiful, full lashes that last.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        price: "From ₾80",
        duration: "90 minutes",
        benefits: [
          "No mascara needed",
          "Customizable look",
          "Waterproof",
          "Results last 3-4 weeks"
        ],
        howItWorks: "Individual synthetic lashes are carefully applied to your natural lashes.",
        aftercare: "Avoid water for 24 hours. Brush gently daily. Avoid oil-based products."
      },
      {
        name: "Lash Lift & Tint",
        slug: "lash-lift-tint",
        description: "Lash lift and tint creates curled, defined lashes without extensions. A natural enhancement that lasts 6-8 weeks.",
        shortDescription: "Natural lifted, defined lashes.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        price: "From ₾50",
        duration: "45 minutes",
        benefits: [
          "Natural enhancement",
          "No maintenance required",
          "Waterproof",
          "Results last 6-8 weeks"
        ],
        howItWorks: "A lifting solution curves the lashes, followed by a tint to darken them.",
        aftercare: "Avoid water for 24 hours. Avoid oil-based eye products."
      },
      {
        name: "Brow Shaping & Tint",
        slug: "brow-shaping-tint",
        description: "Professional brow shaping and tinting to define and enhance your natural brows. Includes waxing, threading, and tinting options.",
        shortDescription: "Perfectly shaped, defined brows.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        price: "From ₾35",
        duration: "20 minutes",
        benefits: [
          "Defined brow shape",
          "Enhanced color",
          "Professional techniques",
          "Results last 3-4 weeks"
        ],
        howItWorks: "Brows are shaped using waxing or threading, then tinted for definition.",
        aftercare: "Avoid exfoliating the brow area. Schedule regular maintenance."
      }
    ]
  }
];

// Helper to get translated content from messages
async function getTreatmentTranslations(locale: string) {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default?.treatmentContent || {};
  } catch {
    return {};
  }
}

// Merge base data with translations
export async function getLocalizedTreatmentCategories(locale: string): Promise<TreatmentCategory[]> {
  const translations = await getTreatmentTranslations(locale);
  
  return baseTreatmentCategories.map(category => ({
    ...category,
    name: translations[category.slug]?.name || category.name,
    description: translations[category.slug]?.description || category.description,
    treatments: category.treatments.map(treatment => ({
      ...treatment,
      name: translations[category.slug]?.treatments?.[treatment.slug]?.name || treatment.name,
      description: translations[category.slug]?.treatments?.[treatment.slug]?.description || treatment.description,
      shortDescription: translations[category.slug]?.treatments?.[treatment.slug]?.shortDescription || treatment.shortDescription,
    }))
  }));
}

export async function getAllTreatmentCategories(locale: string = 'en'): Promise<TreatmentCategory[]> {
  return getLocalizedTreatmentCategories(locale);
}

export async function getTreatmentCategoryBySlug(slug: string, locale: string = 'en'): Promise<TreatmentCategory | undefined> {
  const categories = await getLocalizedTreatmentCategories(locale);
  return categories.find(category => category.slug === slug);
}

export async function getTreatmentBySlug(slug: string, locale: string = 'en'): Promise<{ treatment: Treatment; category: TreatmentCategory } | undefined> {
  const categories = await getLocalizedTreatmentCategories(locale);
  
  for (const category of categories) {
    const treatment = category.treatments.find(t => t.slug === slug);
    if (treatment) {
      return { treatment, category };
    }
  }
  
  return undefined;
}

export async function getAllTreatments(locale: string = 'en'): Promise<Treatment[]> {
  const categories = await getLocalizedTreatmentCategories(locale);
  return categories.flatMap(category => category.treatments);
}

export async function getCategoryByTreatmentSlug(treatmentSlug: string, locale: string = 'en'): Promise<TreatmentCategory | undefined> {
  const categories = await getLocalizedTreatmentCategories(locale);
  return categories.find(category => 
    category.treatments.some(t => t.slug === treatmentSlug)
  );
}

// Backwards compatible synchronous versions (English only)
export const treatmentCategories = baseTreatmentCategories;

export function getAllTreatmentCategoriesSync(): TreatmentCategory[] {
  return baseTreatmentCategories;
}
