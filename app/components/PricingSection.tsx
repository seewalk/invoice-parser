'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* SEO OPTIMIZED Heading */}
          <h2 id="pricing-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Invoice Processing Software Pricing -{' '}
            <span className="gradient-text">Simple & Transparent</span>
          </h2>
          {/* SEO OPTIMIZED Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start with 10 free invoices. No credit card required. Scale as you grow with our invoice
            automation plans.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Starter Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 bg-white border-2 border-gray-200"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Starter</h3>
              <p className="text-sm text-gray-600">Perfect for trying out the platform</p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center">
                <span className="text-xl text-gray-600">£</span>
                <span className="text-5xl font-bold text-gray-900">0</span>
              </div>
              <p className="text-sm mt-1 text-gray-600">forever</p>
            </div>

            <ul className="space-y-3 mb-8" role="list">
              {['10 invoices per month', 'Manual upload only', 'JSON/CSV export', 'Email support (48hr)', '1 user account'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-green-500" aria-hidden="true" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/pricing" className="block">
              <button className="w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl">
                Start Free
              </button>
            </Link>
          </motion.div>

          {/* Professional Plan Card - Popular */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-8 bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl scale-105 border-4 border-primary-400 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-accent-400 text-white px-4 py-1 rounded-full text-sm font-bold">
                ⭐ MOST POPULAR
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">Professional</h3>
              <p className="text-sm text-primary-100">For single-location businesses</p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center">
                <span className="text-xl text-primary-100">£</span>
                <span className="text-5xl font-bold text-white">29</span>
              </div>
              <p className="text-sm mt-1 text-primary-100">per month</p>
            </div>

            <ul className="space-y-3 mb-8" role="list">
              {['200 invoices per month', 'API access', 'Email support (24hr)', '3 user accounts', 'QuickBooks & Xero integration', 'Standard supplier patterns', 'Mobile app access'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-accent-300" aria-hidden="true" />
                  <span className="text-sm text-primary-50">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/pricing" className="block">
              <button className="w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 bg-white text-primary-700 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
            </Link>
          </motion.div>

          {/* Business Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-8 bg-white border-2 border-gray-200"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Business</h3>
              <p className="text-sm text-gray-600">For multi-location operations</p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center">
                <span className="text-xl text-gray-600">£</span>
                <span className="text-5xl font-bold text-gray-900">99</span>
              </div>
              <p className="text-sm mt-1 text-gray-600">per month</p>
            </div>

            <ul className="space-y-3 mb-8" role="list">
              {['1,000 invoices per month', 'Priority API access', 'Phone + email support', '10 user accounts', 'All integrations', 'Custom supplier patterns (5)', 'Batch processing', 'Approval workflows', 'Analytics dashboard'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-green-500" aria-hidden="true" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/pricing" className="block">
              <button className="w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
            </Link>
          </motion.div>
        </div>

        {/* CTA to Full Pricing Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Link href="/pricing">
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <span>View Full Pricing Details</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white"
        >
          <Rocket className="w-16 h-16 mx-auto mb-4 text-accent-400" aria-hidden="true" />
          <h3 className="text-3xl font-bold mb-4">Need Enterprise-Level Invoice Processing?</h3>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            Unlimited invoices, custom ML training, white-label options, dedicated support, and more.
          </p>
          <button
            className="bg-accent-400 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-500 transition-all hover:-translate-y-1 shadow-xl"
            aria-label="Contact sales for custom invoice processing pricing"
          >
            Contact Sales for Custom Pricing
          </button>
        </motion.div>
      </div>
    </section>
  );
}
