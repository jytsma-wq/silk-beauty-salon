# Magazine-Style Redesign Prompts for Kimi 2.5

## 🎨 Design Vision: From Clinical to Editorial

Transform Silk Beauty Salon from a clean, grid-based medical aesthetics website into a **luxury beauty magazine experience** — think Vogue meets Kinfolk meets The Gentlewoman. Fluid layouts, organic shapes, asymmetric grids, and editorial sophistication.

### Current State Analysis
- ✅ Beautiful spa imagery (natural, serene)
- ✅ Warm color palette (stone, beige, terracotta)
- ✅ French medical aesthetics branding
- ❌ Too grid-based and boxy
- ❌ Rectangular sections with borders
- ❌ Lacks magazine fluidity and dynamism

### Target Aesthetic
- ✨ **Fluid, organic layouts** (no rigid boxes)
- ✨ **Asymmetric grids** (broken grids, overlapping elements)
- ✨ **Typography as art** (oversized headlines, vertical text, layered type)
- ✨ **Image-led storytelling** (full-bleed, cutouts, collage-style)
- ✨ **Editorial sophistication** (pull quotes, captions, annotations)
- ✨ **Luxury magazine feel** (generous whitespace, unexpected layouts)

---

## 📌 MAGAZINE PROMPT 1: Hero Section - Magazine Cover Treatment

```
Task: Redesign the homepage hero section as an animated magazine cover with cinematic, fluid layout

Context:
- Current: Video background with centered text overlay
- Hero image: Serene spa setting with tropical plants, pool, rattan furniture
- File: /src/components/sections/CinematicHeroSection.tsx

Requirements:

1. **Magazine Cover Layout**
   - Large, impactful full-bleed video/image (no containers, no padding)
   - Asymmetric text placement (not centered!)
   - Typography treatments:
     * Oversized serif headline that breaks the grid
     * Vertical "ISSUE" text along the edge
     * Small sans-serif kicker text
     * Tagline in contrasting italic serif
   - Floating navigation elements
   - Scroll indicator as editorial element

2. **Layout Inspiration - Vogue Style**
   ```tsx
   Structure:
   - Full viewport height (100vh)
   - Video/image fills entire screen with gradient overlays
   - Headline: Large serif, positioned asymmetrically (top-left or bottom-right)
   - Subheadline: Small caps, different weight, offset from headline
   - "Edition" marker: "BATUMI EDITION" or "SPRING 2026" in corner
   - Vertical text: "SILK BEAUTY" running down the side
   - Minimal UI: Floating, translucent elements
   - No borders, no boxes, no cards
   ```

3. **Typography Layers**
   - **Layer 1 (Background)**: Oversized display text at 15vw, very light opacity (5-10%)
     * "BEAUTY" or "ELEGANCE" or Georgian script
   - **Layer 2 (Main Headline)**: 8-12vw serif, positioned asymmetrically
     * "Redefining Beauty in Batumi"
     * Font: Playfair Display, Cormorant Garamond, or similar elegant serif
   - **Layer 3 (Accent)**: Small caps subtext, 1.5rem
     * "MEDICAL AESTHETICS • SPRING 2026"
   - **Layer 4 (Vertical Text)**: Rotated -90deg, running along edge
     * "SILK BEAUTY SALON"

4. **Visual Elements**
   - Curved shape overlay (SVG path) partially covering video
   - Organic blob shapes in brand colors (low opacity)
   - Floating particles or subtle motion graphics
   - Pull quote or testimonial snippet in corner
   - No rectangular cards or boxes

5. **Animation Strategy**
   - Parallax scroll effect on text layers
   - Video plays smoothly with ken burns effect
   - Text fades in with stagger animation
   - Cursor-following gradient effect
   - Smooth scroll indicator (custom design, not default)

6. **Color Treatment**
   - Video: Subtle warm color grading overlay
   - Text: Cream (#f7f4f0) on dark gradient
   - Accent: Terracotta (#b5453a) for highlights
   - Shapes: Soft gradients (stone to warm beige)

7. **Responsive Behavior**
   - Mobile: Reduce text size, maintain asymmetry
   - Vertical text becomes horizontal on mobile
   - Maintain magazine feel at all breakpoints
   - Touch-friendly interactive elements

Example Structure:
```tsx
<section className="relative h-screen overflow-hidden">
  {/* Full-bleed video */}
  <div className="absolute inset-0">
    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-stone-900/60 via-transparent to-stone-900/40" />
    
    {/* Organic shape overlay */}
    <svg className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
      <path d="M..." fill="#b5453a" />
    </svg>
  </div>

  {/* Typography layers */}
  <div className="relative h-full flex items-end pb-20 pl-8 lg:pl-16">
    {/* Background text */}
    <div className="absolute top-1/4 left-0 text-[15vw] font-serif text-stone-100/5 leading-none pointer-events-none">
      BEAUTY
    </div>

    {/* Main content - asymmetric placement */}
    <div className="max-w-4xl">
      <div className="text-xs tracking-[0.3em] uppercase text-stone-300 mb-4">
        Medical Aesthetics • Batumi Edition
      </div>
      
      <h1 className="text-[clamp(3rem,10vw,8rem)] font-serif font-light leading-[0.9] text-stone-50 mb-6">
        Redefining
        <br />
        <span className="italic text-[#b5453a]">Beauty</span>
      </h1>
      
      <p className="text-lg text-stone-200 max-w-md leading-relaxed mb-8">
        Where French medical precision meets Georgian hospitality
      </p>
      
      <button className="group relative overflow-hidden px-8 py-4 text-sm tracking-wide uppercase">
        <span className="relative z-10 text-stone-900">Book Consultation</span>
        <div className="absolute inset-0 bg-stone-50 transition-transform group-hover:scale-110" />
      </button>
    </div>

    {/* Vertical text */}
    <div className="absolute right-8 top-1/4 -rotate-90 origin-top-right">
      <span className="text-xs tracking-[0.5em] uppercase text-stone-300">
        Silk Beauty Salon
      </span>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent" />
  </div>
