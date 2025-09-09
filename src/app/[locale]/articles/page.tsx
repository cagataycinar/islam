import { getTranslations } from '@/lib/translations';

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
}

// Sample Article data
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
    content: {
      en: "The Five Pillars of Islam are the foundation of Muslim life...",
      tr: "İslam'ın Beş Şartı, Müslüman hayatının temelidir..."
    },
    slug: {
      en: "understanding-five-pillars-islam",
      tr: "islam-bes-sartini-anlamak"
    },
    author: {
      en: "Dr. Ahmed Hassan",
      tr: "Dr. Ahmed Hassan"
    },
    publishedAt: "2024-01-15",
    readTime: 5,
    tags: ["Faith", "Practice", "Basics"],
    featuredImage: "/images/five-pillars.jpg"
  },
  {
    id: 2,
    title: {
      en: "The Importance of Prayer in Daily Life",
      tr: "Günlük Hayatta Namazın Önemi"
    },
    excerpt: {
      en: "How regular prayer can transform your spiritual journey and daily routine.",
      tr: "Düzenli namazın ruhsal yolculuğunuzu ve günlük rutininizi nasıl dönüştürebileceği."
    },
    content: {
      en: "Prayer is not just a religious obligation...",
      tr: "Namaz sadece dini bir yükümlülük değildir..."
    },
    slug: {
      en: "importance-prayer-daily-life",
      tr: "gunluk-hayatta-namazin-onemi"
    },
    author: {
      en: "Imam Sarah Ahmed",
      tr: "İmam Sarah Ahmed"
    },
    publishedAt: "2024-01-10",
    readTime: 7,
    tags: ["Prayer", "Spirituality", "Daily Life"],
    featuredImage: "/images/prayer.jpg"
  },
  {
    id: 3,
    title: {
      en: "Ramadan: A Month of Spiritual Renewal",
      tr: "Ramazan: Ruhsal Yenilenme Ayı"
    },
    excerpt: {
      en: "Discover the spiritual benefits and practices of the holy month of Ramadan.",
      tr: "Ramazan ayının ruhsal faydalarını ve uygulamalarını keşfedin."
    },
    content: {
      en: "Ramadan is more than just fasting...",
      tr: "Ramazan sadece oruç tutmaktan daha fazlasıdır..."
    },
    slug: {
      en: "ramadan-month-spiritual-renewal",
      tr: "ramazan-ruhsal-yenilenme-ayi"
    },
    author: {
      en: "Sheikh Omar Ali",
      tr: "Şeyh Omar Ali"
    },
    publishedAt: "2024-01-05",
    readTime: 6,
    tags: ["Ramadan", "Fasting", "Spirituality"],
    featuredImage: "/images/ramadan.jpg"
  }
];

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale as 'en' | 'tr');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.articles.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'en' 
              ? "Explore insightful articles about Islamic teachings, practices, and contemporary issues"
              : "İslami öğretiler, uygulamalar ve güncel konular hakkında içgörülü makaleleri keşfedin"
            }
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder={locale === 'en' ? "Search articles..." : "Makale ara..."}
                  className="w-full px-4 py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {["All", "Faith", "Practice", "History", "Contemporary"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    category === 'All'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
            >
              {/* Featured Image */}
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white text-4xl">📖</span>
              </div>
              
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.publishedAt}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime} {t.articles.readTime}</span>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title[locale as 'en' | 'tr']}
                </h2>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt[locale as 'en' | 'tr']}
                </p>
                
                {/* Author */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm font-medium">
                      {article.author[locale as 'en' | 'tr'].charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {t.articles.by} {article.author[locale as 'en' | 'tr']}
                  </span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Read More */}
                <div className="text-green-600 font-medium text-sm">
                  {t.common.readMore} →
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
            {locale === 'en' ? 'Load More Articles' : 'Daha Fazla Makale Yükle'}
          </button>
        </div>
      </div>
    </div>
  );
}
