'use client';

import { CheckCircle, Zap, Eye, Palette } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { IconBox } from '../ui/IconBox';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  iconVariant: 'success' | 'info' | 'secondary' | 'accent';
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: CheckCircle,
    iconVariant: 'success',
    title: '100% Free',
    description: 'No hidden fees or subscriptions required',
  },
  {
    icon: Zap,
    iconVariant: 'info',
    title: 'Instant Download',
    description: 'Generate and download PDFs in seconds',
  },
  {
    icon: Eye,
    iconVariant: 'secondary',
    title: 'Live Preview',
    description: 'See changes in real-time as you type',
  },
  {
    icon: Palette,
    iconVariant: 'accent',
    title: 'Professional',
    description: 'Industry-standard invoice formats',
  },
];

/**
 * Features Section for Invoice Generator Page
 * 
 * Displays 4 key features of the invoice generator:
 * - 100% Free (no costs)
 * - Instant Download (fast generation)
 * - Live Preview (real-time editing)
 * - Professional (quality templates)
 * 
 * Uses IconBox with proper Lucide icons (replaced emojis)
 */
export default function InvoiceGeneratorFeatures() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <Heading as="h2" size="display-sm" align="center" className="mb-12">
          Why Use Our Automated Invoice Generator?
        </Heading>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <IconBox
                icon={<feature.icon className="w-6 h-6" />}
                variant={feature.iconVariant}
                styleVariant="solid"
                size="xl"
                rounded="full"
                className="mx-auto mb-4"
                animate={false}
              />
              <Heading
                as="h3"
                size="lg"
                align="center"
                className="mb-2"
                animate={false}
              >
                {feature.title}
              </Heading>
              <Text size="sm" variant="muted" align="center" animate={false}>
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}