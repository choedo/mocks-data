import React from 'react';
import { useTableData } from '@/hooks/table/use-table-data';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { useOpenCreateTableModal } from '@/store/table-editor-modal';
import { Skeleton } from '@/components/ui/skeleton';
import Empty from '@/components/empty';
import TableListItem from '@/components/table/table-list-item';
import { useLanguage } from '@/store/translation';
import { ContentMessages } from '@/languages/content-messages';

type Props = {
  projectId: number;
};

export default function TableList({ projectId }: Props) {
  const language = useLanguage();
  const { data: tableData, isLoading: isTableDataLoading } =
    useTableData(projectId);

  const openCreateMode = useOpenCreateTableModal();

  const isLoading = isTableDataLoading;

  if (!tableData) return;

  return (
    <div className={'flex flex-col gap-4'}>
      {isLoading && <LoadingSpinner />}
      <div className={'flex justify-between items-center'}>
        <h4 className={'text-lg font-medium'}>
          {ContentMessages.PROJECT_DETAIL_TABLE_LIST_TITLE[language]}
        </h4>
        <Button
          variant={'ghost'}
          className={'cursor-pointer'}
          onClick={() => openCreateMode(projectId)}
        >
          <PlusCircleIcon />
        </Button>
      </div>
      <div className={'flex flex-col gap-2'}>
        {isLoading ? (
          <React.Fragment>
            <Skeleton className={'h-12'} />
            <Skeleton className={'h-12'} />
            <Skeleton className={'h-12'} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {!tableData.length ? (
              <Empty
                actions={[
                  {
                    title: ContentMessages.CREATE_NEW_TABLE_BUTTON[language],
                    action: () => openCreateMode(projectId),
                  },
                ]}
                description={ContentMessages.NO_DATA[language]}
              />
            ) : (
              tableData.map((table) => (
                <TableListItem key={`table-${table.table_id}`} {...table} />
              ))
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
