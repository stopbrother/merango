import { Profile, ProfileForm } from '@/types/profiles.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { browserClient } from '@/utils/supabase/client';

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
  const { error } = await browserClient
    .from('profiles')
    .update({ intro: data })
    .eq('id', userId);

  if (error) throw new Error(error.message);
};

// api - 프로필 수정
export const updateProfile = async (
  userId: Profile['id'],
  formData: ProfileForm
) => {
  const { error } = await browserClient
    .from('profiles')
    .update(formData)
    .eq('id', userId);

  if (error) throw new Error(error.message);
};
