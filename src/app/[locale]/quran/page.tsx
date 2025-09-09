import { getTranslations } from '@/lib/translations';

interface QuranPageProps {
  params: Promise<{ locale: string }>;
}

// Sample Surah data - in real app this would come from database
const surahs = [
  { number: 1, name: { en: "Al-Fatihah", tr: "Fatiha" }, verses: 7, meaning: { en: "The Opening", tr: "Açılış" } },
  { number: 2, name: { en: "Al-Baqarah", tr: "Bakara" }, verses: 286, meaning: { en: "The Cow", tr: "İnek" } },
  { number: 3, name: { en: "Ali 'Imran", tr: "Al-i İmran" }, verses: 200, meaning: { en: "Family of Imran", tr: "İmran Ailesi" } },
  { number: 4, name: { en: "An-Nisa", tr: "Nisa" }, verses: 176, meaning: { en: "The Women", tr: "Kadınlar" } },
  { number: 5, name: { en: "Al-Ma'idah", tr: "Maide" }, verses: 120, meaning: { en: "The Table Spread", tr: "Sofra" } },
  { number: 6, name: { en: "Al-An'am", tr: "En'am" }, verses: 165, meaning: { en: "The Cattle", tr: "Hayvanlar" } },
  { number: 7, name: { en: "Al-A'raf", tr: "A'raf" }, verses: 206, meaning: { en: "The Heights", tr: "Yüksek Yerler" } },
  { number: 8, name: { en: "Al-Anfal", tr: "Enfal" }, verses: 75, meaning: { en: "The Spoils", tr: "Ganimetler" } },
  { number: 9, name: { en: "At-Tawbah", tr: "Tevbe" }, verses: 129, meaning: { en: "The Repentance", tr: "Tövbe" } },
  { number: 10, name: { en: "Yunus", tr: "Yunus" }, verses: 109, meaning: { en: "Jonah", tr: "Yunus" } },
];

export default async function QuranPage({ params }: QuranPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale as 'en' | 'tr');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.quran.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'en' 
              ? "Explore the Holy Quran with translations and commentary"
              : "Kutsal Kur'an'ı çeviriler ve tefsirlerle keşfedin"
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={locale === 'en' ? "Search in Quran..." : "Kur'an'da ara..."}
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Surah List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah) => (
            <div
              key={surah.number}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold text-lg">
                      {surah.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {surah.name[locale as 'en' | 'tr']}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {surah.meaning[locale as 'en' | 'tr']}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {surah.verses} {locale === 'en' ? 'verses' : 'ayet'}
                </span>
                <span className="text-green-600 font-medium">
                  {locale === 'en' ? 'Read →' : 'Oku →'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
            {locale === 'en' ? 'Load More Surahs' : 'Daha Fazla Sure Yükle'}
          </button>
        </div>
      </div>
    </div>
  );
}
