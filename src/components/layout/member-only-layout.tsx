import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { AlertMessages } from '@/languages/alert-messages';
import toastMessage from '@/lib/toast-message';
import { useSession } from '@/store/session';
import { useLanguage } from '@/store/translation';
import { Navigate, Outlet } from 'react-router';

export default function MemberOnlyLayout() {
  const language = useLanguage();
  const session = useSession();

  if (!session) {
    toastMessage.info(AlertMessages.MEMBERS_ONLY_ACCESS[language]);

    return <Navigate to={'/sign-in'} />;
  }

  return (
    <div className={`max-w-dvw w-full max-h-dvh min-h-dvh flex`}>
      <Sidebar />
      <div className={`flex flex-col flex-1`}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
