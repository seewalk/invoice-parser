import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AdvancedSEOPreview } from "./components/seo/SEOPreview";


const inter = Inter({ subsets: ["latin"] });

// SEO Metadata Configuration
export const metadata = {
  title: 'Invoice Processing & Automation Software UK | InvoiceParse.ai - 99% Accurate AI',
  description: 'Automate invoice processing in 30 seconds with AI-powered OCR. Extract data from supplier invoices automatically. Perfect for UK restaurants & warehouses. Free trial—10 invoices free.',
  keywords: 'invoice processing, invoice automation, invoice processing software, automated invoice processing, invoice OCR, UK invoice automation, restaurant invoice software',
  openGraph: {
    title: 'AI Invoice Processing & Automation for UK Businesses',
    description: '99% accurate invoice data extraction in 30 seconds. Stop manual entry, save 20 hours/week.',
    url: 'https://invoiceparse.ai',
    siteName: 'InvoiceParse.ai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InvoiceParse.ai - AI-powered invoice processing and automation software',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Invoice Processing UK | InvoiceParse.ai',
    description: '99% accurate invoice automation in 30 seconds. Free trial.',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://invoiceparse.ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <AdvancedSEOPreview />
        {children}
        <Footer />
      </body>
    </html>
  );
}