</section>
```

Deliverables:
- Redesigned CinematicHeroSection.tsx with magazine cover layout
- Custom scroll indicator component
- Organic SVG shapes library
- Animation utilities for parallax and stagger effects
- Mobile-optimized responsive version
```

---

## 📌 MAGAZINE PROMPT 2: Treatments Section - Broken Grid Editorial Layout

```
Task: Transform the treatments section into a dynamic editorial spread with broken grid, overlapping images, and magazine typography

Context:
- Current: Clean numbered list with hover images
- File: /src/components/sections/EditorialTreatmentsSection.tsx
- 6 treatment categories to showcase

Requirements:

1. **Broken Grid Layout** (Inspired by Kinfolk / Cereal Magazine)
   - Asymmetric multi-column grid
   - Images break out of grid boundaries
   - Text wraps around images organically
   - Overlapping elements with proper z-indexing
   - NO rectangular borders or cards

2. **Layout Pattern**
   ```
   Desktop (3-column broken grid):
   
   [Large Image]    [Text 01]    [Text 02]
   [Text 03]        [Med Img]    [Text 04]
   [Small Img]      [Text 05]    [Large Img]
   [Text 06]        [Quote]      [Small Img]
   
   - Images: Various sizes (1x1, 2x1, 1x2, 2x2 grid cells)
   - Text blocks: Flexible height, wrap around images
   - Pull quotes: Offset, overlapping
   - White space: Generous, asymmetric
   ```

3. **Typography Treatment**
   - **Category Numbers**: Ultra-large (20rem), positioned as background elements
     * Outlined stroke text, not filled
     * Position behind images
     * Very low opacity (5-10%)
   - **Category Names**: Medium serif (3-4rem), positioned asymmetrically
     * Not aligned to grid
     * Some vertical, some horizontal
     * Varying weights
   - **Descriptions**: Small serif italic (1rem), flowing text
   - **Call-to-action**: Underlined link, positioned offset

4. **Image Treatment**
   - Full-bleed images (no borders, no rounded corners)
   - Images extend beyond their grid cell
   - Overlapping with proper drop shadows for depth
   - Varied aspect ratios (square, portrait, landscape)
   - Some images with cutout shapes (circles, organic blobs)
   - Hover: Subtle scale and brightness change, not reveal

5. **Interactive Elements**
   - Hover on image: Slight zoom (1.05x), caption appears
   - Hover on text: Associated image highlights
   - Parallax scroll on images
   - Stagger fade-in on scroll
   - No expansion panels (too boxy)

6. **Layout Examples**

   **Treatment 1 - Botox (Large Impact)**
   ```tsx
   <div className="relative col-span-2 row-span-2">
     {/* Background number */}
     <div className="absolute -top-20 -left-10 text-[20rem] font-serif text-stone-200/5 leading-none select-none">
       01
     </div>
     
     {/* Image */}
     <div className="relative aspect-[4/3] overflow-hidden">
       <Image src="..." fill className="object-cover hover:scale-105 transition-transform duration-700" />
     </div>
     
     {/* Text overlay - bottom left */}
     <div className="absolute bottom-0 left-0 p-12 max-w-md bg-gradient-to-t from-stone-900/80 to-transparent">
       <h3 className="text-4xl font-serif font-light text-stone-50 mb-3">
         Botox
       </h3>
       <p className="text-sm italic text-stone-200 leading-relaxed mb-4">
         Precision wrinkle reduction with French medical techniques
       </p>
       <a href="/treatments/botox" className="text-sm text-stone-50 underline underline-offset-4">
         Explore treatment
       </a>
     </div>
   </div>
   ```

   **Treatment 2 - Fillers (Text Heavy)**
   ```tsx
   <div className="relative col-span-1">
     <div className="py-16">
       {/* Vertical number on side */}
       <div className="absolute -left-12 top-0 -rotate-90 origin-top-left">
         <span className="text-8xl font-serif text-stone-200 leading-none">02</span>
       </div>
       
       <h3 className="text-3xl font-serif font-light mb-4">
         Dermal Fillers
       </h3>
       <p className="text-sm leading-relaxed text-stone-600 mb-6 max-w-xs">
         Volume restoration and facial contouring with hyaluronic acid. 
         Natural results that enhance your unique beauty.
       </p>
       
       {/* Small image insert */}
       <div className="relative w-32 h-32 float-right ml-4 mb-4 rounded-full overflow-hidden">
         <Image src="..." fill className="object-cover" />
       </div>
       
       <a href="/treatments/fillers" className="text-sm text-[#b5453a] underline">
         Learn more →
       </a>
     </div>
   </div>
   ```

   **Treatment 3 - Laser (Image Cutout)**
   ```tsx
   <div className="relative">
     {/* Organic blob shape mask */}
     <div className="relative aspect-square">
       <svg className="absolute inset-0 w-full h-full">
         <defs>
           <clipPath id="blob">
             <path d="M 50,0 C 80,0 100,20 100,50 C 100,80 80,100 50,100 C 20,100 0,80 0,50 C 0,20 20,0 50,0 Z" />
           </clipPath>
         </defs>
       </svg>
       <Image 
         src="..." 
         fill 
         className="object-cover"
         style={{ clipPath: 'url(#blob)' }}
       />
     </div>
     
     {/* Text below, offset */}
     <div className="mt-8 ml-8">
       <span className="text-xs tracking-widest uppercase text-stone-400">03</span>
       <h3 className="text-2xl font-serif italic mt-2">Laser Treatments</h3>
     </div>
   </div>
   ```

7. **Pull Quote Integration**
   - Insert testimonial as large pull quote
   - Positioned to break up treatment list
   - Oversized quotation marks
   - Serif italic text
   - Attribution with small headshot

   ```tsx
   <div className="col-span-2 py-20 px-12 relative">
     {/* Huge quote mark */}
     <div className="absolute -top-8 -left-4 text-[15rem] font-serif text-[#b5453a]/10 leading-none">
       "
     </div>
     
     <blockquote className="relative text-3xl font-serif italic leading-relaxed text-stone-700 max-w-2xl">
       The results are remarkable. My skin has never looked more radiant.
     </blockquote>
     
     <div className="mt-8 flex items-center gap-4">
       <div className="w-12 h-12 rounded-full overflow-hidden">
         <Image src="..." fill className="object-cover" />
       </div>
       <div>
         <cite className="not-italic text-sm font-medium">— Marina K.</cite>
         <p className="text-xs text-stone-500">Botox & Filler Patient</p>
       </div>
     </div>
   </div>
   ```

8. **Responsive Strategy**
   - Desktop: 3-column broken grid
   - Tablet: 2-column with adjusted overlaps
   - Mobile: Single column with maintained visual hierarchy
   - Images still full-bleed on mobile
   - Maintain asymmetry at all breakpoints

9. **Animation & Interaction**
   - Scroll-triggered fade-in with stagger (each item delays 100ms)
   - Parallax on images (move at 0.5x scroll speed)
   - Hover scale on images (1.03x)
   - Text appears to "float" above images
   - Smooth transitions (700ms ease-out)

Deliverables:
- Complete rewrite of EditorialTreatmentsSection.tsx
- Broken grid CSS utilities
- Image mask/clip-path components
- Pull quote component
- Stagger animation hooks
- Responsive breakpoint logic
```

