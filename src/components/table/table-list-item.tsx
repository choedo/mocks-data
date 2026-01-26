import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { TableAndColumn } from '@/types/data';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, Edit2Icon, TrashIcon } from 'lucide-react';
import { useOpenEditTableModal } from '@/store/table-editor-modal';
import { useOpenAlertModal } from '@/store/alert-modal';
import { useDeleteTable } from '@/hooks/table/use-delete-table';
import toastMessage from '@/lib/toastMessage';

type Props = {} & TableAndColumn;

export default function TableListItem(props: Props) {
  const openEditMode = useOpenEditTableModal();
  const open = useOpenAlertModal();

  const { mutate: deleteTable, isPending: isDeleteTablePending } =
    useDeleteTable({
      onSuccess: () => {
        toastMessage.success('Successfully!');
      },
      onError: (error) => {
        const message = error.message || 'Error';
        toastMessage.error(message);
      },
    });

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    open({
      title: 'Warning',
      description:
        'Are you sure you want to delete it?\nIt cannot be recovered after deleting it.',
      onPositive: () => deleteTable(props.table_id),
    });
  };

  const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openEditMode({ tableId: props.table_id, title: props.table_name });
  };

  const isPending = isDeleteTablePending;

  return (
    <Card className={'w-full'}>
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className={'flex justify-between items-center'}>
              <div className={'flex gap-6 items-center'}>
                <h4 className={'text-md'}>{props.table_name}</h4>
                <div className={'flex gap-1'}>
                  <Button
                    variant={'destructive'}
                    size={'icon-sm'}
                    className={'cursor-pointer'}
                    onClick={handleDeleteClick}
                    disabled={isPending}
                  >
                    <TrashIcon />
                  </Button>
                  <Button
                    variant={'outline'}
                    size={'icon-sm'}
                    className={'cursor-pointer'}
                    onClick={handleUpdateClick}
                    disabled={isPending}
                  >
                    <Edit2Icon />
                  </Button>
                </div>
              </div>
              <ChevronDownIcon />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className={'mt-4'}>
            asdfasdfasdfasdgasdg
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
