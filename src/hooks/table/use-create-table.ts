import { createTable } from '@/api/table';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import type { TableAndColumn } from '@/types/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTable(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTable,
    onSuccess: (newTable) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<TableAndColumn[]>(
        QUERY_KEYS.table.list(newTable.project_id),
        (prevTables) => {
          if (!prevTables)
            throw new Error('테이블 데이터가 존재하지 않습니다.');

          return [...prevTables, newTable];
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
