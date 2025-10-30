'use client';

import { motion } from 'framer-motion';
import { IconBox } from '../ui/IconBox';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { FEATURES } from '../../lib/featuresData';

export default function FeaturesSection() {
  const features = FEATURES;

  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* SEO OPTIMIZED Heading */}
          <Heading 
            as="h2" 
            id="features-heading" 
            size="display-md" 
            align="center"
            className="mb-4"
          >
            Advanced Invoice Processing Features -{' '}
            <span className="gradient-text">Built for UK Businesses</span>
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
            Everything you need for automated invoice processing and data extraction, from OCR
            scanning to QuickBooks integration.
          </Text>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="hover"
              padding="lg"
              elevation="lg"
              animate={false}
              className="bg-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <IconBox
                  icon={<feature.icon />}
                  variant="primary"
                  styleVariant="gradient"
                  size="lg"
                  rounded="xl"
                  shadow="lg"
                  className="mb-4 bg-gradient-to-br from-primary-600 to-accent-500"
                  animate={false}
                />
                <Heading as="h3" size="xl" className="mb-3" animate={false}>
                  {feature.title}
                </Heading>
                <Text variant="muted" leading="relaxed" animate={false}>
                  {feature.description}
                </Text>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}