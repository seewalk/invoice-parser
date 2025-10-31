/**
 * ============================================================================
 * INVOICE TEMPLATES HERO SECTION
 * ============================================================================
 * 
 * Hero section for invoice templates page with:
 * - Badge and headline
 * - Stats display (mobile-responsive)
 * - Key features with checkmarks
 * - Breadcrumb navigation
 * 
 * Mobile-first responsive design using UI components
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Briefcase, Layers, Sparkles } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Stat } from '../ui/Stat';

interface HeroSectionProps {
  opacity: any;
  scale: any;
  freeTemplateCount: number;
  premiumTemplateCount: number;
  totalIndustries: number;
  totalCategories: number;
}

export default function HeroSection({
  opacity,
  scale,
  freeTemplateCount,
  premiumTemplateCount,
  totalIndustries,
  totalCategories,
}: HeroSectionProps) {
  return (
    <section
      className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="templates-hero-heading"
    >
      {/* Background Elements */}
      <div 
        className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" 
        aria-hidden="true" 
      />

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-2 text-sm text-slate-600 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Invoice Templates</span>
        </motion.nav>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <Badge 
            variant="primary" 
            size="lg"
            icon={<Sparkles className="w-4 h-4" />}
          >
            Free Invoice Templates UK
          </Badge>
        </motion.div>

        {/* Headline */}
        <Heading
          as="h1"
          id="templates-hero-heading"
          size="display-lg"
          weight="extrabold"
          align="center"
          className="mb-4 sm:mb-6 px-4"
        >
          Free UK Invoice Templates
          <br />
          <span className="gradient-text">By Industry</span>
        </Heading>

        {/* Description */}
        <Text
          size="lg"
          variant="muted"
          align="center"
          maxWidth="4xl"
          centered
          className="mb-8 sm:mb-12 px-4"
        >
          Download professional, industry-specific invoice templates for UK businesses. {freeTemplateCount} free templates (with watermark) or upgrade to Pro for {freeTemplateCount + premiumTemplateCount} total templates. Available in Word, Excel, and PDF formats.
        </Text>

        {/* Stats - Mobile Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-5xl mx-auto px-4">
          <Stat
            value={freeTemplateCount.toString()}
            label="Free Templates"
            variant="success"
            layout="card"
            size="md"
            animate
            animationDelay={0.3}
          />
          <Stat
            value={`+${premiumTemplateCount}`}
            label="Premium (Pro)"
            variant="primary"
            layout="card"
            size="md"
            animate
            animationDelay={0.4}
          />
          <Stat
            value={totalIndustries.toString()}
            label="Industries"
            variant="info"
            layout="card"
            size="md"
            icon={<Briefcase className="w-5 h-5" />}
            animate
            animationDelay={0.5}
          />
          <Stat
            value={totalCategories.toString()}
            label="Categories"
            variant="default"
            layout="card"
            size="md"
            icon={<Layers className="w-5 h-5" />}
            animate
            animationDelay={0.6}
          />
        </div>

        {/* Key Features - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
        >
          <div className="flex items-start gap-3 text-left bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-100">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <Heading as="h3" size="sm" weight="semibold" className="mb-1">
                100% Free Forever
              </Heading>
              <Text size="xs" variant="muted">
                No sign-up, no credit card, no hidden fees
              </Text>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-100">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <Heading as="h3" size="sm" weight="semibold" className="mb-1">
                UK-Compliant
              </Heading>
              <Text size="xs" variant="muted">
                VAT-ready, HMRC-approved formats
              </Text>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-100 sm:col-span-1 col-span-2">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <Heading as="h3" size="sm" weight="semibold" className="mb-1">
                Easy Customization
              </Heading>
              <Text size="xs" variant="muted">
                Editable Word, Excel, PDF templates
              </Text>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}