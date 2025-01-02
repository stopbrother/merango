import { PartyMemberWithProfile } from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { createClient } from '@/utils/supabase/client';

export const addMember = async (partyId: string) => {
  const client = createClient();

  const { error } = await client
    .from('party_member')
    .insert({ party_id: partyId });

  if (error) throw new Error(error.message);
};

export const getMembers = async (client: SupabaseDataBase, PartyId: string) => {
  const { data, error } = await client
    .from('party_member')
    .select('*, profile_id(*)')
    .eq('party_id', PartyId)
    .returns<PartyMemberWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

export const isMember = async (
  client: SupabaseDataBase,
  partyId: string,
  profileId: string
) => {
  const { data, error } = await client
    .from('party_member')
    .select()
    .eq('party_id', partyId)
    .eq('profile_id', profileId);

  if (error) throw new Error(error.message);

  return data;
};
