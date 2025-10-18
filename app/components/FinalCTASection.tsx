'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface FinalCTASectionProps {
  variant?: 'default' | 'faq' | 'pricing' | 'features';
  headline?: string;
  subheadline?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  benefits?: string[];
  backgroundColor?: 'primary' | 'dark' | 'gradient';
}

export default function FinalCTASection({
  variant = 'default',
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  benefits,
  backgroundColor = 'gradient',
}: FinalCTASectionProps) {
  // Variant-specific content
  const content = {
    default: {
      headline: 'Start Automating Invoice Processing Today',
      subheadline:
        'Join 500+ UK businesses that have switched to automated invoice processing. Free trial—no credit card required. Process your first 10 invoices free.',
      primaryCTA: 'Start Free Trial - 10 Invoices Free',
      secondaryCTA: 'Schedule a Demo',
      benefits: ['No credit card required', 'Cancel anytime', 'Setup in 5 minutes'],
    },
    faq: {
      headline: 'Still Have Questions About Invoice Automation?',
      subheadline:
        'Our team is here to help. Get personalized answers and see how invoice automation can transform your business in just 5 minutes.',
      primaryCTA: 'Start Free Trial',
      secondaryCTA: 'Contact Support',
      benefits: ['5-minute setup', 'No credit card required', '24/7 support'],
    },
    pricing: {
      headline: 'Ready to Save 20 Hours Per Week?',
      subheadline:
        'Start your free trial today. Process 10 invoices free—no credit card required. See the ROI in your first week.',
      primaryCTA: 'Start Free Trial Now',
      secondaryCTA: 'Compare All Plans',
      benefits: ['10 free invoices', 'Upgrade anytime', 'Cancel anytime'],
    },
    features: {
      headline: 'Ready to Stop Wasting Time on Invoices?',
      subheadline:
        'Join 500+ businesses saving 20 hours per week. Start your free trial today and see why teams love InvoiceParse.ai.',
      primaryCTA: 'Start Free Trial',
      secondaryCTA: 'Watch 2-Min Demo',
      benefits: ['90% faster processing', '99% accuracy', 'Zero setup required'],
    },
  };

  const selectedContent = content[variant];
  const finalHeadline = headline || selectedContent.headline;
  const finalSubheadline = subheadline || selectedContent.subheadline;
  const finalPrimaryCTA = primaryCTA || selectedContent.primaryCTA;
  const finalSecondaryCTA = secondaryCTA || selectedContent.secondaryCTA;
  const finalBenefits = benefits || selectedContent.benefits;

  // Background color variants
  const bgClasses = {
    primary: 'bg-primary-600',
    dark: 'bg-slate-900',
    gradient: 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800',
  };

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 ${bgClasses[backgroundColor]} text-white relative overflow-hidden`}
      aria-labelledby="final-cta-heading"
    >
      {/* Background Elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-20"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* SEO OPTIMIZED Heading */}
        <h2
          id="final-cta-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
        >
          {finalHeadline}
        </h2>

        {/* SEO OPTIMIZED Subheading */}
        <p className="text-xl sm:text-2xl mb-8 text-primary-100 leading-relaxed">
          {finalSubheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white text-primary-700 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1 flex items-center justify-center space-x-2"
            aria-label={`${finalPrimaryCTA} - Start automated invoice processing`}
          >
            <span>{finalPrimaryCTA}</span>
            <ArrowRight
              className="w-6 h-6 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary-800 border-2 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-primary-900 transition-all hover:-translate-y-1"
            aria-label={finalSecondaryCTA}
          >
            {finalSecondaryCTA}
          </motion.button>
        </div>

        {/* Benefits / Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 lg:gap-8 text-primary-100"
        >
          {finalBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm sm:text-base">{benefit}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}