'use client';
import { browserClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuthQuery } from '../query/auth/useAuthQuery';

export const usePartyRecruitRealtime = (partyType: string, keyword: string) => {
  const [newPostCnt, setNewPostCnt] = useState(0);

  const { data: user } = useAuthQuery();
  const userId = user?.id;

  // const supabase = createClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    // 검색에선 구독 안함
    if (keyword !== '') return;

    const recruitsChannel = browserClient
      .channel(`recruits:${partyType}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'party_recruit',
          ...(partyType !== 'all'
            ? { filter: `party_type=eq.${partyType}` }
            : {}),
        },
        (payload) => {
          // 추가된 행
          const row = payload.new;

          // 작성자 본인이면 스킵
          if (userId === row.created_by) return;

          setNewPostCnt((n) => n + 1);
        }
        // TODO: 필요시 partyType 이중체크 (안전성)
      )
      .subscribe();

    // 언마운트시 구독해지
    return () => {
      browserClient.removeChannel(recruitsChannel);
    };
  }, [partyType, keyword, userId]);

  const refresh = () => {
    setNewPostCnt(0);

    // 쿼리갱신
    queryClient.invalidateQueries({
      queryKey: ['recruits', partyType, keyword],
    });
  };

  return { newPostCnt, refresh };
};
