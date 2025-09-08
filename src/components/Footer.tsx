'use client';

import { useTranslations, useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations().navigation;
  const locale = useLocale();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Islam</h3>
            <p className="text-gray-300 mb-4">
              {locale === 'tr' 
                ? 'İslami bilgi ve uygulama için kapsamlı bir rehber'
                : 'A comprehensive guide to Islamic knowledge and practice'
              }
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {locale === 'tr' ? 'Keşfet' : 'Explore'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/quran`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.quran}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/hadith`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.hadith}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/articles`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.articles}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sirah`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.sirah}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {locale === 'tr' ? 'Kaynaklar' : 'Resources'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/library`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.library}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calendar`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.calendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/prayer-times`} className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.prayerTimes}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Islam. {locale === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
