import type { Language } from '@/types/default';

type LanguageItem = { title: string; value: Language };
type LanguageItems = Record<Language, LanguageItem>;
export const LANGUAGES: LanguageItems = {
  kr: { title: 'Korean', value: 'kr' },
  en: { title: 'English', value: 'en' },
};
