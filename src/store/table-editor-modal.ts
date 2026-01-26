import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

type CreateMode = {
  isOpen: true;
  type: 'CREATE';
  projectId: number;
};

type EditMode = {
  isOpen: true;
  type: 'EDIT';
  tableId: number;
  title: string;
};

type OpenState = CreateMode | EditMode;
type CloseState = {
  isOpen: false;
};

type State = OpenState | CloseState;

const initialState = {
  isOpen: false,
} as State;

const useTableEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreateMode: (projectId: number) =>
          set({ isOpen: true, type: 'CREATE', projectId }),
        openEditMode: (param: Omit<EditMode, 'isOpen' | 'type'>) =>
          set({ isOpen: true, type: 'EDIT', ...param }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: 'tableEditorModalStore' },
  ),
);

export const useOpenCreateTableModal = () => {
  const openCreateMode = useTableEditorModalStore(
    (store) => store.actions.openCreateMode,
  );
  return openCreateMode;
};

export const useOpenEditTableModal = () => {
  const openEditMode = useTableEditorModalStore(
    (store) => store.actions.openEditMode,
  );
  return openEditMode;
};

export const useTableEditorModal = () => {
  const store = useTableEditorModalStore();
  return store as typeof store & State;
};
