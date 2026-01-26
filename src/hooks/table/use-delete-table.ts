import { deleteTable } from '@/api/table';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useDeleteeTable(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteTable,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
