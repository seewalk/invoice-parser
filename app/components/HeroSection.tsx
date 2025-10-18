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
          className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary-600" aria-hidden="true" />
          <span className="text-sm font-medium text-primary-700">
            UK's #1 AI Invoice Processing Software - 500+ Businesses Trust Us
          </span>
        </motion.div>

        {/* Headline - SEO OPTIMIZED with Primary Keywords */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          AI-Powered <span className="gradient-text">Invoice Processing</span> & Automation
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-700">
            for UK Restaurants & Warehouses
          </span>
        </motion.h1>

        {/* Subheadline - SEO OPTIMIZED with Semantic Keywords */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          Automate invoice data extraction in 30 seconds with 99% accuracy. Stop wasting 20
          hours per week on manual invoice processing—let AI handle supplier invoices from Sysco,
          US Foods, Costco, and more automatically.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
            <span className="text-lg font-semibold text-gray-700">90% Faster</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
            <span className="text-lg font-semibold text-gray-700">99% Accurate</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
            <span className="text-lg font-semibold text-gray-700">Zero Setup</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <button
            className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center space-x-2"
            aria-label="Start free invoice processing trial with 10 free invoices"
          >
            <span>Start Free Trial - 10 Invoices Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="bg-white text-primary-700 border-2 border-primary-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all hover:-translate-y-1 flex items-center justify-center space-x-2"
            aria-label="Watch 2-minute invoice automation demo"
          >
            <span>Watch 2-Min Demo</span>
          </button>
        </motion.div>

        {/* Hero Image / Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-gray-200">
            <DemoVisualization />
          </div>
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

