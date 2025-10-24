'use client';

import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

export default function ROISection() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50"
      aria-labelledby="roi-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* SEO OPTIMIZED Heading */}
          <h2 id="roi-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Invoice Automation ROI: Save <span className="text-green-600">£26,000 Annually</span>
          </h2>
          {/* SEO OPTIMIZED Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how much time and money you'll save with automated invoice processing
            compared to manual invoice data entry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="text-5xl font-bold text-green-600 mb-2">20</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Hours Saved</div>
            <div className="text-gray-600">per week on average</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="text-5xl font-bold text-green-600 mb-2">£2,000</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Monthly Savings</div>
            <div className="text-gray-600">in labor costs alone</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Error Reduction</div>
            <div className="text-gray-600">fewer costly mistakes</div>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Manual Process */}
            <div className="p-8 bg-red-50 border-r border-gray-200">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <X className="w-6 h-6 mr-2" aria-hidden="true" />
                Manual Process
              </h3>
              <ul className="space-y-4" role="list">
                {[
                  '10-15 minutes per invoice',
                  'Prone to human errors',
                  'Delayed stock updates',
                  'Staff burnout & turnover',
                  'No spending insights',
                  'Manual data export',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With Elektroluma */}
            <div className="p-8 bg-green-50">
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" aria-hidden="true" />
                With Invoice Automation
              </h3>
              <ul className="space-y-4" role="list">
                {[
                  '30 seconds per invoice ⚡',
                  '99% accuracy guaranteed',
                  'Real-time auto-updates',
                  'Team focuses on growth',
                  'Smart analytics dashboard',
                  'Auto-sync to all systems',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}