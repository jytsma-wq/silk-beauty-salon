'use client';

interface ManifestoProps {
  children: React.ReactNode;
  className?: string;
}

export function Manifesto({ children, className = '' }: ManifestoProps) {
  return (
    <section className={`manifesto-section ${className}`}>
      <div className="container-custom text-center">
        <h2 className="manifesto-text-large">
          {children}
        </h2>
      </div>
    </section>
  );
}
