'use client';

/**
 * Sign-In Page
 * 
 * Allows users to sign in with email/password or Google OAuth.
 * Redirects to the page they came from after successful sign-in.
 * 
 * Usage: /sign-in?redirect=/parser
 */

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import Link from 'next/link';
import { Mail, Lock, Chrome, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

function SignInContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signInWithGoogle, user } = useAuth();
  
  // Get redirect URL from query params (e.g., /sign-in?redirect=/parser)
  const redirectUrl = searchParams.get('redirect') || '/';

  useEffect(() => {
    // If already signed in, redirect immediately
    if (user) {
      console.log(`[Sign-In] User already signed in, redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    }
  }, [user, redirectUrl, router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      console.log(`[Sign-In] Success! Redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    } catch (err: any) {
      console.error('[Sign-In] Error:', err);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      console.log(`[Sign-In] Google success! Redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    } catch (err: any) {
      console.error('[Sign-In] Google error:', err);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    if (errorCode.includes('user-not-found')) return 'No account found with this email';
    if (errorCode.includes('wrong-password')) return 'Incorrect password';
    if (errorCode.includes('invalid-email')) return 'Invalid email address';
    if (errorCode.includes('too-many-requests')) return 'Too many attempts. Please try again later';
    return 'Failed to sign in. Please try again';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6 transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Sign in to continue to Elektroluma</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
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
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/reset-password" className="text-primary-600 hover:text-primary-700 font-medium transition">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account?{' '}
            <Link 
              href={`/sign-up${redirectUrl !== '/' ? `?redirect=${redirectUrl}` : ''}`}
              className="text-primary-600 hover:text-primary-700 font-semibold transition"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Free Trial Info */}
        <div className="mt-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">✨ <strong>Free trial includes:</strong></p>
            <div className="flex items-center justify-center gap-4 text-sm font-semibold text-slate-900">
              <span>10 invoice parses</span>
              <span className="text-slate-300">•</span>
              <span>3 template downloads</span>
              <span className="text-slate-300">•</span>
              <span>5 generator uses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}