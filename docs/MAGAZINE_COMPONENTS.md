# Advanced Magazine Components & Layouts

## 📌 MAGAZINE PROMPT 6: Navigation - Minimal Editorial Header

```
Task: Transform navigation into a magazine-style minimal header with elegant interactions

Context:
- Current: Standard navbar with links
- Need: High-fashion magazine navigation
- Reference: Vogue, Porter, The Gentlewoman headers

Requirements:

1. **Header Layout Styles**

   **Style A: Floating Minimal (Preferred)**
   ```tsx
   <header className="fixed top-0 left-0 right-0 z-50">
     {/* Gradient backdrop blur */}
     <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-stone-50/90 to-transparent" />
     
     <nav className="relative max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
       {/* Left: Logo (minimal) */}
       <a href="/" className="font-serif text-xl tracking-tight">
         Silk
       </a>
       
       {/* Center: Main nav (hidden on mobile) */}
       <div className="hidden md:flex items-center gap-12">
         <a href="/treatments" className="text-sm uppercase tracking-widest text-stone-700 hover:text-stone-900 transition-colors">
           Treatments
         </a>
         <a href="/gallery" className="text-sm uppercase tracking-widest text-stone-700 hover:text-stone-900 transition-colors">
           Gallery
         </a>
         <a href="/about" className="text-sm uppercase tracking-widest text-stone-700 hover:text-stone-900 transition-colors">
           About
         </a>
       </div>
       
       {/* Right: Actions */}
       <div className="flex items-center gap-6">
         {/* Language selector */}
         <button className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900">
           EN
         </button>
         
         {/* Book CTA - minimal */}
         <a href="/book" className="px-6 py-3 border border-stone-900 text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-stone-50 transition-all">
           Book
         </a>
         
         {/* Mobile menu */}
         <button className="md:hidden">
           <span className="sr-only">Menu</span>
           {/* Hamburger icon - minimal lines */}
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
             <line x1="3" y1="12" x2="21" y2="12" />
             <line x1="3" y1="6" x2="21" y2="6" />
             <line x1="3" y1="18" x2="21" y2="18" />
           </svg>
         </button>
       </div>
     </nav>
   </header>
   ```

   **Style B: Side Navigation (Alternative)**
   ```tsx
   <header className="fixed left-0 top-0 bottom-0 z-50 w-20 flex flex-col items-center py-12 bg-stone-50/90 backdrop-blur-md border-r border-stone-200">
     {/* Logo at top */}
     <a href="/" className="mb-auto">
       <svg className="w-8 h-8">
         {/* Minimal logo mark */}
       </svg>
     </a>
     
     {/* Vertical nav */}
     <nav className="flex flex-col gap-8 -rotate-90 origin-center whitespace-nowrap">
       <a href="/treatments" className="text-xs uppercase tracking-widest">
         Treatments
       </a>
       <a href="/gallery" className="text-xs uppercase tracking-widest">
         Gallery
       </a>
       <a href="/about" className="text-xs uppercase tracking-widest">
         About
       </a>
     </nav>
     
     {/* Book at bottom */}
     <a href="/book" className="mt-auto writing-mode-vertical text-xs uppercase tracking-widest">
       Book
     </a>
   </header>
   ```

2. **Full-Screen Menu Overlay** (Magazine Contents Page)
   ```tsx
   <div className="fixed inset-0 bg-stone-50 z-50 flex items-center justify-center">
     {/* Close button */}
     <button className="absolute top-8 right-8 text-4xl font-light text-stone-900">
       ×
     </button>
     
     {/* Menu content - magazine contents style */}
     <div className="max-w-5xl w-full px-8">
       <div className="grid grid-cols-2 gap-20">
         {/* Left column - main nav */}
         <nav className="space-y-8">
           <div>
             <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 block">
               Explore
             </span>
             
             <a href="/treatments" className="block group">
               <h2 className="text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                 Treatments
               </h2>
               <p className="text-sm text-stone-500">
                 Browse our premium aesthetic services
               </p>
             </a>
           </div>
           
           <a href="/gallery" className="block group">
             <h2 className="text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
               Gallery
             </h2>
             <p className="text-sm text-stone-500">
               View real patient results
             </p>
           </a>
           
           <a href="/about" className="block group">
             <h2 className="text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
               About
             </h2>
             <p className="text-sm text-stone-500">
               Meet our expert team
             </p>
           </a>
         </nav>
         
         {/* Right column - secondary */}
         <div>
           <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 block">
             Quick Links
           </span>
           
           <nav className="space-y-4">
             <a href="/contact" className="block text-lg text-stone-700 hover:text-stone-900">
               Contact
             </a>
             <a href="/faq" className="block text-lg text-stone-700 hover:text-stone-900">
               FAQ
             </a>
             <a href="/blog" className="block text-lg text-stone-700 hover:text-stone-900">
               Journal
             </a>
           </nav>
           
           {/* Contact info */}
           <div className="mt-20">
             <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-4 block">
               Visit Us
             </span>
             <p className="text-sm text-stone-600 leading-relaxed">
               123 Rustaveli Avenue<br />
               Batumi, Georgia 6010
             </p>
             <a href="tel:+995555123456" className="block mt-4 text-sm text-stone-900 hover:underline">
               +995 555 123 456
             </a>
           </div>
           
           {/* CTA */}
           <a href="/book" className="mt-12 block w-full py-5 bg-stone-900 text-stone-50 text-center text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors">
             Book Consultation
           </a>
         </div>
       </div>
     </div>
   </div>
   ```

3. **Scroll Behavior**
   - Header hides on scroll down, shows on scroll up
   - Becomes semi-transparent on scroll
   - Smooth transitions
   - Logo size reduces slightly on scroll

4. **Language Selector** (Magazine Style)
   ```tsx
   <div className="relative group">
     <button className="flex items-center gap-2 text-xs uppercase tracking-widest">
       <span>EN</span>
       <svg className="w-3 h-3 transition-transform group-hover:rotate-180" />
     </button>
     
     {/* Dropdown */}
     <div className="absolute top-full right-0 mt-4 bg-white border border-stone-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
       <a href="?lang=en" className="block px-8 py-4 text-sm text-stone-700 hover:bg-stone-50">
         English
       </a>
       <a href="?lang=ka" className="block px-8 py-4 text-sm text-stone-700 hover:bg-stone-50">
         ქართული
       </a>
       <a href="?lang=ru" className="block px-8 py-4 text-sm text-stone-700 hover:bg-stone-50">
         Русский
       </a>
       {/* ... more languages */}
     </div>
   </div>
   ```

Deliverables:
- Redesigned navigation component
- Full-screen menu overlay
- Scroll behavior hooks
- Mobile menu drawer
- Language selector dropdown
```

