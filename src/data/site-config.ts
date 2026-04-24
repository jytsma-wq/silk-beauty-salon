export const siteConfig = {
  name: "Silk Beauty Salon",
  description: "Batumi's premier beauty salon on Zurab Gorgiladze Street. We bring together expert practitioners, cutting-edge treatments & luxury care to enhance your natural beauty with precision & confidence.",
  url: "https://www.silkbeauty.ge",
  bookingUrl: "https://www.silkbeauty.ge/book",
  
  contact: {
    address: "Zurab Gorgiladze 63",
    city: "Batumi",
    postcode: "6000",
    country: "Georgia",
    phone: "+995 599 123 456",
    email: "info@silkbeauty.ge"
  },
  
  businessHours: {
    monday: "10:00 - 19:00",
    tuesday: "10:00 - 19:00",
    wednesday: "10:00 - 20:00",
    thursday: "10:00 - 20:00",
    friday: "10:00 - 19:00",
    saturday: "10:00 - 18:00",
    sunday: "11:00 - 16:00"
  },
  
  social: {
    instagram: "https://www.instagram.com/silkbeauty_batumi/",
    facebook: "https://www.facebook.com/silkbeautybatumi/"
  },
  
  awards: [
    "Award Winning",
    "Batumi's Premier Beauty Salon",
    "As featured in Georgian Fashion & Beauty Magazine"
  ],
  
  navigation: {
    main: [
      { name: "Treatments", href: "#treatments", hasDropdown: true },
      { name: "Conditions", href: "#conditions", hasDropdown: true },
      { name: "About", href: "/about", hasDropdown: true },
      { name: "International Clients", href: "#international", hasDropdown: true },
      { name: "Price List", href: "/pricelist" },
      { name: "Offers", href: "/offers" },
      { name: "Contact", href: "/contact-us" }
    ],
    footer: {
      quickLinks: [
        { name: "Contact", href: "/contact-us" },
        { name: "FAQ", href: "/faq" },
        { name: "Press", href: "/media-press" },
        { name: "Blog", href: "/blog" }
      ],
      about: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about#team" },
        { name: "Careers", href: "/careers" }
      ]
    }
  },
  
  team: [
    {
      name: "Nana Gviniashvili",
      role: "Owner & Medical Aesthetic Practitioner",
      bio: "Nana Gviniashvili is the owner and sole practitioner at Silk Beauty Salon. With extensive training in medical aesthetics and facial dermatology, she specializes in Botox, dermal fillers, and advanced skin treatments. Nana is known for her natural-looking results, meticulous attention to detail, and personalized approach to each client. She speaks Georgian, English, and Russian fluently, making international clients feel comfortable and well-cared-for.",
      image: "/images/nana-gviniashvili.jpg",
      qualifications: [
        "Certified Medical Aesthetic Practitioner",
        "Advanced Botox & Dermal Filler Training",
        "Facial Dermatology Specialist",
        "Member of Georgian Aesthetic Medicine Association"
      ],
      languages: ["Georgian", "English", "Russian"]
    }
  ],

  internationalClients: {
    heroTitle: "World-Class Medical Aesthetics in Batumi, Georgia",
    heroSubtitle: "Premium Botox, Fillers & Facial Dermatology at Georgian Prices",
    treatments: [
      { name: "Botox Injectables", slug: "botox", minStay: "Same day" },
      { name: "Dermal Fillers", slug: "dermal-fillers", minStay: "24-48 hours" },
      { name: "Facial Dermatology", slug: "skin", minStay: "Varies" }
    ],
    packages: [
      { name: "Fresh Face", includes: "Botox (3 areas) + Lip Filler", savings: "15%" },
      { name: "Total Rejuvenation", includes: "Full face Botox + Cheek Filler + Skin Booster", savings: "20%" },
      { name: "Non-Surgical Lift", includes: "8-point lift (strategic filler placement)", savings: "Special pricing" }
    ],
    whyGeorgia: {
      title: "Why Choose Georgia for Aesthetic Treatments?",
      points: [
        { title: "Significant Cost Savings", description: "Save 50-70% compared to UK, US, or EU prices for identical treatments and products" },
        { title: "European Standards", description: "Clinics follow strict EU hygiene and safety protocols with internationally trained practitioners" },
        { title: "English-Speaking Staff", description: "Communication is easy with fluent English-speaking medical teams" },
        { title: "Tourism + Treatment", description: "Combine your procedure with exploring Georgia's rich culture, wine, and Black Sea beaches" }
      ]
    }
  },
  
  faqs: [
    {
      question: "What should I expect during my first consultation?",
      answer: "During your initial consultation, we'll discuss your concerns, goals, and medical history. Our practitioner will examine your skin and facial anatomy before recommending appropriate treatments. We believe in honest, transparent advice and will never recommend unnecessary treatments."
    },
    {
      question: "Are the treatments painful?",
      answer: "Most treatments involve minimal discomfort. We use topical numbing cream where appropriate, and many of our dermal fillers contain built-in local anesthetic. Our practitioners are skilled in making treatments as comfortable as possible."
    },
    {
      question: "How long do results last?",
      answer: "This depends on the treatment. Anti-wrinkle injections typically last 3-6 months, dermal fillers 6-18 months depending on the product and area treated, and skin tightening treatments can provide results lasting 1-2 years. We'll discuss expected duration during your consultation."
    },
    {
      question: "Is there any downtime?",
      answer: "Many of our treatments have minimal to no downtime. Some treatments may cause temporary swelling, redness, or bruising. We'll provide detailed aftercare instructions and advice on timing treatments around social commitments."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book online through our website, call us at +995 599 123 456, or email info@silkbeauty.ge. We recommend booking consultations in advance as we often have a waiting list."
    },
    {
      question: "Do you offer virtual consultations?",
      answer: "Yes, we offer virtual consultations for those who cannot visit the salon initially. However, for treatments requiring precise assessment, an in-person consultation is recommended."
    },
    {
      question: "What brands of products do you use?",
      answer: "We use only premium, certified products from leading brands including Allergan (Juvederm), Galderma (Restylane), and Merz. For skin treatments, we use medical-grade products from iS Clinical, Obagi, and Mesoestetic."
    },
    {
      question: "Are your practitioners qualified?",
      answer: "All our practitioners are fully qualified and experienced professionals. They undergo continuous training in the latest techniques and safety protocols to ensure the highest standards of care."
    }
  ]
};

export type SiteConfig = typeof siteConfig;
