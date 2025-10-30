/**
 * CompanyOverviewSection Component
 * 
 * Displays company information and target market in a two-column layout.
 * Includes company description, stats (valuation, employees, funding),
 * and target market details (business size, industries, geography).
 */

import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { getSegmentVariant, type ColorVariant } from '../../../utils/segmentUtils';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { Stat } from '@/app/components/ui/Stat';
import { Badge } from '@/app/components/ui/Badge';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

interface CompanyOverviewSectionProps {
  competitor: Competitor;
}

/**
 * Color mapping for target market badges based on segment variant
 */
const variantStyles: Record<ColorVariant, string> = {
  success: 'bg-green-50 text-green-700',
  primary: 'bg-blue-50 text-blue-700',
  warning: 'bg-purple-50 text-purple-700',
  error: 'bg-red-50 text-red-700',
  info: 'bg-orange-50 text-orange-700',
};

export function CompanyOverviewSection({ competitor }: CompanyOverviewSectionProps) {
  const variant = getSegmentVariant(competitor.segment as any);
  const badgeColor = variantStyles[variant];

  return (
    <section className="mb-12" aria-labelledby="company-overview-heading">
      <Heading as="h2" id="company-overview-heading" size="display-sm" className="mb-6">
        Company Overview
      </Heading>
      
      <Card variant="default" elevation="lg" padding="lg">
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: About Company */}
            <div>
              <Heading as="h3" size="lg" className="mb-4">
                About {competitor.name}
              </Heading>
              
              <Text variant="muted" className="mb-4">
                {competitor.description}
              </Text>
              
              {/* Company Stats */}
              <div className="space-y-2">
                {competitor.company.valuation && (
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Valuation:</span>
                    <span>{competitor.company.valuation}</span>
                  </div>
                )}
                
                {competitor.company.employees && (
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Team Size:</span>
                    <span>{competitor.company.employees}</span>
                  </div>
                )}
                
                {competitor.company.funding && (
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Funding:</span>
                    <span>{competitor.company.funding}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Target Market */}
            <div>
              <Heading as="h3" size="lg" className="mb-4">
                Target Market
              </Heading>
              
              <Text variant="muted" className="mb-4">
                {competitor.targetMarket.description}
              </Text>
              
              <div className="space-y-3">
                {/* Business Size */}
                <div>
                  <Text size="sm" weight="semibold" variant="secondary" className="mb-2">
                    Business Size:
                  </Text>
                  <Badge variant={variant} size="md" className="capitalize">
                    {competitor.targetMarket.businessSize}
                  </Badge>
                </div>
                
                {/* Industries */}
                <div>
                  <Text size="sm" weight="semibold" variant="secondary" className="mb-2">
                    Industries:
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {competitor.targetMarket.industry.slice(0, 5).map((industry, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Geography */}
                <div>
                  <Text size="sm" weight="semibold" variant="secondary" className="mb-2">
                    Geography:
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {competitor.targetMarket.geography.map((geo, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                      >
                        {geo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}