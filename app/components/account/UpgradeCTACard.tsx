'use client';

import React from 'react';
import Link from 'next/link';
import { Crown } from 'lucide-react';

/**
 * UpgradeCTACard Component
 * 
 * Call-to-action card encouraging free users to upgrade.
 * 
 * Features:
 * - Gradient background (primary to accent)
 * - Large heading with compelling copy
 * - CTA button linking to pricing page
 * - Decorative crown icon
 * - Only shows for free plan users
 * 
 * Design System:
 * - Tailwind gradient: from-primary-600 to-accent-500
 * - rounded-xl, shadow-lg, border
 * - White text with primary-100 subtext
 * - Button with white background
 * - Crown icon decoration
 */
export default function UpgradeCTACard() {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl shadow-lg border border-primary-200 p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Upgrade to Unlimited</h3>
          <p className="text-primary-100 mb-4">
            Get unlimited access to all features. No more quotas, no limits.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            <Crown className="w-5 h-5" />
            View Pricing Plans
          </Link>
        </div>
        <Crown className="w-24 h-24 text-white opacity-20 hidden md:block" />
      </div>
    </div>
  );
}