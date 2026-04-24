import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: 'The Ultimate Guide to Anti-Wrinkle Treatments',
    slug: 'ultimate-guide-anti-wrinkle',
    excerpt: 'Everything you need to know about anti-wrinkle injections, from how they work to what to expect during your treatment.',
    content: `
      <p>Anti-wrinkle treatments have become one of the most popular cosmetic procedures worldwide. At Silk Beauty Salon, we specialize in providing natural-looking results that help you look like the best version of yourself.</p>
      
      <h2>What Are Anti-Wrinkle Injections?</h2>
      <p>Anti-wrinkle injections use botulinum toxin type A to temporarily relax the muscles that cause wrinkles. When injected by a skilled practitioner, these treatments can smooth fine lines and prevent new wrinkles from forming.</p>
      
      <h2>Areas We Treat</h2>
      <ul>
        <li><strong>Forehead lines</strong> - Horizontal lines that appear when raising your eyebrows</li>
        <li><strong>Frown lines</strong> - Vertical lines between the eyebrows (glabella)</li>
        <li><strong>Crow's feet</strong> - Lines at the corners of the eyes</li>
        <li><strong>Bunny lines</strong> - Lines on the nose when scrunching</li>
        <li><strong>Chin dimpling</strong> - Orange peel texture on the chin</li>
        <li><strong>Masseter reduction</strong> - Jaw slimming and teeth grinding treatment</li>
      </ul>
      
      <h2>What to Expect During Your Treatment</h2>
      <p>Your treatment begins with a thorough consultation where we discuss your goals and assess your facial anatomy. The actual injection process takes only 10-15 minutes and involves minimal discomfort.</p>
      
      <h2>Results and Aftercare</h2>
      <p>You'll start to see results within 3-7 days, with full effects visible after 2 weeks. Results typically last 3-6 months. After your treatment, you should:</p>
      <ul>
        <li>Avoid lying flat for 4 hours</li>
        <li>Avoid strenuous exercise for 24 hours</li>
        <li>Avoid facials or massages for 48 hours</li>
        <li>Stay upright and avoid pressure on treated areas</li>
      </ul>
      
      <h2>Why Choose Silk Beauty Salon?</h2>
      <p>Our practitioners have extensive experience in anti-wrinkle treatments. We use only premium products and focus on achieving natural results that enhance your appearance without changing who you are.</p>
    `,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    category: 'Treatments',
    author: 'Dr. Nino Beridze',
    locale: 'en',
    published: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    title: '5 Signs You Might Benefit from Dermal Fillers',
    slug: 'signs-you-need-dermal-fillers',
    excerpt: 'Dermal fillers can address various concerns. Here are the top signs that this treatment might be right for you.',
    content: `
      <p>Dermal fillers are one of the most versatile aesthetic treatments available. They can restore volume, smooth lines, and enhance your features with natural-looking results.</p>
      
      <h2>1. You've Noticed Volume Loss in Your Cheeks</h2>
      <p>As we age, we lose fat and collagen in our cheeks, leading to a hollow or sunken appearance. Dermal fillers can restore this lost volume, creating a more youthful contour.</p>
      
      <h2>2. You Have Deep Nasolabial Folds</h2>
      <p>The lines that run from your nose to your mouth (nasolabial folds) become more pronounced with age. Fillers can soften these lines for a smoother appearance.</p>
      
      <h2>3. Your Lips Have Lost Definition</h2>
      <p>Whether you want to restore lost volume or enhance your natural lip shape, dermal fillers can create beautiful, natural-looking results.</p>
      
      <h2>4. You Have Marionette Lines</h2>
      <p>The lines running from the corners of your mouth to your chin can create a downturned expression. Fillers can lift these areas for a more refreshed look.</p>
      
      <h2>5. You Want Non-Surgical Facial Contouring</h2>
      <p>Fillers can enhance your jawline, chin, or cheekbones without surgery, providing definition and structure to your face.</p>
      
      <h2>Book a Consultation</h2>
      <p>The best way to determine if dermal fillers are right for you is to book a consultation with one of our expert practitioners.</p>
    `,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    category: 'Dermal Fillers',
    author: 'Dr. Ketevan Maisuradze',
    locale: 'en',
    published: true,
    createdAt: new Date('2024-01-08'),
  },
  {
    title: 'Winter Skincare: Protecting Your Skin This Season',
    slug: 'winter-skincare-tips',
    excerpt: 'Cold weather can be harsh on your skin. Discover our top tips for maintaining a healthy, glowing complexion all winter long.',
    content: `
      <p>Winter can be challenging for your skin. Cold temperatures, low humidity, and indoor heating all contribute to dryness, irritation, and dullness.</p>
      
      <h2>1. Switch to a Gentler Cleanser</h2>
      <p>Winter skin needs more hydration. Switch from foaming cleansers to cream or oil-based formulas that won't strip your skin's natural oils.</p>
      
      <h2>2. Layer Your Hydration</h2>
      <p>Apply products from thinnest to thickest consistency: toner, serum, moisturizer, and finally, facial oil to seal everything in.</p>
      
      <h2>3. Don't Skip Sunscreen</h2>
      <p>UV rays are present year-round. Continue using SPF 30+ daily, even on cloudy winter days.</p>
      
      <h2>4. Consider Professional Treatments</h2>
      <p>Winter is the perfect time for treatments like HydraFacial, skin boosters, or chemical peels, as there's less sun exposure.</p>
      
      <h2>5. Use a Humidifier</h2>
      <p>Indoor heating dries out the air. A humidifier can help maintain moisture levels in your skin.</p>
      
      <h2>Professional Winter Treatments</h2>
      <p>At Silk Beauty Salon, we offer specialized winter skincare treatments including hydrating facials, skin boosters, and medical-grade skincare products.</p>
    `,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    category: 'Skincare',
    author: 'Mariam Gogia',
    locale: 'en',
    published: true,
    createdAt: new Date('2023-12-20'),
  },
  {
    title: 'What to Expect at Your First Consultation',
    slug: 'first-consultation-guide',
    excerpt: "Nervous about your first visit? Here's a complete guide to what happens during your initial consultation with us.",
    content: `
      <p>Your first consultation at Silk Beauty Salon is an important step in your aesthetic journey. We want you to feel comfortable and informed throughout the process.</p>
      
      <h2>Before Your Visit</h2>
      <p>Come prepared with any questions you may have about treatments. Avoid wearing makeup if possible, and bring a list of any medications or supplements you're currently taking.</p>
      
      <h2>The Consultation Process</h2>
      <ul>
        <li><strong>Medical History</strong> - We'll review your health background and any previous treatments</li>
        <li><strong>Skin Analysis</strong> - A thorough assessment of your skin type and concerns</li>
        <li><strong>Goal Discussion</strong> - Understanding what you hope to achieve</li>
        <li><strong>Treatment Recommendations</strong> - Personalized options based on your needs</li>
      </ul>
      
      <h2>What to Bring</h2>
      <p>Bring photos of looks you like, your ID, and any relevant medical information. This helps us understand your aesthetic goals better.</p>
      
      <h2>After the Consultation</h2>
      <p>You'll receive a personalized treatment plan with pricing. There's no pressure to book immediately - take time to consider your options.</p>
    `,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
    category: 'Patient Guide',
    author: 'Dr. Nino Beridze',
    locale: 'en',
    published: true,
    createdAt: new Date('2023-12-12'),
  },
  {
    title: 'The Benefits of Combining Treatments',
    slug: 'combining-treatments-benefits',
    excerpt: 'Learn how combining different treatments can enhance your results and help you achieve your aesthetic goals.',
    content: `
      <p>While individual treatments can deliver excellent results, combining complementary procedures often produces more comprehensive and longer-lasting outcomes.</p>
      
      <h2>Why Combine Treatments?</h2>
      <p>Different treatments address different concerns. Combining them allows us to tackle multiple issues simultaneously for a more complete rejuvenation.</p>
      
      <h2>Popular Treatment Combinations</h2>
      <ul>
        <li><strong>Botox + Fillers</strong> - Smooth wrinkles while restoring volume</li>
        <li><strong>Laser + Skin Boosters</strong> - Improve texture and hydration together</li>
        <li><strong>Chemical Peel + Microneedling</strong> - Enhance skin renewal and collagen production</li>
        <li><strong>HydraFacial + LED Therapy</strong> - Deep cleansing with healing light therapy</li>
      </ul>
      
      <h2>Personalized Treatment Plans</h2>
      <p>During your consultation, we'll create a customized plan that sequences treatments optimally. Some can be done same-day, while others work best spaced apart.</p>
      
      <h2>Cost and Time Efficiency</h2>
      <p>Combining treatments can reduce overall downtime and may offer cost benefits compared to booking separate appointments.</p>
    `,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
    category: 'Treatments',
    author: 'Dr. Ketevan Maisuradze',
    locale: 'en',
    published: true,
    createdAt: new Date('2023-12-05'),
  },
  {
    title: 'Understanding Laser Skin Treatments',
    slug: 'understanding-laser-treatments',
    excerpt: 'From IPL to fractional lasers, we break down the different types of laser treatments and their benefits.',
    content: `
      <p>Laser technology has revolutionized skincare, offering solutions for everything from pigmentation to skin tightening. Understanding your options helps you make informed decisions.</p>
      
      <h2>Types of Laser Treatments</h2>
      
      <h3>IPL (Intense Pulsed Light)</h3>
      <p>Not a true laser but uses broad-spectrum light to treat pigmentation, redness, and sun damage. Great for overall skin tone improvement with minimal downtime.</p>
      
      <h3>Fractional CO2 Laser</h3>
      <p>Creates microscopic channels in the skin to stimulate collagen production. Excellent for deep wrinkles, acne scars, and significant textural issues.</p>
      
      <h3>Non-Ablative Lasers</h3>
      <p>Heat the deeper skin layers without damaging the surface. Perfect for those wanting results without extended recovery time.</p>
      
      <h3>Q-Switched Lasers</h3>
      <p>Ultra-short pulses target specific pigmentation like age spots and tattoos without affecting surrounding tissue.</p>
      
      <h2>What to Expect</h2>
      <p>Most laser treatments require a series of sessions for optimal results. Recovery time varies from none (IPL) to several days (fractional treatments).</p>
      
      <h2>Is Laser Right for You?</h2>
      <p>Laser treatments are suitable for most skin types, but certain conditions may require special consideration. A consultation will determine the best approach for your specific needs.</p>
    `,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    category: 'Laser',
    author: 'Mariam Gogia',
    locale: 'en',
    published: true,
    createdAt: new Date('2023-11-28'),
  },
];

async function main() {
  console.log('Start seeding blog posts...');

  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });

    if (!existing) {
      await prisma.blogPost.create({
        data: post,
      });
      console.log(`Created blog post: ${post.title}`);
    } else {
      console.log(`Blog post already exists: ${post.title}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
