/**
 * ============================================================================
 * CHECKOUT SUCCESS PAGE
 * ============================================================================
 * 
 * Post-purchase confirmation page
 * Shows subscription details and next steps
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { user, userQuotas } = useAuth();

  // Trigger confetti on mount
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-primary-100">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-400 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
            Welcome to <span className="gradient-text">Pro!</span> 🎉
          </h1>
          <p className="text-xl text-center text-gray-600 mb-8">
            Your subscription is now active
          </p>

          {/* What's Unlocked */}
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                What's Unlocked
              </h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Unlimited AI Parsing</p>
                  <p className="text-sm text-gray-600">Parse unlimited invoices with our AI engine</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">API Access</p>
                  <p className="text-sm text-gray-600">Integrate with your existing systems</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Priority Support</p>
                  <p className="text-sm text-gray-600">Get help when you need it most</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">All Premium Features</p>
                  <p className="text-sm text-gray-600">Templates, generator, and more</p>
                </div>
              </li>
            </ul>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Plan</p>
                <p className="font-semibold text-primary-600">Pro</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => router.push('/parser')}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Start Parsing Invoices
            </Button>
            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            A confirmation email has been sent to {user?.email}
          </p>
        </div>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Need help getting started?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push('/docs')}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              View Documentation →
            </button>
            <button
              onClick={() => window.open('mailto:support@invoiceparse.ai', '_blank')}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}