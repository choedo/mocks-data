import { Navigate, Outlet } from 'react-router';
import { toast } from 'sonner';

export default function MemberOnlyLayout() {
  const session = true;

  if (!session) {
    toast.info('로그인이 필요할 서비스입니다. 로그인 후 이용해주세요', {
      position: 'top-center',
    });

    return <Navigate to={'/sign-in'} />;
  }

  return <Outlet />;
}
