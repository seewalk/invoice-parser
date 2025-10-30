'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import comprehensiveFAQs, { getTopFAQs, type FAQ } from '../../lib/faqData';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

// Simple FAQ interface for component props (compatible with FAQ from library)
interface SimpleFAQ {
  question: string;
  answer: string;
  category?: string;
  keywords?: string[];
}

interface FAQSectionProps {
  faqs?: SimpleFAQ[];
  title?: string;
  subtitle?: string;
  useComprehensiveLibrary?: boolean;
  showTopFAQs?: boolean;
  topFAQCount?: number;
}

export default function FAQSection({
  faqs: customFaqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know. Still have questions? We\'re here to help.',
  useComprehensiveLibrary = false,
  showTopFAQs = false,
  topFAQCount = 8,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Default FAQs if none provided (original landing page FAQs)
  const defaultFaqs: SimpleFAQ[] = [
    {
      question: 'How accurate is the AI invoice parsing?',
      answer:
        'Our AI achieves 99% accuracy on average. It learns from corrections and improves over time. For the rare 1% of edge cases, you can quickly review and approve with one click.',
      category: 'Invoice Processing Basics',
      keywords: ['accuracy', 'AI parsing', 'invoice extraction'],
    },
    {
      question: 'Which invoice formats are supported?',
      answer:
        'We support PDFs, images (JPG, PNG), and scanned documents from any supplier. Our AI is trained on 20+ major food service suppliers like Sysco, US Foods, Costco, Restaurant Depot, and handles custom supplier formats too.',
    },
    {
      question: 'How long does it take to set up?',
      answer:
        'Literally 5 minutes. Sign up, upload your first invoice, and you are done. No complex configuration, no IT team needed. If you want integrations (QuickBooks, Xero, etc.), those take an additional 2-3 minutes via OAuth.',
    },
    {
      question: 'Can I integrate with my existing systems?',
      answer:
        'Yes! We integrate with QuickBooks, Xero, most POS systems (Toast, Square, Lightspeed), and inventory management tools (MarketMan, BlueCart, Restaurant365). We also provide REST API and webhooks for custom integrations.',
    },
    {
      question: 'What if the AI makes a mistake?',
      answer:
        'Our review interface makes corrections super easy. Click the field, edit, and save. The AI learns from your correction and gets better. Plus, all changes are logged for audit trails.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. We use bank-level AES-256 encryption, are SOC 2 Type II compliant, GDPR compliant, and host on secure AWS infrastructure. Your invoices are encrypted at rest and in transit. We never share your data.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes, cancel anytime with one click. No contracts, no cancellation fees, no questions asked. You can export all your data before leaving.',
    },
    {
      question: 'Do you offer phone support?',
      answer:
        'Business and Enterprise plans include priority phone support. Professional plans get 24-hour email support. Free tier gets 48-hour email support. Enterprise customers get a dedicated account manager.',
    },
  ];

  // Determine which FAQs to use based on props
  let faqs: FAQ[];

  // helper to convert SimpleFAQ -> FAQ with safe defaults
  const toFAQArray = (items: SimpleFAQ[]): FAQ[] =>
    items.map((f) => ({
      question: f.question,
      answer: f.answer,
      category: f.category ?? 'General',
      keywords: f.keywords ?? [],
    }));

  if (customFaqs) {
    faqs = toFAQArray(customFaqs);
  } else if (useComprehensiveLibrary) {
    faqs = comprehensiveFAQs;
  } else if (showTopFAQs) {
    faqs = getTopFAQs(topFAQCount);
  } else {
    faqs = toFAQArray(defaultFaqs);
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Heading 
            as="h2" 
            size="display-md" 
            align="center" 
            className="mb-4"
          >
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="gradient-text">{title.split(' ').slice(-1)}</span>
          </Heading>
          <Text 
            size="xl" 
            variant="muted" 
            align="center"
            animate
          >
            {subtitle}
          </Text>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <Text as="span" weight="semibold" className="text-gray-900 pr-4">{faq.question}</Text>
                <ChevronDown
                  className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <Text variant="muted" leading="relaxed">{faq.answer}</Text>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Text variant="muted" align="center" className="mb-4">Still have questions?</Text>
          <Button 
            variant="ghost" 
            size="md"
            icon={<ArrowRight />}
            iconPosition="right"
          >
            Contact our support team
          </Button>
        </div>
      </div>
    </section>
  );
}
