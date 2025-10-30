'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Upload,
  Sparkles,
  CheckCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Heading } from './ui/Heading';
import { Text } from './ui/Text';
import { Card } from './ui/Card';
import { IconBox } from './ui/IconBox';
import { Button } from './ui/Button';

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
        <div className="text-center mb-16">
          {/* SEO OPTIMIZED Heading */}
          <Heading
            as="h2"
            id="how-it-works-heading"
            size="display-md"
            align="center"
            className="mb-4"
          >
            How Our Invoice Automation Works - <span className="gradient-text">Stupid Simple</span>
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
            From invoice upload to automated data export in 4 simple steps. No technical skills
            required for invoice processing automation.
          </Text>
        </div>

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

              <Card
                variant="default"
                padding="md"
                elevation="md"
                className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl h-full hover:shadow-lg"
                animate={false}
              >
                <IconBox
                  icon={<step.icon />}
                  variant="primary"
                  styleVariant="gradient"
                  size="lg"
                  rounded="xl"
                  shadow="lg"
                  className="mb-4"
                />
                <Text
                  size="3xl"
                  weight="bold"
                  className="text-primary-200 mb-2"
                  aria-hidden="true"
                >
                  {step.number}
                </Text>
                <Heading as="h3" size="lg" className="mb-3">
                  {step.title}
                </Heading>
                <Text variant="muted" leading="relaxed">
                  {step.description}
                </Text>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Video/Demo CTA */}
        <div className="mt-16 text-center">
          <Link href="/parser">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              aria-label="Watch invoice automation demo video"
              animate
            >
              See It In Action - Test The Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}