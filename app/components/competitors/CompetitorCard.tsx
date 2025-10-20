import Link from 'next/link';
import { Competitor } from '../../lib/alternativesKnowledgeBase';
import { ArrowRight, Users, CheckCircle } from 'lucide-react';

interface CompetitorCardProps {
  competitor: Competitor;
}

export function CompetitorCard({ competitor }: CompetitorCardProps) {
  // Determine badge color based on segment
  const segmentColors: Record<string, { bg: string; text: string }> = {
    'free-generator': { bg: 'bg-green-100', text: 'text-green-700' },
    'template-library': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'ai-parser': { bg: 'bg-purple-100', text: 'text-purple-700' },
    'api-service': { bg: 'bg-orange-100', text: 'text-orange-700' },
  };

  const colors = segmentColors[competitor.segment] || { bg: 'bg-slate-100', text: 'text-slate-700' };

  return (
    <Link
      href={`/alternatives/${competitor.slug}`}
      className="group bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {competitor.name}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{competitor.company.headquarters}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
      </div>

      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
        {competitor.shortDescription}
      </p>

      {/* Quick Stats */}
      <div className="space-y-2 mb-4">
        {competitor.traffic.monthlyUsers && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>{(competitor.traffic.monthlyUsers / 1000000).toFixed(1)}M monthly users</span>
          </div>
        )}
        {competitor.features.aiPowered && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle className="w-4 h-4 text-indigo-600" />
            <span>AI-Powered</span>
          </div>
        )}
      </div>

      {/* Segment Badge */}
      <div className="pt-4 border-t border-slate-200">
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
          {competitor.segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>
    </Link>
  );
}