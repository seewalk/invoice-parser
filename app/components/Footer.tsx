'use client';

import { FileText, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import Link from 'next/link';

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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">Elektroluma</span>
            </Link>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-slate-400 text-sm">
              © {currentYear} Elektroluma. All rights reserved.
            </p>
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
              <h3 className="text-2xl font-bold mb-3">Stay Updated on Invoice Automation</h3>
              <p className="text-slate-400 mb-6">
                Get tips, best practices, and product updates delivered to your inbox monthly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
                  aria-label="Email for newsletter"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold">Elektroluma</span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              AI-powered invoice processing and automation software for UK restaurants and
              warehouses. Save 20 hours per week with 99% accurate invoice data extraction.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@elektroluma.co.uk"
                  className="hover:text-white transition"
                >
                  support@elektroluma.co.uk
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+442012345678" className="hover:text-white transition">
                  +44 20 1234 5678
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>London, United Kingdom</span>
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
            <h3 className="font-bold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="/#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/parser" className="hover:text-white transition">
                  Try Demo
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-white transition">
                  Alternatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/uk-invoice-guide" className="hover:text-white transition">
                  UK Invoice Guide
                </Link>
              </li>
              <li>
                <Link href="/invoice-templates" className="hover:text-white transition">
                  Invoice Templates
                </Link>
              </li>
              <li>
                <Link href="/invoice-generator" className="hover:text-white transition">
                  Invoice Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>
              © {currentYear} Elektroluma Ltd. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>SOC 2 Certified</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>GDPR Compliant</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>ISO 27001</span>
              </span>
            </div>

            <p className="text-slate-500">
              Made with ❤️ for UK businesses
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
