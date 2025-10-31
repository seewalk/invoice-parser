/**
 * ============================================================================
 * INDUSTRY GRID COMPONENT
 * ============================================================================
 * 
 * Displays industry cards in a responsive grid with:
 * - Industry icons and names
 * - Template counts
 * - Tier badges (PRO, FREE+PRO)
 * - Navigation to individual industry pages
 * - Popular category tags
 * 
 * Mobile-first responsive design
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { IndustryMetadata } from '@/app/lib/invoice-templates/invoiceTemplateIndustries';

interface IndustryGridProps {
  industries: IndustryMetadata[];
  totalIndustries: number;
  totalTemplates: number;
}

export default function IndustryGrid({
  industries,
  totalIndustries,
  totalTemplates,
}: IndustryGridProps) {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card variant="default" padding="lg" >
          <CardHeader>
            <CardTitle>
              <Heading as="h2" size="xl" weight="bold" align="center" className="mb-2">
                Browse by Industry
              </Heading>
            </CardTitle>
            <CardDescription>
              <Text size="sm" variant="muted" align="center">
                {totalIndustries} Industries • {totalTemplates} Templates
              </Text>
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Industry Cards Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + (index * 0.05) }}
                >
                  <Link
                    href={`/invoice-templates/${industry.id}`}
                    className="block h-full"
                  >
                    <Card 
                      variant="hover" 
                      padding="md"
                      className="h-full"
                      animate={false}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <span 
                          className="text-2xl sm:text-3xl flex-shrink-0" 
                          role="img" 
                          aria-label={industry.name}
                        >
                          {industry.icon}
                        </span>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <Heading 
                            as="h3" 
                            size="sm" 
                            weight="semibold" 
                            className="mb-1 truncate group-hover:text-indigo-600 transition"
                          >
                            {industry.name}
                          </Heading>
                          
                          {/* Template Count & Tier */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <Text size="xs" variant="muted" className="whitespace-nowrap">
                              {industry.templateCount} template{industry.templateCount !== 1 ? 's' : ''}
                            </Text>
                            
                            {industry.tier === 'premium' && (
                              <Badge variant="primary" size="sm">PRO</Badge>
                            )}
                            {industry.tier === 'mixed' && (
                              <Badge variant="secondary" size="sm">FREE+PRO</Badge>
                            )}
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <ArrowRight 
                          className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" 
                          aria-hidden="true"
                        />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Popular Categories Tag Cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6 sm:mt-8 pt-6 border-t border-slate-200"
            >
              <Heading as="h3" size="sm" weight="semibold" align="center" className="mb-4">
                Popular Categories
              </Heading>
              <div className="flex flex-wrap justify-center gap-2">
                {industries.slice(0, 8).flatMap(industry => 
                  industry.categories.slice(0, 2).map(category => (
                    <Badge 
                      key={`${industry.id}-${category}`}
                      variant="success"
                      size="sm"
                      className="cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition"
                    >
                      {category}
                    </Badge>
                  ))
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}