---

## 📌 MAGAZINE PROMPT 3: About Section - Feature Article Layout

```
Task: Redesign the about section as a magazine feature article with editorial photography and flowing text

Context:
- Salon story and credentials
- Team introduction
- Brand values
- File: /src/components/sections/AboutSection.tsx

Requirements:

1. **Feature Article Layout**
   - Large hero image (full-width or 2/3 width)
   - Text flows around images
   - Multiple column text layout (2-3 columns on desktop)
   - Drop caps for first paragraph
   - Subheadings as sidenotes
   - Image captions in italic serif
   - Pull quotes break up text flow

2. **Typography Hierarchy**
   - **Kicker**: Small caps, 0.75rem, wide tracking
     * "ESTABLISHED 2018 — BATUMI, GEORGIA"
   - **Headline**: Large serif, 6-8rem, multiple lines
     * "Where Science Meets Artistry"
   - **Deck/Standfirst**: Medium serif, 1.5rem, leading paragraph
     * 2-3 sentences summarizing the story
   - **Body Text**: 2-3 columns, serif, 1rem, generous line-height
   - **Drop Cap**: First letter 4x size, serif
   - **Subheadings**: Small sans-serif, positioned as margin notes
   - **Captions**: Small italic serif, under images

3. **Image Layout Patterns**

   **Pattern A: Large Hero + Text Wrap**
   ```tsx
   <article className="max-w-7xl mx-auto px-8 py-32">
     {/* Kicker */}
     <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">
       Established 2018 — Batumi, Georgia
     </p>
     
     {/* Headline */}
     <h1 className="text-[clamp(3rem,8vw,7rem)] font-serif font-light leading-[0.95] mb-8 max-w-4xl">
       Where Science
       <br />
       Meets <em className="italic text-[#b5453a]">Artistry</em>
     </h1>
     
     {/* Standfirst */}
     <p className="text-xl font-serif leading-relaxed text-stone-600 max-w-2xl mb-20">
       At Silk Beauty Salon, we blend French medical precision with Georgian 
       hospitality to deliver world-class aesthetic treatments in the heart of Batumi.
     </p>
     
     {/* Image + Text Layout */}
     <div className="grid grid-cols-12 gap-12">
       {/* Large image */}
       <div className="col-span-7 relative aspect-[3/4]">
         <Image src="..." fill className="object-cover" />
         <figcaption className="mt-3 text-xs italic text-stone-500">
           Our treatment room overlooking the Black Sea
         </figcaption>
       </div>
       
       {/* Text flows beside */}
       <div className="col-span-5">
         {/* Drop cap paragraph */}
         <p className="text-base leading-relaxed text-stone-700">
           <span className="float-left text-7xl font-serif leading-none mr-3 mt-1 text-[#b5453a]">
             F
           </span>
           ounded by Dr. Ana Beridze in 2018, Silk Beauty Salon emerged from 
           a vision to bring European medical aesthetics standards to Georgia...
         </p>
         
         {/* Continue with more paragraphs */}
         <p className="mt-6 leading-relaxed text-stone-700">
           Our team of certified medical professionals...
         </p>
       </div>
     </div>
   </article>
   ```

   **Pattern B: Offset Images with Running Text**
   ```tsx
   <div className="max-w-6xl mx-auto px-8">
     {/* Running text in columns */}
     <div className="columns-2 gap-12 text-base leading-relaxed text-stone-700">
       <p>Our philosophy is simple: enhance, don't change...</p>
       <p>Each treatment is customized...</p>
       
       {/* Image breaks into column */}
       <figure className="my-12 -mx-8">
         <div className="relative aspect-[16/9]">
           <Image src="..." fill className="object-cover" />
         </div>
         <figcaption className="mt-2 text-xs italic">
           Dr. Beridze performing a consultation
         </figcaption>
       </figure>
       
       <p>We use only premium European products...</p>
     </div>
   </div>
   ```

4. **Pull Quote Treatment**
   ```tsx
   <aside className="my-20 relative">
     {/* Decorative element */}
     <div className="absolute -left-20 top-0 w-1 h-full bg-gradient-to-b from-[#b5453a] to-transparent" />
     
     <blockquote className="text-4xl font-serif italic leading-tight text-stone-800 pl-12">
       "Beauty is not about perfection. It's about feeling confident in your own skin."
     </blockquote>
     
     <footer className="mt-6 pl-12">
       <cite className="not-italic text-sm text-stone-500">
         — Dr. Ana Beridze, Founder
       </cite>
     </footer>
   </aside>
   ```

5. **Credentials Section - List as Magazine Credits**
   ```tsx
   <div className="mt-32 border-t border-stone-200 pt-12">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
       <div>
         <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
           Established
         </p>
         <p className="text-2xl font-serif">2018</p>
       </div>
       
       <div>
         <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
           Treatments
         </p>
         <p className="text-2xl font-serif">5,000+</p>
       </div>
       
       <div>
         <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
           Team
         </p>
         <p className="text-2xl font-serif">8 Specialists</p>
       </div>
       
       <div>
         <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
           Certifications
         </p>
         <p className="text-2xl font-serif">European</p>
       </div>
     </div>
   </div>
   ```

6. **Team Section - Magazine Bio Format**
   ```tsx
   <div className="mt-32">
     <h2 className="text-5xl font-serif font-light mb-20">
       Meet the Team
     </h2>
     
     <div className="space-y-32">
       {/* Team member */}
       <div className="grid grid-cols-12 gap-12 items-start">
         {/* Portrait */}
         <div className="col-span-4 relative">
           <div className="relative aspect-[3/4]">
             <Image src="..." fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
           </div>
           
           {/* Name overlay on image */}
           <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-900/90 to-transparent">
             <h3 className="text-2xl font-serif text-stone-50">Dr. Ana Beridze</h3>
             <p className="text-sm text-stone-300">Founder & Medical Director</p>
           </div>
         </div>
         
         {/* Bio */}
         <div className="col-span-8">
           <div className="max-w-2xl">
             {/* Credentials */}
             <div className="flex gap-8 mb-8 text-xs uppercase tracking-widest text-stone-500">
               <span>MD, Tbilisi State University</span>
               <span>10+ Years Experience</span>
               <span>Paris Aesthetics Institute</span>
             </div>
             
             {/* Bio text */}
             <p className="text-base leading-relaxed text-stone-700 mb-4">
               Dr. Beridze trained in Paris under renowned aesthetic physicians...
             </p>
             <p className="leading-relaxed text-stone-700">
               Her approach combines medical precision with artistic sensibility...
             </p>
             
             {/* Specialties as tags */}
             <div className="mt-8 flex flex-wrap gap-3">
               <span className="px-4 py-2 text-xs border border-stone-300 text-stone-600">
                 Botox & Fillers
               </span>
               <span className="px-4 py-2 text-xs border border-stone-300 text-stone-600">
                 Thread Lifts
               </span>
               <span className="px-4 py-2 text-xs border border-stone-300 text-stone-600">
                 Laser Treatments
               </span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   ```

7. **Sidebar Notes** (Desktop Only)
   - Position important info in margins
   - Awards, certifications, quick facts
   - Styled as editorial annotations

   ```tsx
   <aside className="hidden lg:block absolute -right-32 top-0 w-56">
     <div className="sticky top-32">
       <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
         Quick Facts
       </p>
       <ul className="space-y-4 text-sm text-stone-600">
         <li className="border-l-2 border-[#b5453a] pl-3">
           European certified medical team
         </li>
         <li className="border-l-2 border-stone-200 pl-3">
           Premium Swiss & French products
         </li>
         <li className="border-l-2 border-stone-200 pl-3">
           5-star patient reviews
         </li>
       </ul>
     </div>
   </aside>
   ```

Deliverables:
- Redesigned AboutSection.tsx as magazine feature
- Drop cap typography component
- Multi-column text utilities
- Pull quote component (reusable)
- Sidebar annotation component
- Team bio card components
- Responsive column system
```

