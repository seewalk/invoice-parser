/**
 * ExternalResourcesSection Component
 * 
 * Displays external research and monitoring resources.
 * Shows competitor monitoring tools and industry research reports.
 * Two-column layout with external link cards.
 */

import { ExternalResource } from '@/app/lib/alternativesKnowledgeBase';
import { Card, CardContent } from '@/app/components/ui/Card';
import { Heading } from '@/app/components/ui/Heading';
import { Text } from '@/app/components/ui/Text';
import { ExternalLink } from 'lucide-react';

interface ExternalResourcesSectionProps {
  monitoringTools: ExternalResource[];
  researchReports: ExternalResource[];
}

export function ExternalResourcesSection({ 
  monitoringTools, 
  researchReports 
}: ExternalResourcesSectionProps) {
  // Don't render if no resources available
  if (monitoringTools.length === 0 && researchReports.length === 0) {
    return null;
  }

  return (
    <section className="mb-12" aria-labelledby="external-resources-heading">
      <Heading as="h2" id="external-resources-heading" size="display-sm" className="mb-6">
        Research & Comparison Resources
      </Heading>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Monitoring Tools Column */}
        {monitoringTools.length > 0 && (
          <Card variant="default" elevation="lg" padding="lg">
            <CardContent>
              <Heading as="h3" size="xl" className="mb-4">
                Competitor Monitoring Tools
              </Heading>
              <div className="space-y-3" role="list" aria-label="Monitoring tools">
                {monitoringTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                    role="listitem"
                    aria-label={`Visit ${tool.name}`}
                  >
                    <div>
                      <div className="font-medium text-slate-900">{tool.name}</div>
                      <Text size="sm" variant="secondary">{tool.description}</Text>
                    </div>
                    <ExternalLink 
                      className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors flex-shrink-0 ml-2" 
                      aria-hidden="true" 
                    />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Research Reports Column */}
        {researchReports.length > 0 && (
          <Card variant="default" elevation="lg" padding="lg">
            <CardContent>
              <Heading as="h3" size="xl" className="mb-4">
                Industry Research
              </Heading>
              <div className="space-y-3" role="list" aria-label="Research reports">
                {researchReports.map((report) => (
                  <a
                    key={report.id}
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                    role="listitem"
                    aria-label={`Visit ${report.name}`}
                  >
                    <div>
                      <div className="font-medium text-slate-900">{report.name}</div>
                      <Text size="sm" variant="secondary">{report.description}</Text>
                    </div>
                    <ExternalLink 
                      className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors flex-shrink-0 ml-2" 
                      aria-hidden="true" 
                    />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}