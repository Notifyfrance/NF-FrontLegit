import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/api';
import { transformUserProfile } from '@/lib/types';
import type { UserProfile as FrontendUserProfile } from '@/lib/types';

export function useUserProfile(username: string) {
  return useQuery<FrontendUserProfile>({
    queryKey: ['user', username],
    queryFn: async () => {
      // Récupérer les données de l'API
      const apiProfile = await getUserProfile(username);

      // Transformer avec 100% données API
      const fullProfile = transformUserProfile(apiProfile);

      return fullProfile;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Ne pas retry si c'est une 404 (user not found)
      if (error?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
    meta: {
      onError: (error: any) => {
        if (error?.status !== 404 && import.meta.env.DEV) {
          console.error('Error fetching user profile:', error);
        }
      },
    },
  });
}
