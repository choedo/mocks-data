import React from 'react';
import supabase from '@/lib/supabase';
import { useIsSessionLoaded, useSession, useSetSession } from '@/store/session';
import type { ReactNode } from 'react';
import GlobalLoader from '@/components/global-loader';
import { useProfileData } from '@/hooks/profile/use-profile-data';

type Props = {
  children: ReactNode;
};

export default function SessionProvider({ children }: Props) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { isLoading: isProfileLoading } = useProfileData(session?.user.id);

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
