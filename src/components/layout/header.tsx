import ProfileButton from '@/components/layout/headerComponent/profile-button';
import ThemeButton from '@/components/layout/headerComponent/theme-button';

export default function Header() {
  return (
    <header className={`flex items-center justify-end py-2 px-4 border-b`}>
      <div className={`flex items-center gap-4`}>
        <ThemeButton />
        <ProfileButton />
      </div>
    </header>
  );
}
