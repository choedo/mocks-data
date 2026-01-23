import { createProject } from '@/api/project';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useCreateProject(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
