import { getMembers, getRecruits } from '@/api/party-api';
import { PartyMember } from '@/types/parties.types';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useRecruitQuery = () => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['recruits'],
    queryFn: () => getRecruits(browserClient),
  });
};

export const useMemberQuery = (id: PartyMember['party_id']) => {
  const browserClient = createClient();

  return useQuery({
    queryKey: ['members', id],
    queryFn: () => getMembers(browserClient, id),
  });
};
