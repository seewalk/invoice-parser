import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoiceParse.ai - From PDF to Profit in 30 Seconds | AI Invoice Processing",
  description: "Stop wasting 4-5 hours daily on manual invoice entry. InvoiceParse.ai uses AI to extract, structure, and integrate invoice data automatically. Trusted by restaurants and warehouses across the UK.",
  keywords: "invoice automation, invoice processing, invoice parser, OCR invoice, restaurant invoice automation, warehouse invoice processing, AI invoice extraction",
  authors: [{ name: "Sseniseb" }],
  openGraph: {
    title: "InvoiceParse.ai - AI-Powered Invoice Processing",
    description: "From PDF to Profit in 30 Seconds. Automate invoice processing for restaurants and warehouses.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceParse.ai - AI Invoice Processing",
    description: "Stop wasting hours on manual invoice entry. Automate with AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
