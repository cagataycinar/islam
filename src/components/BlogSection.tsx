'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function BlogSection() {
  const t = useTranslations().home.sections;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const blogPosts = [
    {
      id: 1,
      title: {
        en: "My Journey to Islam: A Personal Story",
        tr: "İslam'a Yolculuğum: Kişisel Bir Hikaye"
      },
      excerpt: {
        en: "Sharing my personal experience of discovering Islam and how it changed my life.",
        tr: "İslam'ı keşfetme sürecimdeki kişisel deneyimimi ve hayatımı nasıl değiştirdiğini paylaşıyorum."
      },
      slug: "my-journey-to-islam",
      publishedAt: "2024-01-20",
      readTime: 8,
      author: "Sarah Ahmed"
    },
    {
      id: 2,
      title: {
        en: "Ramadan Reflections: Lessons Learned",
        tr: "Ramazan Düşünceleri: Öğrenilen Dersler"
      },
      excerpt: {
        en: "Reflecting on the spiritual lessons and personal growth during the holy month.",
        tr: "Kutsal ay boyunca öğrenilen manevi dersler ve kişisel gelişim üzerine düşünceler."
      },
      slug: "ramadan-reflections",
      publishedAt: "2024-01-18",
      readTime: 6,
      author: "Ahmed Hassan"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {t.blog}
        </h2>
        <Link
          href={`/${locale}/blog`}
          className="text-green-600 hover:text-green-700 font-semibold transition-colors"
        >
          {locale === 'tr' ? 'Tümünü Gör' : 'View All'} →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}
                </span>
                <span className="text-sm text-gray-500">
                  {post.readTime} {locale === 'tr' ? 'dakika okuma' : 'min read'}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {post.title[locale as keyof typeof post.title]}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {post.excerpt[locale as keyof typeof post.excerpt]}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {locale === 'tr' ? 'Yazar' : 'By'} {post.author}
                </span>
                
                <Link
                  href={`/${locale}/blog/${post.slug}`}
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
