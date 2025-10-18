'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Star,
  FileText,
  Sparkles,
  BarChart3,
  Rocket,
  ChevronDown,
  Menu,
  X,
  Upload,
  CheckCheck,
  Download,
  AlertCircle,
} from 'lucide-react';

import HeroSection from './components/HeroSection';
import SocialProofBar from './components/SocialProofBar';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import ROISection from './components/ROISection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import { getFAQsByCategory } from './lib/faqData';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <>
      {/* Schema Markup - SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'InvoiceParse.ai',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            description:
              'AI-powered invoice processing and automation software for UK businesses. Extract data from supplier invoices automatically with 99% accuracy in 30 seconds.',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'GBP',
              lowPrice: '0',
              highPrice: '99',
              offerCount: '3',
              priceSpecification: [
                {
                  '@type': 'UnitPriceSpecification',
                  price: '0',
                  priceCurrency: 'GBP',
                  name: 'Starter Plan',
                },
                {
                  '@type': 'UnitPriceSpecification',
                  price: '29',
                  priceCurrency: 'GBP',
                  name: 'Professional Plan',
                },
                {
                  '@type': 'UnitPriceSpecification',
                  price: '99',
                  priceCurrency: 'GBP',
                  name: 'Business Plan',
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '500',
            },
            image: 'https://invoiceparse.ai/logo.png',
            screenshot: 'https://invoiceparse.ai/screenshot.png',
            url: 'https://invoiceparse.ai',
          }),
        }}
      />

      {/* Schema Markup - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How accurate is AI-powered invoice processing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our AI invoice processing achieves 99% accuracy on average. It learns from corrections and improves over time. For the rare 1% of edge cases, you can quickly review and approve with one click.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which invoice formats does the software support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our invoice processing software supports PDFs, images (JPG, PNG), and scanned documents from any supplier. Our AI is trained on 20+ major UK food service suppliers like Sysco, US Foods, Costco, and handles custom supplier invoice formats too.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does invoice automation setup take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Invoice automation setup takes literally 5 minutes. Sign up, upload your first invoice, and you are done. No complex configuration needed for automated invoice processing.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the cost of invoice processing automation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Invoice processing automation starts at £0/month for 10 invoices (free forever). Professional plans start at £29/month for 200 invoices with API access and QuickBooks integration.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is invoice data secure with cloud-based processing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely. Our invoice processing software uses bank-level AES-256 encryption, is SOC 2 Type II compliant, GDPR compliant, and hosted on secure AWS UK infrastructure.',
                },
              },
            ],
          }),
        }}
      />

      {/* Schema Markup - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'InvoiceParse.ai',
            url: 'https://invoiceparse.ai',
            logo: 'https://invoiceparse.ai/logo.png',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              areaServed: 'GB',
              availableLanguage: 'English',
            },
            sameAs: [
              'https://twitter.com/invoiceparse',
              'https://linkedin.com/company/invoiceparse',
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
       
        {/* Hero Section */}
        <HeroSection opacity={opacity} scale={scale} />

        {/* Social Proof Bar */}
        <SocialProofBar />

        {/* Problem Section */}
        <ProblemSection />

        {/* Solution/How It Works */}
        <HowItWorksSection />

        {/* Features Grid */}
        <FeaturesSection />

        {/* Benefits/ROI Calculator */}
        <ROISection />

        {/* Pricing */}
        <PricingSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
<FAQSection faqs={getFAQsByCategory('Invoice Automation')} />
        {/* Final CTA */}
        <FinalCTASection />

      </main>
    </>
  );
}




