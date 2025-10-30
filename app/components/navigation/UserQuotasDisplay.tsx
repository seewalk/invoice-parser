/**
 * ============================================================================
 * USER QUOTAS DISPLAY COMPONENT
 * ============================================================================
 * 
 * Displays user usage quotas for free tier users.
 */

'use client';

import { FileCheck, Download, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

interface UserQuotasDisplayProps {
  quotas: {
    invoiceParses: number;
    templateDownloads: number;
    generatorUses: number;
  };
  onUpgradeClick?: () => void;
  compact?: boolean;
}

export function UserQuotasDisplay({ 
  quotas, 
  onUpgradeClick,
  compact = false 
}: UserQuotasDisplayProps) {
  return (
    <div className={compact ? "bg-slate-50 rounded-lg p-3 space-y-2 mb-3" : "p-4 bg-slate-50 border-b border-slate-200"}>
      {!compact && (
        <Text as="p" size="xs" weight="semibold" variant="secondary" className="mb-3">
          Your Usage
        </Text>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <Text as="span" size="sm" variant="muted" className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            {compact ? 'Parses' : 'Invoice Parses'}
          </Text>
          <Text as="span" size="sm" weight="semibold">
            {quotas.invoiceParses} / 5
          </Text>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Text as="span" size="sm" variant="muted" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {compact ? 'Downloads' : 'Template Downloads'}
          </Text>
          <Text as="span" size="sm" weight="semibold">
            {quotas.templateDownloads} / 3
          </Text>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Text as="span" size="sm" variant="muted" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {compact ? 'Generator' : 'Generator Uses'}
          </Text>
          <Text as="span" size="sm" weight="semibold">
            {quotas.generatorUses} / 5
          </Text>
        </div>
      </div>
      
      <Link
        href="/pricing"
        onClick={onUpgradeClick}
        className={compact ? "block" : "mt-3 w-full block"}
      >
        <Button
          variant="primary"
          size="sm"
          fullWidth
          icon={<Sparkles className="w-4 h-4" />}
          iconPosition="left"
        >
          Upgrade for Unlimited
        </Button>
      </Link>
    </div>
  );
}