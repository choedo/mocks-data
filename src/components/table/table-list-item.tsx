import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { ColumnOptions, ColumnTypes, TableAndColumn } from '@/types/data';
import { Button } from '@/components/ui/button';
import {
  ChevronDownIcon,
  Edit2Icon,
  PlusCircleIcon,
  SettingsIcon,
  TrashIcon,
} from 'lucide-react';
import { useOpenEditTableModal } from '@/store/table-editor-modal';
import { useOpenAlertModal } from '@/store/alert-modal';
import { useDeleteTable } from '@/hooks/table/use-delete-table';
import toastMessage from '@/lib/toast-message';
import Empty from '@/components/empty';
import {
  useOpenCreateColumnModal,
  useOpenEditColumnModal,
} from '@/store/column-editor-modal';
import { Kbd } from '@/components/ui/kbd';
import { COLUMN_TYPES } from '@/constants/column';

import ConfirmProduceMockDataModal from '@/components/table/confirm-produce-mock-data-modal';

type Props = {} & TableAndColumn;

export default function TableListItem(props: Props) {
  const openEditTableMode = useOpenEditTableModal();
  const open = useOpenAlertModal();
  const openCreateColumnMode = useOpenCreateColumnModal();
  const openEditColumnMode = useOpenEditColumnModal();

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

  const [isOpen, setIsOpen] = React.useState(false);

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

    openEditTableMode({ tableId: props.table_id, title: props.table_name });
  };

  const isPending = isDeleteTablePending;

  return (
    <Card className={'w-full'}>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
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
              <div className={'flex items-center gap-4'}>
                <ConfirmProduceMockDataModal
                  columns={props.columns}
                  tableName={props.table_name}
                />

                <ChevronDownIcon
                  className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-rotate duration-300`}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className={'mt-4'}>
            {!props.columns.length ? (
              <Empty
                description={'No Columns'}
                actions={[
                  {
                    title: 'Create a new column',
                    action: () => openCreateColumnMode(props.table_id),
                  },
                ]}
              />
            ) : (
              <div className={'flex flex-col items-center gap-8'}>
                <div className={'flex flex-col gap-2 w-full'}>
                  {props.columns.map((column) => (
                    <div
                      key={`column-${props.table_id}-${column.column_id}`}
                      className={
                        'border w-full py-2 px-1 flex justify-between items-center'
                      }
                    >
                      <div className={'flex items-center gap-2'}>
                        <h4 className={'text-md font-bold'}>
                          {column.column_name}
                        </h4>
                        <Kbd>
                          {
                            COLUMN_TYPES[column.column_type as ColumnTypes]
                              .title
                          }
                        </Kbd>
                      </div>
                      <Button
                        variant={'outline'}
                        size={'icon'}
                        className={'cursor-pointer'}
                        onClick={() =>
                          openEditColumnMode({
                            columnId: column.column_id,
                            title: column.column_name,
                            type: column.column_type as ColumnTypes,
                            options: column.column_values as ColumnOptions,
                            tableId: column.table_id,
                          })
                        }
                      >
                        <SettingsIcon />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant={'secondary'}
                  className={'cursor-pointer'}
                  onClick={() => openCreateColumnMode(props.table_id)}
                >
                  <PlusCircleIcon />
                  Add Column
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
