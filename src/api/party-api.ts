import {
  Recruit,
  RecruitForm,
  RecruitWithProfile,
} from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { browserClient } from '@/utils/supabase/client';

// 구인 API

export interface getPartiesParams {
  client: SupabaseDataBase;
  partyType: string;
  keyword?: string;
  cursor?: string;
  limit?: number;
}

// api - 구인글 등록
export const addParties = async (formData: RecruitForm) => {
  const { data: recruitData, error } = await browserClient
    .from('party_recruit')
    .insert(formData)
    .select();

  if (error) throw new Error(error.message);

  // supabase trigger로 자동참가
  // 작성자 자동참가
  // const { error: partyMemberError } = await browserClient
  //   .from('party_member')
  //   .insert({
  //     party_id: recruitData[0].id,
  //     profile_id: recruitData[0].created_by,
  //   });

  // if (partyMemberError) throw new Error(partyMemberError.message);

  return recruitData;
};

// api - 구인글 리스트 조회 & 검색
// 가상테이블 생성 => COALESCE(updated_date_time, created_date_time) AS sort_time
export const getParties = async (
  client: SupabaseDataBase,
  partyType: string,
  keyword?: string
) => {
  let query = client
    .from('party_recruit')
    .select(`*, created_by(*)`)
    .order('sort_time', { ascending: false })
    .order('id', { ascending: false });

  // 파티타입 필터
  if (partyType && partyType !== 'all')
    query = query.eq('party_type', partyType);

  // 키워드가 있을 경우, title 컬럼에서 대소문자 무시 부분 일치 검색
  if (keyword) query = query.ilike('title', `%${keyword}%`);

  const { data, error } = await query.returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 구인글 조회 & 검색 (무한스크롤)
export const getInfiniteParties = async ({
  client,
  partyType,
  keyword,
  cursor,
  limit = 15,
}: getPartiesParams) => {
  let query = client
    .from('party_recruit')
    .select(`*, created_by(*)`)
    .order('sort_time', { ascending: false })
    .order('id', { ascending: false })
    .limit(limit);

  // 파티타입 필터
  if (partyType && partyType !== 'all')
    query = query.eq('party_type', partyType);

  // 키워드가 있을 경우, title 컬럼에서 대소문자 무시 부분 일치 검색
  if (keyword !== '') query = query.ilike('title', `%${keyword}%`);

  // 커서보다 작은(오래된) 글만 - 중복방지(sort_time이 더 작거나 같은 레코드중 id가 더 작은것)
  if (cursor) {
    const [time, id] = cursor.split('__');
    query = query.or(
      `sort_time.lt.${time},` + `and(sort_time.eq.${time},id.lt.${id})`
    );
  }

  const { data, error, status } = await query.returns<RecruitWithProfile[]>();

  // if (error) throw new Error(error.message);
  if (error) {
    console.error('supabaseerror', { status, error });
    throw error;
  }

  // 마지막 요소
  const items = data ?? []; // null 방어
  const last = items[items.length - 1];

  return {
    data: items,
    nextCursor: items.length === limit ? `${last.sort_time}__${last.id}` : null,
  };
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

// api - 생성한 파티(구인글) 조회
export const getCreatedParties = async (
  client: SupabaseDataBase,
  userId: Recruit['created_by']
) => {
  const { data, error } = await client
    .from('party_recruit')
    .select(`*, created_by(*)`)
    .eq('created_by', userId)
    .order('sort_time', { ascending: false })
    .returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};

// api - 생성한 파티글 개수 조회 (count)
export const getCreatedPartiesCount = async (
  client: SupabaseDataBase,
  userId: Recruit['created_by']
) => {
  const { count, error } = await client
    .from('party_recruit')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', userId);

  if (error) throw new Error(error.message);
  return count ?? 0;
};

// api - 구인글 수정
export const updateParty = async (
  recruitId: Recruit['id'],
  formData: RecruitForm
) => {
  const { error } = await browserClient
    .from('party_recruit')
    .update(formData)
    .eq('id', recruitId);

  if (error) throw new Error(error.message);
};

// api - 구인글 삭제
export const deleteParty = async (recruitId: Recruit['id']) => {
  const { error } = await browserClient
    .from('party_recruit')
    .delete()
    .eq('id', recruitId);

  if (error) throw new Error(error.message);
};

// api - 구인글 끌어올리기
export const raiseParty = async (recruitId: Recruit['id']) => {
  const now = new Date().toISOString(); // UTC(세계 표준시)로 변환

  const { error } = await browserClient
    .from('party_recruit')
    .update({ raised_date_time: now })
    .eq('id', recruitId);

  if (error) throw new Error(error.message);
};
