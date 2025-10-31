'use client';

import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { IconBox } from '../ui/IconBox';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '1',
    title: 'Choose Template',
    description: 'Select from our library of industry-specific invoice templates',
  },
  {
    number: '2',
    title: 'Fill Details',
    description: 'Enter your business and client information with live preview',
  },
  {
    number: '3',
    title: 'Download PDF',
    description: 'Generate and download your professional invoice instantly',
  },
];

/**
 * How It Works Section for Invoice Generator Page
 * 
 * Displays a 3-step process for generating invoices:
 * 1. Choose Template
 * 2. Fill Details
 * 3. Download PDF
 * 
 * Uses IconBox for number badges and design system components for text
 */
export default function InvoiceGeneratorHowItWorks() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <Heading as="h2" size="display-sm" align="center" className="mb-8">
          How To Generate An Invoice For Free In 3 Easy Steps
        </Heading>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <IconBox
                icon={
                  <span className="text-2xl font-bold text-white">
                    {step.number}
                  </span>
                }
                variant="primary"
                styleVariant="solid"
                size="xl"
                rounded="full"
                className="mx-auto mb-4 bg-indigo-600"
                animate={false}
              />
              <Heading
                as="h3"
                size="xl"
                align="center"
                className="mb-2"
                animate={false}
              >
                {step.title}
              </Heading>
              <Text variant="muted" align="center" animate={false}>
                {step.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}