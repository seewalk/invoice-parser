/**
 * CompetitorMetaBadges Component
 * 
 * Displays competitor meta information badges in the hero section.
 * Includes segment, location, founded date, user count, and website link.
 * Auto color-codes by segment using centralized segment utilities.
 * 
 * Refactored to use Badge and Text UI components for consistency.
 */

import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { getSegmentVariant, getSegmentLabel } from '../../../utils/segmentUtils';
import { Badge } from '@/app/components/ui/Badge';
import { Text } from '@/app/components/ui/Text';
import { MapPin, Building2, Users, ExternalLink } from 'lucide-react';

interface CompetitorMetaBadgesProps {
  competitor: Competitor;
}

export function CompetitorMetaBadges({ competitor }: CompetitorMetaBadgesProps) {
  const variant = getSegmentVariant(competitor.segment as any);
  const segmentLabel = getSegmentLabel(competitor.segment as any);

  return (
    <div className="flex flex-wrap items-center gap-4 mt-6">
      {/* Segment Badge - color-coded with variant */}
      <Badge 
        variant={variant}
        size="lg"
        shape="pill"
        className="backdrop-blur-sm"
        aria-label={`Market segment: ${segmentLabel}`}
      >
        {segmentLabel}
      </Badge>

      {/* Headquarters Badge */}
      <Badge 
        variant="default"
        size="lg"
        shape="pill"
        icon={<MapPin className="w-4 h-4" />}
        iconPosition="left"
        className="bg-white/90 backdrop-blur-sm"
        aria-label={`Headquarters: ${competitor.company.headquarters}`}
      >
        {competitor.company.headquarters}
      </Badge>

      {/* Founded Year Badge */}
      <Badge 
        variant="default"
        size="lg"
        shape="pill"
        icon={<Building2 className="w-4 h-4" />}
        iconPosition="left"
        className="bg-white/90 backdrop-blur-sm"
        aria-label={`Founded in ${competitor.company.founded}`}
      >
        Founded {competitor.company.founded}
      </Badge>

      {/* Monthly Users Badge (conditional) */}
      {competitor.traffic.monthlyUsers && (
        <Badge 
          variant="default"
          size="lg"
          shape="pill"
          icon={<Users className="w-4 h-4" />}
          iconPosition="left"
          className="bg-white/90 backdrop-blur-sm"
          aria-label={`Monthly users: ${(competitor.traffic.monthlyUsers / 1000000).toFixed(1)}M`}
        >
          {(competitor.traffic.monthlyUsers / 1000000).toFixed(1)}M users
        </Badge>
      )}

      {/* Website Link Badge (clickable) */}
      <a
        href={competitor.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${competitor.name} website`}
      >
        <Badge 
          variant="primary"
          size="lg"
          shape="pill"
          icon={<ExternalLink className="w-4 h-4" />}
          iconPosition="left"
          clickable
          className="bg-indigo-100 hover:bg-indigo-200 border-indigo-300"
        >
          <Text size="sm" weight="semibold" className="text-indigo-700">
            Visit Website
          </Text>
        </Badge>
      </a>
    </div>
  );
}