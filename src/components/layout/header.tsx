import BookmarkButton from '@/components/layout/headerComponent/bookmark-button';
import ProfileButton from '@/components/layout/headerComponent/profile-button';
import ThemeButton from '@/components/layout/headerComponent/theme-button';
import TranslationButton from '@/components/layout/headerComponent/translation-button';

export default function Header() {
  return (
    <header className={`flex items-center justify-end py-2 px-4 border-b`}>
      <div className={`flex items-center gap-2`}>
        <TranslationButton />
        <BookmarkButton />
        <ThemeButton />
        <ProfileButton />
      </div>
    </header>
  );
}
