import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Bilimbe — Photo Booth & Digital Engagement Solutions',
  description:
    'Discover the ultimate Photo Booth & Digital Engagement Solution Provider for all your events. AR games, 360 video booths, digital activations across India.',
  keywords:
    'photo booth, video booth, AR games, digital engagement, event technology, India, Chennai, Mumbai, Delhi',
  openGraph: {
    title: 'Bilimbe — Photo Booth & Digital Engagement Solutions',
    description: 'Capture emotion. Build bonds. Immersive event experiences across India.',
    type: 'website',
    url: 'https://www.bilimbe.in',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