---

## 📌 MAGAZINE PROMPT 4: Gallery - Photo Essay Layout

```
Task: Transform the gallery into a curated photo essay with varied image sizes, overlapping layouts, and editorial captions

Context:
- Before/after galleries
- Treatment result showcases
- Salon interior photos
- File: /src/components/gallery/

Requirements:

1. **Photo Essay Grid** (Masonry + Overlap Style)
   - NOT uniform grid
   - Varied image sizes: 1x1, 1x2, 2x1, 2x2, 1x3
   - Images overlap slightly with drop shadows for depth
   - Asymmetric arrangement
   - Generous white space between clusters
   - NO borders, NO cards, NO frames

2. **Layout Pattern**
   ```
   Desktop Broken Masonry:
   
   [Large 2x2]    [Small 1x1]    [Tall 1x2]
   [Med 2x1]      [Small 1x1]    
   [Small 1x1]    [Large 2x2]    [Med 2x1]
                  [Small 1x1]    [Small 1x1]
   ```

3. **Image Presentation Styles**

   **Style A: Full Bleed with Caption Overlay**
   ```tsx
   <figure className="relative group cursor-pointer">
     <div className="relative aspect-[4/5] overflow-hidden">
       <Image 
         src="..." 
         fill 
         className="object-cover group-hover:scale-105 transition-transform duration-700" 
       />
       
       {/* Gradient overlay on hover */}
       <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
       
       {/* Caption appears on hover */}
       <figcaption className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
         <p className="text-sm italic text-stone-50 mb-2">
           Botox treatment results after 2 weeks
         </p>
         <p className="text-xs text-stone-300">
           Patient: 42 years old • Treatment area: Forehead & crow's feet
         </p>
       </figcaption>
     </div>
   </figure>
   ```

   **Style B: Offset Caption (Editorial Style)**
   ```tsx
   <figure className="relative">
     <div className="relative aspect-square">
       <Image src="..." fill className="object-cover" />
     </div>
     
     {/* Caption positioned outside image */}
     <figcaption className="mt-4 ml-4 max-w-xs">
       <p className="text-xs italic text-stone-600 leading-relaxed">
         Natural volume restoration with hyaluronic acid fillers. 
         Results shown 1 month post-treatment.
       </p>
       <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-2">
         After • 1 Month
       </p>
     </figcaption>
   </figure>
   ```

   **Style C: Before/After Slider (Magazine Comparison)**
   ```tsx
   <div className="relative col-span-2">
     {/* Header */}
     <div className="mb-6">
       <h3 className="text-2xl font-serif font-light mb-2">
         Dermal Filler Transformation
       </h3>
       <p className="text-sm text-stone-500">
         Cheek and jawline contouring • 6 months results
       </p>
     </div>
     
     {/* Comparison layout - side by side, not slider */}
     <div className="grid grid-cols-2 gap-8">
       <div>
         <div className="relative aspect-[3/4] mb-3">
           <Image src="before.jpg" fill className="object-cover" />
         </div>
         <p className="text-xs uppercase tracking-widest text-stone-400">
           Before
         </p>
       </div>
       
       <div>
         <div className="relative aspect-[3/4] mb-3">
           <Image src="after.jpg" fill className="object-cover" />
         </div>
         <p className="text-xs uppercase tracking-widest text-[#b5453a]">
           After • 6 Months
         </p>
       </div>
     </div>
     
     {/* Result details */}
     <div className="mt-8 p-6 bg-stone-50">
       <dl className="grid grid-cols-3 gap-6 text-sm">
         <div>
           <dt className="text-xs uppercase text-stone-400 mb-1">Treatment</dt>
           <dd className="font-serif">Juvederm Voluma</dd>
         </div>
         <div>
           <dt className="text-xs uppercase text-stone-400 mb-1">Sessions</dt>
           <dd className="font-serif">Single</dd>
         </div>
         <div>
           <dt className="text-xs uppercase text-stone-400 mb-1">Downtime</dt>
           <dd className="font-serif">24 hours</dd>
         </div>
       </dl>
     </div>
   </div>
   ```

4. **Gallery Section Header** (Magazine Chapter Style)
   ```tsx
   <header className="mb-32">
     <div className="max-w-3xl">
       {/* Chapter marker */}
       <div className="flex items-center gap-6 mb-8">
         <div className="w-16 h-px bg-stone-300" />
         <span className="text-xs tracking-[0.4em] uppercase text-stone-400">
           Portfolio
         </span>
       </div>
       
       {/* Headline */}
       <h2 className="text-[clamp(3rem,7vw,6rem)] font-serif font-light leading-[0.95] mb-8">
         Real Results,
         <br />
         <em className="italic">Real People</em>
       </h2>
       
       {/* Intro text */}
       <p className="text-lg leading-relaxed text-stone-600">
         Every face tells a story. Browse our curated collection of treatment 
         results, each representing a journey to renewed confidence.
       </p>
     </div>
   </header>
   ```

5. **Interactive Features**
   - Click image: Opens lightbox with full details
   - Lightbox design: Full-screen, magazine layout
     * Large image on left (70%)
     * Details panel on right (30%)
     * Treatment info, patient info, timeline
     * Navigation arrows (minimal design)
   - Hover effects: Subtle scale, caption reveal
   - Filter by treatment type: Elegant pill buttons

6. **Filter UI** (Magazine Navigation Style)
   ```tsx
   <nav className="mb-16 flex items-center justify-between">
     <div className="flex gap-4">
       <button className="px-6 py-3 text-sm tracking-wide uppercase border border-stone-900 bg-stone-900 text-stone-50">
         All
       </button>
       <button className="px-6 py-3 text-sm tracking-wide uppercase border border-stone-300 text-stone-600 hover:border-stone-900 transition-colors">
         Botox
       </button>
       <button className="px-6 py-3 text-sm tracking-wide uppercase border border-stone-300 text-stone-600 hover:border-stone-900 transition-colors">
         Fillers
       </button>
       <button className="px-6 py-3 text-sm tracking-wide uppercase border border-stone-300 text-stone-600 hover:border-stone-900 transition-colors">
         Laser
       </button>
     </div>
     
     <button className="text-sm text-stone-500 hover:text-stone-900">
       View All Results →
     </button>
   </nav>
   ```

7. **Scroll Behavior**
   - Parallax on images (different speeds)
   - Stagger fade-in as images enter viewport
   - Infinite scroll or "Load More" button
   - Smooth scroll to top button

8. **Lightbox Design** (Full-Screen Editorial)
   ```tsx
   <div className="fixed inset-0 bg-stone-50 z-50">
     <div className="grid grid-cols-[1fr_400px] h-full">
       {/* Image side */}
       <div className="relative flex items-center justify-center p-12">
         <Image src="..." fill className="object-contain" />
         
         {/* Navigation */}
         <button className="absolute left-8 top-1/2 -translate-y-1/2">
           <span className="text-4xl text-stone-900">←</span>
         </button>
         <button className="absolute right-8 top-1/2 -translate-y-1/2">
           <span className="text-4xl text-stone-900">→</span>
         </button>
       </div>
       
       {/* Details panel */}
       <aside className="bg-white p-12 overflow-y-auto">
         <button className="absolute top-8 right-8 text-2xl">×</button>
         
         <h3 className="text-3xl font-serif font-light mb-4">
           Cheek Augmentation
         </h3>
         
         <dl className="space-y-6 text-sm">
           <div>
             <dt className="text-xs uppercase tracking-widest text-stone-400 mb-1">
               Treatment
             </dt>
             <dd className="text-base">Juvederm Voluma XC</dd>
           </div>
           
           <div>
             <dt className="text-xs uppercase tracking-widest text-stone-400 mb-1">
               Results Shown
             </dt>
             <dd className="text-base">6 months post-treatment</dd>
           </div>
           
           <div>
             <dt className="text-xs uppercase tracking-widest text-stone-400 mb-1">
               Patient Profile
             </dt>
             <dd className="text-base">Female, 45 years old</dd>
           </div>
           
           <div>
             <dt className="text-xs uppercase tracking-widest text-stone-400 mb-1">
               Treatment Areas
             </dt>
             <dd className="text-base">Cheeks, mid-face</dd>
           </div>
         </dl>
         
         <div className="mt-12 pt-8 border-t border-stone-200">
           <p className="text-sm leading-relaxed text-stone-600 italic">
             "I love how natural the results look. My friends say I look 
             more rested, but they can't tell I've had anything done."
           </p>
           <p className="mt-4 text-xs text-stone-500">— Patient testimonial</p>
         </div>
         
         <button className="mt-12 w-full py-4 bg-stone-900 text-stone-50 text-sm uppercase tracking-wide">
           Book Similar Treatment
         </button>
       </aside>
     </div>
   </div>
   ```

Deliverables:
- Gallery masonry component with broken grid
- Multiple image card styles
- Lightbox component (full-screen editorial)
- Filter navigation
- Before/after comparison component
- Parallax scroll effects
- Image lazy loading with blur placeholder
```

