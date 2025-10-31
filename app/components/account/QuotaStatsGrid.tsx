'use client';

import React from 'react';
import { FileCheck, Download, Zap, Activity } from 'lucide-react';
import QuotaStatsCard from './QuotaStatsCard';

interface QuotaStatsGridProps {
  parserRemaining: number | string;
  templateRemaining: number | string;
  generatorRemaining: number | string;
  totalUsage: number;
  thisMonthUsage: number;
  isUnlimited: boolean;
}

/**
 * QuotaStatsGrid Component
 * 
 * Grid layout for all quota statistics cards.
 * 
 * Features:
 * - 4 quota cards (Parser, Templates, Generator, Total Usage)
 * - Responsive grid layout (1/2/4 columns)
 * - Handles unlimited access display
 * - Consistent spacing and alignment
 * 
 * Design System:
 * - Tailwind grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
 * - Gap-6 for consistent spacing
 * - Uses QuotaStatsCard for individual cards
 */
export default function QuotaStatsGrid({
  parserRemaining,
  templateRemaining,
  generatorRemaining,
  totalUsage,
  thisMonthUsage,
  isUnlimited,
}: QuotaStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Parser Quota */}
      <QuotaStatsCard
        icon={FileCheck}
        iconColor="text-blue-600"
        title="Invoice Parser"
        value={isUnlimited ? '∞' : parserRemaining}
        subtitle={isUnlimited ? 'Unlimited parses' : 'of 5 parses remaining'}
        isUnlimited={isUnlimited}
      />

      {/* Template Downloads */}
      <QuotaStatsCard
        icon={Download}
        iconColor="text-green-600"
        title="Templates"
        value={isUnlimited ? '∞' : templateRemaining}
        subtitle={isUnlimited ? 'Unlimited downloads' : 'of 3 downloads remaining'}
        isUnlimited={isUnlimited}
      />

      {/* Generator Uses */}
      <QuotaStatsCard
        icon={Zap}
        iconColor="text-purple-600"
        title="Generator"
        value={isUnlimited ? '∞' : generatorRemaining}
        subtitle={isUnlimited ? 'Unlimited uses' : 'of 5 uses remaining'}
        isUnlimited={isUnlimited}
      />

      {/* Total Usage */}
      <QuotaStatsCard
        icon={Activity}
        iconColor="text-indigo-600"
        title="Total Usage"
        value={totalUsage}
        subtitle={`${thisMonthUsage} this month`}
        isUnlimited={false}
      />
    </div>
  );
}