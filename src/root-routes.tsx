import GuestOnlyLayout from '@/components/layout/guest-only-layout';
import MemberOnlyLayout from '@/components/layout/member-only-layout';
import ForgetPasswordPage from '@/pages/forget-password-page';
import IndexPage from '@/pages/index-page';
import ProjectDetailPage from '@/pages/project-detail-page';
import ResetPasswordPage from '@/pages/reset-password-page';
import SignInPage from '@/pages/sign-in-page';
import { Navigate, Route, Routes } from 'react-router';

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GuestOnlyLayout />}>
        <Route path={'/sign-in'} element={<SignInPage />} />
        <Route path={'/forget-password'} element={<ForgetPasswordPage />} />
      </Route>

      <Route element={<MemberOnlyLayout />}>
        <Route path={'/'} element={<IndexPage />} />
        <Route path={'/project/:projectId'} element={<ProjectDetailPage />} />
      </Route>

      <Route path={'/reset-password'} element={<ResetPasswordPage />} />
      <Route path={'*'} element={<Navigate to={'/'} />} />
    </Routes>
  );
}
