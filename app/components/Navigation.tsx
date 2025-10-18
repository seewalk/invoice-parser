'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold gradient-text">InvoiceParse.ai</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/parser"
              className="text-primary-700 hover:text-primary-800 font-semibold transition"
              aria-label="Try invoice processing demo"
            >
              Try Demo
            </Link>
            <Link
              href="/invoice-generator"
              className="text-gray-700 hover:text-primary-600 transition"
              aria-label="Create custom invoices online"
            >
              Invoice Generator
            </Link>
            <Link
              href="/invoice-templates"
              className="text-gray-700 hover:text-primary-600 transition"
              aria-label="Browse invoice templates"
            >
              Templates
            </Link>
            <a
              href="/#features"
              className="text-gray-700 hover:text-primary-600 transition"
              aria-label="View invoice automation features"
            >
              Features
            </a>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-primary-600 transition"
              aria-label="View invoice processing software pricing"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-primary-600 transition"
              aria-label="Invoice processing FAQ"
            >
              FAQ
            </Link>
            <button
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5"
              aria-label="Start free invoice automation trial"
            >
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t py-4 space-y-4"
          >
            <Link
              href="/parser"
              className="block px-4 py-2 text-primary-700 font-semibold hover:bg-primary-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try Demo
            </Link>
            <Link
              href="/invoice-generator"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Invoice Generator
            </Link>
            <Link
              href="/invoice-templates"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <a
              href="/#features"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <Link
              href="/pricing"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="px-4">
              <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full">
                Start Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
