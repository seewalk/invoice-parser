/**
 * ============================================================================
 * FOOTER COMPONENT
 * ============================================================================
 * 
 * Site-wide footer with navigation, contact info, and social links.
 * Now using centralized UI components for consistency.
 * 
 * Features:
 * - Multiple variants (default, minimal)
 * - Optional newsletter subscription
 * - Social media links
 * - Contact information
 * - Trust badges
 * - Fully accessible
 */

'use client';

import { FileText, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import Link from 'next/link';
import { Heading } from './ui/Heading';
import { Text } from './ui/Text';
import { Button } from './ui/Button';

interface FooterProps {
  variant?: 'default' | 'minimal';
  showSocial?: boolean;
  showNewsletter?: boolean;
}

export default function Footer({
  variant = 'default',
  showSocial = true,
  showNewsletter = false,
}: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Brand */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <Text as="span" size="xl" weight="bold" variant="white">
                Elektroluma
              </Text>
            </Link>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
              <Link href="/contact" className="hover:text-white transition-colors">
                <Text as="span" size="sm" variant="white" className="hover:text-white">
                  Contact
                </Text>
              </Link>
            </div>

            {/* Copyright */}
            <Text size="sm" variant="white" className="text-slate-400">
              © {currentYear} Elektroluma. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="mb-12 pb-12 border-b border-slate-800">
            <div className="max-w-2xl mx-auto text-center">
              <Heading 
                as="h3" 
                size="lg" 
                variant="white" 
                align="center"
                className="mb-3"
                animate={false}
              >
                Stay Updated on Invoice Automation
              </Heading>
              <Text 
                size="base" 
                variant="white" 
                align="center"
                className="text-slate-400 mb-6"
              >
                Get tips, best practices, and product updates delivered to your inbox monthly.
              </Text>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                  aria-label="Email for newsletter"
                />
                <Button 
                  variant="primary" 
                  size="md"
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <Text 
                size="xs" 
                variant="white"
                align="center" 
                className="text-slate-500 mt-3"
              >
                No spam. Unsubscribe anytime.
              </Text>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <Text as="span" size="2xl" weight="bold" variant="white">
                Elektroluma
              </Text>
            </Link>
            <Text 
              size="sm" 
              variant="white"
              className="text-slate-400 mb-6 leading-relaxed"
            >
              AI-powered invoice processing and automation software for UK restaurants and
              warehouses. Save 20 hours per week with 99% accurate invoice data extraction.
            </Text>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@elektroluma.co.uk"
                  className="hover:text-white transition-colors"
                >
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    support@elektroluma.co.uk
                  </Text>
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:+442012345678" 
                  className="hover:text-white transition-colors"
                >
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    +44 20 1234 5678
                  </Text>
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <Text as="span" size="sm" variant="white" className="text-slate-400">
                  London, United Kingdom
                </Text>
              </div>
            </div>

            {/* Social Links */}
            {showSocial && (
              <div className="flex space-x-4 mt-6">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="View our GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Product Column */}
          <div>
            <Heading 
              as="h3" 
              size="sm" 
              variant="white"
              className="mb-4"
              animate={false}
            >
              Product
            </Heading>
            <ul className="space-y-2" role="list">
              <li>
                <a href="/#features" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Features
                  </Text>
                </a>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Pricing
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    FAQ
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="/parser" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Try Demo
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Alternatives
                  </Text>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <Heading 
              as="h3" 
              size="sm" 
              variant="white"
              className="mb-4"
              animate={false}
            >
              Resources
            </Heading>
            <ul className="space-y-2" role="list">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Blog
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="/uk-invoice-guide" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    UK Invoice Guide
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="/invoice-templates" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Invoice Templates
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="/invoice-generator" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Invoice Generator
                  </Text>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <Heading 
              as="h3" 
              size="sm" 
              variant="white"
              className="mb-4"
              animate={false}
            >
              Company
            </Heading>
            <ul className="space-y-2" role="list">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  <Text as="span" size="sm" variant="white" className="text-slate-400 hover:text-white">
                    Contact
                  </Text>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text size="sm" variant="white" className="text-slate-400">
              © {currentYear} Elektroluma Ltd. All rights reserved.
            </Text>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <Text as="span" size="xs" variant="white" className="text-slate-400">
                  SOC 2 Certified
                </Text>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <Text as="span" size="xs" variant="white" className="text-slate-400">
                  GDPR Compliant
                </Text>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <Text as="span" size="xs" variant="white" className="text-slate-400">
                  ISO 27001
                </Text>
              </span>
            </div>

            <Text size="sm" variant="white" className="text-slate-500">
              Made with ❤️ for UK businesses
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}