import type { MockDataType } from '@/types/data';
import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

type MocksValue = Record<MockDataType, string>;
type CloseState = { isOpen: false };
type OpenState = { isOpen: true; mocks: MocksValue };

type State = CloseState | OpenState;

const initialState = { isOpen: false } as State;

const useMockResultStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (mocks: MocksValue) => {
          set({
            mocks,
            isOpen: true,
          });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: 'MockResultModalStore' },
  ),
);

export const useOpenMockResultModal = () => {
  const open = useMockResultStore((store) => store.actions.open);
  return open;
};

export const useMockResultModal = () => {
  const store = useMockResultStore();
  return store as typeof store & State;
};
