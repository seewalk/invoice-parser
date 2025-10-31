'use client';

import Link from 'next/link';
import { ArrowRight, FileText, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { IconBox } from '../ui/IconBox';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

interface InvoiceGeneratorTemplateCardProps {
  id: string;
  name: string;
  description: string;
  searchVolume: number;
  industryName: string;
  slug: string;
}

/**
 * Template Card Component for Invoice Generator Page
 * 
 * Displays a single invoice template with:
 * - Template icon
 * - Industry badge
 * - Template name
 * - Description
 * - Search volume metric
 * - Arrow indicator
 * 
 * Wrapped in a Link for navigation, uses Card with hover variant
 */
export default function InvoiceGeneratorTemplateCard({
  id,
  name,
  description,
  searchVolume,
  industryName,
  slug,
}: InvoiceGeneratorTemplateCardProps) {
  return (
    <Link
      href={`/invoice-generator/${slug}`}
      className="block group"
    >
      <Card
        variant="hover"
        elevation="lg"
        padding="lg"
        animate={false}
        className="h-full"
      >
        {/* Header with Icon and Industry Badge */}
        <div className="flex items-start justify-between mb-4">
          <IconBox
            icon={<FileText className="w-6 h-6" />}
            variant="primary"
            styleVariant="solid"
            size="md"
            rounded="lg"
            className="group-hover:bg-indigo-600 transition"
            animate={false}
          />
          <Badge variant="default" size="sm" animate={false}>
            {industryName}
          </Badge>
        </div>

        {/* Template Name */}
        <Heading
          as="h3"
          size="xl"
          className="mb-2 group-hover:text-indigo-600 transition"
          animate={false}
        >
          {name}
        </Heading>

        {/* Description */}
        <Text
          size="sm"
          variant="muted"
          className="mb-4"
          truncate="2-lines"
          animate={false}
        >
          {description}
        </Text>

        {/* Footer with Search Volume and Arrow */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-500" />
            <Text size="sm" variant="muted" animate={false}>
              Generate an invoice for free
            </Text>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </Link>
  );
}