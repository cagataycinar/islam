'use client';

import { useParams } from 'next/navigation';
import { getTranslations, type Locale } from '@/lib/translations';

export function useTranslations() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const t = getTranslations(locale);
  
  return t;
}

export function useLocale() {
  const params = useParams();
  return (params.locale as Locale) || 'en';
}
