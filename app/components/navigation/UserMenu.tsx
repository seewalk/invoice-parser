/**
 * ============================================================================
 * USER MENU COMPONENT
 * ============================================================================
 * 
 * Dropdown menu for authenticated users.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { User, LogOut, CreditCard, ChevronDown, Sparkles } from 'lucide-react';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { UserQuotasDisplay } from './UserQuotasDisplay';

interface UserMenuProps {
  user: any;
  userQuotas: any;
  onSignOut: () => void;
}

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

export function UserMenu({ user, userQuotas, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isUnlimited = userQuotas?.plan !== 'free';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
          <Text as="span" size="sm" weight="semibold" variant="white">
            {user.email?.charAt(0).toUpperCase()}
          </Text>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Desktop User Dropdown */}
      <AnimatePresence>
        {isOpen && (
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
                  <Text as="span" size="lg" weight="semibold" variant="white">
                    {user.email?.charAt(0).toUpperCase()}
                  </Text>
                </div>
                <div className="flex-1 min-w-0">
                  <Text as="p" size="sm" weight="semibold" truncate="single">
                    {userQuotas?.name || user.email?.split('@')[0]}
                  </Text>
                  <Text as="p" size="xs" variant="muted" truncate="single">
                    {user.email}
                  </Text>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  size="sm"
                  className={getPlanBadgeColor(userQuotas?.plan || 'free')}
                >
                  {userQuotas?.plan?.toUpperCase() || 'FREE'}
                </Badge>
                {isUnlimited && (
                  <Text as="span" size="xs" variant="muted" className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Unlimited
                  </Text>
                )}
              </div>
            </div>

            {/* Quotas Display */}
            {!isUnlimited && userQuotas && (
              <UserQuotasDisplay 
                quotas={userQuotas} 
                onUpgradeClick={() => setIsOpen(false)}
              />
            )}

            {/* Menu Items */}
            <div className="p-2">
              <Link
                href="/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
              >
                <User className="w-4 h-4" />
                <Text as="span" size="sm" weight="medium">
                  Account
                </Text>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
              >
                <CreditCard className="w-4 h-4" />
                <Text as="span" size="sm" weight="medium">
                  Billing
                </Text>
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <Text as="span" size="sm" weight="medium" variant="error">
                  Sign Out
                </Text>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}