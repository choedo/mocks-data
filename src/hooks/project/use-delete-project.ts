import { deleteProject } from '@/api/project';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteProject(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (deletedProject) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.project.byId(deletedProject.project_id),
      });

      const projectIds = queryClient.getQueryData<number[]>(
        QUERY_KEYS.project.all,
      );
      if (projectIds) {
        const updatedProjectIds = projectIds.filter(
          (id) => id !== deletedProject.project_id,
        );
        queryClient.setQueryData(QUERY_KEYS.project.all, updatedProjectIds);
      }

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
