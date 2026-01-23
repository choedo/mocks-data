import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

const initialState = {
  isOpen: false,
};

const useProjectEditorModalStore = create(
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
    { name: 'ProjectEditorModalStore ' }
  )
);

export const useOpenProjectEditorModal = () => {
  const open = useProjectEditorModalStore((store) => store.actions.open);
  return open;
};

export const useProjectEditorModal = () => {
  const store = useProjectEditorModalStore();
  return store;
};
