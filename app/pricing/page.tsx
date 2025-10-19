'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, ArrowRight, Rocket } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import FinalCTASection from '../components/FinalCTASection';
import PageHero from '../components/PageHero';
import IndividualTemplatePricing from '../components/pricing/IndividualTemplatePricing';

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Perfect for trying out the platform',
      features: [
        '10 invoices per month',
        'Manual upload only',
        'JSON/CSV export',
        'Email support (48hr)',
        '1 user account',
      ],
      limitations: [
        'No API access',
        'No integrations',
        'Basic features only',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      monthlyPrice: 29,
      annualPrice: 261, // 25% off (29 * 12 * 0.75)
      description: 'For single-location businesses',
      features: [
        '200 invoices per month',
        'API access',
        'Email support (24hr)',
        '3 user accounts',
        'QuickBooks & Xero integration',
        'Standard supplier patterns',
        'Mobile app access',
        'Batch upload',
        'Smart categorization',
      ],
      limitations: [
        'Limited custom patterns',
        'Standard support only',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Business',
      monthlyPrice: 99,
      annualPrice: 891, // 25% off
      description: 'For multi-location operations',
      features: [
        '1,000 invoices per month',
        'Priority API access',
        'Phone + email support',
        '10 user accounts',
        'All integrations',
        'Custom supplier patterns (5)',
        'Batch processing',
        'Approval workflows',
        'Analytics dashboard',
        'Webhook notifications',
        'Custom export formats',
        'Team collaboration tools',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      <PageHero
        badge="Transparent Pricing"
        title={
          <>
            Invoice Processing <span className="gradient-text">Pricing Plans</span>
          </>
        }
        description="Choose the perfect plan for your business. All plans include a 14-day free trial with no credit card required."
        size="default"
      >
        {/* Annual/Monthly Toggle */}
        <div className="inline-flex items-center space-x-4 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              !isAnnual ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              isAnnual ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Annual <span className="text-green-600">(Save 25%)</span>
          </button>
        </div>
      </PageHero>

      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Individual Templates Section (Pay-As-You-Go) */}
          <IndividualTemplatePricing />

          {/* Subscription Plans Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Subscription Plans
            </h2>
            <p className="text-lg text-gray-600">
              For businesses with ongoing invoice processing needs
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl scale-105 border-4 border-primary-400'
                    : 'bg-white border-2 border-gray-200'
                } relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-accent-400 text-white px-4 py-1 rounded-full text-sm font-bold">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-primary-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className={`text-xl ${plan.popular ? 'text-primary-100' : 'text-gray-600'}`}>£</span>
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {isAnnual ? Math.floor(plan.annualPrice / 12) : plan.monthlyPrice}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${plan.popular ? 'text-primary-100' : 'text-gray-600'}`}>
                    per month {isAnnual && plan.monthlyPrice > 0 && '(billed annually)'}
                  </p>
                  {isAnnual && plan.monthlyPrice > 0 && (
                    <p className="text-xs mt-2 text-green-600 font-semibold">
                      Save £{(plan.monthlyPrice * 12 - plan.annualPrice).toFixed(0)}/year
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <p className={`text-sm font-semibold mb-3 ${plan.popular ? 'text-primary-100' : 'text-gray-700'}`}>
                    ✓ Included:
                  </p>
                  <ul className="space-y-2" role="list">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle
                          className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'text-accent-300' : 'text-green-500'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={`text-sm ${plan.popular ? 'text-primary-50' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <>
                      <p className={`text-sm font-semibold mt-4 mb-2 ${plan.popular ? 'text-primary-100' : 'text-gray-700'}`}>
                        ✗ Not included:
                      </p>
                      <ul className="space-y-2" role="list">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-start opacity-60">
                            <X
                              className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${
                                plan.popular ? 'text-primary-200' : 'text-gray-400'
                              }`}
                              aria-hidden="true"
                            />
                            <span className={`text-sm ${plan.popular ? 'text-primary-100' : 'text-gray-600'}`}>
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all hover:-translate-y-1 ${
                    plan.popular
                      ? 'bg-white text-primary-700 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white text-center mb-16"
          >
            <Rocket className="w-16 h-16 mx-auto mb-4 text-accent-400" />
            <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              Unlimited invoices • Custom ML training • White-label options • Dedicated support • SLA guarantees
            </p>
            <button className="bg-accent-400 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-500 transition-all inline-flex items-center space-x-2">
              <span>Contact Sales</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Pricing FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I change plans later?',
                  a: 'Yes! You can upgrade or downgrade at any time. Changes take effect immediately.',
                },
                {
                  q: 'What happens if I exceed my invoice limit?',
                  a: "We'll notify you when you're approaching your limit. You can upgrade or purchase additional invoices as needed.",
                },
                {
                  q: 'Is there a setup fee?',
                  a: 'No setup fees. Ever. Just pick a plan and start processing invoices immediately.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied.",
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <FinalCTASection variant="pricing" />

      </div>
    </div>
  );
}
