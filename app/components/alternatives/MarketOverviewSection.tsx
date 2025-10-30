import { Card } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { IconBox } from '@/app/components/ui/IconBox';
import { Button } from '@/app/components/ui/Button';
import { CheckCircle, ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

/**
 * Market Segment Data Structure
 * Represents a single market category in the invoice processing landscape
 */
export interface MarketSegmentData {
  title: string;
  description: string;
  icon: LucideIcon;
  iconVariant: 'success' | 'primary' | 'warning' | 'error' | 'info';
  totalMarketSize: string;
  competitorCount: number;
  opportunityGap: string;
  linkTo: string;
}

interface MarketOverviewSectionProps {
  segments: MarketSegmentData[];
}

/**
 * MarketOverviewSection Component
 * 
 * Displays a grid of market segment cards showing the competitive landscape.
 * Each card includes:
 * - Category icon and title
 * - Market description
 * - Market size statistics
 * - Competitor count
 * - Opportunity gap analysis
 * - Link to detailed competitors
 * 
 * @example
 * ```tsx
 * <MarketOverviewSection segments={[
 *   {
 *     title: 'Free Generators',
 *     description: 'Ad-supported models targeting freelancers',
 *     icon: FileText,
 *     iconVariant: 'success',
 *     totalMarketSize: '10M+ monthly users',
 *     competitorCount: 15,
 *     opportunityGap: 'No AI automation or UK compliance',
 *     linkTo: '#free-generators'
 *   }
 * ]} />
 * ```
 */
export function MarketOverviewSection({ segments }: MarketOverviewSectionProps) {
  return (
    <section className="mb-16" aria-labelledby="market-overview-heading">
      {/* Section Header */}
      <div className="text-center mb-12">
        <Heading 
          as="h2" 
          id="market-overview-heading"
          size="display-sm" 
          className="mb-4"
          align ="center"
        >
          Invoice Processing Market Landscape
        </Heading>
        <Text 
          size="xl" 
          variant="muted" 
          maxWidth="3xl" 
          align ="center"
          animate
        >
          The invoice processing market is segmented into three main categories, each serving 
          different business needs and budgets.
        </Text>
      </div>

      {/* Market Segment Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {segments.map((segment, index) => (
          <Card 
            key={segment.title} 
            variant="hover" 
            padding="lg" 
            elevation="lg"
            className="flex flex-col"
            aria-labelledby={`segment-${segment.title.toLowerCase().replace(/\s+/g, '-')}-title`}
          >
            {/* Card Header: Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <IconBox 
                icon={<segment.icon />}
                variant={segment.iconVariant}
                styleVariant="solid"
                size="xl"
                rounded="xl"
                aria-hidden="true"
              />
              <Heading 
                as="h3" 
                id={`segment-${segment.title.toLowerCase().replace(/\s+/g, '-')}-title`}
                size="xl"
                animate={false}
              >
                {segment.title}
              </Heading>
            </div>
            
            {/* Description */}
            <Text variant="muted" className="mb-4" animate={false}>
              {segment.description}
            </Text>
            
            {/* Market Statistics */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle 
                  className={`w-4 h-4 text-${segment.iconVariant}-600`} 
                  aria-hidden="true"
                />
                <Text size="sm" animate={false}>
                  Market Size: {segment.totalMarketSize}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle 
                  className={`w-4 h-4 text-${segment.iconVariant}-600`} 
                  aria-hidden="true"
                />
                <Text size="sm" animate={false}>
                  {segment.competitorCount} major players
                </Text>
              </div>
            </div>
            
          
            
            {/* CTA Link */}
            <div className="mt-auto">
              <Link href={segment.linkTo} className="block">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<ArrowRight />} 
                  iconPosition="right" 
                  fullWidth
                  aria-label={`View ${segment.title.toLowerCase()} competitors`}
                >
                  View alternatives
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
