'use client';

import { useState, useEffect } from 'react';
import { X, Mail, User, Gift, Shield, CheckCircle } from 'lucide-react';

export interface LeadCaptureData {
  email: string;
  name: string;
  source: 'template-download' | 'invoice-generator' | 'parser';
  metadata?: {
    templateName?: string;
    templateId?: string;
    pagePath?: string;
  };
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadCaptureData) => Promise<void>;
  source: 'template-download' | 'invoice-generator' | 'parser';
  metadata?: {
    templateName?: string;
    templateId?: string;
  };
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  source,
  metadata,
}: LeadCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setName('');
      setError('');
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        email: email.trim().toLowerCase(),
        name: name.trim(),
        source,
        metadata: {
          ...metadata,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
        },
      });

      setIsSuccess(true);

      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Success state
  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in-up">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Success!</h3>
            <p className="text-slate-600">
              Your download will start shortly. Check your email for exclusive tips!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get contextual content based on source
  const getContent = () => {
    switch (source) {
      case 'template-download':
        return {
          title: 'Get Your Free Invoice Template',
          subtitle: metadata?.templateName || 'Professional Invoice Template',
          benefits: [
            'Instant download of professional template',
            'Exclusive invoice management tips via email',
            'Access to 10+ more free templates',
            'No spam, unsubscribe anytime',
          ],
        };
      case 'invoice-generator':
        return {
          title: 'Download Your Custom Invoice',
          subtitle: 'Get your professionally generated invoice',
          benefits: [
            'Instant download of your custom invoice',
            'Save your preferences for next time',
            'Receive invoice best practices',
            'Updates on new features',
          ],
        };
      case 'parser':
        return {
          title: 'Download Parsed Invoice',
          subtitle: 'Get your AI-processed invoice data',
          benefits: [
            'Instant download of parsed invoice',
            'AI insights and tips via email',
            'Early access to premium features',
            'Priority support',
          ],
        };
    }
  };

  const content = getContent();

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <p className="text-indigo-100 text-sm">{content.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              What you'll get:
            </h3>
            <ul className="space-y-2">
              {content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition disabled:bg-slate-50 disabled:cursor-not-allowed"
                  placeholder="your.email@company.com"
                  required
                />
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition disabled:bg-slate-50 disabled:cursor-not-allowed"
                  placeholder="John Smith"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  Get My Free Download
                </>
              )}
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <Shield className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <p>
                We respect your privacy. Your email will only be used to send you the download link
                and occasional helpful tips. No spam, ever. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
