// ============================================================================
// ROI DATA (Single Source of Truth)
// ============================================================================
// This data is used for both the UI component and schema markup

export interface ROIStat {
  value: string;
  label: string;
  description: string;
}

export interface ComparisonItem {
  text: string;
  isPositive: boolean; // true for benefits, false for drawbacks
}

// Main ROI statistics
export const ROI_STATS: ROIStat[] = [
  {
    value: '20',
    label: 'Hours Saved',
    description: 'per week on average',
  },
  {
    value: '£2,000',
    label: 'Monthly Savings',
    description: 'in labor costs alone',
  },
  {
    value: '98%',
    label: 'Error Reduction',
    description: 'fewer costly mistakes',
  },
];

// Manual process drawbacks
export const MANUAL_PROCESS_ITEMS: string[] = [
  '10-15 minutes per invoice',
  'Prone to human errors',
  'Delayed stock updates',
  'Staff burnout & turnover',
  'No spending insights',
  'Manual data export',
];

// Automated process benefits
export const AUTOMATED_PROCESS_ITEMS: string[] = [
  '30 seconds per invoice ⚡',
  '99% accuracy guaranteed',
  'Real-time auto-updates',
  'Team focuses on growth',
  'Smart analytics dashboard',
  'Auto-sync to all systems',
];

// Schema-specific metadata
export const ROI_SCHEMA_META = {
  name: 'Invoice Automation ROI Calculator',
  description: 'Calculate time and cost savings with automated invoice processing. Save £26,000 annually, reduce processing time by 90%, and achieve 99% accuracy.',
  annualSavings: '26000',
  currency: 'GBP',
  timeReduction: '90',
  accuracyRate: '99',
} as const;

// Helper function to convert ROI stats to schema format
export function getROIStatsForSchema() {
  return ROI_STATS.map(stat => ({
    name: stat.label,
    value: stat.value,
    description: stat.description,
  }));
}

// Helper function to get comparison data for schema
export function getComparisonForSchema() {
  return {
    manual: MANUAL_PROCESS_ITEMS,
    automated: AUTOMATED_PROCESS_ITEMS,
  };
}