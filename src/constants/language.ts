import type { Language } from '@/types/default';

type LanguageItem = { title: string; value: Language };
type LanguageItems = Record<Language, LanguageItem>;
export const LANGUAGES: LanguageItems = {
  ko: { title: 'Korean', value: 'ko' },
  en: { title: 'English', value: 'en' },
};
