'use client';

import { useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

// Above-the-fold components (load immediately)
import HeroSection from './components/home-page/HeroSection';
import SocialProofBar from './components/home-page/SocialProofBar';
import ProblemSection from './components/home-page/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import { getFAQsByCategory } from './lib/faqData';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';

// Below-the-fold components (lazy load for performance)
import {
  ROISectionSkeleton,
  TestimonialsSectionSkeleton,
  PricingSectionSkeleton,
} from './components/LoadingSkeletons';

const ROISection = dynamic(() => import('./components/ROISection'), {
  loading: () => <ROISectionSkeleton />,
  ssr: true,
});

const TestimonialsSection = dynamic(() => import('./components/TestimonialsSection'), {
  loading: () => <TestimonialsSectionSkeleton />,
  ssr: true,
});

const PricingSection = dynamic(() => import('./components/PricingSection'), {
  loading: () => <PricingSectionSkeleton />,
  ssr: true,
});

export default function HomeContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
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
  );
}
