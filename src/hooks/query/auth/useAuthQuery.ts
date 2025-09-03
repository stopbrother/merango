import { getCurrentUser } from '@/api/auth-api';
import { browserClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(browserClient),
  });
};
