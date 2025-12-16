import Header from '@/components/layout/header';
import { useSession } from '@/store/session';
import { Navigate, Outlet } from 'react-router';

export default function GuestOnlyLayout() {
  const session = useSession();

  if (session) return <Navigate to={'/'} />;

  return (
    <div className={`flex flex-col max-h-dvh min-h-dvh`}>
      <Header />
      <div className={`flex flex-1 justify-center items-center`}>
        <Outlet />
      </div>
    </div>
  );
}
