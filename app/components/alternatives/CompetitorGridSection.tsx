import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { IconBox } from '@/app/components/ui/IconBox';
import { CompetitorCard } from './CompetitorCard';
import { Competitor } from '@/app/lib/alternativesKnowledgeBase';
import { LucideIcon } from 'lucide-react';

/**
 * Color Variant Type
 * Must match CompetitorCard variants for consistent theming
 */
type ColorVariant = 'success' | 'primary' | 'warning' | 'error' | 'info';

interface CompetitorGridSectionProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconVariant?: ColorVariant;
  competitors: Competitor[];
  emptyMessage?: string;
}

/**
 * CompetitorGridSection Component
 * 
 * Displays a section with:
 * - Section header with icon, title, and description
 * - Responsive grid of competitor cards (1 → 2 → 3 columns)
 * - Empty state when no competitors available
 * - Scroll anchor support for in-page navigation
 * 
 * This component eliminates 260+ lines of duplicated code across 4 sections:
 * - Free Generators
 * - Template Libraries
 * - AI Parsers
 * - API Services
 * 
 * @example
 * ```tsx
 * <CompetitorGridSection
 *   id="free-generators"
 *   title="Free Invoice Generators"
 *   description="Simple tools for creating invoices manually"
 *   icon={FileText}
 *   iconVariant="success"
 *   competitors={freeGenerators}
 * />
 * ```
 */
export function CompetitorGridSection({
  id,
  title,
  description,
  icon: Icon,
  iconVariant = 'primary',
  competitors,
  emptyMessage = 'No competitors found in this category'
}: CompetitorGridSectionProps) {
  return (
    <section 
      id={id} 
      className="mb-16 scroll-mt-20"
      aria-labelledby={`${id}-heading`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <IconBox 
          icon={<Icon />}
          variant={iconVariant}
          styleVariant="solid"
          size="xl"
          rounded="xl"
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <Heading 
            as="h2" 
            id={`${id}-heading`}
            size="display-sm"
            className="mb-1"
            animate={false}
          >
            {title}
          </Heading>
          <Text 
            variant="muted"
            animate={false}
          >
            {description}
          </Text>
        </div>
      </div>

      {/* Competitors Grid or Empty State */}
      {competitors.length > 0 ? (
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={`${title} list`}
        >
          {competitors.map((competitor) => (
            <div key={competitor.id} role="listitem">
              <CompetitorCard 
                competitor={competitor}
                variant={iconVariant}
              />
            </div>
          ))}
        </div>
      ) : (
        <div 
          className="text-center py-12 bg-white rounded-xl border border-slate-200"
          role="status"
          aria-label="No competitors available"
        >
          <Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" aria-hidden="true" />
          <Text variant="muted" size="lg" animate={false}>
            {emptyMessage}
          </Text>
        </div>
      )}
    </section>
  );
}