'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations().navigation;
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'quran', href: `/${locale}/quran` },
    { key: 'hadith', href: `/${locale}/hadith` },
    { key: 'articles', href: `/${locale}/articles` },
    { key: 'blog', href: `/${locale}/blog` },
    { key: 'library', href: `/${locale}/library` },
    { key: 'sirah', href: `/${locale}/sirah` },
    { key: 'calendar', href: `/${locale}/calendar` },
    { key: 'prayerTimes', href: `/${locale}/prayer-times` },
    { key: 'askAI', href: `/${locale}/ask` },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0">
              <span className="text-2xl font-bold text-green-600">Islam</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t[item.key as keyof typeof t]}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href={`/en`}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                locale === 'en' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              EN
            </Link>
            <Link
              href={`/tr`}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                locale === 'tr' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              TR
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t[item.key as keyof typeof t]}
                </Link>
              ))}
              <div className="flex space-x-2 pt-2">
                <Link
                  href={`/en`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    locale === 'en' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  EN
                </Link>
                <Link
                  href={`/tr`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    locale === 'tr' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  TR
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
