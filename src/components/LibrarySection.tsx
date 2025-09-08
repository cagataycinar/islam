'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function LibrarySection() {
  const t = useTranslations().home.sections;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const pdfs = [
    {
      id: 1,
      title: {
        en: "Complete Guide to Islamic Prayer",
        tr: "İslami Namaz Rehberi"
      },
      description: {
        en: "A comprehensive guide covering all aspects of Islamic prayer with illustrations.",
        tr: "İllüstrasyonlarla İslami namazın tüm yönlerini kapsayan kapsamlı rehber."
      },
      slug: "complete-guide-islamic-prayer",
      fileSize: "2.5 MB",
      category: "Prayer",
      downloads: 1250
    },
    {
      id: 2,
      title: {
        en: "Quran Study Companion",
        tr: "Kur'an Çalışma Arkadaşı"
      },
      description: {
        en: "Essential tools and resources for studying the Quran effectively.",
        tr: "Kur'an'ı etkili bir şekilde çalışmak için temel araçlar ve kaynaklar."
      },
      slug: "quran-study-companion",
      fileSize: "1.8 MB",
      category: "Quran",
      downloads: 980
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {t.library}
        </h2>
        <Link
          href={`/${locale}/library`}
          className="text-green-600 hover:text-green-700 font-semibold transition-colors"
        >
          {locale === 'tr' ? 'Tümünü Gör' : 'View All'} →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">📄</div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  {pdf.category}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {pdf.title[locale as keyof typeof pdf.title]}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {pdf.description[locale as keyof typeof pdf.description]}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{pdf.fileSize}</span>
                  <span className="mx-2">•</span>
                  <span>{pdf.downloads} {locale === 'tr' ? 'indirme' : 'downloads'}</span>
                </div>
              </div>
              
              <Link
                href={`/${locale}/library/${pdf.slug}`}
                className="inline-flex items-center w-full justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {locale === 'tr' ? 'İndir' : 'Download'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
