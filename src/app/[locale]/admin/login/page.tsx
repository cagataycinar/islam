'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTranslations } from '@/lib/translations';

interface AdminLoginProps {
  params: Promise<{ locale: string }>;
}

export default function AdminLogin({ params }: AdminLoginProps) {
  const [locale, setLocale] = useState<'en' | 'tr'>('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Get locale from params
  useEffect(() => {
    params.then(({ locale: loc }) => {
      if (loc === 'en' || loc === 'tr') {
        setLocale(loc);
      }
    });
  }, [params]);

  const t = getTranslations(locale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if user is admin
        if (data.user.roles?.includes('admin')) {
          router.push(`/${locale}/admin`);
        } else {
          setError('Access denied. Admin privileges required.');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If already logged in and admin, redirect to admin dashboard
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/auth/me');
        const data = await resp.json();
        if (resp.ok && data?.user?.roles?.includes('admin')) {
          router.push(`/${locale}/admin`);
        }
      } catch {
        // ignore
      }
    })();
  }, [router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.admin.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t.admin.welcomeMessage}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <a
              href={`/${locale}`}
              className="text-sm text-green-600 hover:text-green-500"
            >
              ← Back to site
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
