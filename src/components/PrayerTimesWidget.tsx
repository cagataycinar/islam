'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PrayerTimesWidget() {
  const t = useTranslations().home.sections;
  const locale = useLocale();
  const [prayerTimes, setPrayerTimes] = useState<{
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    location: string;
  } | null>(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockPrayerTimes = {
      fajr: '05:30',
      dhuhr: '12:15',
      asr: '15:45',
      maghrib: '18:20',
      isha: '19:45',
      location: 'Istanbul, Turkey'
    };
    
    setPrayerTimes(mockPrayerTimes);
    setLocation(mockPrayerTimes.location);
  }, []);

  const prayers = [
    { key: 'fajr', name: locale === 'tr' ? 'Sabah' : 'Fajr', icon: '🌅' },
    { key: 'dhuhr', name: locale === 'tr' ? 'Öğle' : 'Dhuhr', icon: '☀️' },
    { key: 'asr', name: locale === 'tr' ? 'İkindi' : 'Asr', icon: '🌤️' },
    { key: 'maghrib', name: locale === 'tr' ? 'Akşam' : 'Maghrib', icon: '🌅' },
    { key: 'isha', name: locale === 'tr' ? 'Yatsı' : 'Isha', icon: '🌙' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {t.prayerTimes}
        </h3>
        <Link
          href={`/${locale}/prayer-times`}
          className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
        >
          {locale === 'tr' ? 'Detaylar' : 'Details'} →
        </Link>
      </div>
      
      {prayerTimes ? (
        <>
          <div className="text-sm text-gray-600 mb-4">
            <p className="font-medium">{location}</p>
            <p>{new Date().toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</p>
          </div>
          
          <div className="space-y-3">
            {prayers.map((prayer) => (
              <div
                key={prayer.key}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{prayer.icon}</span>
                  <span className="font-medium text-gray-900">{prayer.name}</span>
                </div>
                <span className="font-bold text-green-600">
                  {prayerTimes[prayer.key as keyof typeof prayerTimes]}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {locale === 'tr' ? 'Namaz vakitleri yükleniyor...' : 'Loading prayer times...'}
          </p>
        </div>
      )}
    </div>
  );
}
