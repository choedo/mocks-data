import { createProject } from '@/api/project';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { UseMutationCallback } from '@/types/callbacks';
import type { ProjectEntity } from '@/types/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProject(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<number[]>(
        QUERY_KEYS.project.list(newProject.author_id),
        (projectIds) => {
          if (!projectIds)
            throw new Error('캐시 데이터에 저장된 데이터가 없습니다.');

          if (!newProject) throw new Error('프로젝트 정보를 찾을 수 없습니다.');

          return [...projectIds, newProject.project_id];
        }
      );
      queryClient.setQueryData<ProjectEntity>(
        QUERY_KEYS.project.byId(newProject.project_id),
        newProject
      );
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
