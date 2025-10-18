'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: '4-5 Hours Wasted Daily',
      description:
        'Your team spends more time typing invoices than running the business. Every invoice takes 10-15 minutes of manual data entry.',
    },
    {
      icon: AlertCircle,
      title: 'Costly Data Entry Errors',
      description:
        'Human mistakes in pricing, quantities, and SKUs lead to inventory discrepancies and budget overruns that eat into profits.',
    },
    {
      icon: TrendingUp,
      title: 'Delayed Stock Booking',
      description:
        'Late invoice processing means inaccurate inventory, missed reorder points, and unhappy customers due to stock-outs.',
    },
    {
      icon: Users,
      title: 'Staff Burnout',
      description:
        'Repetitive manual work kills morale. Your valuable team members deserve better than being human data entry machines.',
    },
  ];

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* SEO OPTIMIZED Heading */}
          <h2 id="problem-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Manual Invoice Processing is <span className="text-red-600">Costing You Thousands</span>
          </h2>
          {/* SEO OPTIMIZED Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            UK businesses waste an average of £26,000 annually on manual invoice data entry. Here's
            what inefficient invoice processing is really costing you:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-red-100"
            >
              <problem.icon className="w-12 h-12 text-red-600 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Cost Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-xl border-2 border-red-200"
        >
          <h3 className="text-2xl font-bold text-center mb-6">💸 Your Real Cost Calculator</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-2">Invoices per Week</p>
              <p className="text-4xl font-bold text-red-600">80</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Hours Wasted per Week</p>
              <p className="text-4xl font-bold text-red-600">20</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Annual Cost (£25/hr)</p>
              <p className="text-4xl font-bold text-red-600">£26,000</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6">
            <strong>That's the salary of a full-time employee</strong> just for data entry! 😱
          </p>
        </motion.div>
      </div>
    </section>
  );
}
