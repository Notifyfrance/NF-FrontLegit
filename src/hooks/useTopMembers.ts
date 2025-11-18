import { useQuery } from '@tanstack/react-query';
import { getTopMembers } from '@/lib/api';
import type { ApiTopMember } from '@/lib/types';

export function useTopMembers(limit: number = 3) {
  return useQuery<ApiTopMember[]>({
    queryKey: ['topMembers', limit],
    queryFn: () => getTopMembers(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching top members:', error);
      },
    },
  });
}
