import { deleteTable } from '@/api/table';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import type { TableAndColumn } from '@/types/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteTable(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTable,
    onSuccess: (deletedTable) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<TableAndColumn[]>(
        QUERY_KEYS.table.list(deletedTable.project_id),
        (prevTables) => {
          if (!prevTables) throw new Error('테이블 데이터를 찾을 수 없습니다.');

          return prevTables.filter(
            (table) => table.table_id !== deletedTable.table_id,
          );
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