---

## 📌 MAGAZINE PROMPT 5: Footer - Magazine Colophon Style

```
Task: Redesign footer as magazine colophon with editorial credits layout

Context:
- Current: Standard website footer
- Need: Magazine back-matter aesthetic
- Links, contact, social, newsletter

Requirements:

1. **Colophon Layout** (Magazine End Pages)
   - Full-width section with editorial styling
   - Multi-column text layout
   - Typographic hierarchy
   - Credits-style presentation
   - NO boxes, NO background colors

2. **Structure**
   ```tsx
   <footer className="border-t border-stone-200 py-32">
     <div className="max-w-7xl mx-auto px-8">
       {/* Top Section - Newsletter */}
       <div className="mb-32 max-w-4xl">
         <h2 className="text-6xl font-serif font-light mb-8">
           Stay Connected
         </h2>
         <p className="text-lg text-stone-600 mb-12 max-w-2xl">
           Receive updates on new treatments, exclusive offers, and beauty insights 
           delivered to your inbox monthly.
         </p>
         
         {/* Newsletter form - inline, elegant */}
         <form className="flex gap-4 max-w-2xl">
           <input 
             type="email"
             placeholder="Your email address"
             className="flex-1 px-6 py-4 border-b-2 border-stone-300 focus:border-stone-900 bg-transparent text-base outline-none"
           />
           <button className="px-8 py-4 bg-stone-900 text-stone-50 text-sm uppercase tracking-wide hover:bg-stone-800 transition-colors">
             Subscribe
           </button>
         </form>
       </div>
       
       {/* Main Footer Grid */}
       <div className="grid grid-cols-12 gap-12 mb-20">
         {/* Column 1 - About */}
         <div className="col-span-3">
           <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
             About
           </h3>
           <p className="text-sm leading-relaxed text-stone-600">
             Silk Beauty Salon brings European medical aesthetics to Batumi, 
             combining French precision with Georgian hospitality.
           </p>
         </div>
         
         {/* Column 2 - Treatments */}
         <div className="col-span-2">
           <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
             Treatments
           </h3>
           <nav className="space-y-3">
             <a href="/treatments/botox" className="block text-sm text-stone-700 hover:text-stone-900">
               Botox
             </a>
             <a href="/treatments/fillers" className="block text-sm text-stone-700 hover:text-stone-900">
               Dermal Fillers
             </a>
             {/* ... more links */}
           </nav>
         </div>
         
         {/* Column 3 - Information */}
         <div className="col-span-2">
           <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
             Information
           </h3>
           <nav className="space-y-3">
             <a href="/about" className="block text-sm text-stone-700 hover:text-stone-900">
               About Us
             </a>
             <a href="/faq" className="block text-sm text-stone-700 hover:text-stone-900">
               FAQ
             </a>
             {/* ... more links */}
           </nav>
         </div>
         
         {/* Column 4 - Contact */}
         <div className="col-span-3">
           <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
             Visit Us
           </h3>
           <address className="not-italic text-sm text-stone-600 leading-relaxed">
             <p className="mb-3">
               123 Rustaveli Avenue
               <br />
               Batumi, Georgia 6010
             </p>
             <p className="mb-3">
               <a href="tel:+995555123456" className="hover:text-stone-900">
                 +995 555 123 456
               </a>
             </p>
             <p>
               <a href="mailto:info@silkbeauty.ge" className="hover:text-stone-900">
                 info@silkbeauty.ge
               </a>
             </p>
           </address>
           
           {/* Social - minimal */}
           <div className="mt-8 flex gap-6">
             <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">
               <span className="sr-only">Instagram</span>
               {/* Icon */}
             </a>
             <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">
               <span className="sr-only">Facebook</span>
               {/* Icon */}
             </a>
           </div>
         </div>
         
         {/* Column 5 - Hours */}
         <div className="col-span-2">
           <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
             Hours
           </h3>
           <dl className="text-sm space-y-2">
             <div className="flex justify-between">
               <dt className="text-stone-600">Mon – Fri</dt>
               <dd className="text-stone-900">9AM – 7PM</dd>
             </div>
             <div className="flex justify-between">
               <dt className="text-stone-600">Saturday</dt>
               <dd className="text-stone-900">10AM – 6PM</dd>
             </div>
             <div className="flex justify-between">
               <dt className="text-stone-600">Sunday</dt>
               <dd className="text-stone-900">Closed</dd>
             </div>
           </dl>
         </div>
       </div>
       
       {/* Bottom Credits */}
       <div className="pt-12 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
         <div className="flex gap-8">
           <span>© 2026 Silk Beauty Salon</span>
           <a href="/privacy" className="hover:text-stone-900">Privacy Policy</a>
           <a href="/terms" className="hover:text-stone-900">Terms of Service</a>
         </div>
         
         <div>
           <span>Design by [Studio Name]</span>
         </div>
       </div>
     </div>
   </footer>
   ```

3. **Alternative: Magazine End Sheet Style**
   ```tsx
   <footer className="bg-stone-900 text-stone-50 py-32">
     <div className="max-w-6xl mx-auto px-8">
       {/* Large centered content */}
       <div className="text-center mb-20">
         <h2 className="text-7xl font-serif font-light mb-8">
           See You Soon
         </h2>
         <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-12">
           Book your consultation and discover the art of subtle enhancement.
         </p>
         <button className="px-12 py-5 border-2 border-stone-50 text-sm uppercase tracking-wide hover:bg-stone-50 hover:text-stone-900 transition-all">
           Book Consultation
         </button>
       </div>
       
       {/* Credits grid - minimal */}
       <div className="grid grid-cols-4 gap-12 text-sm text-stone-400">
         <div>
           <p className="mb-2 text-stone-500">Location</p>
           <p>Batumi, Georgia</p>
         </div>
         <div>
           <p className="mb-2 text-stone-500">Contact</p>
           <p>+995 555 123 456</p>
         </div>
         <div>
           <p className="mb-2 text-stone-500">Hours</p>
           <p>Mon-Sat, 9AM-7PM</p>
         </div>
         <div>
           <p className="mb-2 text-stone-500">Follow</p>
           <p>@silkbeauty</p>
         </div>
       </div>
     </div>
   </footer>
   ```

Deliverables:
- Redesigned footer with colophon layout
- Newsletter form component (inline, elegant)
- Social icon components (minimal)
- Link hover animations
- Responsive grid layout
```

