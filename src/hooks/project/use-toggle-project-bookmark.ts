import { toggleProjectBookmark } from '@/api/project';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import type { ProjectEntity } from '@/types/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useToggleProjectBookmark(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleProjectBookmark,
    onMutate: async ({ projectId, current }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.project.byId(projectId),
      });

      const prevProject = queryClient.getQueryData<ProjectEntity>(
        QUERY_KEYS.project.byId(projectId)
      );

      queryClient.setQueryData<ProjectEntity>(
        QUERY_KEYS.project.byId(projectId),
        (project) => {
          if (!project) throw new Error('캐싱된 프로젝트가 존재하지 않습니다.');
          return {
            ...project,
            is_bookmark: !current,
          };
        }
      );

      return { prevProject };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      if (context && context.prevProject) {
        queryClient.setQueryData(
          QUERY_KEYS.project.byId(context.prevProject.project_id),
          context.prevProject
        );
      }

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
