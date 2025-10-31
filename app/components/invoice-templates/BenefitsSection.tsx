/**
 * ============================================================================
 * BENEFITS SECTION COMPONENT
 * ============================================================================
 * 
 * Displays the benefits of using invoice templates with:
 * - 6 key benefits in responsive grid
 * - Icons with colored backgrounds
 * - Clear headings and descriptions
 * 
 * Mobile-first responsive design
 */

'use client';

import { motion } from 'framer-motion';
import {
  Star,
  CheckCircle,
  Download,
  FileText,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

const benefits = [
  {
    icon: Star,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'Industry-Specific',
    description: 'Templates designed for your specific industry with pre-filled fields and industry standards (CIS, Gas Safe, NICEIC, VAT compliance)',
  },
  {
    icon: CheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'HMRC Compliant',
    description: 'All templates meet HMRC requirements for invoicing, including VAT registration, UTR numbers, and proper business details',
  },
  {
    icon: Download,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Multiple Formats',
    description: 'Download in Word (.docx), Excel (.xlsx), or PDF formats. Easily edit, customize, and send to clients',
  },
  {
    icon: FileText,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Professional Design',
    description: 'Clean, modern layouts that make your business look professional. Impress clients with well-designed invoices',
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    title: 'Get Paid Faster',
    description: 'Clear payment terms, bank details, and professional presentation help you get paid 2x faster',
  },
  {
    icon: Users,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'Used by Thousands',
    description: 'Join 10,000+ UK freelancers, contractors, and small businesses using our templates every month',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <Heading as="h2" size="display-sm" weight="bold" className="mb-3 sm:mb-4">
            Why Use Our Invoice Templates?
          </Heading>
          <Text size="lg" variant="muted" maxWidth="3xl" centered>
            Professional, compliant, and easy to customize for UK businesses
          </Text>
        </motion.div>

        {/* Benefits Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${benefit.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${benefit.iconColor}`} aria-hidden="true" />
                </div>

                {/* Title */}
                <Heading as="h3" size="lg" weight="bold" className="mb-2 sm:mb-3">
                  {benefit.title}
                </Heading>

                {/* Description */}
                <Text variant="muted" className="leading-relaxed">
                  {benefit.description}
                </Text>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}