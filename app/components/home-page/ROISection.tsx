'use client';

import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { Stat } from '../ui/Stat';
import { ROI_STATS, MANUAL_PROCESS_ITEMS, AUTOMATED_PROCESS_ITEMS } from '../../lib/roiData';

export default function ROISection() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50"
      aria-labelledby="roi-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* SEO OPTIMIZED Heading */}
          <Heading 
            as="h2" 
            id="roi-heading" 
            size="display-md" 
            align="center" 
            className="mb-4"
          >
            Invoice Automation ROI: Save <span className="text-green-600">£26,000 Annually</span>
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
            See exactly how much time and money you'll save with automated invoice processing
            compared to manual invoice data entry.
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ROI_STATS.map((stat) => (
            <Stat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              variant="default"
              layout="card"
              size="xl"
            />
          ))}
        </div>

        {/* Comparison Table */}
        <Card
          variant="default"
          padding="none"
          elevation="2xl"
          className="rounded-2xl overflow-hidden"
          animate
        >
          <div className="grid md:grid-cols-2">
            {/* Manual Process */}
            <div className="p-8 bg-red-50 border-r border-gray-200">
              <Heading as="h3" size="xl" className="text-red-600 mb-6 flex items-center">
                <X className="w-6 h-6 mr-2" aria-hidden="true" />
                Manual Process
              </Heading>
              <ul className="space-y-4" role="list">
                {MANUAL_PROCESS_ITEMS.map((item) => (
                  <li key={item} className="flex items-start">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <Text as="span" className="text-gray-700">{item}</Text>
                  </li>
                ))}
              </ul>
            </div>

            {/* With Elektroluma */}
            <div className="p-8 bg-white">
              <Heading as="h3" size="xl" className="text-green-600 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" aria-hidden="true" />
                With Invoice Automation
              </Heading>
              <ul className="space-y-4" role="list">
                {AUTOMATED_PROCESS_ITEMS.map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <Text as="span" className="text-gray-700">{item}</Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}