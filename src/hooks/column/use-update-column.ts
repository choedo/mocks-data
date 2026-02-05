import { updateColumn } from '@/api/column';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import type { ColumnEntity, TableAndColumn } from '@/types/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateColumn(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateColumn,
    onSuccess: (updatedColumn: ColumnEntity & { project_id: number }) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      const { project_id, ...rest } = updatedColumn;

      const projectTableData = queryClient.getQueryData<TableAndColumn[]>(
        QUERY_KEYS.table.list(project_id),
      );

      const newProjectTableData = projectTableData?.map((tableData) => {
        if (tableData.table_id !== rest.table_id) return tableData;
        else
          return {
            ...tableData,
            columns: tableData.columns.map((tableColumn) => {
              if (tableColumn.column_id !== rest.column_id) return tableColumn;
              else
                return {
                  ...tableColumn,
                  ...rest,
                };
            }),
          };
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
