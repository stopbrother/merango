import { getCurrentUser } from '@/api/auth-api';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useAuthQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(browserClient),
  });
};
