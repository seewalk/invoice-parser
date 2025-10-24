'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria Thompson',
      role: 'Operations Manager',
      company: '8-Location Restaurant Group, Manchester',
      image: '👩‍💼',
      quote:
        "Elektroluma saved us 6 hours per week and cut our data entry errors by 95%. We used to dread invoice day - now it's completely automated. Best £29/month we've ever spent!",
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Inventory Manager',
      company: 'Food Distribution Warehouse, Birmingham',
      image: '👨‍💼',
      quote:
        'We process 500+ invoices weekly. This tool processes them in under 2 minutes total. It paid for itself in the first week. The QuickBooks integration is flawless.',
      rating: 5,
    },
    {
      name: 'Sarah Patel',
      role: 'Practice Manager',
      company: 'Accounting Firm (50 Restaurant Clients), London',
      image: '👩‍💻',
      quote:
        "Game-changer for our practice. We now offer invoice processing as a value-add service to all restaurant clients. They love it, and it's become a competitive advantage for us.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* SEO OPTIMIZED Heading */}
          <h2 id="testimonials-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why UK Businesses Choose Our{' '}
            <span className="gradient-text">Invoice Processing Software</span>
          </h2>
          {/* SEO OPTIMIZED Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join 500+ UK restaurants, warehouses, and accounting firms who've automated invoice
            processing and reclaimed 20 hours per week.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="text-4xl mr-4" role="img" aria-label={testimonial.name}>{testimonial.image}</div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-primary-600">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Active Businesses</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-gray-600">Invoices Processed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime SLA</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}