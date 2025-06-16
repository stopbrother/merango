import { getUserProfile } from '@/api/profile-api';
import { Profile } from '@/types/profiles.types';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useProfileQuery = (userId: Profile['id']) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(browserClient, userId),
    enabled: !!userId,
  });
};
