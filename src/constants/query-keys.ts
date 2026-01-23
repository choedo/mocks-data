export const QUERY_KEYS = {
  profile: {
    all: ['profile'],
    list: ['profile', 'list'],
    byId: (userId: string) => ['profile', 'byId', userId],
  },
  project: {
    all: ['project'],
    list: (userId: string) => ['project', 'list', userId],
    byId: (projectId: number) => ['project', 'byId', projectId],
    duplicate: ({
      userId,
      project_name,
    }: {
      userId: string;
      project_name: string;
    }) => ['project', 'duplicate', userId, project_name],
  },
};
