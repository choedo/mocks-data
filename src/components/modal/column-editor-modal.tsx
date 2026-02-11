import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useColumnEditorModal } from '@/store/column-editor-modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COLUMN_TYPES } from '@/constants/column';
import ColumnOptionSelector from '@/components/column/column-option-selector';
import type { ColumnOptions, ColumnTypes } from '@/types/data';
import { useCreateColumn } from '@/hooks/column/use-create-column';
import { useUpdateColumn } from '@/hooks/column/use-update-column';
import toastMessage from '@/lib/toast-message';
import { Button } from '@/components/ui/button';
import { columnValidateCheck } from '@/lib/column-validate-check';
import {
  duplicateCheckColumnName,
  duplicateCheckPrimaryColumn,
} from '@/api/column';
import { useDeleteColumn } from '@/hooks/column/use-delete-column';
import { useOpenAlertModal } from '@/store/alert-modal';

export default function ColumnEditorModal() {
  const columnEditModal = useColumnEditorModal();
  const openAlert = useOpenAlertModal();

  const { mutate: createColumn, isPending: isCreateColumnPending } =
    useCreateColumn({
      onSuccess: () => {
        toastMessage.success('Successfully');

        columnEditModal.actions.close();
      },
      onError: (error) => {
        const message = error.message || 'Error';
        toastMessage.error(message);
      },
    });
  const { mutate: updateColumn, isPending: isUpdateColumnPending } =
    useUpdateColumn({
      onSuccess: () => {
        toastMessage.success('Successfully');

        columnEditModal.actions.close();
      },
      onError: (error) => {
        const message = error.message || 'Error';
        toastMessage.error(message);
      },
    });
  const { mutate: deleteColumn, isPending: isDeleteColumnPending } =
    useDeleteColumn({
      onSuccess: () => {
        toastMessage.success('Successfully');

        columnEditModal.actions.close();
      },
      onError: (error) => {
        const message = error.message || 'Error';
        toastMessage.error(message);
      },
    });

  const titleRef = React.useRef<HTMLInputElement>(null);
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState<ColumnTypes | ''>('');
  const [options, setOptions] = React.useState<ColumnOptions>({
    type: 'pk',
    valueType: 'uuid',
  });

  const handleSubmitClick = async () => {
    if (!columnEditModal.isOpen) return;

    if (title.trim() === '') {
      toastMessage.info('Please Enter a new column name');
      return;
    }

    // Primary key 중복 체크
    if (columnEditModal.mode === 'CREATE' && type === 'pk') {
      const duplicatePrimaryKeyCheck = await duplicateCheckPrimaryColumn(
        columnEditModal.tableId,
      );

      if (!duplicatePrimaryKeyCheck) {
        toastMessage.info('Primary key must be unique.');
        return;
      }
    }

    // 컬럼명 중복 체크
    const duplicateNameCheck = await duplicateCheckColumnName({
      tableId: columnEditModal.tableId,
      title: title,
    });

    if (!duplicateNameCheck) {
      toastMessage.info('Column name must be unique.');
      return;
    }

    const validateCheck = columnValidateCheck(options);
    if (validateCheck.status === 'Fail') {
      toastMessage.info(validateCheck.message);
      return;
    } else {
      if (columnEditModal.mode === 'CREATE') {
        createColumn({
          column_name: title,
          column_type: type,
          column_values: validateCheck.data,
          table_id: columnEditModal.tableId,
        });
      } else {
        updateColumn({
          column_id: columnEditModal.columnId,
          column_name: title,
          column_type: type,
          column_values: validateCheck.data,
        });
      }
    }
  };

  const handleDeleteClick = () => {
    if (!columnEditModal.isOpen || columnEditModal.mode === 'CREATE') return;

    openAlert({
      title: 'Warning',
      description:
        'Are you sure you want to delete it?\nIt cannot be recovered after deleting it.',
      onPositive: () => deleteColumn(columnEditModal.columnId),
    });
  };

  React.useEffect(() => {
    if (columnEditModal.isOpen) {
      const mode = columnEditModal.mode;

      if (mode === 'EDIT') {
        setTitle(columnEditModal.title);
        setType(columnEditModal.type);
        setOptions(columnEditModal.options);
      }
    }

    return () => {
      setTitle('');
      setType('');
    };
  }, [columnEditModal]);

  if (!columnEditModal.isOpen) return;

  const isPending =
    isCreateColumnPending || isUpdateColumnPending || isDeleteColumnPending;

  return (
    <Dialog
      open={columnEditModal.isOpen}
      onOpenChange={columnEditModal.actions.close}
    >
      <DialogContent>
        <DialogTitle>
          {columnEditModal.mode === 'CREATE'
            ? 'Create a New Column'
            : 'Modifying the Column'}
        </DialogTitle>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor={'title'}>Column Name</Label>
            <Input
              ref={titleRef}
              id={'title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                columnEditModal.mode === 'CREATE'
                  ? 'Please enter a new column name'
                  : columnEditModal.title
              }
              disabled={isPending}
            />
          </div>
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor={'description'}>Column Type</Label>
            <Select
              disabled={isPending}
              value={type}
              onValueChange={(value: ColumnTypes) => setType(value)}
            >
              <SelectTrigger className={'w-full'}>
                <SelectValue placeholder={'Select a type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(COLUMN_TYPES).map((item, index) => (
                    <SelectItem
                      key={`select-item-${item.value}-${index}`}
                      value={item.value}
                    >
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {type !== '' ? (
            <ColumnOptionSelector
              type={type}
              onChange={(selected) => setOptions(selected)}
              disabled={isPending}
            />
          ) : null}
        </div>
        <div className={'flex justify-center items-center gap-2'}>
          {columnEditModal.mode === 'EDIT' ? (
            <Button
              variant={'destructive'}
              disabled={isPending}
              className={'cursor-pointer'}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          ) : null}
          <Button
            disabled={isPending}
            className={'cursor-pointer'}
            onClick={handleSubmitClick}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
