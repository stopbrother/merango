import { SupabaseDataBase } from '@/types/utils.types';
import { browserClient } from '../utils/supabase/client';

// 디스코드 소셜 로그인
export async function signInWithDiscord() {
  console.log('next_base_url', process.env.NEXT_PUBLIC_BASE_URL);
  const { error } = await browserClient.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
}

// 로그아웃
export async function signOut() {
  const { error } = await browserClient.auth.signOut();

  if (error) throw new Error(error.message);
}

// api - 로그인 한 사용자
export const getCurrentUser = async (client: SupabaseDataBase) => {
  const { data, error } = await client.auth.getUser();

  if (error) {
    if (!data.user) return null;
    throw new Error(error.message);
  }

  return data.user;
};
