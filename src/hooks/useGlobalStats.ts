import { useQuery } from '@tanstack/react-query';
import { getGlobalStats } from '@/lib/api';
import type { ApiGlobalStats } from '@/lib/types';

export function useGlobalStats() {
  return useQuery<ApiGlobalStats>({
    queryKey: ['globalStats'],
    queryFn: getGlobalStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    meta: {
      onError: (error: Error) => {
        if (import.meta.env.DEV) {
          console.error('Error fetching global stats:', error);
        }
      },
    },
  });
}
