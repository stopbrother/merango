import { getCreatedParties, getParties } from '@/api/party-api';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

// 구인글(파티) 리스트 조회
export const usePartiesQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['recruits'],
    queryFn: () => getParties(browserClient),
  });
};

// 생성한 구인글(파티) 조회
export const useCreatedPartiesQuery = (userId: string) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['createdParties', userId],
    queryFn: () => getCreatedParties(browserClient, userId),
  });
};
