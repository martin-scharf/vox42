import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vox42 — Live Phone Translation',
  description: 'Translate your phone calls in real time with Vox42. Call anyone in the world and understand them in your own language.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
