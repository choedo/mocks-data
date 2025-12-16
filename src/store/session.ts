import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

type State = {
  isLoaded: boolean;
  session: Session | null;
  savedEmail: string | null;
};

const initialState = {
  isLoaded: false,
  session: null,
  savedEmail: null,
} as State;

const useSessionStore = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setSession: (session: Session | null) => {
            set({ session, isLoaded: true });
          },
          setSaveEmail: (email: string) => {
            set({ savedEmail: email });
          },
          setRemoveEmail: () => {
            set({ savedEmail: null });
          },
        },
      })),
      {
        name: 'sessionStore',
        partialize: (state) => ({ savedEmail: state.savedEmail }),
      }
    ),
    {
      name: 'sessionStore',
    }
  )
);

export const useSession = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};

export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore((store) => store.isLoaded);
  return isSessionLoaded;
};

export const useSetSession = () => {
  const setSession = useSessionStore((store) => store.actions.setSession);
  return setSession;
};

export const useSaveEmail = () => {
  return useSessionStore(
    useShallow((store) => ({
      isSavedEmail: !!store.savedEmail, // 여기서 계산 (Derived)
      savedEmail: store.savedEmail,
    }))
  );
};

export const useHandleSaveEmail = () => {
  return useSessionStore(
    useShallow((store) => ({
      setSaveEmail: store.actions.setSaveEmail,
      setRemoveEmail: store.actions.setRemoveEmail,
    }))
  );
};
