'use client';
import { browserClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const usePartyMembersRealtime = (partyId: string, isModal: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!partyId || !isModal) return;

    const membersChannel = browserClient
      .channel(`party:${partyId}:members`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'party_member',
          filter: `party_id=eq.${partyId}`,
        },
        () => queryClient.invalidateQueries({ queryKey: ['members', partyId] })
      )
      .subscribe();

    return () => {
      browserClient.removeChannel(membersChannel);
    };
  }, [partyId, isModal, queryClient]);
};
