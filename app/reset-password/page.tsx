'use client';

/**
 * Reset Password Page
 * 
 * Allows users to reset their password via email.
 * Sends a password reset link to the user's email address.
 */

import { useState } from 'react';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import Link from 'next/link';
import { Mail, ArrowLeft, FileText, AlertCircle, CheckCircle, Send } from 'lucide-react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
      setEmail('');
      console.log(`[Reset Password] Email sent to: ${email}`);
    } catch (err: any) {
      console.error('[Reset Password] Error:', err);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    if (errorCode.includes('user-not-found')) return 'No account found with this email';
    if (errorCode.includes('invalid-email')) return 'Invalid email address';
    if (errorCode.includes('too-many-requests')) return 'Too many attempts. Please try again later';
    return 'Failed to send reset email. Please try again';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link href="/sign-in" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6 transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to sign in
        </Link>

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h1>
            <p className="text-slate-600">Enter your email to receive a reset link</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Check your email!</p>
                <p>We've sent a password reset link to your email address. Follow the instructions to reset your password.</p>
              </div>
            </div>
          )}

          {/* Reset Form */}
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Remember your password?{' '}
            <Link 
              href="/sign-in"
              className="text-primary-600 hover:text-primary-700 font-semibold transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Help Info */}
        <div className="mt-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600">
              <strong>Need help?</strong> Contact us at{' '}
              <a href="mailto:support@elektroluma.co.uk" className="text-primary-600 hover:text-primary-700 font-medium transition">
                support@elektroluma.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}