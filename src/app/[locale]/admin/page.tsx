import { getCurrentUser } from '@/lib/cookies';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import Blog from '@/models/Blog';
import Pdf from '@/models/Pdf';
import Hadith from '@/models/Hadith';
import User from '@/models/User';
import { getTranslations } from '@/lib/translations';

interface AdminDashboardProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboard({ params }: AdminDashboardProps) {
  const { locale } = await params;
  const t = getTranslations(locale as 'en' | 'tr');

  let articlesCount = 0;
  let blogsCount = 0;
  let pdfsCount = 0;
  let hadithsCount = 0;
  let usersCount = 0;
  let dbConnected = false;

  try {
    await connectDB();
    const results = await Promise.all([
      Article.countDocuments().catch(() => 0),
      Blog.countDocuments().catch(() => 0),
      Pdf.countDocuments().catch(() => 0),
      Hadith.countDocuments().catch(() => 0),
      User.countDocuments().catch(() => 0)
    ]);

    articlesCount = results[0] as number;
    blogsCount = results[1] as number;
    pdfsCount = results[2] as number;
    hadithsCount = results[3] as number;
    usersCount = results[4] as number;
    dbConnected = true;
  } catch {
    // DB bağlantısı kurulamadı
    dbConnected = false;
  }

  const stats = [
    { name: t.admin.articles, value: articlesCount, color: 'bg-blue-500' },
    { name: t.admin.blogs, value: blogsCount, color: 'bg-green-500' },
    { name: t.admin.pdfs, value: pdfsCount, color: 'bg-purple-500' },
    { name: t.admin.hadiths, value: hadithsCount, color: 'bg-orange-500' },
    { name: t.admin.users, value: usersCount, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      {!dbConnected && (
        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4">
          <p className="text-sm text-yellow-800">
            {locale === 'tr' 
              ? 'Veritabanı bağlantısı kurulamadı. Yerine örnek değerler gösteriliyor.' 
              : 'Database connection failed. Showing placeholder counts instead.'}
          </p>
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t.admin.dashboard}</h1>
        <p className="mt-2 text-gray-600">{t.admin.welcomeMessage}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                    <span className="text-white text-sm font-medium">{stat.value}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            {t.admin.quickActions}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`/${locale}/admin/articles`}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 rounded-lg border border-gray-200 hover:border-green-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                  📝
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {t.admin.createArticle}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {t.admin.createArticleDesc}
                </p>
              </div>
            </a>

            <a
              href={`/${locale}/admin/blogs`}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-blue-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  ✍️
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {t.admin.createBlog}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {t.admin.createBlogDesc}
                </p>
              </div>
            </a>

            <a
              href={`/${locale}/admin/hadiths`}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-500 rounded-lg border border-gray-200 hover:border-purple-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  💬
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {t.admin.manageHadiths}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {t.admin.manageHadithsDesc}
                </p>
              </div>
            </a>

            <a
              href={`/${locale}/admin/daily-content`}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 rounded-lg border border-gray-200 hover:border-orange-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-orange-50 text-orange-700 ring-4 ring-white">
                  📅
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {t.admin.dailyContent}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {t.admin.dailyContentDesc}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
