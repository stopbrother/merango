import {
  PartyMemberWithProfile,
  RecruitWithProfile,
} from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { browserClient } from '@/utils/supabase/client';

// 파티 참가

// api - 참가 신청
export const requestJoinParty = async (partyId: string) => {
  // 현재 참가자 수 조회(6명 제한)
  const { count, error: countError } = await browserClient
    .from('party_member')
    .select('*', { count: 'exact', head: true })
    .eq('party_id', partyId);

  if ((count ?? 0) >= 6) throw new Error(countError?.message);

  // 참가자 테이블에 데이터 삽입
  const { error } = await browserClient
    .from('party_member')
    .insert({ party_id: partyId });

  if (error) throw new Error(error.message);
};

// api - 참가자 본인: 참가신청 취소, 파티장: 추방
export const removePartyMember = async (partyId: string, userId: string) => {
  const { error } = await browserClient
    .from('party_member')
    .delete()
    .eq('party_id', partyId)
    .eq('profile_id', userId);

  if (error) throw new Error(error.message);
};

// api - 참가자 조회
export const getPartyMembers = async (
  client: SupabaseDataBase,
  PartyId: string
) => {
  const { data, error } = await client
    .from('party_member')
    .select('*, profile_id(*)')
    .eq('party_id', PartyId)
    .returns<PartyMemberWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 참가 신청한 파티인지 확인
export const hasJoinedParty = async (
  client: SupabaseDataBase,
  partyId: string,
  profileId: string
) => {
  // console.log('실행됨', { partyId, profileId });
  const { data, error } = await client
    .from('party_member')
    .select('id')
    .eq('party_id', partyId)
    .eq('profile_id', profileId);

  if (error) throw new Error(error.message);

  return data.length > 0;
};

// api - 참가중인 파티 목록 조회
/* 본인이 만든 파티는 제외하기 위하여 inner join추가
   → inner: 양쪽이 일치하는 행만 반환
   왼쪽=party_member, 오른쪽=party_recruit
*/

export const getJoinedParties = async (
  client: SupabaseDataBase,
  userId: string
) => {
  const { data, error } = await client
    .from('party_member')
    .select('party_id!inner(*, created_by(*))')
    .eq('profile_id', userId)
    .neq('party_id.created_by', userId)
    .order('joined_date_time', { ascending: false })
    .returns<{ party_id: RecruitWithProfile }[]>();

  if (error) throw new Error(error.message);

  return data.map((item) => item.party_id);
};
