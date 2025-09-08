'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function HadithOfDay() {
  const t = useTranslations().home.hadithOfDay;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const hadithData = {
    en: {
      text: "The best of people are those who are most beneficial to others.",
      source: "Sahih Bukhari",
      narrator: "Jabir ibn Abdullah"
    },
    tr: {
      text: "İnsanların en hayırlısı, insanlara en faydalı olanıdır.",
      source: "Sahih-i Buhari",
      narrator: "Cabir ibn Abdullah"
    }
  };

  const hadith = hadithData[locale as keyof typeof hadithData];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-800">
          {t.title}
        </h2>
        <div className="text-4xl">💬</div>
      </div>
      
      <div className="mb-6">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          &ldquo;{hadith.text}&rdquo;
        </p>
        <div className="text-sm text-blue-600">
          <p className="font-medium">{hadith.source}</p>
          <p className="text-blue-500">{hadith.narrator}</p>
        </div>
      </div>
      
      <Link
        href={`/${locale}/hadith`}
        className="inline-flex items-center text-blue-700 hover:text-blue-800 font-semibold transition-colors"
      >
        {locale === 'tr' ? 'Tüm Hadisleri Gör' : 'View All Hadith'}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
