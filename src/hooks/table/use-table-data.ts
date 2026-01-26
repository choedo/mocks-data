import { fetchTables } from '@/api/table';
import { QUERY_KEYS } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

export function useTableData(projectId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.table.list(projectId),
    queryFn: () => fetchTables(projectId),
    enabled: !!projectId,
  });
}
