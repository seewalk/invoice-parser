'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  BarChart3,
  CheckCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { IconBox } from './ui/IconBox';
import { Heading } from './ui/Heading';
import { Text } from './ui/Text';
import { Card } from './ui/Card';

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Process invoices in under 5 seconds. 90% faster than manual entry.',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'SOC 2 Type II compliant. Your data is encrypted and protected 24/7.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track spending trends, supplier performance, and cost savings automatically.',
    },
    {
      icon: CheckCheck,
      title: '99% Accuracy Guaranteed',
      description: 'AI learns from corrections. Gets smarter with every invoice processed.',
    },
    {
      icon: TrendingUp,
      title: 'Auto-Integration',
      description: 'Syncs with QuickBooks, Xero, POS systems, and inventory management.',
    },
    {
      icon: Users,
      title: 'Multi-User Collaboration',
      description: 'Team approval workflows, role permissions, and activity tracking.',
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* SEO OPTIMIZED Heading */}
          <Heading 
            as="h2" 
            id="features-heading" 
            size="display-md" 
            align="center"
            className="mb-4"
          >
            Advanced Invoice Processing Features -{' '}
            <span className="gradient-text">Built for UK Businesses</span>
          </Heading>
          {/* SEO OPTIMIZED Subheading */}
          <Text 
            size="xl" 
            variant="muted" 
            align="center" 
            maxWidth="3xl"
            centered
            animate
          >
            Everything you need for automated invoice processing and data extraction, from OCR
            scanning to QuickBooks integration.
          </Text>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="hover"
              padding="lg"
              elevation="lg"
              animate={false}
              className="bg-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <IconBox
                  icon={<feature.icon />}
                  variant="primary"
                  styleVariant="gradient"
                  size="lg"
                  rounded="xl"
                  shadow="lg"
                  className="mb-4 bg-gradient-to-br from-primary-600 to-accent-500"
                  animate={false}
                />
                <Heading as="h3" size="xl" className="mb-3" animate={false}>
                  {feature.title}
                </Heading>
                <Text variant="muted" leading="relaxed" animate={false}>
                  {feature.description}
                </Text>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}