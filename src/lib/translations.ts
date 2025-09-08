import en from '../../messages/en.json';
import tr from '../../messages/tr.json';

export const translations = {
  en,
  tr,
} as const;

export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}
