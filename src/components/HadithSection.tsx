'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function HadithSection() {
  const t = useTranslations().home.sections;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const hadiths = [
    {
      id: 1,
      text: {
        en: "The best of people are those who are most beneficial to others.",
        tr: "İnsanların en hayırlısı, insanlara en faydalı olanıdır."
      },
      source: {
        en: "Sahih Bukhari",
        tr: "Sahih-i Buhari"
      },
      narrator: {
        en: "Jabir ibn Abdullah",
        tr: "Cabir ibn Abdullah"
      },
      category: "Character"
    },
    {
      id: 2,
      text: {
        en: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
        tr: "Allah'a ve ahiret gününe iman eden kimse ya hayır söylesin ya da sussun."
      },
      source: {
        en: "Sahih Muslim",
        tr: "Sahih-i Müslim"
      },
      narrator: {
        en: "Abu Huraira",
        tr: "Ebu Hureyre"
      },
      category: "Speech"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {t.hadith}
        </h2>
        <Link
          href={`/${locale}/hadith`}
          className="text-green-600 hover:text-green-700 font-semibold transition-colors"
        >
          {locale === 'tr' ? 'Tümünü Gör' : 'View All'} →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hadiths.map((hadith) => (
          <div
            key={hadith.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">💬</div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                {hadith.category}
              </span>
            </div>
            
            <blockquote className="text-lg text-gray-700 leading-relaxed mb-4 italic">
              &ldquo;{hadith.text[locale as keyof typeof hadith.text]}&rdquo;
            </blockquote>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium">{hadith.source[locale as keyof typeof hadith.source]}</p>
              <p className="text-gray-500">{hadith.narrator[locale as keyof typeof hadith.narrator]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
