import { updateTable } from '@/api/table';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useUpdateTable(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updateTable,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
