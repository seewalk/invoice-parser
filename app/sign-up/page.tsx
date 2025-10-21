'use client';

/**
 * Sign-Up Page
 * 
 * Allows users to create an account with email/password or Google OAuth.
 * Redirects to the page they came from after successful sign-up.
 * Automatically initializes new users with free trial quotas.
 * 
 * Usage: /sign-up?redirect=/parser
 */

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import Link from 'next/link';
import { Mail, Lock, User, Chrome, ArrowLeft, FileText, AlertCircle, CheckCircle } from 'lucide-react';

function SignUpContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp, signInWithGoogle, user } = useAuth();
  
  // Get redirect URL from query params (e.g., /sign-up?redirect=/parser)
  const redirectUrl = searchParams.get('redirect') || '/';

  useEffect(() => {
    // If already signed in, redirect immediately
    if (user) {
      console.log(`[Sign-Up] User already signed in, redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    }
  }, [user, redirectUrl, router]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (name.trim().length < 2) {
      setError('Please enter your full name');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name.trim());
      console.log(`[Sign-Up] Success! Redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    } catch (err: any) {
      console.error('[Sign-Up] Error:', err);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      console.log(`[Sign-Up] Google success! Redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    } catch (err: any) {
      console.error('[Sign-Up] Google error:', err);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    if (errorCode.includes('email-already-in-use')) return 'An account with this email already exists';
    if (errorCode.includes('invalid-email')) return 'Invalid email address';
    if (errorCode.includes('weak-password')) return 'Password is too weak. Please use at least 6 characters';
    if (errorCode.includes('too-many-requests')) return 'Too many attempts. Please try again later';
    return 'Failed to create account. Please try again';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6 transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Get Started</h1>
            <p className="text-slate-600">Create your free Elektroluma account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5" />
            {loading ? 'Creating account...' : 'Continue with Google'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or create with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="John Smith"
                  required
                  disabled={loading}
                  minLength={2}
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">At least 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            <div className="text-sm text-slate-600">
              <label className="flex items-start cursor-pointer">
                <input type="checkbox" className="mr-3 mt-0.5 rounded" required />
                <span>
                  I agree to Elektroluma's{' '}
                  <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium transition">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium transition">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{' '}
            <Link 
              href={`/sign-in${redirectUrl !== '/' ? `?redirect=${redirectUrl}` : ''}`}
              className="text-primary-600 hover:text-primary-700 font-semibold transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Free Trial Info */}
        <div className="mt-6">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200">
            <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-600" />
              Your free trial includes:
            </p>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                <span><strong>5 invoice parses</strong> – Extract data from invoices instantly</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                <span><strong>3 template downloads</strong> – Professional invoice templates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                <span><strong>5 generator uses</strong> – Create custom invoices on the fly</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-300">
              No credit card required. Upgrade anytime for unlimited access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <SignUpContent />
    </Suspense>
  );
}
