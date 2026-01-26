import { updateProject } from '@/api/project';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import type { ProjectEntity } from '@/types/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateProject(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (newProject) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<ProjectEntity>(
        QUERY_KEYS.project.byId(newProject.project_id),
        newProject,
      );
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
