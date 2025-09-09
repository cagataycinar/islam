import { getTranslations } from '@/lib/translations';

interface HadithPageProps {
  params: Promise<{ locale: string }>;
}

// Sample Hadith data
const hadiths = [
  {
    id: 1,
    text: {
      en: "The best of people are those who are most beneficial to others.",
      tr: "İnsanların en hayırlısı, insanlara en faydalı olandır."
    },
    source: {
      en: "Sahih Bukhari",
      tr: "Sahih Buhari"
    },
    narrator: {
      en: "Jabir ibn Abdullah",
      tr: "Cabir ibn Abdullah"
    },
    category: "Character",
    bookNo: 1,
    hadithNo: 1234
  },
  {
    id: 2,
    text: {
      en: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
      tr: "Allah'a ve ahiret gününe iman eden kimse ya hayır söylesin ya da sussun."
    },
    source: {
      en: "Sahih Muslim",
      tr: "Sahih Müslim"
    },
    narrator: {
      en: "Abu Huraira",
      tr: "Ebu Hureyre"
    },
    category: "Speech",
    bookNo: 1,
    hadithNo: 45
  },
  {
    id: 3,
    text: {
      en: "The strong person is not the one who can wrestle others down. The strong person is the one who can control himself when he is angry.",
      tr: "Güçlü kimse, başkalarını güreşte yenen değildir. Güçlü kimse, öfkelendiği zaman kendini kontrol edebilendir."
    },
    source: {
      en: "Sahih Bukhari",
      tr: "Sahih Buhari"
    },
    narrator: {
      en: "Abu Huraira",
      tr: "Ebu Hureyre"
    },
    category: "Character",
    bookNo: 8,
    hadithNo: 135
  },
  {
    id: 4,
    text: {
      en: "None of you truly believes until he loves for his brother what he loves for himself.",
      tr: "Sizden biriniz, kardeşi için kendisi için sevdiğini sevmedikçe iman etmiş olmaz."
    },
    source: {
      en: "Sahih Bukhari",
      tr: "Sahih Buhari"
    },
    narrator: {
      en: "Anas ibn Malik",
      tr: "Enes ibn Malik"
    },
    category: "Brotherhood",
    bookNo: 1,
    hadithNo: 13
  }
];

const categories = ["All", "Character", "Speech", "Brotherhood", "Prayer", "Charity"];

export default async function HadithPage({ params }: HadithPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale as 'en' | 'tr');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.hadith.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'en' 
              ? "Explore authentic hadiths from the Prophet Muhammad (peace be upon him)"
              : "Peygamber Muhammed'den (sallallahu aleyhi ve sellem) gelen sahih hadisleri keşfedin"
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
                  placeholder={locale === 'en' ? "Search hadiths..." : "Hadis ara..."}
                  className="w-full px-4 py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
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

        {/* Hadith List */}
        <div className="space-y-6">
          {hadiths.map((hadith) => (
            <div
              key={hadith.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">💬</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <blockquote className="text-lg text-gray-900 mb-4 leading-relaxed">
                    "{hadith.text[locale as 'en' | 'tr']}"
                  </blockquote>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{t.hadith.source}:</span>
                      <span>{hadith.source[locale as 'en' | 'tr']}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{t.hadith.narrator}:</span>
                      <span>{hadith.narrator[locale as 'en' | 'tr']}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{t.hadith.category}:</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {hadith.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    {hadith.source[locale as 'en' | 'tr']} {hadith.bookNo}:{hadith.hadithNo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
            {locale === 'en' ? 'Load More Hadiths' : 'Daha Fazla Hadis Yükle'}
          </button>
        </div>
      </div>
    </div>
  );
}
