/**
 * ============================================================================
 * MOBILE MENU COMPONENT
 * ============================================================================
 * 
 * Mobile navigation menu with user info and quotas.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, LogOut, CreditCard, Sparkles } from 'lucide-react';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { NavLinks } from './NavLinks';
import { UserQuotasDisplay } from './UserQuotasDisplay';

interface MobileMenuProps {
  user: any;
  userQuotas: any;
  onSignOut: () => void;
  onClose: () => void;
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

export function MobileMenu({ user, userQuotas, onSignOut, onClose }: MobileMenuProps) {
  const isUnlimited = userQuotas?.plan !== 'free';

  return (
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
              <Text as="span" size="lg" weight="semibold" variant="white">
                {user.email?.charAt(0).toUpperCase()}
              </Text>
            </div>
            <div className="flex-1 min-w-0">
              <Text as="p" size="sm" weight="semibold" truncate="single">
                {userQuotas.name || user.email?.split('@')[0]}
              </Text>
              <Text as="p" size="xs" variant="muted" truncate="single">
                {user.email}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge 
              variant="secondary" 
              size="sm"
              className={getPlanBadgeColor(userQuotas.plan)}
            >
              {userQuotas.plan.toUpperCase()}
            </Badge>
            {isUnlimited && (
              <Text as="span" size="xs" variant="muted" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Unlimited
              </Text>
            )}
          </div>

          {/* Quotas - Mobile */}
          {!isUnlimited && (
            <UserQuotasDisplay 
              quotas={userQuotas} 
              onUpgradeClick={onClose}
              compact
            />
          )}
        </div>
      )}

      {/* Navigation Links - Mobile */}
      <NavLinks mobile onLinkClick={onClose} />

      {/* User Actions - Mobile */}
      {user ? (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 px-2">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
          >
            <User className="w-4 h-4" />
            <Text as="span" size="sm" weight="medium">
              Account
            </Text>
          </Link>
          <Link
            href="/pricing"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700"
          >
            <CreditCard className="w-4 h-4" />
            <Text as="span" size="sm" weight="medium">
              Billing
            </Text>
          </Link>
          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 transition text-red-600"
          >
            <LogOut className="w-4 h-4" />
            <Text as="span" size="sm" weight="medium" variant="error">
              Sign Out
            </Text>
          </button>
        </div>
      ) : (
        <div className="mt-4 px-4 space-y-2">
          <Link href="/sign-in" onClick={onClose}>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              className="rounded-full"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up" onClick={onClose}>
            <Button
              variant="primary"
              size="md"
              fullWidth
              className="rounded-full"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}