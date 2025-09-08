'use client';

import { useLocale } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function AskAICTA() {
  const locale = useLocale();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
      <div className="text-center">
        <div className="text-4xl mb-4">🤖</div>
        <h3 className="text-xl font-bold mb-2">
          {locale === 'tr' ? 'AI\'ya Sor' : 'Ask AI'}
        </h3>
        <p className="text-purple-100 mb-4">
          {locale === 'tr' 
            ? 'İslam hakkında herhangi bir sorunuz mu var? AI asistanımız size yardımcı olabilir.'
            : 'Have any questions about Islam? Our AI assistant can help you.'
          }
        </p>
        <Link
          href={`/${locale}/ask`}
          className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          {locale === 'tr' ? 'Soruyu Sor' : 'Ask Question'}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
