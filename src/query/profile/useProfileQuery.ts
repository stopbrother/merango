import { getCurrentUser } from '@/api/profile-api';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUserQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(browserClient),
  });
};
