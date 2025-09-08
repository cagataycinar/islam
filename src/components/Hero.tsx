'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations().home.hero;
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            {t.subtitle}
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 px-6 py-4 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 px-8 py-4 rounded-r-lg font-semibold transition-colors"
              >
                {locale === 'tr' ? 'Ara' : 'Search'}
              </button>
            </div>
          </form>
          
          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={`/${locale}/quran`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">📖</div>
              <div className="font-semibold">
                {locale === 'tr' ? 'Kur\'an' : 'Quran'}
              </div>
            </Link>
            
            <Link
              href={`/${locale}/hadith`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold">
                {locale === 'tr' ? 'Hadis' : 'Hadith'}
              </div>
            </Link>
            
            <Link
              href={`/${locale}/sirah`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">👤</div>
              <div className="font-semibold">
                {locale === 'tr' ? 'Peygamber\'in Hayatı' : 'Prophet\'s Life'}
              </div>
            </Link>
            
            <Link
              href={`/${locale}/ask`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">🤖</div>
              <div className="font-semibold">
                {locale === 'tr' ? 'AI\'ya Sor' : 'Ask AI'}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
