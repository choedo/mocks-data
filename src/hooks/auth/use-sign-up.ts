import { signUp } from '@/api/auth';
import type { UseMutationCallback } from '@/types/callbacks';
import type { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

export function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error: AuthError) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
