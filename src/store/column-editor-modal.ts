import type { ColumnOptions, ColumnTypes } from '@/types/data';
import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

type CreateMode = {
  isOpen: true;
  mode: 'CREATE';
  tableId: number;
};

type EditMode = {
  isOpen: true;
  mode: 'EDIT';
  columnId: number;
  title: string;
  type: ColumnTypes;
  options: ColumnOptions;
  tableId: number;
};

type OpenState = CreateMode | EditMode;
type CloseState = { isOpen: false };

type State = OpenState | CloseState;

const initialState = {
  isOpen: false,
} as State;

const useColumnEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreateMode: (tableId: number) =>
          set({ isOpen: true, mode: 'CREATE', tableId }),
        openEditMode: (param: Omit<EditMode, 'isOpen' | 'mode'>) =>
          set({ isOpen: true, mode: 'EDIT', ...param }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: 'columnEditorModalStore' },
  ),
);

export const useOpenCreateColumnModal = () => {
  const openCreateMode = useColumnEditorModalStore(
    (store) => store.actions.openCreateMode,
  );
  return openCreateMode;
};

export const useOpenEditColumnModal = () => {
  const openEditMode = useColumnEditorModalStore(
    (store) => store.actions.openEditMode,
  );
  return openEditMode;
};

export const useColumnEditorModal = () => {
  const store = useColumnEditorModalStore();
  return store as typeof store & State;
};
