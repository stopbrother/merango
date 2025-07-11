import {
  Recruit,
  RecruitForm,
  RecruitWithProfile,
} from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { createClient } from '@/utils/supabase/client';

// 구인 API

// api - 구인글 등록
export const addParties = async (formData: RecruitForm) => {
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

// api - 구인글 리스트 조회
// 가상테이블 생성 => COALESCE(updated_date_time, created_date_time) AS sort_time
export const getParties = async (
  client: SupabaseDataBase,
  partyType: string
) => {
  let query = client
    .from('party_recruit_sort')
    .select(`*, created_by(*)`)
    .order('sort_time', { ascending: false });

  if (partyType && partyType !== 'all')
    query = query.eq('party_type', partyType);

  const { data, error } = await query.returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 구인글 상세조회
export const getPartyDetail = async (
  client: SupabaseDataBase,
  id: Recruit['id']
) => {
  const { data, error } = await client
    .from('party_recruit')
    .select(`*, created_by(*)`)
    .eq('id', id)
    .single<RecruitWithProfile>();
  // single은 결과없으면 에러, .maybeSingle은 결과가 없으면 data === null

  if (error) throw new Error(error.message);

  return data;
};

// api - 구인글 수정
export const updateParty = async (
  recruitId: Recruit['id'],
  formData: RecruitForm
) => {
  const client = createClient();
  console.log('update실행:', { recruitId, formData });

  const { error } = await client
    .from('party_recruit')
    .update(formData)
    .eq('id', recruitId);

  if (error) throw new Error(error.message);
};

// api - 구인글 삭제
export const deleteParty = async (recruitId: Recruit['id']) => {
  const client = createClient();

  const { error } = await client
    .from('party_recruit')
    .delete()
    .eq('id', recruitId);

  if (error) throw new Error(error.message);
};

// api - 생성한 파티(구인글) 조회
export const getCreatedParties = async (
  client: SupabaseDataBase,
  userId: Recruit['created_by']
) => {
  const { data, error } = await client
    .from('party_recruit_sort')
    .select(`*, created_by(*)`)
    .eq('created_by', userId)
    .order('sort_time', { ascending: false })
    .returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 파티(구인글) 검색
export const searchParties = async (
  client: SupabaseDataBase,
  keyword: string,
  partyType: string
) => {
  let query = client
    .from('party_recruit_sort')
    .select(`*, created_by(*)`)
    .order('sort_time', { ascending: false });

  // 키워드가 있을 경우, title 컬럼에서 대소문자 무시 부분 일치 검색
  if (keyword) query = query.ilike('title', `%${keyword}%`);

  if (partyType !== 'all') query = query.eq('party_type', partyType);

  const { data, error } = await query.returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 구인글 끌어올리기
export const raiseParty = async (recruitId: Recruit['id']) => {
  const client = createClient();

  const now = new Date().toISOString(); // UTC(세계 표준시)로 변환

  const { error } = await client
    .from('party_recruit')
    .update({ raised_date_time: now })
    .eq('id', recruitId);

  if (error) throw new Error(error.message);
};
