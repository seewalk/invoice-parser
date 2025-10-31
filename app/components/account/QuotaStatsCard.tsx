'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';

interface QuotaStatsCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: number | string;
  subtitle: string;
  isUnlimited?: boolean;
}

/**
 * QuotaStatsCard Component
 * 
 * Displays individual quota statistics with icon and values.
 * 
 * Features:
 * - Customizable icon and color
 * - Large value display
 * - Subtitle for additional context
 * - Unlimited indicator with sparkle icon
 * - Consistent card styling with design system
 * 
 * Design System:
 * - Tailwind: rounded-xl, shadow-lg, border
 * - White background with slate borders
 * - Responsive padding and spacing
 * - Lucide icons
 */
export default function QuotaStatsCard({
  icon: Icon,
  iconColor,
  title,
  value,
  subtitle,
  isUnlimited = false,
}: QuotaStatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        {isUnlimited && <Sparkles className="w-5 h-5 text-primary-600" />}
      </div>
      <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}