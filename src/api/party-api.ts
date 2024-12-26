import {
  PartyMemberWithProfile,
  RecruitForm,
  RecruitWithProfile,
} from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { createClient } from '@/utils/supabase/client';

// 구인 API

export const addRecruit = async (formData: RecruitForm) => {
  const client = createClient();

  const { data: recruitData, error } = await client
    .from('party_recruit')
    .insert(formData)
    .select();

  if (error) throw new Error(error.message);

  const { error: partyMemberError } = await client.from('party_member').insert({
    party_id: recruitData[0].id,
    profile_id: recruitData[0].created_by,
  });

  if (partyMemberError) throw new Error(partyMemberError.message);

  return recruitData;
};

export const getRecruits = async (client: SupabaseDataBase) => {
  const { data, error } = await client
    .from('party_recruit')
    .select(`*, created_by(*)`)
    .returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// 참가자 API
export const getMembers = async (client: SupabaseDataBase, PartyId: string) => {
  const { data, error } = await client
    .from('party_member')
    .select('*, profile_id(*)')
    .eq('party_id', PartyId)
    .returns<PartyMemberWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};
