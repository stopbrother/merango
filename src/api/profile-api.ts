import { SupabaseDataBase } from '@/types/utils.types';

// 로그인 한 사용자
export const getCurrentUser = async (client: SupabaseDataBase) => {
  const { data, error } = await client.auth.getUser();

  if (error) {
    if (!data.user) return null;
    throw new Error(error.message);
  }

  return data.user;
};

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
