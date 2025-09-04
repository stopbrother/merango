import {
  getJoinedParties,
  getPartyMembers,
  hasJoinedParty,
} from '@/api/member-api';
import { PartyMember } from '@/types/parties.types';
import { Profile } from '@/types/profiles.types';
import { browserClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

// 파티 멤버 목록  TODO: id -> party_id
export const usePartyMembersQuery = (partyId: PartyMember['party_id']) => {
  return useQuery({
    queryKey: ['members', partyId],
    queryFn: () => getPartyMembers(browserClient, partyId),
  });
};

// 파티의 참가 상태
export const useHasJoinedPartyQuery = (
  partyId: PartyMember['party_id'],
  userId: PartyMember['profile_id']
) => {
  return useQuery({
    queryKey: ['isJoined', partyId, userId],
    queryFn: () => hasJoinedParty(browserClient, partyId, userId),
    enabled: !!partyId && !!userId, // 두 값이 유효할때만 실행
  });
};

// 참가중인 파티
export const useJoinedPartiesQuery = (userId: Profile['id']) => {
  return useQuery({
    queryKey: ['joinedParties', userId],
    queryFn: () => getJoinedParties(browserClient, userId),
  });
};