---

## 📌 MAGAZINE PROMPT 7: Treatment Detail Pages - Longform Article

```
Task: Design treatment pages as in-depth magazine articles with rich multimedia

Context:
- Individual treatment pages (Botox, Fillers, etc.)
- Need editorial longform layout
- Reference: NYT features, The Atlantic longform

Requirements:

1. **Article Hero** (Full-Width Immersive)
   ```tsx
   <article>
     {/* Hero section */}
     <header className="relative h-screen flex items-end">
       {/* Background image */}
       <div className="absolute inset-0">
         <Image src="treatment-hero.jpg" fill className="object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
       </div>
       
       {/* Content */}
       <div className="relative max-w-4xl mx-auto px-8 pb-20">
         {/* Breadcrumb */}
         <nav className="mb-8 text-xs uppercase tracking-widest text-stone-300">
           <a href="/treatments" className="hover:text-stone-50">Treatments</a>
           <span className="mx-3">/</span>
           <span className="text-stone-400">Botox</span>
         </nav>
         
         {/* Title */}
         <h1 className="text-[clamp(3rem,8vw,7rem)] font-serif font-light leading-[0.95] text-stone-50 mb-8">
           The Art of
           <br />
           <em className="italic text-[#b5453a]">Botox</em>
         </h1>
         
         {/* Deck */}
         <p className="text-xl leading-relaxed text-stone-200 max-w-2xl">
           Precision wrinkle reduction through advanced neuromodulator therapy. 
           Discover how subtle interventions create natural, elegant results.
         </p>
         
         {/* Meta */}
         <div className="mt-12 flex gap-8 text-sm text-stone-400">
           <span>Treatment Time: 15-20 min</span>
           <span>Results: 3-5 days</span>
           <span>Duration: 3-6 months</span>
         </div>
       </div>
       
       {/* Scroll indicator */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
         <div className="w-px h-16 bg-gradient-to-b from-stone-300 to-transparent animate-pulse" />
       </div>
     </header>
     
     {/* Article body */}
     <div className="max-w-3xl mx-auto px-8 py-32">
       {/* Quick facts sidebar */}
       <aside className="float-right ml-12 mb-8 w-64 p-8 bg-stone-50">
         <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-6">
           At a Glance
         </h3>
         <dl className="space-y-4 text-sm">
           <div>
             <dt className="text-stone-500 mb-1">Best For</dt>
             <dd>Forehead lines, crow's feet, frown lines</dd>
           </div>
           <div>
             <dt className="text-stone-500 mb-1">Procedure Time</dt>
             <dd>15-20 minutes</dd>
           </div>
           <div>
             <dt className="text-stone-500 mb-1">Downtime</dt>
             <dd>None</dd>
           </div>
           <div>
             <dt className="text-stone-500 mb-1">Results Last</dt>
             <dd>3-6 months</dd>
           </div>
         </dl>
         
         <button className="mt-8 w-full py-3 bg-stone-900 text-stone-50 text-xs uppercase tracking-wide">
           Book Now
         </button>
       </aside>
       
       {/* Drop cap first paragraph */}
       <p className="text-lg leading-relaxed text-stone-700 mb-8">
         <span className="float-left text-8xl font-serif leading-none mr-4 mt-2 text-[#b5453a]">
           B
         </span>
         otulinum toxin, commonly known as Botox, represents one of the most 
         refined tools in modern aesthetic medicine. When administered with 
         precision by trained medical professionals, this neuromodulator can 
         soften dynamic wrinkles while preserving natural facial expression...
       </p>
       
       {/* Continuing body text */}
       <p className="text-base leading-relaxed text-stone-700 mb-6">
         At Silk Beauty Salon, our approach to Botox is guided by the principle 
         of enhancement, not transformation. We study the unique architecture of 
         your face, understanding how muscles interact to create your expressions...
       </p>
       
       <h2 className="text-3xl font-serif font-light mt-16 mb-8">
         The Science Behind the Treatment
       </h2>
       
       <p className="text-base leading-relaxed text-stone-700 mb-6">
         Botox works by temporarily blocking nerve signals to specific facial muscles...
       </p>
       
       {/* Pull quote */}
       <aside className="my-16 py-12 border-y border-stone-200">
         <blockquote className="text-3xl font-serif italic leading-tight text-stone-800 text-center max-w-2xl mx-auto">
           "The goal is not to erase expression, but to refine it—to let 
           your natural beauty shine through without the interference of 
           unwanted lines."
         </blockquote>
         <footer className="mt-6 text-center">
           <cite className="not-italic text-sm text-stone-500">
             — Dr. Ana Beridze
           </cite>
         </footer>
       </aside>
       
       {/* Image break */}
       <figure className="my-20 -mx-20">
         <div className="relative aspect-[16/9]">
           <Image src="procedure.jpg" fill className="object-cover" />
         </div>
         <figcaption className="mt-4 text-xs italic text-stone-500 text-center">
           Dr. Beridze performing a precise Botox treatment
         </figcaption>
       </figure>
       
       {/* Continue article... */}
     </div>
   </article>
   ```

2. **Treatment Comparison Table** (Magazine Specs Sheet)
   ```tsx
   <section className="bg-stone-50 py-32">
     <div className="max-w-6xl mx-auto px-8">
       <h2 className="text-5xl font-serif font-light mb-16 text-center">
         Choose Your Treatment
       </h2>
       
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead>
             <tr className="border-b-2 border-stone-900">
               <th className="pb-6 text-left text-xs uppercase tracking-widest text-stone-500">
                 Treatment
               </th>
               <th className="pb-6 text-left text-xs uppercase tracking-widest text-stone-500">
                 Best For
               </th>
               <th className="pb-6 text-left text-xs uppercase tracking-widest text-stone-500">
                 Duration
               </th>
               <th className="pb-6 text-left text-xs uppercase tracking-widest text-stone-500">
                 Results Last
               </th>
               <th className="pb-6 text-left text-xs uppercase tracking-widest text-stone-500">
                 Price From
               </th>
             </tr>
           </thead>
           <tbody>
             <tr className="border-b border-stone-200">
               <td className="py-8 font-serif text-xl">Botox</td>
               <td className="py-8 text-sm text-stone-600">Dynamic wrinkles</td>
               <td className="py-8 text-sm">15-20 min</td>
               <td className="py-8 text-sm">3-6 months</td>
               <td className="py-8 text-sm font-medium">₾ 450</td>
             </tr>
             <tr className="border-b border-stone-200">
               <td className="py-8 font-serif text-xl">Dermal Fillers</td>
               <td className="py-8 text-sm text-stone-600">Volume loss</td>
               <td className="py-8 text-sm">30-45 min</td>
               <td className="py-8 text-sm">12-18 months</td>
               <td className="py-8 text-sm font-medium">₾ 800</td>
             </tr>
             {/* More rows... */}
           </tbody>
         </table>
       </div>
     </div>
   </section>
   ```

3. **FAQ Section** (Magazine Q&A Format)
   ```tsx
   <section className="max-w-3xl mx-auto px-8 py-32">
     <h2 className="text-5xl font-serif font-light mb-20">
       Questions & Answers
     </h2>
     
     <div className="space-y-16">
       <article>
         <h3 className="text-2xl font-serif font-light mb-4">
           Does Botox hurt?
         </h3>
         <p className="text-base leading-relaxed text-stone-700">
           Most patients describe the sensation as a slight pinch. We use ultra-fine 
           needles and can apply topical numbing cream if desired. The entire procedure 
           typically takes less than 15 minutes.
         </p>
       </article>
       
       <article>
         <h3 className="text-2xl font-serif font-light mb-4">
           When will I see results?
         </h3>
         <p className="text-base leading-relaxed text-stone-700">
           Initial effects appear within 3-5 days, with full results visible at 
           10-14 days. This gradual onset ensures natural-looking results.
         </p>
       </article>
       
       {/* More Q&As... */}
     </div>
   </section>
   ```

4. **Related Treatments** (Magazine "Read Next" Section)
   ```tsx
   <section className="bg-stone-50 py-32">
     <div className="max-w-7xl mx-auto px-8">
       <h2 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-12">
         You Might Also Like
       </h2>
       
       <div className="grid grid-cols-3 gap-12">
         <article className="group cursor-pointer">
           <div className="relative aspect-[4/5] mb-6 overflow-hidden">
             <Image 
               src="filler.jpg" 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-700" 
             />
           </div>
           <h3 className="text-2xl font-serif font-light mb-3">
             Dermal Fillers
           </h3>
           <p className="text-sm text-stone-600 leading-relaxed mb-4">
             Restore volume and enhance facial contours with hyaluronic acid fillers.
           </p>
           <a href="/treatments/fillers" className="text-sm text-stone-900 underline underline-offset-4">
             Learn more
           </a>
         </article>
         
         {/* More related treatments... */}
       </div>
     </div>
   </section>
   ```

Deliverables:
- Treatment detail page template
- Longform article component
- Comparison table component
- FAQ accordion (magazine style)
- Related treatments grid
- Booking CTA sticky footer
```

---

## 📌 MAGAZINE PROMPT 8: Interactive Elements - Magazine UI Kit

```
Task: Create reusable magazine-style interactive components

Requirements:

1. **Buttons & CTAs**

   **Primary CTA (Magazine Style)**
   ```tsx
   <button className="group relative overflow-hidden px-12 py-5 border border-stone-900">
     <span className="relative z-10 text-sm uppercase tracking-widest text-stone-900 group-hover:text-stone-50 transition-colors duration-500">
       Book Consultation
     </span>
     <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
   </button>
   ```

   **Secondary CTA (Underline Style)**
   ```tsx
   <a href="#" className="group inline-flex items-center gap-2">
     <span className="text-sm text-stone-700 group-hover:text-stone-900">
       View all treatments
     </span>
     <svg className="w-4 h-4 transition-transform group-hover:translate-x-1">
       <path d="M0 12h20M12 4l8 8-8 8" stroke="currentColor" strokeWidth="1" fill="none" />
     </svg>
     <div className="absolute bottom-0 left-0 w-0 h-px bg-stone-900 group-hover:w-full transition-all duration-300" />
   </a>
   ```

2. **Form Inputs** (Minimal Editorial)
   ```tsx
   <div className="space-y-8">
     {/* Text input */}
     <div>
       <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">
         Full Name
       </label>
       <input 
         type="text"
         className="w-full px-0 py-4 border-0 border-b-2 border-stone-300 focus:border-stone-900 bg-transparent text-base outline-none transition-colors"
         placeholder="Enter your name"
       />
     </div>
     
     {/* Select */}
     <div>
       <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">
         Treatment Interest
       </label>
       <select className="w-full px-0 py-4 border-0 border-b-2 border-stone-300 focus:border-stone-900 bg-transparent text-base outline-none appearance-none">
         <option>Select treatment</option>
         <option>Botox</option>
         <option>Dermal Fillers</option>
         {/* ... */}
       </select>
     </div>
     
     {/* Textarea */}
     <div>
       <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">
         Message
       </label>
       <textarea 
         rows={4}
         className="w-full px-0 py-4 border-0 border-b-2 border-stone-300 focus:border-stone-900 bg-transparent text-base outline-none resize-none transition-colors"
         placeholder="Tell us about your goals"
       />
     </div>
   </div>
   ```

3. **Cards** (NO borders, magazine cutouts)
   ```tsx
   {/* Image-first card */}
   <article className="group">
     <div className="relative aspect-[3/4] mb-6 overflow-hidden">
       <Image 
         src="..." 
         fill 
         className="object-cover group-hover:scale-105 transition-transform duration-700" 
       />
       
       {/* Floating label */}
       <div className="absolute top-6 left-6 px-4 py-2 bg-stone-50/90 backdrop-blur-sm">
         <span className="text-xs uppercase tracking-widest">Featured</span>
       </div>
     </div>
     
     <div className="px-6">
       <h3 className="text-2xl font-serif font-light mb-3 group-hover:text-stone-600 transition-colors">
         Title Here
       </h3>
       <p className="text-sm text-stone-600 leading-relaxed">
         Description text that flows naturally...
       </p>
     </div>
   </article>
   ```

4. **Dividers** (Magazine Section Breaks)
   ```tsx
   {/* Simple line */}
   <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
   
   {/* With ornament */}
   <div className="flex items-center gap-8">
     <div className="flex-1 h-px bg-stone-300" />
     <svg className="w-8 h-8 text-stone-300">
       {/* Decorative ornament */}
     </svg>
     <div className="flex-1 h-px bg-stone-300" />
   </div>
   
   {/* Section marker */}
   <div className="flex items-center gap-6 my-20">
     <div className="w-16 h-px bg-stone-300" />
     <span className="text-xs tracking-[0.4em] uppercase text-stone-400">
       Next Section
     </span>
     <div className="flex-1 h-px bg-stone-300" />
   </div>
   ```

5. **Tooltips** (Minimal Annotations)
   ```tsx
   <span className="group relative cursor-help border-b border-dotted border-stone-400">
     Hyaluronic acid
     
     <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-stone-900 text-stone-50 text-xs leading-relaxed max-w-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none">
       A naturally occurring substance in skin that retains moisture and volume
       <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
     </span>
   </span>
   ```

6. **Loading States** (Elegant Transitions)
   ```tsx
   {/* Skeleton loader - minimal */}
   <div className="space-y-8 animate-pulse">
     <div className="h-96 bg-stone-100" />
     <div className="h-8 bg-stone-100 w-3/4" />
     <div className="space-y-3">
       <div className="h-4 bg-stone-100" />
       <div className="h-4 bg-stone-100 w-5/6" />
     </div>
   </div>
   
   {/* Spinner - minimal */}
   <div className="flex items-center justify-center py-20">
     <div className="w-12 h-12 border border-stone-300 border-t-stone-900 rounded-full animate-spin" />
   </div>
   ```

7. **Badges & Tags** (Editorial Labels)
   ```tsx
   {/* Category badge */}
   <span className="inline-block px-4 py-2 text-xs uppercase tracking-widest border border-stone-300 text-stone-600">
     Anti-Aging
   </span>
   
   {/* Featured tag */}
   <span className="inline-block px-6 py-2 bg-[#b5453a] text-stone-50 text-xs uppercase tracking-widest">
     New
   </span>
   
   {/* Minimal pill */}
   <span className="inline-block px-3 py-1 text-xs text-stone-500">
     15 min read
   </span>
   ```

Deliverables:
- Complete UI component library
- Storybook or component showcase page
- Usage documentation
- Accessibility tested
- Dark mode variants (if needed)
```

---

## 🎨 Magazine Design Utilities

### CSS Utilities Library
```css
/* Magazine Typography Classes */
.editorial-number {
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.02em;
}

.drop-cap::first-letter {
  float: left;
  font-size: 5em;
  line-height: 0.85;
  margin: 0.1em 0.15em 0 0;
  font-family: var(--font-display);
  color: var(--color-accent);
}

.magazine-headline {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.kicker {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 400;
}

/* Magazine Layouts */
.broken-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.bleed-left {
  margin-left: -5vw;
}

.bleed-right {
  margin-right: -5vw;
}

.full-bleed {
  width: 100vw;
  margin-left: calc(-1 * (100vw - 100%) / 2);
}

/* Magazine Effects */
.image-hover-scale {
  transition: transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.image-hover-scale:hover {
  transform: scale(1.05);
}

.gradient-text {
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

**This provides a comprehensive magazine redesign system. Ready to implement with Kimi 2.5 in Windsurf!** 🎨
