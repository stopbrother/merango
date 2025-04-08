import { Profile } from '@/types/profiles.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { createClient } from '@/utils/supabase/client';

// api - 로그인 한 사용자
export const getCurrentUser = async (client: SupabaseDataBase) => {
  const { data, error } = await client.auth.getUser();

  if (error) {
    if (!data.user) return null;
    throw new Error(error.message);
  }

  return data.user;
};

// api - 유저 정보
export const getUserProfile = async (
  client: SupabaseDataBase,
  userId: string
) => {
  const { data, error } = await client
    .from('profiles')
    .select()
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// api - 소개글 등록/수정
export const updateUserIntro = async (
  data: Profile['intro'],
  userId: Profile['id']
) => {
  const client = createClient();
  const { error } = await client
    .from('profiles')
    .update({ intro: data })
    .eq('id', userId);

  if (error) throw new Error(error.message);
};
