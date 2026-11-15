import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Webfox — Öğrenmenin yeni yolu',
  description: 'Öğrenciler, eğitmenler ve kurumlar için akıllı öğrenme platformu.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
