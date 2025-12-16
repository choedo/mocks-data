import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

const initialState = {
  isOpen: false,
};

const useSignUpModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: 'SignUpModalStore ' }
  )
);

export const useOpenSignUpModal = () => {
  const open = useSignUpModalStore((store) => store.actions.open);
  return open;
};

export const useSignUpModal = () => {
  const store = useSignUpModalStore();
  return store;
};
