import React from 'react';
import { useCreateTable } from '@/hooks/table/use-create-table';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useTableEditorModal } from '@/store/table-editor-modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toastMessage from '@/lib/toast-message';
import { useUpdateTable } from '@/hooks/table/use-update-table';

export default function TableEditorModal() {
  const tableEditModal = useTableEditorModal();

  const { mutate: createTable, isPending: isCreateTablePending } =
    useCreateTable({
      onSuccess: () => {
        toastMessage.success('Table created successfully');
        tableEditModal.actions.close();
      },
      onError: (error) => {
        const message = error.message;
        toastMessage.error(message);
      },
    });
  const { mutate: updateTable, isPending: isUpdateTablePending } =
    useUpdateTable({
      onSuccess: () => {
        toastMessage.success('Table updated successfully');
        tableEditModal.actions.close();
      },
      onError: (error) => {
        const message = error.message;
        toastMessage.error(message);
      },
    });

  const titleRef = React.useRef<HTMLInputElement>(null);
  const [title, setTitle] = React.useState('');

  const handleSubmitClick = () => {
    if (!tableEditModal.isOpen) return;

    if (title.trim() === '') {
      toastMessage.info('Please enter a new table name');
      return;
    }

    if (tableEditModal.mode === 'CREATE')
      createTable({ table_name: title, project_id: tableEditModal.projectId });
    else updateTable({ table_id: tableEditModal.tableId, table_name: title });
  };

  React.useEffect(() => {
    if (tableEditModal.isOpen && tableEditModal.mode === 'EDIT') {
      setTitle(tableEditModal.title);
    }

    return () => {
      setTitle('');
    };
  }, [tableEditModal]);

  const isPending = isCreateTablePending || isUpdateTablePending;

  if (!tableEditModal.isOpen) return;

  return (
    <Dialog
      open={tableEditModal.isOpen}
      onOpenChange={tableEditModal.actions.close}
    >
      <DialogContent>
        <DialogTitle>
          {tableEditModal.mode === 'CREATE'
            ? 'Create a New Table'
            : 'Modifying the Table'}
        </DialogTitle>
        <div className={'flex flex-col gap-2'}>
          <Label htmlFor={'title'}>Table Name</Label>
          <Input
            ref={titleRef}
            id={'title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              tableEditModal.mode === 'CREATE'
                ? 'Please enter a new table name'
                : tableEditModal.title
            }
            disabled={isPending}
          />
        </div>
        <Button
          onClick={handleSubmitClick}
          disabled={isPending}
          className={'cursor-pointer'}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
