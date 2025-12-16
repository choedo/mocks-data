import { useSession } from '@/store/session';
import { Navigate, Outlet } from 'react-router';

export default function GuestOnlyLayout() {
  const session = useSession();

  if (session) return <Navigate to={'/'} />;

  return (
    <div
      className={`max-w-[1200px] h-[100dvh] m-auto flex justify-center items-center`}
    >
      <Outlet />
    </div>
  );
}
