import { createColumn } from '@/api/column';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useCreateColumn(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createColumn,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
