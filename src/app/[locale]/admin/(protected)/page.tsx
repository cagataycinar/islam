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
    </div>
  );
}

export { default } from '../../page';


