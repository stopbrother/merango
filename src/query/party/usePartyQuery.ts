import { getRecruits } from '@/api/party-api';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useRecruitQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['recruits'],
    queryFn: () => getRecruits(browserClient),
  });
};
