'use client';

import { motion } from 'framer-motion';
import {
  Upload,
  Sparkles,
  CheckCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Invoice',
      description:
        'Drag & drop PDFs, images, or email invoices directly to our platform. Works with any supplier format.',
      icon: Upload,
    },
    {
      number: '02',
      title: 'AI Extracts Everything',
      description:
        'Our AI reads line items, prices, quantities, dates, and categorizes products automatically in seconds.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Review & Approve',
      description:
        'Quick visual review with 99% accuracy. Edit anything if needed, or approve with one click.',
      icon: CheckCheck,
    },
    {
      number: '04',
      title: 'Auto-Integrate',
      description:
        'Data flows directly to QuickBooks, Xero, your POS, or inventory system. Zero manual entry.',
      icon: Zap,
    },
  ];

  return (
    <section
      id="how-invoice-automation-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* SEO OPTIMIZED Heading */}
          <h2 id="how-it-works-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How Our Invoice Automation Works - <span className="gradient-text">Stupid Simple</span>
          </h2>
          {/* SEO OPTIMIZED Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From invoice upload to automated data export in 4 simple steps. No technical skills
            required for invoice processing automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent -z-10"
                  aria-hidden="true"
                />
              )}

              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <div className="text-6xl font-bold text-primary-200 mb-2" aria-hidden="true">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video/Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 inline-flex items-center space-x-2"
            aria-label="Watch invoice automation demo video"
          >
            <span>See It In Action - Watch Demo</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}