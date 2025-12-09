import { Navigate, Outlet } from 'react-router';

export default function GuestOnlyLayout() {
  const session = true;

  if (session) return <Navigate to={'/'} />;

  return <Outlet />;
}
