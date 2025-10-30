/**
 * ============================================================================
 * MARKET SEGMENT CARD COMPONENT
 * ============================================================================
 * 
 * Displays a market segment overview card with stats and opportunity gap.
 * Used on alternatives page to showcase different market segments.
 * 
 * Features:
 * - Icon with customizable colors
 * - Market size and player count
 * - Opportunity gap highlight
 * - Link to segment section
 * - Hover effects and animations
 */

'use client';

import Link from 'next/link';
import { LucideIcon, ArrowRight, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { IconBox } from '../ui/IconBox';

export interface MarketSegmentCardProps {
  // Icon configuration
  icon: LucideIcon;
  iconVariant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';
  
  // Content
  title: string;
  description: string;
  
  // Stats
  marketSize: string;
  playerCount: number;
  
  // Opportunity
  opportunityGap: string;
  
  // Navigation
  anchorLink: string;
  
  // Styling
  animate?: boolean;
  animationDelay?: number;
}

export function MarketSegmentCard({
  icon: Icon,
  iconVariant = 'primary',
  title,
  description,
  marketSize,
  playerCount,
  opportunityGap,
  anchorLink,
  animate = true,
  animationDelay = 0,
}: MarketSegmentCardProps) {
  return (
    <Card
      variant="default"
      padding="lg"
      className="hover:shadow-xl transition-shadow"
      animate={animate}
    >
      {/* Header with Icon and Title */}
      <div className="flex items-center gap-3 mb-4">
        <IconBox
          icon={<Icon className="w-8 h-8" />}
          variant={iconVariant}
          size="lg"
        />
        <Heading as="h3" size="lg" animate={false}>
          {title}
        </Heading>
      </div>

      {/* Description */}
      <Text size="base" variant="muted" className="mb-4">
        {description}
      </Text>

      {/* Stats */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle 
            className={`w-4 h-4 ${
              iconVariant === 'success' ? 'text-success-600' :
              iconVariant === 'primary' ? 'text-primary-600' :
              iconVariant === 'warning' ? 'text-warning-600' :
              iconVariant === 'error' ? 'text-error-600' :
              iconVariant === 'info' ? 'text-info-600' :
              'text-gray-600'
            }`}
            aria-hidden="true"
          />
          <Text as="span" size="sm" variant="secondary">
            Market Size: {marketSize}
          </Text>
        </div>
        
        <div className="flex items-center gap-2">
          <CheckCircle 
            className={`w-4 h-4 ${
              iconVariant === 'success' ? 'text-success-600' :
              iconVariant === 'primary' ? 'text-primary-600' :
              iconVariant === 'warning' ? 'text-warning-600' :
              iconVariant === 'error' ? 'text-error-600' :
              iconVariant === 'info' ? 'text-info-600' :
              'text-gray-600'
            }`}
            aria-hidden="true"
          />
          <Text as="span" size="sm" variant="secondary">
            {playerCount} major players
          </Text>
        </div>
      </div>

      {/* Opportunity Gap */}
      <Card 
        variant="bordered" 
        padding="md" 
        className="bg-blue-50 border-blue-200 mb-6"
        animate={false}
      >
        <Text as="p" size="sm" weight="semibold" className="text-blue-900 mb-2">
          💡 Opportunity Gap:
        </Text>
        <Text as="p" size="sm" className="text-blue-800">
          {opportunityGap}
        </Text>
      </Card>

      {/* Link to Section */}
      <Link
        href={anchorLink}
        className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group"
      >
        <Text as="span" size="base" weight="semibold" className="text-indigo-600 group-hover:text-indigo-700">
          View competitors
        </Text>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Card>
  );
}