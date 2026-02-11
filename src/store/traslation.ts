import type { Language } from '@/types/default';
import { create } from 'zustand';
import { devtools, combine, persist } from 'zustand/middleware';

type State = {
  lang: Language;
};

const initialState: State = {
  lang: 'en',
};

const useTranslationStore = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setLanguage: (language: Language) => {
            set({ lang: language });
          },
        },
      })),
      {
        name: 'TranslationStore',
        partialize: (store) => ({ lang: store.lang }),
      },
    ),
    { name: 'TranslationStore' },
  ),
);

export const useTranslation = () => {
  const translation = useTranslationStore();
  return translation;
};

export const useLanguage = () => {
  const language = useTranslationStore((store) => store.lang);
  return language;
};

export const useSetLanguage = () => {
  const setLanguage = useTranslationStore((store) => store.actions.setLanguage);
  return setLanguage;
};
