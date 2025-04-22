import { getJoinedParties, getMembers, isMember } from '@/api/member-api';
import { PartyMember } from '@/types/parties.types';
import { Profile } from '@/types/profiles.types';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

// 파티에 참가중인 멤버 조회 TODO: id -> party_id
export const useMembersQuery = (id: PartyMember['party_id']) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['members', id],
    queryFn: () => getMembers(browserClient, id),
  });
};

// 파티의 참가 상태
export const useIsMemberQuery = (
  partyId: PartyMember['party_id'],
  profileId: PartyMember['profile_id']
) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['member', partyId, profileId],
    queryFn: () => isMember(browserClient, partyId, profileId),
    enabled: !!partyId && !!profileId, // 두 값이 유효할때만 실행
  });
};

// 참가중인 파티
export const useJoinedPartiesQuery = (userId: Profile['id']) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['joinedParties', userId],
    queryFn: () => getJoinedParties(browserClient, userId),
  });
};
