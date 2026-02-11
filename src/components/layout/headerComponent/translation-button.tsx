import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LANGUAGES } from '@/constants/language';
import { useTranslation } from '@/store/traslation';
import type { Language } from '@/types/default';
import { GlobeIcon } from 'lucide-react';

export default function TranslationButton() {
  const {
    lang,
    actions: { setLanguage },
  } = useTranslation();

  const handleClick = (language: Language) => {
    setLanguage(language);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="hover:bg-muted cursor-pointer rounded-full p-2">
          <GlobeIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className={'p-2 w-auto flex flex-col'}>
        {Object.values(LANGUAGES).map((language) => (
          <Button
            key={`language-${language.value}`}
            onClick={() => handleClick(language.value)}
            variant={'ghost'}
            className={'cursor-pointer'}
            disabled={lang === language.value}
          >
            {language.title}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
