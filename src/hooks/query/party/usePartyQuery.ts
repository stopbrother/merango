import {
  getCreatedParties,
  getCreatedPartiesCount,
  getInfiniteParties,
  getParties,
} from '@/api/party-api';
import { browserClient } from '@/utils/supabase/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// 구인글(파티) 리스트 조회
export const usePartiesQuery = (partyType: string, keyword?: string) => {
  return useQuery({
    queryKey: ['recruits', partyType, keyword],
    queryFn: () => getParties(browserClient, partyType, keyword),
  });
};

// 생성한 구인글(파티) 조회
export const useCreatedPartiesQuery = (userId: string) => {
  return useQuery({
    queryKey: ['createdParties', userId],
    queryFn: () => getCreatedParties(browserClient, userId),
  });
};

// 생성한 구인글(파티) 개수조회 (count)
export const useCreatedPartiesCountQuery = (userId: string) => {
  return useQuery({
    queryKey: ['createdParties', 'count', userId],
    queryFn: () => getCreatedPartiesCount(browserClient, userId),
  });
};

// 구인글(파티) 리스트 조회 (무한스크롤)
export const useInfinitePartiesQuery = (
  partyType: string,
  keyword?: string
) => {
  return useInfiniteQuery({
    queryKey: ['recruits', partyType, keyword],
    queryFn: ({ pageParam }) =>
      getInfiniteParties({
        client: browserClient,
        partyType,
        keyword,
        cursor: pageParam,
        limit: 15,
      }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });
};
