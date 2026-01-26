import { deleteColumn } from '@/api/column';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useDeleteColumn(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteColumn,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
