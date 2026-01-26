import { fetchProjectById } from '@/api/project';
import { QUERY_KEYS } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

export function useProjectByIdData(projectId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.project.byId(projectId),
    queryFn: () => fetchProjectById(projectId),
    enabled: !!projectId,
  });
}
