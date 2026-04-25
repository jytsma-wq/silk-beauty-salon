export interface Condition {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  symptoms?: string[];
  causes?: string[];
  treatments?: string[];
  relatedTreatments?: string[];
}

// Base conditions data (non-translatable: images, slugs)
export const baseConditions: Condition[] = [
  {
    name: "Ageing Skin",
    slug: "ageing-skin",
    description: "Ageing skin is a natural process characterized by the development of fine lines, wrinkles, loss of elasticity, and changes in skin texture and tone. As we age, our skin produces less collagen and elastin, leading to sagging, wrinkles, and a loss of youthful volume. Environmental factors such as sun exposure, smoking, and pollution can accelerate this process. Our clinic offers a comprehensive range of treatments to address the various signs of ageing, from preventative treatments to advanced corrective procedures. Whether you're concerned about fine lines, deep wrinkles, volume loss, or skin laxity, we have solutions that can help restore a more youthful, refreshed appearance.",
    shortDescription: "Address fine lines, wrinkles, and loss of elasticity with our anti-ageing treatments.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    symptoms: [
      "Fine lines and wrinkles",
      "Loss of skin elasticity",
      "Sagging skin",
      "Volume loss in cheeks and temples",
      "Deep nasolabial folds",
      "Marionette lines",
      "Thin, crepey skin"
    ],
    causes: [
      "Natural decrease in collagen production",
      "Sun damage (photoaging)",
      "Loss of facial fat and volume",
      "Decreased skin hydration",
      "Repetitive facial expressions",
      "Lifestyle factors (smoking, diet, stress)"
    ],
    treatments: [
      "Anti-wrinkle injections to relax facial muscles",
      "Dermal fillers to restore volume",
      "Skin tightening treatments (HIFU, Thermage)",
      "Laser resurfacing for texture improvement",
      "Medical-grade skincare"
    ],
    relatedTreatments: [
      "anti-wrinkle",
      "cheek-fillers",
      "hifu-treatment",
      "thermage-flx",
      "morpheus-8-treatment"
    ]
  },
  {
    name: "Acne & Scarring",
    slug: "acne-scarring",
    description: "Acne is one of the most common skin conditions, affecting people of all ages. It occurs when hair follicles become clogged with oil and dead skin cells, leading to whiteheads, blackheads, and pimples. Severe acne can cause significant scarring that persists long after active breakouts have resolved. Acne scars can be atrophic (indentations), hypertrophic (raised), or cause changes in skin texture and tone. Our clinic offers advanced treatments for both active acne and acne scarring, using the latest technologies to improve skin clarity and texture. From laser treatments to microneedling, we have solutions for all types of acne concerns.",
    shortDescription: "Treat active acne and improve the appearance of acne scars.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    symptoms: [
      "Active breakouts (blackheads, whiteheads, cysts)",
      "Red, inflamed skin",
      "Atrophic scars (rolling, boxcar, ice pick)",
      "Hypertrophic or keloid scars",
      "Uneven skin texture",
      "Post-inflammatory hyperpigmentation"
    ],
    causes: [
      "Excess oil production",
      "Clogged hair follicles",
      "Bacteria (P. acnes)",
      "Hormonal changes",
      "Diet and lifestyle factors",
      "Genetics"
    ],
    treatments: [
      "AviClear laser for active acne",
      "Microneedling for scar improvement",
      "Chemical peels",
      "Laser resurfacing (CO2, fractional)",
      "Medical-grade skincare protocols"
    ],
    relatedTreatments: [
      "cutera-aviclear",
      "skinpen-microneedling",
      "cutera-c02-laser",
      "cutera-secret-pro-rf-microneedling",
      "is-clinical-fire-ice-peel"
    ]
  },
  {
    name: "Uneven Skin Tone",
    slug: "uneven-skin-tone",
    description: "Uneven skin tone refers to inconsistencies in skin color and pigmentation across the face and body. This common concern can manifest as patches of darker or lighter skin, general dullness, or lack of radiance. Factors contributing to uneven skin tone include sun damage, hormonal changes, inflammation, and skin injuries. Many people also experience post-inflammatory hyperpigmentation following acne or other skin trauma. Our clinic offers various treatments to restore a more even, radiant complexion, from gentle brightening treatments to advanced laser therapies that target pigmentation at its source.",
    shortDescription: "Restore a bright, even complexion with targeted pigmentation treatments.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    symptoms: [
      "Areas of hyperpigmentation",
      "General dullness",
      "Lack of radiance",
      "Sun spots and age spots",
      "Melasma patches",
      "Post-inflammatory marks"
    ],
    causes: [
      "Sun exposure and UV damage",
      "Hormonal changes (melasma)",
      "Post-inflammatory pigmentation",
      "Environmental damage",
      "Aging process",
      "Certain medications"
    ],
    treatments: [
      "IPL/BBL treatments",
      "Chemical peels",
      "Laser pigmentation removal",
      "Depigmentation protocols (Cosmelan)",
      "Medical-grade brightening skincare"
    ],
    relatedTreatments: [
      "bbl-hero",
      "cutera-excel-v-ipl",
      "mesoestetic-cosmelan-peel",
      "moxi-laser",
      "obagi-nu-derm"
    ]
  },
  {
    name: "Blemishes",
    slug: "blemishes",
    description: "Blemishes encompass various skin imperfections including spots, marks, and minor lesions that affect skin clarity. These can include whiteheads, blackheads, papules, pustules, and other imperfections that create an uneven skin surface. Blemishes can be caused by excess oil production, clogged pores, bacteria, and inflammation. They may also leave behind post-inflammatory marks that persist long after the initial blemish has healed. Our clinic offers effective treatments to clear active blemishes, prevent future breakouts, and improve the appearance of any remaining marks for clearer, healthier-looking skin.",
    shortDescription: "Clear blemishes and achieve a flawless complexion.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    symptoms: [
      "Whiteheads and blackheads",
      "Red, inflamed spots",
      "Pustules and papules",
      "Clogged pores",
      "Post-blemish marks",
      "Uneven skin surface"
    ],
    causes: [
      "Excess sebum production",
      "Blocked pores",
      "Bacterial infection",
      "Hormonal fluctuations",
      "Poor skincare routine",
      "Diet and lifestyle"
    ],
    treatments: [
      "Chemical peels",
      "Medical facials",
      "Laser treatments",
      "Professional extraction",
      "Targeted skincare protocols"
    ],
    relatedTreatments: [
      "is-clinical-fire-ice-peel",
      "filter-facial",
      "cutera-aviclear",
      "obagi-blue-radiance-peel",
      "clear-brilliant"
    ]
  },
  {
    name: "Pigmentation",
    slug: "pigmentation",
    description: "Pigmentation issues refer to various conditions where the skin develops darker patches or spots due to excess melanin production. This includes sun spots, age spots, freckles, melasma, and post-inflammatory hyperpigmentation. Pigmentation can affect people of all skin types and can be triggered by sun exposure, hormonal changes, skin injuries, or certain medications. While some pigmentation is harmless, it can cause significant cosmetic concern. Our clinic offers advanced treatments that target pigmentation at various depths within the skin, using laser technology, chemical peels, and specialized skincare to restore a clear, even complexion.",
    shortDescription: "Effectively treat sun spots, melasma, and hyperpigmentation.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    symptoms: [
      "Sun spots and age spots",
      "Melasma (hormonal pigmentation)",
      "Freckles",
      "Post-inflammatory hyperpigmentation",
      "General uneven skin tone",
      "Dark patches on face or body"
    ],
    causes: [
      "UV exposure and sun damage",
      "Hormonal changes (pregnancy, contraceptives)",
      "Skin trauma or inflammation",
      "Certain medications",
      "Genetic predisposition",
      "Aging process"
    ],
    treatments: [
      "BBL/IPL phototherapy",
      "Q-switched laser",
      "Cosmelan depigmentation",
      "Chemical peels",
      "Prescription brightening skincare"
    ],
    relatedTreatments: [
      "bbl-hero",
      "mesoestetic-cosmelan-peel",
      "cutera-excel-v-ipl",
      "moxi-and-bbl",
      "obagi-nu-derm"
    ]
  },
  {
    name: "Collagen Stimulating",
    slug: "collagen-stimulating",
    description: "Collagen stimulation treatments are designed to boost your skin's natural collagen production, leading to improved skin quality, firmness, and texture. Collagen is the protein responsible for skin's strength and elasticity, but its production decreases significantly as we age. By stimulating new collagen formation, we can address multiple concerns simultaneously including fine lines, wrinkles, scarring, and skin laxity. Our clinic offers various collagen-stimulating treatments using advanced technologies such as radiofrequency, microneedling, ultrasound, and injectable biostimulators to rejuvenate your skin from within.",
    shortDescription: "Boost collagen for firmer, more youthful skin.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    symptoms: [
      "Fine lines and wrinkles",
      "Loss of skin firmness",
      "Decreased elasticity",
      "Thin, crepey skin",
      "Acne scarring",
      "Enlarged pores"
    ],
    causes: [
      "Natural aging process",
      "Decreased collagen production",
      "Sun damage",
      "Environmental damage",
      "Lifestyle factors",
      "Genetic predisposition"
    ],
    treatments: [
      "Radiofrequency microneedling (Morpheus8)",
      "HIFU treatments",
      "Injectable biostimulators",
      "Laser resurfacing",
      "Thread lifts"
    ],
    relatedTreatments: [
      "morpheus-8-treatment",
      "hifu-treatment",
      "thermage-flx",
      "skinpen-microneedling",
      "cutera-secret-pro-rf-microneedling"
    ]
  },
  {
    name: "Other Conditions",
    slug: "other-conditions",
    description: "Beyond the common concerns, our clinic treats a wide range of other skin and aesthetic conditions. These include rosacea, vascular lesions, excessive sweating (hyperhidrosis), teeth grinding (bruxism), migraines, and various skin texture concerns. We also offer treatments for specific areas such as the delicate eye area, neck, and hands. Our comprehensive consultation process ensures we understand your unique concerns and can recommend the most appropriate treatments from our extensive range of services.",
    shortDescription: "Comprehensive solutions for various skin and aesthetic concerns.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    symptoms: [
      "Rosacea and facial redness",
      "Visible blood vessels",
      "Excessive sweating",
      "Teeth grinding and jaw tension",
      "Chronic migraines",
      "Texture irregularities"
    ],
    causes: [
      "Various underlying factors",
      "Genetic predisposition",
      "Environmental triggers",
      "Lifestyle factors",
      "Medical conditions",
      "Stress and anxiety"
    ],
    treatments: [
      "Vascular laser treatments",
      "Botox for medical conditions",
      "Skin resurfacing",
      "Targeted laser therapy",
      "Personalized treatment plans"
    ],
    relatedTreatments: [
      "hyperhidrosis",
      "masseter-botox",
      "migraine-treatment",
      "candela-vbeam-laser",
      "cutera-excel-v-ipl"
    ]
  }
];

// Helper to get translated content from messages
async function getConditionTranslations(locale: string) {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default?.conditionContent || {};
  } catch {
    return {};
  }
}

// Merge base data with translations
export async function getLocalizedConditions(locale: string): Promise<Condition[]> {
  const translations = await getConditionTranslations(locale);
  
  return baseConditions.map(condition => ({
    ...condition,
    name: translations[condition.slug]?.name || condition.name,
    description: translations[condition.slug]?.description || condition.description,
    shortDescription: translations[condition.slug]?.shortDescription || condition.shortDescription,
    symptoms: translations[condition.slug]?.symptoms || condition.symptoms,
    causes: translations[condition.slug]?.causes || condition.causes,
    treatments: translations[condition.slug]?.treatments || condition.treatments,
  }));
}

export async function getAllConditions(locale: string = 'en'): Promise<Condition[]> {
  return getLocalizedConditions(locale);
}

export async function getConditionBySlug(slug: string, locale: string = 'en'): Promise<Condition | undefined> {
  const conditions = await getLocalizedConditions(locale);
  return conditions.find(condition => condition.slug === slug);
}

// Note: Use getLocalizedConditions(locale) for proper i18n support
// The baseConditions are exported for client components that can't use async functions
