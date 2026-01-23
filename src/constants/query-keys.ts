export const QUERY_KEYS = {
  profile: {
    all: ['profile'],
    list: ['profile', 'list'],
    byId: (userId: string) => ['profile', 'byId', userId],
  },
  project: {
    all: ['project'],
    list: ['project', 'list'],
    byId: (userId: string) => ['project', 'byId', userId],
  },
};
