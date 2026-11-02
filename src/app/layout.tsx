import type { Metadata } from 'next';
import { Amarante, Inter } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

const amarante = Amarante({
  weight: '400',
  subsets: ['latin'],
  display: 'block',
  variable: '--font-amarante',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ali-aun.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: 'Ali Aun | Digital Architecture & Senior SQA Portfolio',
  description:
    'Portfolio of Ali Aun: SQA & Automation Specialist @ The Nevon & CrushSVG | Playwright • Next.js • n8n Pipelines & Production Email Systems.',
  openGraph: {
    title: 'Ali Aun | Digital Architecture & Senior SQA Portfolio',
    description:
      'Portfolio of Ali Aun: SQA & Automation Specialist @ The Nevon & CrushSVG | Playwright • Next.js • n8n Pipelines & Production Email Systems.',
    url: 'https://ali-aun.vercel.app',
    siteName: 'Ali Aun Portfolio',
    images: [
      {
        url: '/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Ali Aun Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${amarante.variable} ${inter.variable}`}>
      <body className="bg-[#070707] text-[#EFE9DC] antialiased selection:bg-[#EFE9DC] selection:text-[#070707]">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
