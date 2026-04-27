// Galderma-inspired navigation structure for Silk Beauty Salon

export interface NavCategory {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  href: string;
  items: NavItem[];
}

export interface NavItem {
  name: string;
  slug: string;
  href: string;
  description?: string;
}

// Skin Concerns - matching Galderma's structure
export const skinConcerns: NavCategory = {
  name: "Skin Concerns",
  slug: "skin-concerns",
  href: "/conditions",
  image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  items: [
    { name: "Fine Lines & Wrinkles", slug: "fine-lines-wrinkles", href: "/conditions/ageing-skin", description: "Address signs of aging" },
    { name: "Loss of Firmness", slug: "loss-of-firmness", href: "/conditions/ageing-skin", description: "Tighten and lift skin" },
    { name: "Facial Contouring", slug: "facial-contouring", href: "/treatments/jaw-fillers", description: "Define facial structure" },
    { name: "Loss of Radiance", slug: "loss-of-radiance", href: "/conditions/uneven-skin-tone", description: "Restore glow" },
    { name: "Loss of Volume", slug: "loss-of-volume", href: "/treatments/cheek-fillers", description: "Restore youthful fullness" },
    { name: "Under Eye Dark Circles", slug: "under-eye-dark-circles", href: "/treatments/tear-trough", description: "Refresh tired eyes" },
    { name: "Dry Skin", slug: "dry-skin", href: "/conditions", description: "Hydrate and nourish" },
    { name: "Acne & Scarring", slug: "acne-scarring", href: "/conditions/acne-scarring", description: "Clear skin and smooth scars" },
    { name: "Uneven Skin Tone", slug: "uneven-skin-tone", href: "/conditions/uneven-skin-tone", description: "Brighten complexion" },
    { name: "Pigmentation", slug: "pigmentation", href: "/conditions/uneven-skin-tone", description: "Reduce dark spots" },
  ],
};

// Dermal Fillers - matching Galderma's Restylane structure
export const dermalFillers: NavCategory = {
  name: "Dermal Fillers",
  slug: "dermal-fillers",
  href: "/treatments#dermal-fillers",
  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  items: [
    { name: "Lip Fillers", slug: "lip-fillers", href: "/treatments/lip-fillers", description: "Natural-looking volume" },
    { name: "Cheek Fillers", slug: "cheek-fillers", href: "/treatments/cheek-fillers", description: "Restore mid-face volume" },
    { name: "Nose Fillers", slug: "nose-fillers", href: "/treatments/non-surgical-rhinoplasty", description: "Non-surgical nose enhancement" },
    { name: "Temple Fillers", slug: "temple-fillers", href: "/treatments", description: "Restore hollow temples" },
    { name: "Under Eye Fillers", slug: "under-eye-fillers", href: "/treatments/tear-trough", description: "Tear trough treatment" },
    { name: "Jawline Fillers", slug: "jawline-fillers", href: "/treatments/jaw-fillers", description: "Define jawline contour" },
    { name: "Nasolabial Folds", slug: "nasolabial-folds", href: "/treatments/nasolabial-folds", description: "Smooth smile lines" },
    { name: "Chin Fillers", slug: "chin-fillers", href: "/treatments/chin-fillers", description: "Balance facial profile" },
  ],
};

// Skinboosters - matching Galderma's Skinboosters
export const skinboosters: NavCategory = {
  name: "Skinboosters",
  slug: "skinboosters",
  href: "/treatments#skinboosters",
  image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80",
  items: [
    { name: "Facial Hydration", slug: "facial-hydration", href: "/treatments/is-clinical-fire-ice-peel", description: "Deep facial hydration" },
    { name: "Neck Rejuvenation", slug: "neck-rejuvenation", href: "/treatments", description: "Smooth neck lines" },
    { name: "Décolletage Treatment", slug: "decolletage-treatment", href: "/treatments", description: "Rejuvenate chest area" },
    { name: "Hand Rejuvenation", slug: "hand-rejuvenation", href: "/treatments", description: "Restore youthful hands" },
    { name: "Skin Quality", slug: "skin-quality", href: "/treatments/clear-brilliant", description: "Improve skin texture" },
  ],
};

