'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  CreditCard,
  ChevronDown,
  Zap,
  FileCheck,
  Download,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/app/lib/firebase/AuthContext';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { user, userQuotas, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleSignOut = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-slate-100 text-slate-700';
      case 'starter':
        return 'bg-blue-100 text-blue-700';
      case 'pro':
        return 'bg-purple-100 text-purple-700';
      case 'enterprise':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const isUnlimited = userQuotas?.plan !== 'free';

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
            <span className="text-2xl font-bold gradient-text">Elektroluma</span>
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

            {/* User Menu or Sign In */}
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Desktop User Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="p-4 bg-gradient-to-br from-primary-50 to-accent-50 border-b border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                              {user.email?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {userQuotas?.name || user.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-slate-600 truncate">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPlanBadgeColor(userQuotas?.plan || 'free')}`}>
                            {userQuotas?.plan?.toUpperCase() || 'FREE'}
                          </span>
                          {isUnlimited && (
                            <span className="text-xs text-slate-600 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Unlimited
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quotas Display */}
                      {!isUnlimited && userQuotas && (
                        <div className="p-4 bg-slate-50 border-b border-slate-200">
                          <p className="text-xs font-semibold text-slate-700 mb-3">Your Usage</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 text-slate-600">
                                <FileCheck className="w-4 h-4" />
                                Invoice Parses
                              </span>
                              <span className="font-semibold text-slate-900">
                                {userQuotas.invoiceParses} / 10
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 text-slate-600">
                                <Download className="w-4 h-4" />
                                Template Downloads
                              </span>
                              <span className="font-semibold text-slate-900">
                                {userQuotas.templateDownloads} / 3
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 text-slate-600">
                                <Zap className="w-4 h-4" />
                                Generator Uses
                              </span>
                              <span className="font-semibold text-slate-900">
                                {userQuotas.generatorUses} / 5
                              </span>
                            </div>
                          </div>
                          
                          <Link
                            href="/pricing"
                            onClick={() => setUserMenuOpen(false)}
                            className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition"
                          >
                            <Sparkles className="w-4 h-4" />
                            Upgrade for Unlimited
                          </Link>
                        </div>
                      )}

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          href="/account"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Account</span>
                        </Link>
                        <Link
                          href="/pricing"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span className="text-sm font-medium">Billing</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="text-slate-700 hover:text-primary-600 font-medium transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5"
                  aria-label="Start free invoice automation trial"
                >
                  Start Free Trial
                </Link>
              </div>
            )}
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t py-4"
            >
              {/* User Info - Mobile */}
              {user && userQuotas && (
                <div className="px-4 pb-4 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {userQuotas.name || user.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-slate-600 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPlanBadgeColor(userQuotas.plan)}`}>
                      {userQuotas.plan.toUpperCase()}
                    </span>
                    {isUnlimited && (
                      <span className="text-xs text-slate-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Unlimited
                      </span>
                    )}
                  </div>

                  {/* Quotas - Mobile */}
                  {!isUnlimited && (
                    <div className="bg-slate-50 rounded-lg p-3 space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <FileCheck className="w-4 h-4" />
                          Parses
                        </span>
                        <span className="font-semibold text-slate-900">
                          {userQuotas.invoiceParses} / 10
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <Download className="w-4 h-4" />
                          Downloads
                        </span>
                        <span className="font-semibold text-slate-900">
                          {userQuotas.templateDownloads} / 3
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <Zap className="w-4 h-4" />
                          Generator
                        </span>
                        <span className="font-semibold text-slate-900">
                          {userQuotas.generatorUses} / 5
                        </span>
                      </div>
                    </div>
                  )}

                  {!isUnlimited && (
                    <Link
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      <Sparkles className="w-4 h-4" />
                      Upgrade for Unlimited
                    </Link>
                  )}
                </div>
              )}

              {/* Navigation Links - Mobile */}
              <div className="space-y-1">
                <Link
                  href="/parser"
                  className="block px-4 py-2 text-primary-700 font-semibold hover:bg-primary-50 rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Try Demo
                </Link>
                <Link
                  href="/invoice-generator"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Invoice Generator
                </Link>
                <Link
                  href="/invoice-templates"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Templates
                </Link>
                <a
                  href="/#features"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <Link
                  href="/pricing"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>

              {/* User Actions - Mobile */}
              {user ? (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 px-2">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Account</span>
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm font-medium">Billing</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 transition text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 px-4 space-y-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Start Free Trial
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}