import { signUp } from '@/api/auth';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error: Error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
