'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function ArticlesSection() {
  const t = useTranslations().home.sections;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const articles = [
    {
      id: 1,
      title: {
        en: "Understanding the Five Pillars of Islam",
        tr: "İslam'ın Beş Şartını Anlamak"
      },
      excerpt: {
        en: "A comprehensive guide to the fundamental principles of Islamic faith and practice.",
        tr: "İslami inanç ve uygulamanın temel ilkelerine kapsamlı bir rehber."
      },
      slug: "understanding-five-pillars-islam",
      publishedAt: "2024-01-15",
      readTime: 5,
      tags: ["Faith", "Practice", "Basics"]
    },
    {
      id: 2,
      title: {
        en: "The Importance of Prayer in Daily Life",
        tr: "Günlük Hayatta Namazın Önemi"
      },
      excerpt: {
        en: "How regular prayer can transform your spiritual journey and daily routine.",
        tr: "Düzenli namazın manevi yolculuğunuzu ve günlük rutininizi nasıl dönüştürebileceği."
      },
      slug: "importance-prayer-daily-life",
      publishedAt: "2024-01-10",
      readTime: 7,
      tags: ["Prayer", "Spirituality", "Daily Life"]
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {t.articles}
        </h2>
        <Link
          href={`/${locale}/articles`}
          className="text-green-600 hover:text-green-700 font-semibold transition-colors"
        >
          {locale === 'tr' ? 'Tümünü Gör' : 'View All'} →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}
                </span>
                <span className="text-sm text-gray-500">
                  {article.readTime} {locale === 'tr' ? 'dakika okuma' : 'min read'}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {article.title[locale as keyof typeof article.title]}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {article.excerpt[locale as keyof typeof article.excerpt]}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`/${locale}/articles/${article.slug}`}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  {locale === 'tr' ? 'Devamını Oku' : 'Read More'} →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
