import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  const mode = import.meta.env.MODE;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {mode === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
