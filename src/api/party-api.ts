import {
  Recruit,
  RecruitForm,
  RecruitWithProfile,
} from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { createClient } from '@/utils/supabase/client';

// 구인 API

// api - 구인글 등록
export const addRecruit = async (formData: RecruitForm) => {
  const client = createClient();

  const { data: recruitData, error } = await client
    .from('party_recruit')
    .insert(formData)
    .select();

  if (error) throw new Error(error.message);

  // 작성자 자동참가
  const { error: partyMemberError } = await client.from('party_member').insert({
    party_id: recruitData[0].id,
    profile_id: recruitData[0].created_by,
  });

  if (partyMemberError) throw new Error(partyMemberError.message);

  return recruitData;
};

// api - 구인글 리스트
export const getRecruits = async (client: SupabaseDataBase) => {
  const { data, error } = await client
    .from('party_recruit')
    .select(`*, created_by(*)`)
    .order('created_date_time', { ascending: false })
    .returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 구인글 업데이트

// api - 구인글 삭제
export const deleteRecruit = async (data: Recruit) => {
  const client = createClient();

  const { error } = await client.from('party_recruit').delete();

  if (error) throw new Error(error.message);
};
