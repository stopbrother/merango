import { getMembers, isMember } from '@/api/member-api';
import { PartyMember } from '@/types/parties.types';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useMembersQuery = (id: PartyMember['party_id']) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['members', id],
    queryFn: () => getMembers(browserClient, id),
  });
};

export const useIsMemberQuery = (
  partyId: PartyMember['party_id'],
  profileId: PartyMember['profile_id']
) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['member', partyId, profileId],
    queryFn: () => isMember(browserClient, partyId, partyId),
    enabled: !!partyId && !!profileId, // 두 값이 유효할때만 실행
  });
};
