import { QUERY_KEYS } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { duplicateCheckProjectName } from '@/api/project';

export function useDuplicateCheckProjectName({
  userId,
  project_name,
}: {
  userId: string;
  project_name: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.project.duplicate({ userId, project_name }),
    queryFn: async () =>
      await duplicateCheckProjectName({ userId, project_name }),
    enabled: false,
  });
}
