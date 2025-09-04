import { getUserProfile } from '@/api/profile-api';
import { Profile } from '@/types/profiles.types';
import { browserClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useProfileQuery = (userId: Profile['id']) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(browserClient, userId),
    enabled: !!userId, // userId가 있을 경우에만 실행
  });
};
