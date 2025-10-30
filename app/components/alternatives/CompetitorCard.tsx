'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Text } from '@/app/components/ui/Text';
import { ArrowRight, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Competitor } from '@/app/lib/alternativesKnowledgeBase';

/**
 * Color Variant Type
 * Determines the theme color for stats icons and pricing badge
 */
type ColorVariant = 'success' | 'primary' | 'warning' | 'error' | 'info';

/**
 * Variant Color Map
 * Maps color variants to Tailwind color classes
 */
const variantColorMap: Record<ColorVariant, { icon: string; badge: string; text: string }> = {
  success: { icon: 'text-green-600', badge: 'text-green-600', text: 'text-green-600' },
  primary: { icon: 'text-blue-600', badge: 'text-blue-600', text: 'text-blue-600' },
  warning: { icon: 'text-purple-600', badge: 'text-purple-600', text: 'text-purple-600' },
  error: { icon: 'text-red-600', badge: 'text-red-600', text: 'text-red-600' },
  info: { icon: 'text-cyan-600', badge: 'text-cyan-600', text: 'text-cyan-600' }
};

interface CompetitorCardProps {
  competitor: Competitor;
  variant?: ColorVariant;
}

/**
 * CompetitorCard Component
 * 
 * Displays a single competitor in a card format with:
 * - Name and location
 * - Short description (truncated to 3 lines)
 * - Dynamic quick stats (monthly users, features, accuracy)
 * - Pricing information
 * - Hover effects and animations
 * 
 * @example
 * ```tsx
 * <CompetitorCard 
 *   competitor={competitor}
 *   variant="success" // Green theme for free generators
 * />
 * ```
 */
export function CompetitorCard({ 
  competitor, 
  variant = 'primary' 
}: CompetitorCardProps) {
  const colors = variantColorMap[variant];

  return (
    <Link 
      href={`/alternatives/${competitor.slug}`} 
      className="group block h-full"
      aria-label={`View details about ${competitor.name}`}
    >
      <Card 
        variant="hover" 
        padding="lg" 
        elevation="md"
        className="group-hover:border-primary-300 h-full flex flex-col"
        animate={false}
      >
        {/* Card Header: Name + Location + Arrow */}
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="group-hover:text-primary-600 transition-colors truncate">
                {competitor.name}
              </CardTitle>
              <CardDescription className="mt-1">
                {competitor.company.headquarters}
              </CardDescription>
            </div>
            <ArrowRight 
              className="w-5 h-5 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" 
              aria-hidden="true"
            />
          </div>
        </CardHeader>
        
        {/* Card Content: Description + Stats */}
        <CardContent className="flex-1 pb-4">
          {/* Description */}
          <Text 
            size="sm" 
            variant="muted"
            truncate="3-lines" 
            className="mb-4"
            animate={false}
          >
            {competitor.shortDescription}
          </Text>
          
          {/* Quick Stats - Dynamic based on available data */}
          <div className="space-y-2">
            {/* Monthly Users */}
            {competitor.traffic.monthlyUsers && (
              <div className="flex items-center gap-2">
                <Users className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  {(competitor.traffic.monthlyUsers / 1000000).toFixed(1)}M monthly users
                </Text>
              </div>
            )}
            
            {/* Pricing Model */}
            {competitor.pricing.model && (
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  {competitor.pricing.model === 'free' ? 'Free' : 
                   competitor.pricing.model === 'freemium' ? 'Freemium' : 
                   competitor.pricing.model.charAt(0).toUpperCase() + competitor.pricing.model.slice(1)} model
                </Text>
              </div>
            )}
            
            {/* UK Compliance */}
            {competitor.features.ukCompliance && (
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  UK Compliance
                </Text>
              </div>
            )}
            
            {/* Multi-Currency */}
            {competitor.features.multiCurrency && (
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  Multi-currency
                </Text>
              </div>
            )}
            
            {/* OCR Accuracy */}
            {competitor.features.ocrAccuracy && (
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  {competitor.features.ocrAccuracy}% OCR accuracy
                </Text>
              </div>
            )}
            
            {/* Full Automation */}
            {competitor.features.automation && (
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  Full automation
                </Text>
              </div>
            )}
            
            {/* API Access */}
            {competitor.features.apiAccess && (
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  Full API access
                </Text>
              </div>
            )}
            
            {/* Batch Processing */}
            {competitor.features.batchProcessing && (
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} aria-hidden="true" />
                <Text size="xs" variant="muted" animate={false}>
                  Batch processing
                </Text>
              </div>
            )}
          </div>
        </CardContent>
        
        {/* Card Footer: Pricing */}
        <CardFooter className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between w-full gap-2">
            <Text size="sm" weight="semibold" animate={false}>
              {competitor.pricing.model === 'usage-based' ? 'Pricing:' : 'Starting at:'}
            </Text>
            <Badge 
              variant={variant} 
              size="md"
              className="flex-shrink-0"
            >
              {competitor.pricing.model === 'usage-based' 
                ? 'Pay-as-you-go' 
                : competitor.pricing.tiers[0]?.price === 0 
                  ? competitor.pricing.model === 'freemium' ? 'Free Tier' : 'Free'
                  : `${competitor.pricing.currency} ${competitor.pricing.tiers[0]?.price}${competitor.pricing.model === 'subscription' ? '/mo' : ''}`
              }
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}