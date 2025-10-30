'use client';

import { Building2, TrendingUp, Users, Search, LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { Stat } from '../ui/Stat';

interface StatsData {
  totalCompetitors: number;
  totalSegments: number;
  totalSearchVolume: number;
  totalResources: number;
}

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
}

interface AlternativesStatsProps {
  stats: StatsData;
}

export function AlternativesStats({ stats }: AlternativesStatsProps) {
  const statItems: StatItem[] = [
    {
      icon: Building2,
      value: stats.totalCompetitors.toString(),
      label: 'Competitors',
      variant: 'info',
    },
    {
      icon: TrendingUp,
      value: stats.totalSegments.toString(),
      label: 'Market Segments',
      variant: 'primary',
    },
    {
      icon: Search,
      value: `${(stats.totalSearchVolume / 1000).toFixed(0)}K`,
      label: 'Monthly Searches',
      variant: 'success',
    },
    {
      icon: Users,
      value: stats.totalResources.toString(),
      label: 'Resources',
      variant: 'warning',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {statItems.map((stat, index) => (
        <Card
          key={index}
          variant="glass"
          padding="md"
          animate
          className="backdrop-blur-sm hover:shadow-lg transition-shadow"
        >
          <Stat
            icon={<stat.icon className="w-6 h-6" />}
            value={stat.value}
            label={stat.label}
            variant={stat.variant}
            size="md"
            layout="horizontal"
            animate={false}
          />
        </Card>
      ))}
    </div>
  );
}