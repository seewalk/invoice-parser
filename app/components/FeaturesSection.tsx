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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* SEO OPTIMIZED Heading */}
          <h2 id="features-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Advanced Invoice Processing Features -{' '}
            <span className="gradient-text">Built for UK Businesses</span>
          </h2>
          {/* SEO OPTIMIZED Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for automated invoice processing and data extraction, from OCR
            scanning to QuickBooks integration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <feature.icon className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}