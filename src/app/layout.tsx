import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  // Locale layout will render the actual <html> element with proper lang/dir
  return children;
}
