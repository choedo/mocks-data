import { createColumn } from '@/api/column';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import type { ColumnEntity, TableAndColumn } from '@/types/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateColumn(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createColumn,
    onSuccess: (newColumn: ColumnEntity & { project_id: number }) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      const { project_id, ...rest } = newColumn;
      const projectTableData = queryClient.getQueryData<TableAndColumn[]>(
        QUERY_KEYS.table.list(project_id),
      );

      const newProjectTableData = projectTableData?.map((tableData) => {
        if (tableData.table_id !== rest.table_id) return tableData;
        else return { ...tableData, columns: [...tableData.columns, rest] };
      });

      queryClient.setQueryData(
        QUERY_KEYS.table.list(project_id),
        newProjectTableData,
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
