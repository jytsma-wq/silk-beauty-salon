// ============================================================================
// PAGE LAYOUT WRAPPER - French Beauty Salon Aesthetic
// ============================================================================
//
// Purpose: Provides consistent vertical rhythm using the custom `spacing.section`
//          Tailwind config value to separate major page sections.
//
// The `spacing.section` (defined as `clamp(4rem, 8vw, 8rem)`) creates generous,
// responsive whitespace that breathes - essential for high-end aesthetics.
//
// Usage:
//   <PageLayout>
//     <Hero />
//     <section className="py-section">...</section>
//     <AnotherComponent />
//   </PageLayout>
//
// ============================================================================

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-surface-0 ${className}`}>
      {/* Main content with consistent vertical flow */}
      <main className="flex flex-col">
        {children}
      </main>
    </div>
  );
}

// ============================================================================
// WHITESPACE BEST PRACTICES:
//
// 1. Use `py-section` (padding-y) for major section separators
//    - This applies the custom spacing.section value (clamp(4rem, 8vw, 8rem))
//    - Creates dramatic, breathing room between major content blocks
//
// 2. Use `gap-section` for grid/flex gaps between components
//    - Maintains consistent vertical rhythm
//
// 3. Internal component padding:
//    - Hero sections: py-section or pt-section
//    - Content blocks: py-16 to py-24
//    - Tight groups: space-y-6 to space-y-8
//
// 4. Never use absolute black backgrounds
//    - Use bg-surface-0 (#ffffff) for pure white
//    - Use bg-silk-50 or bg-surface-1 (#fafafa) for soft contrast
//
// ============================================================================
