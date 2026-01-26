import { updateColumn } from '@/api/column';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useUpdateColumn(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updateColumn,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
