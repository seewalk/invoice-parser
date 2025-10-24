'use client';

import { memo } from 'react';
import { PageAnalysis } from '@/app/types/invoice';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface SmartSuggestionProps {
  analysis: PageAnalysis;
  onParseNext?: () => void;
  onSkip?: () => void;
}

/**
 * SmartSuggestion Component
 * 
 * Displays AI-powered suggestion based on page 1 analysis
 * 
 * Features:
 * - Visual indicator (success/warning/info)
 * - Actionable suggestions
 * - CTA buttons based on analysis
 * - Cost savings information
 */
export const SmartSuggestion = memo(function SmartSuggestion({
  analysis,
  onParseNext,
  onSkip
}: SmartSuggestionProps) {
  const config = {
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-200',
      textColor: 'text-green-800'
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      textColor: 'text-amber-800'
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      textColor: 'text-blue-800'
    }
  };

  const style = config[analysis.type];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border-2 ${style.border} rounded-xl p-4 shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center border ${style.border}`}>
          <Icon className={`w-6 h-6 ${style.iconColor}`} />
        </div>

        <div className="flex-1">
          <h4 className={`text-sm font-bold ${style.textColor} mb-2`}>
            🤖 Smart Analysis: {analysis.isComplete ? 'Invoice Appears Complete' : 'Additional Pages Needed'}
          </h4>
          
          <p className={`text-sm ${style.textColor} mb-3`}>
            {analysis.suggestion}
          </p>

          {analysis.missingData && analysis.missingData.length > 0 && (
            <div className={`text-xs ${style.textColor} mb-3`}>
              <strong>Missing data:</strong> {analysis.missingData.join(', ')}
            </div>
          )}

          <div className={`flex items-center gap-2 text-xs ${style.textColor} mb-3`}>
            <span className="font-medium">Confidence: {Math.round(analysis.confidence * 100)}%</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-3">
            {analysis.isComplete ? (
              <>
                {onSkip && (
                  <button
                    onClick={onSkip}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Use Page 1 Only
                  </button>
                )}
                {onParseNext && (
                  <button
                    onClick={onParseNext}
                    className="px-4 py-2 bg-white hover:bg-gray-50 text-green-700 text-sm font-medium rounded-lg border-2 border-green-300 transition-colors"
                  >
                    Parse Page 2 Anyway
                  </button>
                )}
              </>
            ) : (
              <>
                {onParseNext && (
                  <button
                    onClick={onParseNext}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Parse Next Page →
                  </button>
                )}
              </>
            )}
          </div>

          {/* Cost Savings Note */}
          {analysis.isComplete && (
            <p className="text-xs text-gray-600 mt-3">
              💰 Skipping remaining pages could save ~£0.02-£0.08 in API costs
            </p>
          )}
        </div>
      </div>
    </div>
  );
});