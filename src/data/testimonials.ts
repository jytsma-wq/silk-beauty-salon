export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Nino is absolutely wonderful! I've been coming to her for years and she never disappoints. My skin has never looked better. The results are always natural and exactly what I wanted.",
    author: "Anna K.",
    role: "Regular Client",
    rating: 5
  },
  {
    quote: "I was nervous about getting fillers for the first time, but Ketevan made me feel so comfortable. My lips look amazing and so natural - everyone keeps asking what I've done!",
    author: "Mariam D.",
    role: "Lip Fillers Client",
    rating: 5
  },
  {
    quote: "Got Botox before my daughter's wedding and couldn't be happier! The team at Silk Beauty Salon made me feel so relaxed. The results are subtle but exactly what I wanted.",
    author: "Lela S.",
    role: "Anti-Wrinkle Client",
    rating: 5
  },
  {
    quote: "The team at Silk Beauty Salon is amazing! Sophia took the time to understand exactly what I wanted and delivered beyond my expectations. I'm a client for life now.",
    author: "Nika T.",
    role: "Skin Treatment Client",
    rating: 5
  },
  {
    quote: "I've been coming to Silk Beauty Salon for over 2 years now. The clinic is beautiful, the staff are professional and friendly, and the results speak for themselves.",
    author: "Giorgi M.",
    role: "Long-term Client",
    rating: 5
  },
  {
    quote: "After years of struggling with acne scarring, I finally found a clinic that could help. The Morpheus8 treatment has transformed my skin. I feel like a different person!",
    author: "Temo R.",
    role: "Morpheus8 Client",
    rating: 5
  },
  {
    quote: "The skin analysis was incredible! It showed me exactly what my skin needed and the team created a personalized treatment plan. My skin has never looked better.",
    author: "Salome L.",
    role: "Skin Analysis Client",
    rating: 5
  },
  {
    quote: "I was worried about looking 'done' but Nino knew exactly how to enhance my features naturally. My friends keep telling me how refreshed I look!",
    author: "Eka W.",
    role: "Dermal Fillers Client",
    rating: 5
  }
];
