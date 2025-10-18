import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Invoice Templates UK | 10+ Professional Invoice Templates by Industry',
  description: 'Download free, professional invoice templates for UK businesses. Choose from 10+ industry-specific templates: restaurants, photography, construction, freelance, and more. Word, Excel, PDF formats.',
  keywords: 'invoice template, free invoice template, invoice template uk, professional invoice template, business invoice template, freelance invoice, construction invoice, photography invoice',
  openGraph: {
    title: 'Free UK Invoice Templates - Professional & Industry-Specific',
    description: 'Download 10+ free invoice templates for UK businesses. Industry-specific templates for restaurants, photographers, builders, freelancers, and more.',
    type: 'website',
    url: 'https://yourdomain.com/invoice-templates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UK Invoice Templates',
    description: '10+ professional invoice templates for UK businesses',
  },
  alternates: {
    canonical: 'https://yourdomain.com/invoice-templates',
  },
};

export default function InvoiceTemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
