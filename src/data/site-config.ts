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
    facebook: "https://www.facebook.com/silkbeautybatumi/",
    twitter: "",
    youtube: ""
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
      name: "Nino",
      role: "Founder & Lead Practitioner",
      bio: "Nino is the founder of Silk Beauty Salon and a renowned aesthetic practitioner with over 15 years of experience in the beauty industry. She is known for her natural-looking results and meticulous attention to detail.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"
    },
    {
      name: "Ketevan",
      role: "Senior Aesthetic Practitioner",
      bio: "Ketevan is a highly skilled aesthetic practitioner specializing in dermal fillers and skin treatments. Her gentle approach and artistic eye ensure beautiful, natural results for every client.",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80"
    },
    {
      name: "Mariam",
      role: "Aesthetic Practitioner",
      bio: "Mariam brings a wealth of knowledge in advanced skin treatments and laser therapy. She is passionate about helping clients achieve their skin goals through personalized treatment plans.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80"
    },
    {
      name: "Sophia",
      role: "Aesthetic Practitioner",
      bio: "Sophia specializes in non-surgical facial rejuvenation and has extensive experience in anti-wrinkle treatments and dermal fillers. Her clients love her natural, fresh approach.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"
    }
  ],
  
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
