import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AdvancedSEOPreview } from "./components/seo/SEOPreview";
import GlobalSchema from "./components/GlobalSchema";
import { AuthProvider } from "./lib/firebase/AuthContext";


const inter = Inter({ subsets: ["latin"] });

// SEO Metadata Configuration
export const metadata = {
  title: 'Invoice Processing & Automation Tool UK | Invoice Generator',
  description: 'Automate invoice processing in 30 seconds with AI-powered OCR. Extract data from supplier invoices automatically. Perfect for UK restaurants & warehouses.',
  keywords: 'invoice processing, invoice automation, invoice processing software, automated invoice processing, invoice OCR, UK invoice automation, restaurant invoice software, Elektroluma',
  openGraph: {
    title: 'AI Invoice Processing & Automation for UK Businesses',
    description: '99% accurate invoice data extraction in 30 seconds. Stop manual entry, save 20 hours/week.',
    url: 'https://elektroluma.co.uk',
    siteName: 'InvoiceParse.ai by Elektroluma Ltd',
    images: [
      {
        url: 'https://elektroluma.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InvoiceParse.ai - AI-powered invoice processing and automation software by Elektroluma Ltd',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Invoice Processing UK | InvoiceParse.ai',
    description: '99% accurate invoice automation in 30 seconds. Free trial.',
    images: ['https://elektroluma.co.uk/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://elektroluma.co.uk',
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
  verification: {
    // Add Google Search Console verification when available
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        {/* Global Schema.org Markup - Organization & Website */}
        <GlobalSchema />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <AdvancedSEOPreview />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}