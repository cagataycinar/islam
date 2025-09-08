'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function SirahSection() {
  const t = useTranslations().home.sections;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const sirahSections = [
    {
      id: 1,
      title: {
        en: "The Birth and Early Life of Prophet Muhammad",
        tr: "Peygamber Muhammed'in Doğumu ve Erken Yaşamı"
      },
      excerpt: {
        en: "Learn about the early years of the Prophet and the events that shaped his character.",
        tr: "Peygamber'in erken yıllarını ve karakterini şekillendiren olayları öğrenin."
      },
      slug: "birth-early-life-prophet-muhammad",
      order: 1,
      category: "Early Life"
    },
    {
      id: 2,
      title: {
        en: "The Revelation and First Muslims",
        tr: "Vahiy ve İlk Müslümanlar"
      },
      excerpt: {
        en: "Discover how the Quran was revealed and the first people to accept Islam.",
        tr: "Kur'an'ın nasıl vahyedildiğini ve İslam'ı kabul eden ilk insanları keşfedin."
      },
      slug: "revelation-first-muslims",
      order: 2,
      category: "Revelation"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {t.sirah}
        </h2>
        <Link
          href={`/${locale}/sirah`}
          className="text-green-600 hover:text-green-700 font-semibold transition-colors"
        >
          {locale === 'tr' ? 'Tümünü Gör' : 'View All'} →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sirahSections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">👤</div>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                  {section.category}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {section.title[locale as keyof typeof section.title]}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {section.excerpt[locale as keyof typeof section.excerpt]}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {locale === 'tr' ? 'Bölüm' : 'Section'} {section.order}
                </span>
                
                <Link
                  href={`/${locale}/sirah/${section.slug}`}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  {locale === 'tr' ? 'Devamını Oku' : 'Read More'} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
