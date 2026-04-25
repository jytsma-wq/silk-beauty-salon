import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Aesthetics | Confidence in Your Skin',
  description: 'Premium aesthetic treatments and beauty services. Swiss-quality care, French elegance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-body">
        {children}
      </body>
    </html>
  )
}
