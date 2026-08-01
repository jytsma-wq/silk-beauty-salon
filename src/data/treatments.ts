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

// Base treatment data (non-translatable: images, prices, slugs)
export const baseTreatmentCategories: TreatmentCategory[] = [
  {
    name: "Botox Injectables",
    slug: "botox",
    description: "Advanced anti-wrinkle treatments using premium botulinum toxin to smooth lines and restore youthful appearance.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    treatments: [
      {
        name: "Anti-Wrinkle Injections",
        slug: "anti-wrinkle",
        description: "Anti-wrinkle injections are one of the most popular non-surgical cosmetic treatments available. Using botulinum toxin, we temporarily relax the facial muscles that cause wrinkles, resulting in smoother, younger-looking skin. This treatment is perfect for forehead lines, crow's feet, and frown lines between the eyebrows. Our expert practitioners use precise injection techniques to achieve natural-looking results that maintain your facial expressions while reducing the appearance of wrinkles.",
        shortDescription: "Smooth away wrinkles and fine lines for a refreshed, youthful appearance.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
        price: "From ₾200",
        duration: "15-30 minutes",
        benefits: [
          "Reduces the appearance of fine lines and wrinkles",
          "Prevents new wrinkles from forming",
          "Quick treatment with minimal downtime",
          "Natural-looking results",
          "Long-lasting effects (3-6 months)"
        ],
        howItWorks: "Botulinum toxin is injected into specific facial muscles using a fine needle. The toxin blocks nerve signals to these muscles, preventing them from contracting and creating wrinkles. The treatment takes effect over 7-14 days.",
        aftercare: "Avoid lying down for 4 hours, avoid exercise for 24 hours, and avoid rubbing the treated area. Results typically last 3-6 months.",
        faqs: [
          { question: "Is the treatment painful?", answer: "Most patients describe the sensation as a mild pinch. The needles used are very fine, and the treatment is quick." },
          { question: "How long until I see results?", answer: "Initial results appear within 3-5 days, with full results visible after 2 weeks." },
          { question: "How long do results last?", answer: "Results typically last 3-6 months. Regular treatments can help maintain results." }
        ]
      },
      {
        name: "Masseter Botox",
        slug: "masseter-botox",
        description: "Masseter Botox is a specialized treatment that targets the masseter muscles (the large jaw muscles). This treatment can slim the face by reducing the size of these muscles, creating a more oval or V-shaped facial contour. It's also highly effective for treating teeth grinding (bruxism) and jaw tension. Many patients experience relief from jaw pain and headaches associated with teeth grinding.",
        shortDescription: "Slim the jawline and relieve teeth grinding with targeted Botox treatment.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
        price: "From ₾250",
        duration: "20-30 minutes",
        benefits: [
          "Slims and contours the lower face",
          "Reduces jaw tension and pain",
          "Treats teeth grinding (bruxism)",
          "Can relieve associated headaches",
          "Non-surgical facial contouring"
        ],
        howItWorks: "Botox is injected into the masseter muscles on both sides of the jaw. The toxin weakens these muscles, causing them to reduce in size over time. This creates a slimmer facial appearance while reducing grinding and clenching.",
        aftercare: "Avoid lying down for 4 hours and avoid massaging the area. Full results develop over 4-6 weeks as the muscles gradually reduce in size.",
        faqs: [
          { question: "Will I still be able to chew?", answer: "Yes, the treatment only reduces the muscle size, not its function. You'll still be able to chew normally." },
          { question: "How long until I see results?", answer: "Initial effects are seen within 1-2 weeks, with full slimming results visible after 4-6 weeks." }
        ]
      },
      {
        name: "Hyperhidrosis Treatment",
        slug: "hyperhidrosis",
        description: "Hyperhidrosis treatment with Botox is a highly effective solution for excessive sweating. This FDA-approved treatment works by blocking the nerve signals that stimulate sweat glands. It's most commonly used for underarm sweating but can also treat excessive sweating of the palms, feet, and face. Results can last 6-12 months, providing significant improvement in quality of life for those who suffer from this condition.",
        shortDescription: "Effectively treat excessive sweating with long-lasting results.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾400",
        duration: "30-45 minutes",
        benefits: [
          "Dramatically reduces excessive sweating",
          "Results last 6-12 months",
          "Quick and minimally invasive",
          "Can be used on underarms, palms, and feet",
          "Improves confidence and quality of life"
        ],
        howItWorks: "Multiple small injections of Botox are administered in the treatment area. The toxin blocks the release of acetylcholine, the chemical that signals sweat glands to produce sweat.",
        aftercare: "Avoid exercise and hot environments for 24 hours. Avoid applying deodorant for 24 hours if treating underarms.",
        faqs: [
          { question: "Is the treatment painful?", answer: "A topical numbing cream can be applied to minimize discomfort. Most patients find the treatment very tolerable." },
          { question: "How long do results last?", answer: "Results typically last 6-12 months, with many patients scheduling treatments twice a year." }
        ]
      },
      {
        name: "Migraine Treatment",
        slug: "migraine-treatment",
        description: "Botox is an FDA-approved treatment for chronic migraines. This revolutionary treatment involves a series of small injections around the head and neck to dull future headache symptoms. For patients who suffer from chronic migraines (15 or more days per month), this treatment can significantly reduce the frequency and severity of attacks. The treatment protocol typically involves injections every 12 weeks.",
        shortDescription: "Reduce the frequency and severity of chronic migraines.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        price: "From ₾350",
        duration: "30-45 minutes",
        benefits: [
          "Reduces frequency of migraine attacks",
          "Decreases severity of headaches",
          "FDA-approved for chronic migraines",
          "Long-lasting relief",
          "Non-systemic treatment option"
        ],
        howItWorks: "Botox is injected into specific muscles around the head and neck. The treatment blocks the release of chemicals involved in pain transmission, preventing migraine signals before they start.",
        aftercare: "Avoid lying flat for 4 hours. Avoid rubbing or massaging treated areas. Full effects develop over 1-2 weeks.",
        faqs: [
          { question: "How many treatments do I need?", answer: "Treatments are typically administered every 12 weeks. Many patients notice improvement after the second or third treatment." },
          { question: "Is this covered by insurance?", answer: "Some insurance plans cover Botox for chronic migraines. Please check with your provider." }
        ]
      }
    ]
  },
  {
    name: "Dermal Fillers",
    slug: "dermal-fillers",
    description: "Restore volume, enhance features, and smooth lines with our premium hyaluronic acid dermal filler treatments.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    treatments: [
      {
        name: "Lip Fillers",
        slug: "lip-fillers",
        description: "Lip fillers are one of our most popular treatments for enhancing the shape, volume, and definition of your lips. Using premium hyaluronic acid fillers, we can create natural-looking results that enhance your natural beauty. Whether you want to add volume to thin lips, define the lip border, or address asymmetry, our expert practitioners will work with you to achieve your desired look. The treatment is quick, with minimal downtime and results that can last up to 12 months.",
        shortDescription: "Enhance lip volume and shape for beautiful, natural-looking results.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾250",
        duration: "30-45 minutes",
        benefits: [
          "Adds volume and definition",
          "Creates natural-looking enhancement",
          "Improves lip symmetry",
          "Hydrates and smooths lip texture",
          "Results last 6-12 months"
        ],
        howItWorks: "Hyaluronic acid filler is carefully injected into specific areas of the lips using a fine needle or cannula. The filler attracts water to the area, creating volume and hydration. The practitioner shapes and molds the filler for optimal results.",
        aftercare: "Apply ice to reduce swelling. Avoid strenuous exercise for 24 hours. Avoid extreme heat or cold. Swelling typically subsides within a few days.",
        faqs: [
          { question: "Will it look natural?", answer: "Yes, our practitioners specialize in natural-looking enhancements. We work with you to achieve your desired look while maintaining harmony with your facial features." },
          { question: "Is it painful?", answer: "We use fillers containing local anesthetic and can apply numbing cream beforehand. Most patients find the treatment very comfortable." }
        ]
      },
      {
        name: "Cheek Fillers",
        slug: "cheek-fillers",
        description: "Cheek fillers are an excellent way to restore volume to the mid-face, create beautiful cheekbone definition, and lift sagging skin. As we age, we lose volume in our cheeks, leading to a tired appearance and nasolabial folds. By strategically placing filler in the cheek area, we can restore youthful volume, improve facial contours, and even reduce the appearance of under-eye hollows. Results are immediate and can last up to 18 months.",
        shortDescription: "Restore volume and define cheekbones for a youthful, lifted appearance.",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
        price: "From ₾300",
        duration: "30-45 minutes",
        benefits: [
          "Restores lost volume in cheeks",
          "Defines and enhances cheekbones",
          "Lifts mid-face area",
          "Can improve nasolabial folds",
          "Results last 12-18 months"
        ],
        howItWorks: "Using a needle or cannula, hyaluronic acid filler is injected deep into the cheek area. The filler provides structural support and volume, lifting the mid-face and creating beautiful contouring.",
        aftercare: "Avoid touching or applying pressure to the treated area for 24 hours. Sleep on your back for the first few nights. Avoid strenuous exercise for 24-48 hours.",
        faqs: [
          { question: "How much filler will I need?", answer: "This varies by individual. During your consultation, we'll assess your needs and recommend the appropriate amount." },
          { question: "How long until I see results?", answer: "Results are visible immediately, with final results apparent after any swelling subsides (usually 1-2 weeks)." }
        ]
      },
      {
        name: "Chin Fillers",
        slug: "chin-fillers",
        description: "Chin fillers can dramatically improve your facial profile and proportions. Whether you have a naturally recessed chin or have lost volume through aging, dermal fillers can add projection and definition. This treatment can improve the appearance of a double chin, create better jawline definition, and bring balance to facial features. It's an excellent alternative to chin implants for those seeking non-surgical enhancement.",
        shortDescription: "Enhance chin projection and improve facial balance.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾300",
        duration: "30-45 minutes",
        benefits: [
          "Improves facial proportions",
          "Enhances chin projection",
          "Creates better jawline definition",
          "Non-surgical alternative to implants",
          "Results last 12-18 months"
        ],
        howItWorks: "Hyaluronic acid filler is injected into the chin area to add volume and projection. The practitioner carefully shapes the filler to achieve natural-looking enhancement that complements your other facial features.",
        aftercare: "Avoid touching the area for 24 hours. Sleep on your back for the first few nights. Avoid extreme temperatures and exercise for 24-48 hours.",
        faqs: [
          { question: "Will it look natural?", answer: "Yes, we specialize in creating balanced, natural-looking results that enhance your features without looking obvious." },
          { question: "Can chin fillers help with a double chin?", answer: "Yes, by adding projection to the chin, we can improve the appearance of a double chin and create a more defined profile." }
        ]
      },
      {
        name: "Jaw Fillers",
        slug: "jaw-fillers",
        description: "Jaw fillers are an excellent treatment for defining and contouring the jawline. Whether you want to create a more angular, defined jaw or restore volume lost through aging, this treatment can dramatically improve your profile. By strategically placing filler along the jawline, we can create better definition, improve symmetry, and achieve a more sculpted appearance. It's a popular treatment for both men seeking a stronger jawline and women wanting more definition.",
        shortDescription: "Define and contour your jawline for a sculpted profile.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
        price: "From ₾350",
        duration: "45-60 minutes",
        benefits: [
          "Creates defined jawline contour",
          "Improves facial symmetry",
          "Restores youthful definition",
          "Non-surgical facial contouring",
          "Results last 12-18 months"
        ],
        howItWorks: "Using a needle or cannula, hyaluronic acid filler is injected along the jawline to add definition and structure. The practitioner carefully places the filler to create a smooth, defined contour that complements your facial features.",
        aftercare: "Avoid touching the treated area. Sleep on your back for the first few nights. Avoid exercise and extreme temperatures for 24-48 hours.",
        faqs: [
          { question: "Is jaw filler painful?", answer: "Most patients experience minimal discomfort. We use fillers with built-in anesthetic and can apply numbing cream for added comfort." },
          { question: "How much filler will I need?", answer: "This depends on your goals and natural anatomy. A typical treatment uses 1-3ml of filler, but we'll discuss this during your consultation." }
        ]
      },
      {
        name: "Tear Trough Fillers",
        slug: "tear-trough",
        description: "Tear trough fillers are a specialized treatment for addressing under-eye hollows and dark circles. As we age, we lose volume in the under-eye area, creating a tired, hollow appearance. This treatment carefully places hyaluronic acid filler in the tear trough area to restore volume, reduce the appearance of dark circles, and create a fresher, more rested appearance. This is a technically demanding treatment that requires expert practitioners for optimal results.",
        shortDescription: "Reduce under-eye hollows and dark circles for a refreshed look.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾350",
        duration: "30-45 minutes",
        benefits: [
          "Reduces under-eye hollows",
          "Minimizes appearance of dark circles",
          "Creates fresher, rested appearance",
          "Non-surgical treatment",
          "Results last 12-18 months"
        ],
        howItWorks: "Using a blunt cannula for safety and precision, a small amount of hyaluronic acid filler is carefully placed in the tear trough area. The filler integrates with your natural tissue to restore volume and smooth the transition between the lower eyelid and cheek.",
        aftercare: "Apply cold compresses to reduce swelling. Avoid strenuous exercise for 24-48 hours. Sleep with your head elevated for the first few nights.",
        faqs: [
          { question: "Am I a good candidate for tear trough fillers?", answer: "This treatment works best for those with volume loss causing hollows. During consultation, we'll assess whether this treatment is right for you." },
          { question: "Is there downtime?", answer: "Some swelling and possible bruising can occur. Most patients return to normal activities within 1-2 days." }
        ]
      },
      {
        name: "Non-Surgical Rhinoplasty",
        slug: "non-surgical-rhinoplasty",
        description: "Non-surgical rhinoplasty, also known as the 'liquid nose job,' is an excellent option for those wanting to improve the appearance of their nose without surgery. Using dermal fillers, we can smooth bumps, correct asymmetry, lift a drooping nasal tip, and improve the overall shape of your nose. This treatment is quick, with minimal downtime, and results are visible immediately. It's perfect for those wanting to 'try on' a new nose shape before committing to surgery.",
        shortDescription: "Reshape and refine your nose without surgery.",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
        price: "From ₾350",
        duration: "30-45 minutes",
        benefits: [
          "Corrects bumps and asymmetry",
          "Lifts drooping nasal tip",
          "No surgery or downtime",
          "Immediate results",
          "Results last 12-18 months"
        ],
        howItWorks: "Hyaluronic acid filler is carefully injected into specific areas of the nose to reshape and refine. The practitioner uses precise technique to smooth contours, correct asymmetry, and create better nasal proportions.",
        aftercare: "Avoid touching or pressing on the nose. Avoid wearing glasses for 2 weeks. Sleep on your back. Avoid exercise for 48 hours.",
        faqs: [
          { question: "Can non-surgical rhinoplasty make my nose smaller?", answer: "This treatment can't reduce the size of your nose, but by adding volume strategically, we can create the illusion of a smaller, more refined nose." },
          { question: "How long do results last?", answer: "Results typically last 12-18 months. The nose area tends to hold filler well, and some patients find results last even longer." }
        ]
      },
      {
        name: "Marionette Lines",
        slug: "marionette-lines",
        description: "Marionette lines are the vertical lines that run from the corners of the mouth down to the chin, giving a puppet-like appearance. These lines develop as we age due to volume loss and skin laxity. Dermal fillers can effectively soften these lines by replacing lost volume and supporting the skin. This treatment can significantly improve the appearance of a downturned mouth and restore a more youthful, cheerful expression.",
        shortDescription: "Soften marionette lines for a more youthful, uplifted appearance.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾250",
        duration: "30 minutes",
        benefits: [
          "Softens deep lines around mouth",
          "Improves downturned appearance",
          "Restores youthful contours",
          "Quick treatment with minimal downtime",
          "Results last 12-18 months"
        ],
        howItWorks: "Hyaluronic acid filler is injected into the marionette lines to restore volume and support the skin. The filler fills in the hollows and creates a smoother transition from the mouth to the chin.",
        aftercare: "Avoid touching the area for 24 hours. Avoid exercise and extreme temperatures for 24-48 hours. Apply ice if needed to reduce swelling.",
        faqs: [
          { question: "Will it affect my smile?", answer: "No, the treatment is designed to improve your appearance without affecting your natural expressions or smile." },
          { question: "How much filler will I need?", answer: "Typically 1ml of filler is sufficient for treating marionette lines, but this varies by individual." }
        ]
      },
      {
        name: "Nasolabial Folds",
        slug: "nasolabial-folds",
        description: "Nasolabial folds, often called 'smile lines' or 'laugh lines,' are the deep lines that run from the sides of the nose to the corners of the mouth. While these lines are a natural part of facial expression, they can deepen with age due to volume loss and skin laxity. Dermal fillers can effectively soften these lines by replacing lost volume, creating a smoother, more youthful appearance while maintaining your natural expressions.",
        shortDescription: "Soften smile lines for a refreshed, youthful appearance.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾250",
        duration: "30 minutes",
        benefits: [
          "Softens deep smile lines",
          "Restores youthful appearance",
          "Maintains natural expressions",
          "Quick treatment",
          "Results last 12-18 months"
        ],
        howItWorks: "Hyaluronic acid filler is carefully injected into the nasolabial folds to restore volume and support the skin. The filler integrates with your natural tissue to smooth the lines from within.",
        aftercare: "Avoid touching the treated area for 24 hours. Avoid exercise and extreme temperatures for 24-48 hours. Sleep on your back for the first few nights.",
        faqs: [
          { question: "Will I still be able to smile naturally?", answer: "Absolutely. The treatment softens the lines while preserving your natural facial expressions and movement." },
          { question: "Is this treatment painful?", answer: "Most patients experience minimal discomfort. We use fillers with built-in anesthetic and can apply numbing cream." }
        ]
      },
      {
        name: "Temple Fillers",
        slug: "temple-fillers",
        description: "Temple fillers restore volume to the temples, an often-overlooked area that significantly impacts facial harmony. As we age, the temples can become hollow, creating a skeletal appearance and emphasizing other aging features. Dermal fillers in this area create a smoother transition from the forehead to the cheek, restoring youthful contours and balancing facial proportions.",
        shortDescription: "Restore volume to hollow temples for balanced facial contours.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾300",
        duration: "30 minutes",
        benefits: [
          "Restores volume to hollow temples",
          "Creates smoother facial contours",
          "Balances facial proportions",
          "Natural-looking results",
          "Results last 12-18 months"
        ],
        howItWorks: "Hyaluronic acid filler is carefully injected into the temple area to restore lost volume. The treatment creates a smooth transition between the forehead and cheeks, enhancing overall facial harmony.",
        aftercare: "Avoid touching the area for 24 hours. Sleep on your back for the first few nights. Avoid strenuous exercise for 24-48 hours.",
        faqs: [
          { question: "Will people notice I've had temple fillers?", answer: "No, when done properly, temple fillers create subtle, natural-looking improvements that enhance your features without looking obvious." },
          { question: "How long do results last?", answer: "Results typically last 12-18 months, depending on the type of filler used and your individual metabolism." }
        ]
      },
      {
        name: "Neck Rejuvenation",
        slug: "neck-rejuvenation",
        description: "Neck rejuvenation treatments address the signs of aging that often appear in the neck area, including horizontal lines, vertical bands, and skin laxity. Using a combination of Botox and dermal fillers, we can smooth lines, relax prominent neck bands, and restore a more youthful neck contour that matches your rejuvenated face.",
        shortDescription: "Smooth lines and restore youthful contours to the neck.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾400",
        duration: "30-45 minutes",
        benefits: [
          "Smooths horizontal neck lines",
          "Relaxes prominent neck bands",
          "Restores youthful neck contour",
          "Non-surgical treatment",
          "Minimal downtime"
        ],
        howItWorks: "Botox is injected into the platysma muscles to relax vertical neck bands, while dermal fillers address horizontal lines and restore volume. This combined approach creates comprehensive neck rejuvenation.",
        aftercare: "Avoid lying down for 4 hours. Avoid exercise for 24 hours. Keep head elevated when sleeping for the first few nights.",
        faqs: [
          { question: "How long until I see results?", answer: "Initial results from Botox appear within 3-7 days, with filler results visible immediately. Full results are apparent after 2 weeks." },
          { question: "Can this help with a 'turkey neck'?", answer: "Yes, neck rejuvenation can significantly improve the appearance of lax skin and prominent bands in the neck area." }
        ]
      },
      {
        name: "Décolletage Treatment",
        slug: "decolletage-treatment",
        description: "The décolletage area is often one of the first places to show signs of aging, with wrinkles, crepey skin, and sun damage becoming visible. Our décolletage treatments use a combination of skin boosters, microneedling, and specialized skincare to restore smoothness, hydration, and a youthful appearance to this delicate area.",
        shortDescription: "Restore smooth, youthful skin to the décolletage area.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾350",
        duration: "45-60 minutes",
        benefits: [
          "Smooths chest wrinkles",
          "Improves skin texture",
          "Restores hydration",
          "Reduces sun damage appearance",
          "Creates youthful décolletage"
        ],
        howItWorks: "A combination of skin boosters and microneedling stimulates collagen production and deeply hydrates the skin. This dual approach addresses both texture and volume loss in the décolletage area.",
        aftercare: "Avoid sun exposure for 48 hours. Apply SPF 30+ daily. Avoid hot showers and saunas for 24 hours. Keep the area moisturized.",
        faqs: [
          { question: "How many treatments will I need?", answer: "Most patients benefit from a series of 3 treatments spaced 4-6 weeks apart for optimal results." },
          { question: "Is there downtime?", answer: "There may be mild redness for 24-48 hours, but most patients can resume normal activities immediately." }
        ]
      },
      {
        name: "Hand Rejuvenation",
        slug: "hand-rejuvenation",
        description: "Hands often reveal our age before our face does, with visible veins, tendons, and volume loss becoming prominent over time. Hand rejuvenation uses dermal fillers to restore volume, minimizing the appearance of veins and tendons while creating smooth, youthful-looking hands that match your rejuvenated appearance.",
        shortDescription: "Restore volume and youthfulness to aging hands.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾400",
        duration: "30-45 minutes",
        benefits: [
          "Restores volume to hands",
          "Minimizes visible veins",
          "Reduces tendon prominence",
          "Creates youthful appearance",
          "Long-lasting results"
        ],
        howItWorks: "Dermal fillers are carefully injected beneath the skin on the back of the hands to restore lost volume. This creates a cushioning effect that minimizes the appearance of veins and tendons.",
        aftercare: "Avoid strenuous hand activities for 24 hours. Apply ice to reduce swelling. Avoid extreme temperatures for 48 hours. Results are immediate with final results after 1-2 weeks.",
        faqs: [
          { question: "Will I still be able to use my hands normally?", answer: "Yes, the fillers are placed in a way that doesn't affect hand function. You can resume normal activities after 24 hours." },
          { question: "How long do results last?", answer: "Hand rejuvenation results typically last 12-18 months, making it a long-lasting treatment for this area." }
        ]
      }
    ]
  },
  {
    name: "Body Contouring",
    slug: "body-contouring",
    description: "Advanced non-surgical treatments for sculpting and contouring the body, addressing stubborn fat, skin laxity, and cellulite.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    treatments: [
      {
        name: "Endolift Body",
        slug: "endolift-body",
        description: "Endolift is an innovative minimally invasive laser treatment that targets stubborn fat and tightens skin on the body. The laser fiber is inserted beneath the skin through tiny incisions, delivering energy that melts fat and stimulates collagen production. It's excellent for treating areas like the abdomen, arms, thighs, and knees with minimal downtime compared to traditional liposuction.",
        shortDescription: "Minimally invasive laser for fat reduction and skin tightening on the body.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾2,000",
        duration: "60-120 minutes",
        benefits: [
          "Targets stubborn fat",
          "Tightens loose skin",
          "Minimally invasive",
          "Immediate results",
          "Continued improvement over months"
        ],
        howItWorks: "A microfiber laser is inserted beneath the skin to directly target fat cells and stimulate collagen. The laser energy melts fat which is then naturally eliminated by the body while simultaneously tightening the skin.",
        aftercare: "Wear compression garment for 1-2 weeks. Avoid strenuous exercise for 1 week. Results improve over 3-6 months as collagen builds.",
        faqs: [
          { question: "What areas can be treated?", answer: "Endolift can treat abdomen, flanks, arms, inner thighs, knees, and other areas with localized fat and skin laxity." },
          { question: "Is it like liposuction?", answer: "Endolift is less invasive than traditional liposuction, with smaller incisions and the added benefit of skin tightening from the laser energy." }
        ]
      },
      {
        name: "Body Skin Tightening",
        slug: "body-skin-tightening",
        description: "Our body skin tightening treatments use radiofrequency and ultrasound technology to stimulate collagen production and firm loose skin on the body. This non-invasive treatment is perfect for addressing skin laxity after weight loss, pregnancy, or due to aging, without the need for surgery.",
        shortDescription: "Non-invasive treatment to firm and tighten loose body skin.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾350",
        duration: "45-90 minutes",
        benefits: [
          "Firms loose skin",
          "Stimulates collagen",
          "Non-invasive",
          "No downtime",
          "Gradual, natural results"
        ],
        howItWorks: "Radiofrequency or ultrasound energy is delivered deep into the skin to heat tissue and stimulate collagen and elastin production. This process naturally tightens and firms the skin over time.",
        aftercare: "No downtime required. Stay hydrated. Results develop over 2-3 months as collagen builds. Multiple sessions recommended for optimal results.",
        faqs: [
          { question: "How many sessions will I need?", answer: "Most patients need 4-6 sessions spaced 2-4 weeks apart for optimal results, followed by maintenance treatments." },
          { question: "Does it hurt?", answer: "The treatment is generally comfortable. You may feel a warming sensation as the energy is delivered to the deeper layers of skin." }
        ]
      }
    ]
  },
  {
    name: "Laser Treatments",
    slug: "laser",
    description: "Advanced laser technology for skin rejuvenation, resurfacing, and treating various skin concerns with precision.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    treatments: [
      {
        name: "Clear + Brilliant",
        slug: "clear-brilliant",
        description: "Clear + Brilliant is a gentle fractional laser treatment designed to prevent and address early signs of aging. This treatment creates microscopic treatment zones in the skin, stimulating collagen production and replacing damaged skin with healthy, younger-looking tissue. It's perfect for those wanting to maintain their skin's youthful appearance or address early signs of aging, fine lines, and skin texture issues with minimal downtime.",
        shortDescription: "Gentle laser treatment for smoother, more radiant skin.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾300",
        duration: "30-45 minutes",
        benefits: [
          "Improves skin texture and tone",
          "Reduces fine lines",
          "Minimizes pore size",
          "Minimal downtime",
          "Prevents signs of aging"
        ]
      },
      {
        name: "Cutera AviClear",
        slug: "cutera-aviclear",
        description: "AviClear is a revolutionary FDA-cleared laser treatment specifically designed to treat acne. It's the first and only device of its kind, using a 1726nm wavelength laser to target and suppress sebum production in the sebaceous glands. This treatment addresses acne at its source, providing long-lasting results without the need for medications. Most patients see significant improvement with just three 30-minute treatments.",
        shortDescription: "Revolutionary laser treatment targeting acne at its source.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾400",
        duration: "30 minutes",
        benefits: [
          "FDA-cleared for acne treatment",
          "Targets sebum production",
          "No medication required",
          "Long-lasting results",
          "Suitable for all skin types"
        ]
      },
      {
        name: "Cutera CO2 Laser",
        slug: "cutera-c02-laser",
        description: "The Cutera CO2 laser is a powerful skin resurfacing treatment that addresses significant skin concerns including deep wrinkles, acne scars, sun damage, and skin laxity. This fractional CO2 laser creates controlled micro-injuries in the skin, stimulating significant collagen production and skin renewal. It's one of the most effective treatments for dramatic skin rejuvenation with results that can last for years.",
        shortDescription: "Powerful resurfacing for deep wrinkles, scars, and sun damage.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾800",
        duration: "60-90 minutes",
        benefits: [
          "Dramatic skin rejuvenation",
          "Treats deep wrinkles",
          "Improves acne scarring",
          "Addresses sun damage",
          "Long-lasting results"
        ]
      },
      {
        name: "Cutera Secret PRO RF Microneedling",
        slug: "cutera-secret-pro-rf-microneedling",
        description: "The Cutera Secret PRO combines radiofrequency energy with microneedling for powerful skin rejuvenation. The treatment delivers RF energy through tiny needles, creating controlled micro-injuries while heating the deeper layers of skin. This dual-action approach stimulates significant collagen production, improving skin texture, fine lines, wrinkles, acne scars, and skin laxity with less downtime than traditional resurfacing.",
        shortDescription: "Combined RF and microneedling for powerful skin rejuvenation.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
        price: "From ₾450",
        duration: "45-60 minutes",
        benefits: [
          "Stimulates collagen production",
          "Improves skin texture",
          "Reduces fine lines",
          "Minimizes acne scarring",
          "Tightens skin"
        ]
      },
      {
        name: "Cutera Excel V+ IPL",
        slug: "cutera-excel-v-ipl",
        description: "The Cutera Excel V+ is an advanced vascular and pigment laser system that treats a wide range of skin concerns including rosacea, facial veins, sun damage, age spots, and unwanted pigment. This versatile system uses both 532nm and 1064nm wavelengths to target various concerns with precision. It's excellent for overall skin rejuvenation and creating a more even, clear complexion.",
        shortDescription: "Advanced laser for vascular concerns, pigmentation, and skin rejuvenation.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾250",
        duration: "30-45 minutes",
        benefits: [
          "Treats rosacea and facial veins",
          "Reduces sun damage",
          "Improves skin tone",
          "Quick treatment",
          "No downtime"
        ]
      },
      {
        name: "Candela VBeam Laser",
        slug: "candela-vbeam-laser",
        description: "The Candela VBeam is a pulsed dye laser specifically designed to treat vascular conditions. It's the gold standard for treating rosacea, facial veins, port wine stains, hemangiomas, and other vascular lesions. The laser targets blood vessels without damaging surrounding tissue, making it a safe and effective treatment for redness and vascular concerns. It's also effective for treating stretch marks and scars.",
        shortDescription: "Gold standard laser for vascular conditions and redness.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾200",
        duration: "20-30 minutes",
        benefits: [
          "Treats rosacea",
          "Removes facial veins",
          "Reduces redness",
          "Improves scars",
          "Minimal downtime"
        ]
      },
      {
        name: "BBL HERO",
        slug: "bbl-hero",
        description: "BBL HERO (BroadBand Light High Energy Rapid Output) is the most advanced IPL technology available. This treatment delivers light energy deep into the skin to target pigmentation, redness, and signs of aging. The HERO technology allows for faster treatment times and larger treatment areas, making it ideal for full-body treatments. It's excellent for sun damage, age spots, rosacea, and overall skin rejuvenation.",
        shortDescription: "Advanced IPL for full-body skin rejuvenation and pigmentation.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾350",
        duration: "30-60 minutes",
        benefits: [
          "Full-body treatment option",
          "Treats sun damage",
          "Reduces pigmentation",
          "Quick treatment time",
          "Improves skin tone"
        ]
      },
      {
        name: "MOXI Laser",
        slug: "moxi-laser",
        description: "MOXI is a gentle fractional laser that delivers non-ablative treatment for skin rejuvenation. It's designed to refresh and revitalize skin with minimal downtime, making it perfect for those wanting a 'lunchtime' treatment that delivers real results. MOXI improves skin texture, tone, and overall radiance while being gentle enough for all skin types and tones. It's excellent for preventative care and maintaining healthy, glowing skin.",
        shortDescription: "Gentle fractional laser for refreshed, glowing skin.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
        price: "From ₾300",
        duration: "20-30 minutes",
        benefits: [
          "Minimal downtime",
          "All skin types",
          "Improves texture",
          "Enhances radiance",
          "Preventative treatment"
        ]
      },
      {
        name: "MOXI and BBL",
        slug: "moxi-and-bbl",
        description: "The combination of MOXI and BBL treatments offers comprehensive skin rejuvenation. MOXI addresses texture and stimulates collagen, while BBL targets pigment and vascular concerns. Together, they provide a powerful synergy that improves overall skin quality, tone, texture, and radiance. This combination is ideal for those wanting significant results with minimal downtime.",
        shortDescription: "Combined treatment for comprehensive skin rejuvenation.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾500",
        duration: "45-60 minutes",
        benefits: [
          "Comprehensive rejuvenation",
          "Addresses texture and pigment",
          "Minimal downtime",
          "Synergistic results",
          "All skin types"
        ]
      },
      {
        name: "Endolift",
        slug: "endolift",
        description: "Endolift is an innovative minimally invasive laser treatment that uses a microfiber laser to target fat and tighten skin. The laser fiber is inserted beneath the skin through tiny incisions, delivering energy that melts fat and stimulates collagen production. It's excellent for treating jowls, double chin, and loose skin on the face and body. Results include immediate tightening with continued improvement over several months.",
        shortDescription: "Minimally invasive laser for fat reduction and skin tightening.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾1,500",
        duration: "60-90 minutes",
        benefits: [
          "Minimally invasive",
          "Fat reduction",
          "Skin tightening",
          "Immediate results",
          "Continued improvement"
        ]
      }
    ]
  },
  {
    name: "Skin Treatments",
    slug: "skin",
    description: "Medical-grade peels, microneedling, and advanced skincare treatments for radiant, healthy skin.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    treatments: [
      {
        name: "iS Clinical Fire & Ice Peel",
        slug: "is-clinical-fire-ice-peel",
        description: "The iS Clinical Fire & Ice Peel is a results-driven professional treatment designed to resurface the skin, treating fine lines, wrinkles, and uneven texture. Known as the 'Red Carpet Peel,' this intensive clinical treatment combines two treatment phases - the 'Fire' intensive resurfacing and the 'Ice' rejuvenating mask. It delivers dramatic results with little to no downtime, making it perfect before special events.",
        shortDescription: "Intensive resurfacing treatment for dramatic, instant results.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾200",
        duration: "45-60 minutes",
        benefits: [
          "Immediate visible results",
          "Resurfaces skin texture",
          "Reduces fine lines",
          "Improves skin tone",
          "Little to no downtime"
        ]
      },
      {
        name: "Mesoestetic Cosmelan Peel",
        slug: "mesoestetic-cosmelan-peel",
        description: "The Cosmelan Peel is a world-renowned depigmentation treatment that effectively reduces and eliminates dark spots and melasma. This professional-grade treatment works by inhibiting the enzyme responsible for melanin production, effectively treating hyperpigmentation at its source. The treatment includes both an in-clinic mask and take-home maintenance products for optimal results.",
        shortDescription: "Professional depigmentation treatment for dark spots and melasma.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾600",
        duration: "Initial treatment 60 minutes",
        benefits: [
          "Treats melasma",
          "Reduces dark spots",
          "Evens skin tone",
          "Long-lasting results",
          "Professional formula"
        ]
      },
      {
        name: "Obagi Blue Radiance Peel",
        slug: "obagi-blue-radiance-peel",
        description: "The Obagi Blue Radiance Peel is a superficial to medium depth chemical peel that uses a blend of salicylic, glycolic, and lactic acids to exfoliate and improve skin surface texture and tone. This treatment is excellent for those wanting to improve the appearance of photodamaged skin, fine lines, and mild acne scarring with minimal downtime. Multiple treatments provide progressive improvement.",
        shortDescription: "Chemical peel for smoother, brighter skin.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
        price: "From ₾150",
        duration: "30-45 minutes",
        benefits: [
          "Improves skin texture",
          "Reduces fine lines",
          "Addresses photodamage",
          "Minimal downtime",
          "Progressive results"
        ]
      },
      {
        name: "Obagi Nu-Derm",
        slug: "obagi-nu-derm",
        description: "The Obagi Nu-Derm System is a comprehensive skincare protocol that transforms skin at the cellular level. This physician-dispensed system is designed to treat moderate to severe photodamage, hyperpigmentation, and premature aging. The system includes multiple products that work together to accelerate cellular turnover, improve skin tone, and reveal healthier, younger-looking skin over 12-18 weeks.",
        shortDescription: "Transformative skincare system for photodamage and aging.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾450",
        duration: "12-18 week program",
        benefits: [
          "Comprehensive transformation",
          "Treats photodamage",
          "Improves hyperpigmentation",
          "Accelerates cell turnover",
          "Long-lasting results"
        ]
      },
      {
        name: "SkinPen Microneedling",
        slug: "skinpen-microneedling",
        description: "SkinPen is the first FDA-cleared microneedling device, delivering precise, controlled micro-injuries to stimulate the skin's natural healing process. This treatment effectively improves acne scars, fine lines, wrinkles, and overall skin texture. The device creates thousands of microscopic channels in the skin, triggering collagen and elastin production for smoother, healthier-looking skin. Results continue to improve for months after treatment.",
        shortDescription: "FDA-cleared microneedling for scars, lines, and texture.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
        price: "From ₾250",
        duration: "45-60 minutes",
        benefits: [
          "FDA-cleared device",
          "Improves acne scarring",
          "Reduces fine lines",
          "Natural collagen production",
          "Suitable for all skin types"
        ]
      }
    ]
  },
  {
    name: "Skin Laxity",
    slug: "skin-laxity",
    description: "Non-surgical skin tightening and lifting treatments using advanced energy-based technologies.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    treatments: [
      {
        name: "Emface",
        slug: "emface",
        description: "Emface is the first device to simultaneously treat facial muscles and skin using synchronized radiofrequency and HIFES™ technology. This groundbreaking treatment builds and tones facial muscles while tightening the skin, providing a non-invasive facelift effect. In just 20 minutes, Emface delivers the equivalent of 20,000 facial muscle contractions while heating the dermis for collagen remodeling. Results include lifted cheeks, reduced wrinkles, and improved facial contours.",
        shortDescription: "Non-invasive facial toning and skin tightening.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾800",
        duration: "20 minutes",
        benefits: [
          "Builds facial muscle",
          "Tightens skin",
          "Non-invasive facelift",
          "No downtime",
          "Quick 20-minute treatment"
        ]
      },
      {
        name: "Exion Face & Body",
        slug: "exion-face-body",
        description: "Exion is an innovative treatment combining radiofrequency with artificial intelligence for precise skin tightening and contouring. The device automatically adjusts energy delivery based on individual tissue response, ensuring optimal results. Exion can treat both face and body, addressing skin laxity, texture, and contouring concerns. It's particularly effective for areas that have been difficult to treat non-surgically.",
        shortDescription: "AI-powered RF treatment for face and body contouring.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾400",
        duration: "30-45 minutes",
        benefits: [
          "AI-optimized treatment",
          "Face and body application",
          "Skin tightening",
          "Body contouring",
          "Precise energy delivery"
        ]
      },
      {
        name: "HIFU Treatment",
        slug: "hifu-treatment",
        description: "High-Intensity Focused Ultrasound (HIFU) delivers ultrasound energy to the foundational layers of the skin, creating a non-surgical lifting and tightening effect. By targeting the SMAS layer (the same layer addressed in surgical facelifts), HIFU stimulates significant collagen production and tissue contraction. This treatment provides gradual, natural-looking lifting results that develop over 2-3 months and can last up to a year.",
        shortDescription: "Ultrasound-based non-surgical facelift.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾500",
        duration: "60-90 minutes",
        benefits: [
          "Non-surgical lifting",
          "Targets SMAS layer",
          "Long-lasting results",
          "Natural improvement",
          "Single treatment"
        ]
      },
      {
        name: "MINT PDO Thread Lift",
        slug: "mint-pdo-thread-lift",
        description: "MINT PDO Thread Lift is a minimally invasive procedure that uses absorbable polydioxanone (PDO) threads to lift and tighten sagging skin. These specialized threads are inserted beneath the skin to provide immediate lifting while stimulating collagen production for long-term improvement. The procedure is excellent for lifting the mid-face, jowls, jawline, and neck with results that can last 12-18 months.",
        shortDescription: "Minimally invasive thread lift for immediate results.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾800",
        duration: "45-60 minutes",
        benefits: [
          "Immediate lifting",
          "Collagen stimulation",
          "Minimally invasive",
          "Long-lasting results",
          "Natural improvement"
        ]
      },
      {
        name: "Morpheus8",
        slug: "morpheus-8-treatment",
        description: "Morpheus8 is a fractional skin treatment that combines microneedling with radiofrequency energy to remodel and contour the face and body. By delivering RF energy through tiny needles deep into the skin, Morpheus8 stimulates significant collagen production while tightening the underlying tissue. It's highly effective for treating skin laxity, wrinkles, acne scars, and improving overall skin quality. The treatment can be customized for various depths and treatment areas.",
        shortDescription: "Fractional RF microneedling for skin remodeling.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
        price: "From ₾600",
        duration: "45-60 minutes",
        benefits: [
          "Deep skin remodeling",
          "Tightens skin",
          "Improves contours",
          "Reduces wrinkles",
          "Customizable depth"
        ]
      },
      {
        name: "Nanothreads",
        slug: "nanothreads",
        description: "Nanothreads are ultra-fine PDO threads designed for subtle skin rejuvenation and texture improvement. Unlike traditional lifting threads, nanothreads focus on stimulating collagen production to improve skin quality, fine lines, and overall radiance. They're perfect for delicate areas like around the eyes and mouth, or for those wanting a subtle refresh without dramatic lifting.",
        shortDescription: "Fine threads for skin rejuvenation and texture improvement.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        price: "From ₾400",
        duration: "30-45 minutes",
        benefits: [
          "Improves skin quality",
          "Stimulates collagen",
          "Subtle rejuvenation",
          "Delicate areas",
          "Minimal downtime"
        ]
      },
      {
        name: "Neogen Plasma",
        slug: "neogen-plasma",
        description: "Neogen Plasma uses nitrogen plasma energy to treat skin concerns without ablation or charring. This innovative treatment delivers controlled thermal energy to the skin, stimulating significant collagen production and renewal. It's effective for treating wrinkles, acne scars, skin laxity, and eyelid concerns. The treatment provides dramatic results with less downtime than traditional resurfacing procedures.",
        shortDescription: "Plasma energy treatment for skin renewal.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾500",
        duration: "30-60 minutes",
        benefits: [
          "Non-ablative treatment",
          "Stimulates collagen",
          "Treats eyelid concerns",
          "Reduces scarring",
          "Skin renewal"
        ]
      },
      {
        name: "Thermage FLX",
        slug: "thermage-flx",
        description: "Thermage FLX is the latest generation of the legendary Thermage skin tightening treatment. Using radiofrequency energy, Thermage heats the deep dermis while cooling the skin surface, stimulating collagen production and immediate tissue tightening. A single treatment can provide results that last for years, making it one of the most effective non-invasive skin tightening options available. It's excellent for the face, eyes, and body.",
        shortDescription: "Advanced RF skin tightening with long-lasting results.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        price: "From ₾1,500",
        duration: "60-90 minutes",
        benefits: [
          "Single treatment",
          "Long-lasting results",
          "Face and body",
          "Immediate tightening",
          "Continued improvement"
        ]
      }
    ]
  },
  {
    name: "Body Treatments",
    slug: "body",
    description: "Advanced body contouring, skin tightening, and rejuvenation treatments.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    treatments: [
      {
        name: "Profhilo Body",
        slug: "profhilo-body",
        description: "Profhilo Body is an injectable hyaluronic acid treatment specifically designed for body skin quality improvement. Using the patented NAHYCO technology, Profhilo delivers stabilized hyaluronic acid that remodels skin from within. It's excellent for treating crepey skin on the arms, neck, décolletage, knees, and other body areas. The treatment hydrates, firms, and improves skin elasticity with a minimal injection protocol.",
        shortDescription: "Injectable HA treatment for body skin quality.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾400",
        duration: "30 minutes",
        benefits: [
          "Improves skin quality",
          "Hydrates and firms",
          "Minimal injections",
          "Treats crepey skin",
          "Natural results"
        ]
      },
      {
        name: "Morpheus8 Body",
        slug: "morpheus8-body",
        description: "Morpheus8 Body brings the power of fractional RF microneedling to body treatments. With larger treatment tips and deeper penetration capabilities, Morpheus8 Body addresses skin laxity, cellulite, and texture concerns on the body. It's highly effective for treating the abdomen, thighs, arms, and other areas where skin has lost firmness. The treatment remodels tissue deep beneath the skin surface for noticeable contouring and tightening.",
        shortDescription: "Fractional RF microneedling for body contouring.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾800",
        duration: "60-90 minutes",
        benefits: [
          "Deep tissue remodeling",
          "Reduces cellulite",
          "Tightens skin",
          "Body contouring",
          "Large treatment areas"
        ]
      },
      {
        name: "Exion Body",
        slug: "exion-body",
        description: "Exion Body uses AI-powered radiofrequency technology for body contouring and skin tightening. The device automatically adjusts energy delivery based on individual tissue response for optimal results. It's effective for treating skin laxity and improving contours on the abdomen, thighs, arms, and other body areas. The treatment is comfortable with no downtime required.",
        shortDescription: "AI-powered RF body contouring treatment.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾500",
        duration: "45-60 minutes",
        benefits: [
          "AI-optimized treatment",
          "Body contouring",
          "Skin tightening",
          "No downtime",
          "Comfortable treatment"
        ]
      },
      {
        name: "Thermage Body",
        slug: "thermage-body",
        description: "Thermage Body delivers radiofrequency energy deep into the skin to tighten and contour body areas. This non-invasive treatment heats the deep dermis while cooling the skin surface, stimulating collagen production for tighter, smoother skin. It's excellent for addressing skin laxity after weight loss, pregnancy, or aging on areas like the abdomen, thighs, arms, and buttocks.",
        shortDescription: "Non-invasive RF body tightening.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾1,500",
        duration: "90-120 minutes",
        benefits: [
          "Non-invasive",
          "Single treatment",
          "Long-lasting results",
          "Multiple body areas",
          "Collagen stimulation"
        ]
      },
      {
        name: "Ultraformer HIFU Body",
        slug: "ultraformer-hifu-body",
        description: "Ultraformer is an advanced HIFU (High-Intensity Focused Ultrasound) device for body contouring and skin tightening. The treatment delivers focused ultrasound energy to the foundational layers of the skin, creating thermal coagulation points that stimulate collagen production and tissue contraction. It's effective for treating localized fat, skin laxity, and improving body contours without surgery or downtime.",
        shortDescription: "HIFU body contouring and skin tightening.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾600",
        duration: "60-90 minutes",
        benefits: [
          "Non-surgical contouring",
          "Skin tightening",
          "Targeted fat reduction",
          "No downtime",
          "Gradual results"
        ]
      }
    ]
  },
  {
    name: "Intimate Treatments",
    slug: "intimate",
    description: "Specialized treatments for intimate areas with the highest standards of care and privacy.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    treatments: [
      {
        name: "Dermamelan Intimate Peel",
        slug: "dermamelan-intimate-peel",
        description: "Dermamelan Intimate is a specialized depigmentation treatment designed for intimate areas including the genital and perianal regions. This professional treatment safely and effectively reduces hyperpigmentation in these sensitive areas, improving skin tone and boosting confidence. The treatment includes both in-clinic and at-home components for optimal results.",
        shortDescription: "Specialized depigmentation for intimate areas.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾800",
        duration: "Initial treatment 60 minutes",
        benefits: [
          "Safe for intimate areas",
          "Reduces hyperpigmentation",
          "Improves skin tone",
          "Boosts confidence",
          "Professional treatment"
        ]
      },
      {
        name: "Intimate Laser Hair Removal",
        slug: "intimate-laser-hair-removal",
        description: "Our intimate laser hair removal service provides safe, effective, and permanent hair reduction for sensitive areas. Using advanced laser technology with built-in cooling for comfort, we offer Brazilian and Hollywood hair removal options. Our trained practitioners ensure your comfort and privacy throughout the treatment, with most patients achieving significant hair reduction after 6-8 sessions.",
        shortDescription: "Permanent hair reduction for intimate areas.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾150",
        duration: "30-45 minutes",
        benefits: [
          "Permanent hair reduction",
          "Safe and comfortable",
          "Complete privacy",
          "Brazilian and Hollywood options",
          "Advanced cooling technology"
        ]
      }
    ]
  },
  {
    name: "Medical Facials",
    slug: "medical-facials",
    description: "Results-driven facial treatments using medical-grade products and techniques.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    treatments: [
      {
        name: "Filter Facial",
        slug: "filter-facial",
        description: "The Filter Facial is our signature results-driven facial designed to give you that 'filtered' look in real life. This multi-step treatment combines deep cleansing, exfoliation, specialized serums, and advanced technology to improve skin texture, reduce pore size, and create a flawless complexion. Perfect before special events or as regular maintenance for glowing skin.",
        shortDescription: "Signature facial for a flawless, filtered look.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾150",
        duration: "60 minutes",
        benefits: [
          "Immediate visible results",
          "Reduces pore appearance",
          "Improves skin texture",
          "Creates flawless finish",
          "Perfect for events"
        ]
      },
      {
        name: "Caviar Peel",
        slug: "caviar-peel",
        description: "The Caviar Peel is a luxurious treatment that combines the benefits of a chemical peel with the nourishing properties of caviar extract. This unique treatment exfoliates and renews the skin while delivering essential nutrients and antioxidants. The result is smoother, brighter, more youthful-looking skin with improved hydration and elasticity.",
        shortDescription: "Luxurious exfoliating treatment with caviar extract.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        price: "From ₾200",
        duration: "60 minutes",
        benefits: [
          "Gentle exfoliation",
          "Nourishes skin",
          "Anti-aging benefits",
          "Improves hydration",
          "Luxurious experience"
        ]
      }
    ]
  },
  {
    name: "Diagnostic",
    slug: "diagnostic",
    description: "Advanced skin analysis and diagnostic tools to personalize your treatment plan.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    treatments: [
      {
        name: "Observe Skin Scanner",
        slug: "observe-skin-scanner",
        description: "The Observe Skin Scanner is an advanced imaging system that analyzes your skin at multiple layers to reveal underlying concerns not visible to the naked eye. This comprehensive analysis examines pigmentation, UV damage, vascular conditions, pores, wrinkles, and skin texture. The results guide your personalized treatment plan for optimal outcomes.",
        shortDescription: "Advanced skin analysis for personalized treatment planning.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        price: "From ₾50",
        duration: "30 minutes",
        benefits: [
          "Multi-layer analysis",
          "Reveals hidden concerns",
          "Personalized treatment plan",
          "Tracks progress",
          "Educational experience"
        ]
      }
    ]
  },
  {
    name: "Hair Treatments",
    slug: "hair",
    description: "Hair restoration, extensions, nails, and lash finishing services for complete salon care.",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    treatments: [
      {
        name: "Hair Treatments",
        slug: "hair-treatments",
        description: "Our comprehensive hair restoration treatments address various forms of hair loss and scalp concerns. Using advanced techniques including PRP therapy, mesotherapy, and specialized products, we stimulate hair follicles, improve scalp health, and promote hair growth. Treatments are customized based on your specific hair loss pattern and goals.",
        shortDescription: "Advanced hair restoration and scalp treatments.",
        image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
        price: "From ₾200",
        duration: "45-60 minutes",
        benefits: [
          "Stimulates hair growth",
          "Improves scalp health",
          "Multiple treatment options",
          "Customized approach",
          "Professional guidance"
        ]
      },
      {
        name: "Hair Extensions",
        slug: "hair-extensions",
        description: "Hair extensions are planned around your natural color, density, lifestyle, and desired finish. During consultation we assess the hair, select the right extension method, plan the blend, and explain maintenance so the result feels comfortable, polished, and natural from every angle.",
        shortDescription: "Color-matched extensions for fuller, longer, natural-looking hair.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        price: "Consultation required",
        duration: "30-120 minutes",
        benefits: [
          "Adds length and volume",
          "Personalized color matching",
          "Natural blend planning",
          "Maintenance guidance",
          "Salon-finished result"
        ],
        howItWorks: "We begin with a consultation to match color, review hair condition, and choose the correct extension approach. Application time depends on the chosen method, desired density, and the preparation needed for a seamless blend.",
        aftercare: "Use recommended products, brush gently from ends upward, avoid heavy oils near the bonds or attachments, and return for maintenance on the schedule advised by your stylist."
      },
      {
        name: "Nails",
        slug: "nails",
        description: "Our nail appointments focus on clean shaping, precise cuticle care, polish selection, and a refined finish. Services can be tailored for everyday maintenance, a special event, or a longer-wear look with careful attention to nail health and comfort.",
        shortDescription: "Manicure, pedicure, and nail finishing services with detailed care.",
        image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80",
        price: "From GEL 60",
        duration: "45-75 minutes",
        benefits: [
          "Clean shaping and cuticle care",
          "Polished salon finish",
          "Hands and feet options",
          "Color and finish guidance",
          "Comfort-focused appointment"
        ],
        howItWorks: "Your nail specialist prepares the nails, refines shape and cuticles, then applies the selected finish with care for symmetry, durability, and a polished final look.",
        aftercare: "Avoid heavy hand work immediately after polish, moisturize cuticles daily, and book maintenance before lifting or visible regrowth affects the finish."
      },
      {
        name: "Lashes",
        slug: "lashes",
        description: "Lash services are designed to enhance the eye area with a natural, well-shaped finish. We assess your lash length, direction, and desired result before recommending a lift, styling appointment, or fuller lash finish with clear aftercare.",
        shortDescription: "Lash lift, styling, and finishing services shaped around your eyes.",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
        price: "From GEL 80",
        duration: "30-60 minutes",
        benefits: [
          "Enhances natural lashes",
          "Personalized shape planning",
          "Opens and defines the eye area",
          "Low-maintenance finish",
          "Clear aftercare guidance"
        ],
        howItWorks: "We review your natural lash pattern and desired result, prepare the lashes, and complete the selected lift or styling service with a controlled, eye-safe process.",
        aftercare: "Keep lashes dry for the advised period, avoid oil-heavy products near the lash line, and brush gently to maintain the finished shape."
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

type TreatmentLocale = 'en' | 'ka' | 'ru' | 'tr' | 'ar' | 'he';

const supportedTreatmentLocales = new Set<TreatmentLocale>([
  'en',
  'ka',
  'ru',
  'tr',
  'ar',
  'he',
]);

const treatmentContentCategoryAliases: Record<string, string> = {
  'body-contouring': 'body-treatments',
  laser: 'laser-treatments',
  skin: 'skin-treatments',
  'skin-laxity': 'skin-treatments',
  body: 'body-treatments',
  intimate: 'intimate-treatments',
  hair: 'hair-treatments',
};

const categoryNames: Record<Exclude<TreatmentLocale, 'en'>, Record<string, string>> = {
  ka: {
    botox: 'ბოტოქსის ინექციები',
    'dermal-fillers': 'დერმალური ფილერები',
    'body-contouring': 'სხეულის კონტურირება',
    laser: 'ლაზერული პროცედურები',
    skin: 'კანის პროცედურები',
    'skin-laxity': 'კანის მოდუნება',
    body: 'სხეულის პროცედურები',
    intimate: 'ინტიმური ზონის პროცედურები',
    'medical-facials': 'სამედიცინო სახის მოვლა',
    diagnostic: 'დიაგნოსტიკა',
    hair: 'თმის პროცედურები',
  },
  ru: {
    botox: 'Инъекционные процедуры с ботоксом',
    'dermal-fillers': 'Дермальные филлеры',
    'body-contouring': 'Контурирование тела',
    laser: 'Лазерные процедуры',
    skin: 'Процедуры для кожи',
    'skin-laxity': 'Дряблость кожи',
    body: 'Процедуры для тела',
    intimate: 'Интимные процедуры',
    'medical-facials': 'Медицинские уходы за лицом',
    diagnostic: 'Диагностика',
    hair: 'Процедуры для волос',
  },
  tr: {
    botox: 'Botoks uygulamaları',
    'dermal-fillers': 'Dermal dolgular',
    'body-contouring': 'Vücut şekillendirme',
    laser: 'Lazer uygulamaları',
    skin: 'Cilt uygulamaları',
    'skin-laxity': 'Cilt gevşekliği',
    body: 'Vücut uygulamaları',
    intimate: 'İntim bölge uygulamaları',
    'medical-facials': 'Medikal cilt bakımları',
    diagnostic: 'Cilt analizi',
    hair: 'Saç uygulamaları',
  },
  ar: {
    botox: 'حقن البوتوكس',
    'dermal-fillers': 'الفيلر الجلدي',
    'body-contouring': 'نحت الجسم',
    laser: 'علاجات الليزر',
    skin: 'علاجات البشرة',
    'skin-laxity': 'ترهل البشرة',
    body: 'علاجات الجسم',
    intimate: 'علاجات المنطقة الحميمة',
    'medical-facials': 'جلسات طبية للوجه',
    diagnostic: 'تشخيص البشرة',
    hair: 'علاجات الشعر',
  },
  he: {
    botox: 'הזרקות בוטוקס',
    'dermal-fillers': 'פילרים דרמליים',
    'body-contouring': 'עיצוב הגוף',
    laser: 'טיפולי לייזר',
    skin: 'טיפולי עור',
    'skin-laxity': 'רפיון העור',
    body: 'טיפולי גוף',
    intimate: 'טיפולים אינטימיים',
    'medical-facials': 'טיפולי פנים רפואיים',
    diagnostic: 'אבחון עור',
    hair: 'טיפולי שיער',
  },
};

const genericTreatmentNames: Record<Exclude<TreatmentLocale, 'en'>, Record<string, string>> = {
  ka: {
    'body-skin-tightening': 'სხეულის კანის დაჭიმვა',
    'hair-treatments': 'თმის პროცედურები',
  },
  ru: {
    'body-skin-tightening': 'Подтяжка кожи тела',
    'hair-treatments': 'Процедуры для волос',
  },
  tr: {
    'body-skin-tightening': 'Vücut cildi sıkılaştırma',
    'hair-treatments': 'Saç uygulamaları',
  },
  ar: {
    'body-skin-tightening': 'شد بشرة الجسم',
    'hair-treatments': 'علاجات الشعر',
  },
  he: {
    'body-skin-tightening': 'מיצוק עור הגוף',
    'hair-treatments': 'טיפולי שיער',
  },
};

type SupplementalTreatmentTranslation = {
  name: string;
  description: string;
};

const supplementalTreatmentTranslations: Record<
  Exclude<TreatmentLocale, 'en'>,
  Record<string, SupplementalTreatmentTranslation>
> = {
  ka: {
    'endolift-body': {
      name: 'ენდოლიფტი სხეულისთვის',
      description: 'მინიმალურად ინვაზიური ლაზერული პროცედურა ლოკალური ცხიმის შესამცირებლად და სხეულის კანის დასაჭიმად.',
    },
    'body-skin-tightening': {
      name: 'სხეულის კანის დაჭიმვა',
      description: 'არაინვაზიური პროცედურა რადიოსიხშირისა და ულტრაბგერის გამოყენებით, რომელიც ასტიმულირებს კოლაგენს და ამკვრივებს მოდუნებულ კანს.',
    },
    emface: {
      name: 'Emface',
      description: 'სახის კუნთების ტონუსისა და კანის დაჭიმვის არაინვაზიური პროცედურა რადიოსიხშირისა და HIFES™ ტექნოლოგიით.',
    },
    'exion-face-body': {
      name: 'Exion სახისა და სხეულისთვის',
      description: 'ხელოვნური ინტელექტით მართული რადიოსიხშირული პროცედურა სახისა და სხეულის კანის დასაჭიმად და კონტურების გასაუმჯობესებლად.',
    },
    'hifu-treatment': {
      name: 'HIFU პროცედურა',
      description: 'ფოკუსირებული ულტრაბგერითი ლიფტინგი, რომელიც ხელს უწყობს კოლაგენის წარმოქმნას და კანის თანდათანობით დაჭიმვას ოპერაციის გარეშე.',
    },
    'mint-pdo-thread-lift': {
      name: 'MINT PDO ძაფებით ლიფტინგი',
      description: 'მინიმალურად ინვაზიური ლიფტინგი შთანთქმადი PDO ძაფებით, რომელიც კანს მყისიერად სწევს და კოლაგენის წარმოქმნას ასტიმულირებს.',
    },
    'morpheus-8-treatment': {
      name: 'Morpheus8',
      description: 'ფრაქციული RF მიკრონიდლინგი კანის განახლების, დაჭიმვისა და ტექსტურის გასაუმჯობესებლად.',
    },
    nanothreads: {
      name: 'ნანოძაფები',
      description: 'ულტრა თხელი PDO ძაფები კანის ნაზი განახლების, წვრილი ხაზების შემცირებისა და ტექსტურის გასაუმჯობესებლად.',
    },
    'neogen-plasma': {
      name: 'Neogen Plasma',
      description: 'აზოტის პლაზმის ენერგიაზე დაფუძნებული პროცედურა კანის განახლებისა და კოლაგენის წარმოქმნის სტიმულირებისთვის.',
    },
    'thermage-flx': {
      name: 'Thermage FLX',
      description: 'თანამედროვე რადიოსიხშირული პროცედურა კანის ხანგრძლივი დაჭიმვისა და კოლაგენის სტიმულირებისთვის.',
    },
    'profhilo-body': {
      name: 'Profhilo Body',
      description: 'ჰიალურონის მჟავაზე დაფუძნებული საინექციო პროცედურა სხეულის კანის დატენიანების, სიმკვრივისა და ელასტიკურობის გასაუმჯობესებლად.',
    },
    'morpheus8-body': {
      name: 'Morpheus8 Body',
      description: 'ფრაქციული RF მიკრონიდლინგი სხეულის კანის დასაჭიმად, ტექსტურის გასაუმჯობესებლად და კონტურების გამოსაკვეთად.',
    },
    'exion-body': {
      name: 'Exion Body',
      description: 'ხელოვნური ინტელექტით მართული რადიოსიხშირული პროცედურა სხეულის კონტურირებისა და კანის დაჭიმვისთვის.',
    },
    'thermage-body': {
      name: 'Thermage Body',
      description: 'არაინვაზიური რადიოსიხშირული პროცედურა სხეულის კანის დასაჭიმად და გასაგლუვებლად.',
    },
    'ultraformer-hifu-body': {
      name: 'Ultraformer HIFU Body',
      description: 'ფოკუსირებული ულტრაბგერითი პროცედურა სხეულის კონტურების გასაუმჯობესებლად და კანის დასაჭიმად ოპერაციის გარეშე.',
    },
    'filter-facial': {
      name: 'Filter Facial',
      description: 'მრავალსაფეხურიანი სახის მოვლა კანის ტექსტურის, ფორების იერსახისა და ბუნებრივი ბზინვარების გასაუმჯობესებლად.',
    },
    'caviar-peel': {
      name: 'ხიზილალის პილინგი',
      description: 'დელიკატური ამქერცლავი პროცედურა ხიზილალის ექსტრაქტით, რომელიც კანს კვებავს, ატენიანებს და სიგლუვეს მატებს.',
    },
  },
  ru: {
    'endolift-body': {
      name: 'Endolift для тела',
      description: 'Малоинвазивная лазерная процедура для уменьшения локальных жировых отложений и подтяжки кожи тела.',
    },
    'body-skin-tightening': {
      name: 'Подтяжка кожи тела',
      description: 'Неинвазивная процедура с применением радиочастотной и ультразвуковой энергии для стимуляции коллагена и уплотнения кожи.',
    },
    emface: {
      name: 'Emface',
      description: 'Неинвазивная процедура для повышения тонуса мышц лица и подтяжки кожи с помощью радиочастотной энергии и технологии HIFES™.',
    },
    'exion-face-body': {
      name: 'Exion для лица и тела',
      description: 'Радиочастотная процедура с интеллектуальной настройкой для подтяжки кожи и улучшения контуров лица и тела.',
    },
    'hifu-treatment': {
      name: 'HIFU-лифтинг',
      description: 'Безоперационный ультразвуковой лифтинг, который стимулирует выработку коллагена и постепенно подтягивает кожу.',
    },
    'mint-pdo-thread-lift': {
      name: 'Лифтинг нитями MINT PDO',
      description: 'Малоинвазивная подтяжка рассасывающимися PDO-нитями с немедленным лифтинг-эффектом и стимуляцией коллагена.',
    },
    'morpheus-8-treatment': {
      name: 'Morpheus8',
      description: 'Фракционный радиочастотный микронидлинг для обновления, подтяжки и улучшения текстуры кожи.',
    },
    nanothreads: {
      name: 'Нанонити',
      description: 'Ультратонкие PDO-нити для деликатного обновления кожи, уменьшения мелких морщин и улучшения текстуры.',
    },
    'neogen-plasma': {
      name: 'Neogen Plasma',
      description: 'Процедура на основе энергии азотной плазмы для обновления кожи и стимуляции выработки коллагена.',
    },
    'thermage-flx': {
      name: 'Thermage FLX',
      description: 'Современная радиочастотная процедура для длительной подтяжки кожи и стимуляции коллагена.',
    },
    'profhilo-body': {
      name: 'Profhilo Body',
      description: 'Инъекционная процедура с гиалуроновой кислотой для улучшения увлажнённости, плотности и эластичности кожи тела.',
    },
    'morpheus8-body': {
      name: 'Morpheus8 Body',
      description: 'Фракционный радиочастотный микронидлинг для подтяжки кожи тела, улучшения текстуры и контуров.',
    },
    'exion-body': {
      name: 'Exion Body',
      description: 'Радиочастотная процедура с интеллектуальной настройкой для контурирования тела и подтяжки кожи.',
    },
    'thermage-body': {
      name: 'Thermage Body',
      description: 'Неинвазивная радиочастотная процедура для подтяжки и разглаживания кожи тела.',
    },
    'ultraformer-hifu-body': {
      name: 'Ultraformer HIFU Body',
      description: 'Сфокусированная ультразвуковая процедура для улучшения контуров тела и подтяжки кожи без операции.',
    },
    'filter-facial': {
      name: 'Filter Facial',
      description: 'Многоэтапный уход за лицом для улучшения текстуры кожи, уменьшения видимости пор и придания естественного сияния.',
    },
    'caviar-peel': {
      name: 'Икорный пилинг',
      description: 'Деликатная отшелушивающая процедура с экстрактом икры, которая питает, увлажняет и разглаживает кожу.',
    },
  },
  tr: {
    'endolift-body': {
      name: 'Vücut için Endolift',
      description: 'Bölgesel yağları azaltmaya ve vücut cildini sıkılaştırmaya yönelik minimal invaziv lazer uygulaması.',
    },
    'body-skin-tightening': {
      name: 'Vücut cildi sıkılaştırma',
      description: 'Kolajen üretimini desteklemek ve gevşek cildi sıkılaştırmak için radyo frekans ve ultrason kullanan cerrahi olmayan uygulama.',
    },
    emface: {
      name: 'Emface',
      description: 'Radyo frekans ve HIFES™ teknolojisiyle yüz kaslarını çalıştıran ve cildi sıkılaştıran cerrahi olmayan uygulama.',
    },
    'exion-face-body': {
      name: 'Yüz ve vücut için Exion',
      description: 'Yüz ve vücutta cilt sıkılaştırma ile kontur iyileştirmeye yönelik akıllı radyo frekans uygulaması.',
    },
    'hifu-treatment': {
      name: 'HIFU uygulaması',
      description: 'Kolajen üretimini destekleyen ve cildi zamanla sıkılaştıran cerrahi olmayan odaklı ultrason uygulaması.',
    },
    'mint-pdo-thread-lift': {
      name: 'MINT PDO iple yüz germe',
      description: 'Emilebilir PDO iplerle anında kaldırma etkisi sağlayan ve kolajen üretimini destekleyen minimal invaziv uygulama.',
    },
    'morpheus-8-treatment': {
      name: 'Morpheus8',
      description: 'Cildin yenilenmesine, sıkılaşmasına ve dokusunun iyileşmesine yönelik fraksiyonel RF mikroiğneleme uygulaması.',
    },
    nanothreads: {
      name: 'Nano ipler',
      description: 'Cildi nazikçe yenilemek, ince çizgileri azaltmak ve dokuyu iyileştirmek için kullanılan çok ince PDO ipler.',
    },
    'neogen-plasma': {
      name: 'Neogen Plasma',
      description: 'Cilt yenilenmesini ve kolajen üretimini desteklemek için azot plazma enerjisi kullanan uygulama.',
    },
    'thermage-flx': {
      name: 'Thermage FLX',
      description: 'Uzun süreli cilt sıkılaştırma ve kolajen desteği için gelişmiş radyo frekans uygulaması.',
    },
    'profhilo-body': {
      name: 'Profhilo Body',
      description: 'Vücut cildinin nemini, sıkılığını ve elastikiyetini iyileştirmeye yönelik hyalüronik asit enjeksiyonu.',
    },
    'morpheus8-body': {
      name: 'Morpheus8 Body',
      description: 'Vücut cildini sıkılaştırmaya, dokuyu iyileştirmeye ve konturları belirginleştirmeye yönelik fraksiyonel RF mikroiğneleme.',
    },
    'exion-body': {
      name: 'Exion Body',
      description: 'Vücut şekillendirme ve cilt sıkılaştırmaya yönelik akıllı radyo frekans uygulaması.',
    },
    'thermage-body': {
      name: 'Thermage Body',
      description: 'Vücut cildini sıkılaştırmaya ve pürüzsüzleştirmeye yönelik cerrahi olmayan radyo frekans uygulaması.',
    },
    'ultraformer-hifu-body': {
      name: 'Ultraformer HIFU Body',
      description: 'Cerrahi gerektirmeden vücut hatlarını iyileştirmeye ve cildi sıkılaştırmaya yönelik odaklı ultrason uygulaması.',
    },
    'filter-facial': {
      name: 'Filter Facial',
      description: 'Cilt dokusunu, gözenek görünümünü ve doğal ışıltıyı iyileştirmeye yönelik çok aşamalı yüz bakımı.',
    },
    'caviar-peel': {
      name: 'Havyar peelingi',
      description: 'Havyar özüyle cildi besleyen, nemlendiren ve pürüzsüzleştiren nazik arındırıcı bakım.',
    },
  },
  ar: {
    'endolift-body': {
      name: 'Endolift للجسم',
      description: 'علاج ليزر طفيف التوغل لتقليل الدهون الموضعية وشد بشرة الجسم.',
    },
    'body-skin-tightening': {
      name: 'شد بشرة الجسم',
      description: 'علاج غير جراحي بالترددات الراديوية والموجات فوق الصوتية لتحفيز الكولاجين وشد البشرة المترهلة.',
    },
    emface: {
      name: 'Emface',
      description: 'علاج غير جراحي لتنشيط عضلات الوجه وشد البشرة باستخدام الترددات الراديوية وتقنية HIFES™.',
    },
    'exion-face-body': {
      name: 'Exion للوجه والجسم',
      description: 'علاج ذكي بالترددات الراديوية لشد البشرة وتحسين ملامح الوجه والجسم.',
    },
    'hifu-treatment': {
      name: 'علاج HIFU',
      description: 'شد غير جراحي بالموجات فوق الصوتية المركزة لتحفيز الكولاجين وشد البشرة تدريجياً.',
    },
    'mint-pdo-thread-lift': {
      name: 'شد بخيوط MINT PDO',
      description: 'شد طفيف التوغل بخيوط PDO القابلة للامتصاص لرفع البشرة فوراً وتحفيز إنتاج الكولاجين.',
    },
    'morpheus-8-treatment': {
      name: 'Morpheus8',
      description: 'وخز دقيق مجزأ بالترددات الراديوية لتجديد البشرة وشدها وتحسين ملمسها.',
    },
    nanothreads: {
      name: 'الخيوط النانوية',
      description: 'خيوط PDO فائقة الدقة لتجديد البشرة بلطف وتقليل الخطوط الدقيقة وتحسين الملمس.',
    },
    'neogen-plasma': {
      name: 'Neogen Plasma',
      description: 'علاج بطاقة بلازما النيتروجين لتجديد البشرة وتحفيز إنتاج الكولاجين.',
    },
    'thermage-flx': {
      name: 'Thermage FLX',
      description: 'علاج متقدم بالترددات الراديوية لشد البشرة بنتائج طويلة الأمد وتحفيز الكولاجين.',
    },
    'profhilo-body': {
      name: 'Profhilo Body',
      description: 'حقن بحمض الهيالورونيك لتحسين ترطيب بشرة الجسم وتماسكها ومرونتها.',
    },
    'morpheus8-body': {
      name: 'Morpheus8 Body',
      description: 'وخز دقيق مجزأ بالترددات الراديوية لشد بشرة الجسم وتحسين ملمسها وتحديد القوام.',
    },
    'exion-body': {
      name: 'Exion Body',
      description: 'علاج ذكي بالترددات الراديوية لنحت الجسم وشد البشرة.',
    },
    'thermage-body': {
      name: 'Thermage Body',
      description: 'علاج غير جراحي بالترددات الراديوية لشد بشرة الجسم وتنعيمها.',
    },
    'ultraformer-hifu-body': {
      name: 'Ultraformer HIFU Body',
      description: 'علاج بالموجات فوق الصوتية المركزة لتحسين قوام الجسم وشد البشرة دون جراحة.',
    },
    'filter-facial': {
      name: 'Filter Facial',
      description: 'عناية متعددة الخطوات لتحسين ملمس البشرة ومظهر المسام ومنح الوجه إشراقة طبيعية.',
    },
    'caviar-peel': {
      name: 'تقشير الكافيار',
      description: 'علاج تقشير لطيف بخلاصة الكافيار يغذي البشرة ويرطبها ويمنحها ملمساً أكثر نعومة.',
    },
  },
  he: {
    'endolift-body': {
      name: 'Endolift לגוף',
      description: 'טיפול לייזר זעיר־פולשני להפחתת שומן מקומי ולמיצוק עור הגוף.',
    },
    'body-skin-tightening': {
      name: 'מיצוק עור הגוף',
      description: 'טיפול לא פולשני בגלי רדיו ובאולטרסאונד לעידוד קולגן ולמיצוק עור רפוי.',
    },
    emface: {
      name: 'Emface',
      description: 'טיפול לא פולשני לחיזוק שרירי הפנים ולמיצוק העור באמצעות גלי רדיו וטכנולוגיית HIFES™.',
    },
    'exion-face-body': {
      name: 'Exion לפנים ולגוף',
      description: 'טיפול חכם בגלי רדיו למיצוק העור ולשיפור קווי המתאר של הפנים והגוף.',
    },
    'hifu-treatment': {
      name: 'טיפול HIFU',
      description: 'הרמה לא ניתוחית באולטרסאונד ממוקד המעודדת יצירת קולגן וממצקת את העור בהדרגה.',
    },
    'mint-pdo-thread-lift': {
      name: 'הרמה בחוטי MINT PDO',
      description: 'הרמה זעיר־פולשנית בחוטי PDO נספגים להשפעת הרמה מיידית ולעידוד יצירת קולגן.',
    },
    'morpheus-8-treatment': {
      name: 'Morpheus8',
      description: 'מיקרונידלינג חלקי בגלי רדיו לחידוש העור, למיצוקו ולשיפור המרקם.',
    },
    nanothreads: {
      name: 'ננו־חוטים',
      description: 'חוטי PDO דקיקים לחידוש עדין של העור, להפחתת קמטוטים ולשיפור המרקם.',
    },
    'neogen-plasma': {
      name: 'Neogen Plasma',
      description: 'טיפול באנרגיית פלזמת חנקן לחידוש העור ולעידוד יצירת קולגן.',
    },
    'thermage-flx': {
      name: 'Thermage FLX',
      description: 'טיפול מתקדם בגלי רדיו למיצוק ממושך של העור ולעידוד קולגן.',
    },
    'profhilo-body': {
      name: 'Profhilo Body',
      description: 'טיפול הזרקה בחומצה היאלורונית לשיפור הלחות, המוצקות והגמישות של עור הגוף.',
    },
    'morpheus8-body': {
      name: 'Morpheus8 Body',
      description: 'מיקרונידלינג חלקי בגלי רדיו למיצוק עור הגוף, לשיפור המרקם ולהדגשת קווי המתאר.',
    },
    'exion-body': {
      name: 'Exion Body',
      description: 'טיפול חכם בגלי רדיו לעיצוב הגוף ולמיצוק העור.',
    },
    'thermage-body': {
      name: 'Thermage Body',
      description: 'טיפול לא פולשני בגלי רדיו למיצוק ולהחלקת עור הגוף.',
    },
    'ultraformer-hifu-body': {
      name: 'Ultraformer HIFU Body',
      description: 'טיפול אולטרסאונד ממוקד לשיפור קווי המתאר של הגוף ולמיצוק העור ללא ניתוח.',
    },
    'filter-facial': {
      name: 'Filter Facial',
      description: 'טיפול פנים רב־שלבי לשיפור מרקם העור, מראה הנקבוביות והזוהר הטבעי.',
    },
    'caviar-peel': {
      name: 'פילינג קוויאר',
      description: 'טיפול פילינג עדין בתמצית קוויאר המזין את העור, מעניק לחות ומשפר את החלקות.',
    },
  },
};

const durationLabels: Record<Exclude<TreatmentLocale, 'en'>, {
  minutes: string;
  initialTreatment: (minutes: string) => string;
  weekProgram: (weeks: string) => string;
}> = {
  ka: {
    minutes: 'წუთი',
    initialTreatment: (minutes) => `პირველი პროცედურა — ${minutes} წუთი`,
    weekProgram: (weeks) => `${weeks}-კვირიანი პროგრამა`,
  },
  ru: {
    minutes: 'минут',
    initialTreatment: (minutes) => `Первая процедура — ${minutes} минут`,
    weekProgram: (weeks) => `Программа на ${weeks} недель`,
  },
  tr: {
    minutes: 'dakika',
    initialTreatment: (minutes) => `İlk uygulama — ${minutes} dakika`,
    weekProgram: (weeks) => `${weeks} haftalık program`,
  },
  ar: {
    minutes: 'دقيقة',
    initialTreatment: (minutes) => `العلاج الأول — ${minutes} دقيقة`,
    weekProgram: (weeks) => `برنامج لمدة ${weeks} أسبوعاً`,
  },
  he: {
    minutes: 'דקות',
    initialTreatment: (minutes) => `טיפול ראשון — ${minutes} דקות`,
    weekProgram: (weeks) => `תוכנית של ${weeks} שבועות`,
  },
};

function normalizeTreatmentLocale(locale: string): TreatmentLocale {
  return supportedTreatmentLocales.has(locale as TreatmentLocale)
    ? (locale as TreatmentLocale)
    : 'en';
}

function localizeTreatmentPrice(price: string | undefined, locale: string): string | undefined {
  if (!price) return price;
  const normalizedLocale = normalizeTreatmentLocale(locale);
  if (normalizedLocale === 'en') return price;

  if (price === 'Consultation required') {
    return {
      ka: 'საჭიროა კონსულტაცია',
      ru: 'Требуется консультация',
      tr: 'Konsültasyon gerekli',
      ar: 'تتطلب استشارة',
      he: 'נדרש ייעוץ',
    }[normalizedLocale];
  }

  const fromMatch = price.match(/^From\s+(.+)$/);
  if (!fromMatch) return price;
  const amount = fromMatch[1];
  return {
    ka: `${amount}-დან`,
    ru: `От ${amount}`,
    tr: `Başlangıç: ${amount}`,
    ar: `ابتداءً من ${amount}`,
    he: `החל מ-${amount}`,
  }[normalizedLocale];
}

function localizeTreatmentDuration(duration: string | undefined, locale: string): string | undefined {
  if (!duration) return duration;
  const normalizedLocale = normalizeTreatmentLocale(locale);
  if (normalizedLocale === 'en') return duration;

  const labels = durationLabels[normalizedLocale];
  const minutesMatch = duration.match(/^(\d+(?:-\d+)?) minutes$/);
  if (minutesMatch) return `${minutesMatch[1]} ${labels.minutes}`;

  const initialTreatmentMatch = duration.match(/^Initial treatment (\d+) minutes$/);
  if (initialTreatmentMatch) return labels.initialTreatment(initialTreatmentMatch[1]);

  const weekProgramMatch = duration.match(/^(\d+(?:-\d+)?) week program$/);
  if (weekProgramMatch) return labels.weekProgram(weekProgramMatch[1]);

  return duration;
}

// Merge base data with translations
export async function getLocalizedTreatmentCategories(locale: string): Promise<TreatmentCategory[]> {
  const translations = await getTreatmentTranslations(locale);
  const normalizedLocale = normalizeTreatmentLocale(locale);
  const useEnglishFallback = normalizedLocale === 'en';

  return baseTreatmentCategories.map(category => {
    const categoryKey = treatmentContentCategoryAliases[category.slug] || category.slug;
    const categoryTranslation = translations[categoryKey];

    return {
      ...category,
      name:
        categoryTranslation?.name
        || (useEnglishFallback ? category.name : categoryNames[normalizedLocale][category.slug])
        || category.name,
      description:
        categoryTranslation?.description
        || (useEnglishFallback ? category.description : ''),
      treatments: category.treatments.map(treatment => {
        const treatmentTranslation =
          categoryTranslation?.treatments?.[treatment.slug]
          || translations[treatment.slug];
        const supplementalTranslation = useEnglishFallback
          ? undefined
          : supplementalTreatmentTranslations[normalizedLocale][treatment.slug];

        return {
          ...treatment,
          name:
            treatmentTranslation?.name
            || supplementalTranslation?.name
            || (useEnglishFallback ? treatment.name : genericTreatmentNames[normalizedLocale][treatment.slug])
            || treatment.name,
          description:
            treatmentTranslation?.description
            || treatmentTranslation?.shortDescription
            || supplementalTranslation?.description
            || (useEnglishFallback ? treatment.description : ''),
          shortDescription:
            treatmentTranslation?.shortDescription
            || treatmentTranslation?.description
            || supplementalTranslation?.description
            || (useEnglishFallback ? treatment.shortDescription : ''),
          price: localizeTreatmentPrice(treatment.price, locale),
          duration: localizeTreatmentDuration(treatment.duration, locale),
          benefits:
            treatmentTranslation?.benefits
            || (useEnglishFallback ? treatment.benefits : []),
          howItWorks:
            treatmentTranslation?.howItWorks
            || (useEnglishFallback ? treatment.howItWorks : undefined),
          aftercare:
            treatmentTranslation?.aftercare
            || (useEnglishFallback ? treatment.aftercare : undefined),
          faqs:
            treatmentTranslation?.faqs
            || (useEnglishFallback ? treatment.faqs : []),
        };
      }),
    };
  });
}

export async function getAllTreatments(locale: string = 'en'): Promise<Treatment[]> {
  const categories = await getLocalizedTreatmentCategories(locale);
  return categories.flatMap(category => category.treatments);
}

export async function getTreatmentBySlug(slug: string, locale: string = 'en'): Promise<Treatment | undefined> {
  const treatments = await getAllTreatments(locale);
  return treatments.find(treatment => treatment.slug === slug);
}

export async function getTreatmentCategoryBySlug(slug: string, locale: string = 'en'): Promise<TreatmentCategory | undefined> {
  const categories = await getLocalizedTreatmentCategories(locale);
  return categories.find(category => category.slug === slug);
}

// Helper to find category containing a specific treatment
export async function getCategoryByTreatmentSlug(treatmentSlug: string, locale: string = 'en'): Promise<TreatmentCategory | undefined> {
  const categories = await getLocalizedTreatmentCategories(locale);
  return categories.find(category => 
    category.treatments.some(t => t.slug === treatmentSlug)
  );
}

// Note: Use getLocalizedTreatmentCategories(locale) for proper i18n support
// The baseTreatmentCategories are exported for client components that can't use async functions
