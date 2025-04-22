import {
  PartyMemberWithProfile,
  RecruitWithProfile,
} from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { createClient } from '@/utils/supabase/client';

// 파티 멤버

// api - 참가 신청
export const addMember = async (partyId: string) => {
  const client = createClient();

  const { error } = await client
    .from('party_member')
    .insert({ party_id: partyId });

  if (error) throw new Error(error.message);
};

// api - 참가중인 멤버
export const getMembers = async (client: SupabaseDataBase, PartyId: string) => {
  const { data, error } = await client
    .from('party_member')
    .select('*, profile_id(*)')
    .eq('party_id', PartyId)
    .returns<PartyMemberWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 참가 신청한 파티인지 확인
export const isMember = async (
  client: SupabaseDataBase,
  partyId: string,
  profileId: string
) => {
  // console.log('실행됨', { partyId, profileId });
  const { data, error } = await client
    .from('party_member')
    .select()
    .eq('party_id', partyId)
    .eq('profile_id', profileId);

  if (error) throw new Error(error.message);

  return data.length > 0;
};

// api - 참가중인 파티 조회
export const getJoinedParties = async (
  client: SupabaseDataBase,
  userId: string
) => {
  const { data, error } = await client
    .from('party_member')
    .select('party_id(*, created_by(*))')
    .eq('profile_id', userId)
    .order('joined_date_time', { ascending: false })
    .returns<{ party_id: RecruitWithProfile }[]>();

  if (error) throw new Error(error.message);

  return data.map((item) => item.party_id);
};