---

## 🎨 Global Design System Updates

### Typography Scale (Magazine Style)
```css
--font-display: 'Playfair Display', 'Cormorant Garamond', serif;
--font-body: 'Inter', 'Helvetica Neue', sans-serif;

--text-xs: 0.625rem;     /* 10px - credits, labels */
--text-sm: 0.875rem;     /* 14px - body, captions */
--text-base: 1rem;       /* 16px - main body */
--text-lg: 1.25rem;      /* 20px - large body */
--text-xl: 1.5rem;       /* 24px - deck text */
--text-2xl: 2rem;        /* 32px - subheadings */
--text-3xl: 2.5rem;      /* 40px - headings */
--text-4xl: 3.5rem;      /* 56px - large headings */
--text-5xl: 4.5rem;      /* 72px - hero */
--text-6xl: 6rem;        /* 96px - display */
--text-7xl: 8rem;        /* 128px - oversized */
```

### Spacing (Generous Whitespace)
```css
--space-xs: 0.5rem;      /* 8px */
--space-sm: 1rem;        /* 16px */
--space-md: 2rem;        /* 32px */
--space-lg: 4rem;        /* 64px */
--space-xl: 8rem;        /* 128px */
--space-2xl: 12rem;      /* 192px */
--space-3xl: 16rem;      /* 256px */
```

### Animation Timing (Luxurious)
```css
--duration-fast: 200ms;
--duration-normal: 500ms;
--duration-slow: 700ms;
--duration-slower: 1000ms;

--ease-elegant: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

---

**Implementation Priority:**
1. Start with PROMPT 1 (Hero) - Most impactful
2. Then PROMPT 2 (Treatments) - Core content
3. Then PROMPT 4 (Gallery) - Visual showcase
4. Then PROMPT 3 (About) - Brand story
5. Finally PROMPT 5 (Footer) - Finishing touch

Each prompt is self-contained and can be implemented independently!
