'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function VerseOfDay() {
  const t = useTranslations().home.verseOfDay;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const verseData = {
    en: {
      verse: "And whoever does righteous deeds - whether male or female - while being a believer, they will enter Paradise and will not be wronged [even as much as] the speck on a date seed.",
      translation: "Surah An-Nisa, Ayah 124",
      surah: "An-Nisa",
      ayah: 124
    },
    tr: {
      verse: "Erkek olsun, kadın olsun, kim mümin olarak salih ameller işlerse, işte onlar cennete girerler ve zerre kadar haksızlığa uğratılmazlar.",
      translation: "Nisa Suresi, 124. Ayet",
      surah: "Nisa",
      ayah: 124
    }
  };

  const verse = verseData[locale as keyof typeof verseData];

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-800">
          {t.title}
        </h2>
        <div className="text-4xl">📖</div>
      </div>
      
      <div className="mb-6">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          &ldquo;{verse.verse}&rdquo;
        </p>
        <p className="text-sm text-green-600 font-medium">
          {verse.translation}
        </p>
      </div>
      
      <Link
        href={`/${locale}/quran`}
        className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold transition-colors"
      >
        {t.readMore}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
