'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import PricingComparisonCard from './PricingComparisonCard';

/**
 * UpgradePrompt Component
 * 
 * Modal shown after successful PDF download
 * - Non-blocking (user already got their PDF)
 * - Dismissible (user can close anytime)
 * - Shows clear options: one-time vs subscription
 * - "Coming Soon" for payment buttons
 * 
 * Timing: Shows 2 seconds after download (not aggressive)
 * 
 * Philosophy: "Calm Monetization" - user feels in control
 */

interface UpgradePromptProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback when user closes modal */
  onClose: () => void;
  /** Source page (for analytics later) */
  source: 'template-download' | 'invoice-generator' | 'parser';
  /** Template name being downloaded */
  templateName?: string;
  /** Template ID (for purchase later) */
  templateId?: string;
}

export default function UpgradePrompt({
  isOpen,
  onClose,
  source,
  templateName = 'Invoice Template',
  templateId,
}: UpgradePromptProps) {
  
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Get source-specific messaging
  const getSourceMessage = () => {
    switch (source) {
      case 'template-download':
        return {
          title: `${templateName} Downloaded!`,
          subtitle: 'Your PDF is ready. It includes a sample watermark.',
          icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
        };
      case 'invoice-generator':
        return {
          title: 'Invoice Generated Successfully!',
          subtitle: 'Your PDF includes a sample watermark.',
          icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
        };
      case 'parser':
        return {
          title: 'Invoice Processed!',
          subtitle: 'Data extracted and PDF generated with sample watermark.',
          icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
        };
    }
  };

  const message = getSourceMessage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Header */}
              <div className="text-center pt-12 pb-8 px-8">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="flex justify-center mb-4"
                >
                  {message.icon}
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {message.title}
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 mb-6">
                  {message.subtitle}
                </p>

                {/* Upgrade Heading */}
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Remove Watermark
                  </h3>
                </div>
                <p className="text-sm text-gray-600 max-w-xl mx-auto">
                  Choose the option that works best for you. No pressure, this is just a preview of what's coming.
                </p>
              </div>

              {/* Pricing Comparison */}
              <div className="px-8 pb-8">
                <PricingComparisonCard
                  emphasize="premium"
                  hideTiers={['free']}
                  onPremiumCTA={() => {
                    // Will be replaced with actual payment flow later
                    alert('Payment integration coming soon! We\'ll notify you via email when it\'s ready.');
                  }}
                  onProCTA={() => {
                    // Will be replaced with actual payment flow later
                    alert('Payment integration coming soon! We\'ll notify you via email when it\'s ready.');
                  }}
                />
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-6 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Already Purchased Link */}
                  <button
                    onClick={() => {
                      alert('Authentication coming soon! You\'ll be able to sign in once payment integration is ready.');
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Already purchased? Sign in
                  </button>

                  {/* Maybe Later Button */}
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}