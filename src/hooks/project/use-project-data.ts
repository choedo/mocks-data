import { QUERY_KEYS } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/api/project';

export function useProjectData(userId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.project.byId(userId!),
    queryFn: async () => await fetchProjects(userId!),
    enabled: !!userId,
  });
}
