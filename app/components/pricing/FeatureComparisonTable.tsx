/**
 * ============================================================================
 * FEATURE COMPARISON TABLE COMPONENT
 * ============================================================================
 * 
 * Comparison table showing features across different pricing tiers.
 * Uses centralized pricing data from pricingConfig.ts
 */

'use client';

import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Card } from '@/app/components/ui/Card';
import { FEATURE_COMPARISON } from '@/app/lib/pricingConfig';

export function FeatureComparisonTable() {
  return (
    <Card variant="default" padding="lg" className="mb-16">
      <Heading 
        as="h3" 
        size="display-sm" 
        align="center" 
        className="mb-8"
      >
        Compare Plans
      </Heading>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4">
                <Text as="span" size="base" weight="semibold" variant="secondary">
                  Features
                </Text>
              </th>
              <th className="text-center py-4 px-4">
                <Text as="span" size="base" weight="semibold" variant="secondary">
                  Free
                </Text>
              </th>
              <th className="text-center py-4 px-4">
                <Text as="span" size="base" weight="semibold" variant="primary">
                  Premium
                </Text>
              </th>
              <th className="text-center py-4 px-4">
                <Text as="span" size="base" weight="semibold" className="text-purple-700">
                  Pro
                </Text>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {FEATURE_COMPARISON.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <Text as="span" size="base" weight="medium">
                    {row.feature}
                  </Text>
                </td>
                <td className="py-4 px-4 text-center">
                  <Text as="span" size="base" variant="muted">
                    {typeof row.free === 'boolean' 
                      ? (row.free ? '✓' : '—')
                      : row.free
                    }
                  </Text>
                </td>
                <td className="py-4 px-4 text-center">
                  <Text as="span" size="base" weight="semibold" variant="primary">
                    {typeof row.premium === 'boolean' 
                      ? (row.premium ? '✓' : '—')
                      : row.premium
                    }
                  </Text>
                </td>
                <td className="py-4 px-4 text-center">
                  <Text as="span" size="base" weight="semibold" className="text-purple-700">
                    {typeof row.pro === 'boolean' 
                      ? (row.pro ? '✓' : '—')
                      : row.pro
                    }
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
