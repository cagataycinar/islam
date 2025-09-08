'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function ImportantDaysSection() {
  const t = useTranslations().home.sections;
  const locale = useLocale();

  // Mock data - in real app, this would come from API
  const importantDays = [
    {
      id: 1,
      name: {
        en: "Laylat al-Qadr",
        tr: "Kadir Gecesi"
      },
      date: "2024-04-05",
      hijriDate: "27 Ramadan 1445",
      importance: "high" as const
    },
    {
      id: 2,
      name: {
        en: "Eid al-Fitr",
        tr: "Ramazan Bayramı"
      },
      date: "2024-04-10",
      hijriDate: "1 Shawwal 1445",
      importance: "high" as const
    },
    {
      id: 3,
      name: {
        en: "Eid al-Adha",
        tr: "Kurban Bayramı"
      },
      date: "2024-06-16",
      hijriDate: "10 Dhu al-Hijjah 1445",
      importance: "high" as const
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {t.importantDays}
        </h3>
        <Link
          href={`/${locale}/calendar`}
          className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
        >
          {locale === 'tr' ? 'Tümünü Gör' : 'View All'} →
        </Link>
      </div>
      
      <div className="space-y-4">
        {importantDays.map((day) => (
          <div
            key={day.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {day.name[locale as keyof typeof day.name]}
              </h4>
              <div className="text-sm text-gray-600">
                <p>{new Date(day.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</p>
                <p className="text-green-600">{day.hijriDate}</p>
              </div>
            </div>
            
            <span className={`px-2 py-1 text-xs rounded-full ${getImportanceColor(day.importance)}`}>
              {day.importance === 'high' ? (locale === 'tr' ? 'Yüksek' : 'High') : 
               day.importance === 'medium' ? (locale === 'tr' ? 'Orta' : 'Medium') : 
               (locale === 'tr' ? 'Düşük' : 'Low')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
