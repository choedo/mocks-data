import Header from '@/components/layout/header';
import { useSession } from '@/store/session';
import { Navigate, Outlet } from 'react-router';
import { toast } from 'sonner';

export default function MemberOnlyLayout() {
  const session = useSession();

  if (!session) {
    toast.info('로그인이 필요할 서비스입니다. 로그인 후 이용해주세요', {
      position: 'top-center',
    });

    return <Navigate to={'/sign-in'} />;
  }

  return (
    <div className={`max-w-dvw w-full max-h-dvh min-h-dvh flex`}>
      <div className={`w-50 bg-blue-300`}>사이드</div>
      <div className={`flex flex-col flex-1`}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
