/**
 * ============================================================================
 * NAVIGATION COMPONENT
 * ============================================================================
 * 
 * Main site navigation with user authentication, mobile menu, and quotas display.
 * Refactored into smaller sub-components for better maintainability.
 * 
 * Features:
 * - Responsive design (desktop + mobile)
 * - User authentication integration
 * - Usage quotas display
 * - Scroll-based styling
 * - Dropdown menus
 * - Fully accessible
 */

'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Menu, X } from 'lucide-react';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { Text } from './ui/Text';
import { Button } from './ui/Button';
import { NavLinks } from './navigation/NavLinks';
import { UserMenu } from './navigation/UserMenu';
import { MobileMenu } from './navigation/MobileMenu';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  const { user, userQuotas, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <Text as="span" size="2xl" weight="bold" className="gradient-text">
              Elektroluma
            </Text>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />

            {/* User Menu or Sign In */}
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
            ) : user ? (
              <UserMenu 
                user={user} 
                userQuotas={userQuotas} 
                onSignOut={handleSignOut}
              />
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in">
                  <Text as="span" size="base" weight="medium" variant="secondary" className="hover:text-primary-600 transition-colors">
                    Sign In
                  </Text>
                </Link>
                <Link href="/sign-up">
                  <Button
                    variant="primary"
                    size="md"
                    className="rounded-full"
                    aria-label="Start free invoice automation trial"
                  >
                    Start Free Trial
                  </Button>
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
            <MobileMenu
              user={user}
              userQuotas={userQuotas}
              onSignOut={handleSignOut}
              onClose={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}