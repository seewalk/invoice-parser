'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  ChevronDown,
  Upload,
  CheckCheck,
  Download,
} from 'lucide-react';
import DemoVisualization from './DemoVisualization';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Stat } from '../ui/Stat';
import { Text } from '../ui/Text';

interface HeroSectionProps {
  opacity: any;
  scale: any;
}

export default function HeroSection({ opacity, scale }: HeroSectionProps) {
  return (
    <section
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" aria-hidden="true" />

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        {/* Badge - SEO OPTIMIZED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Badge 
            variant="primary" 
            size="lg"
            icon={<Sparkles className="w-4 h-4" />}
            animate={false}
          >
            UK's #1 AI Invoice Processing Software - 500+ Businesses Trust Us
          </Badge>
        </motion.div>

        {/* Headline - SEO OPTIMIZED with Primary Keywords */}
        <Heading
          as="h1"
          id="hero-heading"
          size="display-2xl"
          weight="extrabold"
          align="center"
          animationDelay={0.2}
          className="mb-6"
        >
          AI-Powered <span className="gradient-text">Invoice Processing</span> & Automation
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-700">
            for UK Restaurants & Warehouses
          </span>
        </Heading>

        {/* Subheadline - SEO OPTIMIZED with Semantic Keywords */}
        <Text
          size="xl"
          variant="muted"
          align="center"
          maxWidth="3xl"
          centered
          animate
          animationDelay={0.4}
          className="mb-8 sm:text-2xl"
        >
          Automate invoice data extraction in 30 seconds with 99% accuracy. Stop wasting 20
          hours per week on manual invoice processing—let AI handle supplier invoices from Sysco,
          US Foods, Costco, and more automatically.
        </Text>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <Stat 
            value="90%" 
            label="Faster" 
            icon={<CheckCircle />} 
            variant="success" 
            size="lg"
            iconWithBackground={false}
            animationDelay={0.6}
          />
          <Stat 
            value="99%" 
            label="Accurate" 
            icon={<CheckCircle />} 
            variant="success" 
            size="lg"
            iconWithBackground={false}
            animationDelay={0.7}
          />
          <Stat 
            value="Zero" 
            label="Setup" 
            icon={<CheckCircle />} 
            variant="success" 
            size="lg"
            iconWithBackground={false}
            animationDelay={0.8}
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            aria-label="Start free invoice processing trial with 10 free invoices"
          >
            Start Free Trial - 10 Invoices Free
          </Button>
          <Button
            variant="secondary"
            size="lg"
            aria-label="Watch 2-minute invoice automation demo"
          >
            Watch 2-Min Demo
          </Button>
        </motion.div>

        {/* Hero Image / Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative max-w-5xl mx-auto"
        >
          <Card variant="glass" elevation="2xl" padding="lg" animate={false}>
            <DemoVisualization />
          </Card>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16"
        >
          <ChevronDown className="w-8 h-8 text-gray-400 mx-auto animate-bounce" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}

