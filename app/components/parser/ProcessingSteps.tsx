'use client';

import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle,
  Loader2 
} from 'lucide-react';

export type ProcessingStep = 'upload' | 'ocr' | 'parsing' | 'complete';

interface ProcessingStepsProps {
  currentStep: ProcessingStep;
  processing: boolean;
}

export function ProcessingSteps({
  currentStep,
  processing,
}: ProcessingStepsProps) {
  const steps = [
    { id: 'upload', label: 'Uploading', icon: Upload, duration: '0.8s' },
    { id: 'ocr', label: 'OCR Processing', icon: FileText, duration: '1.5s' },
    { id: 'parsing', label: 'AI Parsing', icon: Sparkles, duration: '1.8s' },
    { id: 'complete', label: 'Complete', icon: CheckCircle, duration: '0s' },
  ];

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isActive = index === stepIndex && processing;
        const isComplete = index < stepIndex || (index === stepIndex && !processing);
        const isPending = index > stepIndex;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
              isActive
                ? 'border-primary-500 bg-primary-50'
                : isComplete
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isActive
                  ? 'bg-primary-600 animate-pulse'
                  : isComplete
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            >
              {isActive ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <step.icon className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`font-semibold ${
                  isActive
                    ? 'text-primary-700'
                    : isComplete
                    ? 'text-green-700'
                    : 'text-gray-600'
                }`}
              >
                {step.label}
              </h3>
              <p className="text-sm text-gray-500">
                {isActive
                  ? `Processing... (~${step.duration})`
                  : isComplete
                  ? 'Completed ✓'
                  : 'Pending'}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}