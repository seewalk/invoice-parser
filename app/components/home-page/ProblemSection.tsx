'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { IconBox } from '../ui/IconBox';
import { Stat } from '../ui/Stat';

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
        <div className="text-center mb-16">
          {/* SEO OPTIMIZED Heading */}
          <Heading 
            as="h2" 
            id="problem-heading" 
            size="display-md" 
            align="center" 
            className="mb-4"
          >
            Manual Invoice Processing is <span className="text-red-600">Costing You Thousands</span>
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
            UK businesses waste an average of £26,000 annually on manual invoice data entry. Here's
            what inefficient invoice processing is really costing you:
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="hover"
                padding="lg"
                elevation="lg"
                className="border border-red-100"
                animate={false}
              >
                <IconBox
                  icon={<problem.icon />}
                  variant="error"
                  styleVariant="ghost"
                  size="lg"
                  className="mb-4"
                />
                <Heading as="h3" size="xl" className="mb-3">
                  {problem.title}
                </Heading>
                <Text variant="muted" leading="relaxed">
                  {problem.description}
                </Text>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cost Calculator */}
        <Card
          variant="default"
          padding="lg"
          elevation="2xl"
          className="mt-16 rounded-2xl border-2 border-red-200"
        >
          <Heading as="h3" size="xl" align="center" className="mb-6">
            💸 Your Real Cost Calculator
          </Heading>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Stat
              value="80"
              label="Invoices per Week"
              variant="error"
              layout="vertical"
              size="xl"
            />
            <Stat
              value="20"
              label="Hours Wasted per Week"
              variant="error"
              layout="vertical"
              size="xl"
            />
            <Stat
              value="£26,000"
              label="Annual Cost (£25/hr)"
              variant="error"
              layout="vertical"
              size="xl"
            />
          </div>
          <Text align="center" variant="muted" className="mt-6">
            <Text as="span" weight="bold">That's the salary of a full-time employee</Text> just for data entry! 😱
          </Text>
        </Card>
      </div>
    </section>
  );
}
