import { useQuery } from '@tanstack/react-query';
import { getGlobalStats } from '@/lib/api';
import { mockGlobalStats } from '@/lib/mockData';
import type { ApiGlobalStats } from '@/lib/types';

export function useGlobalStats() {
  return useQuery<ApiGlobalStats>({
    queryKey: ['globalStats'],
    queryFn: getGlobalStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    placeholderData: mockGlobalStats, // Fallback pendant loading
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching global stats:', error);
      },
    },
  });
}
