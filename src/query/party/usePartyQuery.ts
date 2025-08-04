import {
  getCreatedParties,
  getCreatedPartiesCount,
  getParties,
} from '@/api/party-api';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

// 구인글(파티) 리스트 조회
export const usePartiesQuery = (partyType: string, keyword?: string) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['recruits', partyType, keyword],
    queryFn: () => getParties(browserClient, partyType, keyword),
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

// 생성한 구인글(파티) 개수조회 (count)
export const useCreatedPartiesCountQuery = (userId: string) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['createdParties', 'count', userId],
    queryFn: () => getCreatedPartiesCount(browserClient, userId),
  });
};
