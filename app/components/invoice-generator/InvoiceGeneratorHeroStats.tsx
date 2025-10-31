'use client';

import { Stat } from '../ui/Stat';

interface InvoiceGeneratorHeroStatsProps {
  templatesCount: number;
  industriesCount: number;
}

/**
 * Hero Stats Section for Invoice Generator Page
 * 
 * Displays three key statistics in a grid layout:
 * - Total number of templates available
 * - Number of industries covered
 * - 100% free indicator
 * 
 * Uses the Stat component for consistent styling and layout
 */
export default function InvoiceGeneratorHeroStats({
  templatesCount,
  industriesCount,
}: InvoiceGeneratorHeroStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
      <Stat
        value={templatesCount}
        label="Templates"
        variant="primary"
        layout="card"
        size="md"
        animate={false}
      />
      <Stat
        value={industriesCount}
        label="Industries"
        variant="primary"
        layout="card"
        size="md"
        animate={false}
      />
      <Stat
        value="100%"
        label="Free"
        variant="primary"
        layout="card"
        size="md"
        animate={false}
      />
    </div>
  );
}