// Biostimulators - matching Galderma's Sculptra
export const biostimulators: NavCategory = {
  name: "Biostimulators",
  slug: "biostimulators",
  href: "/treatments#skin",
  image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  items: [
    { name: "Facial Rejuvenation", slug: "facial-rejuvenation", href: "/treatments/cutera-secret-pro-rf-microneedling", description: "Natural collagen stimulation" },
    { name: "Body Contouring", slug: "body-contouring", href: "/treatments", description: "Restore body volume" },
    { name: "Collagen Stimulation", slug: "collagen-stimulation", href: "/treatments/collagen-stimulating", description: "Long-lasting results" },
    { name: "Skin Tightening", slug: "skin-tightening", href: "/conditions/collagen-stimulating", description: "Firm and lift" },
  ],
};

// Botox & Neuromodulators
export const botoxTreatments: NavCategory = {
  name: "Botox & Injectables",
  slug: "botox-injectables",
  href: "/treatments#botox",
  image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  items: [
    { name: "Anti-Wrinkle Injections", slug: "anti-wrinkle", href: "/treatments/anti-wrinkle", description: "Smooth facial lines" },
    { name: "Frown Lines", slug: "frown-lines", href: "/treatments/anti-wrinkle", description: "Soften glabellar lines" },
    { name: "Crow's Feet", slug: "crows-feet", href: "/treatments/anti-wrinkle", description: "Refresh eye area" },
    { name: "Forehead Lines", slug: "forehead-lines", href: "/treatments/anti-wrinkle", description: "Smooth forehead" },
    { name: "Bunny Lines", slug: "bunny-lines", href: "/treatments/anti-wrinkle", description: "Nose wrinkle treatment" },
    { name: "Masseter/Jaw Slimming", slug: "masseter-botox", href: "/treatments/masseter-botox", description: "Slim jawline" },
    { name: "Hyperhidrosis", slug: "hyperhidrosis", href: "/treatments/hyperhidrosis", description: "Reduce excessive sweating" },
    { name: "Migraine Treatment", slug: "migraine", href: "/treatments/migraine-treatment", description: "Relieve chronic migraines" },
  ],
};

// Laser & Energy Treatments
export const laserTreatments: NavCategory = {
  name: "Laser & Energy",
  slug: "laser-energy",
  href: "/treatments#laser",
  image: "https://images.unsplash.com/photo-1631217868264-b78de6a33f31?w=800&q=80",
  items: [
    { name: "Laser Hair Removal", slug: "laser-hair-removal", href: "/treatments/bbl-hero", description: "Permanent hair reduction" },
    { name: "Laser Skin Resurfacing", slug: "laser-resurfacing", href: "/treatments/cutera-c02-laser", description: "Smooth skin texture" },
    { name: "IPL Photofacial", slug: "ipl-photofacial", href: "/treatments/cutera-excel-v-ipl", description: "Even skin tone" },
    { name: "HIFU Skin Tightening", slug: "hifu", href: "/conditions/collagen-stimulating", description: "Non-surgical lift" },
    { name: "Microneedling", slug: "microneedling", href: "/treatments/cutera-secret-pro-rf-microneedling", description: "Collagen induction" },
    { name: "RF Microneedling", slug: "rf-microneedling", href: "/treatments/cutera-secret-pro-rf-microneedling", description: "Advanced skin rejuvenation" },
  ],
};

// All treatment categories for mega menu
export const treatmentCategories = [
  skinConcerns,
  dermalFillers,
  skinboosters,
  biostimulators,
  botoxTreatments,
  laserTreatments,
];

// Quick links for footer
export const footerQuickLinks = [
  { name: "Book Consultation", href: "/book" },
  { name: "Skin Trends", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact-us" },
];

// Legal links
export const legalLinks = [
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

// Social links (source of truth: site-config.ts)
export const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/silkbeautybatumi/", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/silkbeauty_batumi/", icon: "instagram" },
];
