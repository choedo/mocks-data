import { QUERY_KEYS } from '@/constants/query-keys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProjects } from '@/api/project';

export function useProjectData(userId?: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.project.list(userId!),
    queryFn: async () => {
      const projects = await fetchProjects(userId!);

      projects.forEach((project) => {
        queryClient.setQueryData(
          QUERY_KEYS.project.byId(project.project_id),
          project
        );
      });

      return projects.map((project) => project.project_id);
    },
    enabled: !!userId,
  });
}
