import { signInWithPassword } from '@/api/auth';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation } from '@tanstack/react-query';

export function useSignInWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
