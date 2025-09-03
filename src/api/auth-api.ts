import { SupabaseDataBase } from '@/types/utils.types';
import { redirect } from 'next/navigation';
import { browserClient } from '../utils/supabase/client';

// 디스코드 소셜 로그인
export async function signInWithDiscord() {
  console.log('next_base_url', process.env.NEXT_PUBLIC_BASE_URL);
  const { data, error } = await browserClient.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) console.log('error', error);
}

// 로그아웃
export async function signOut() {
  const { error } = await browserClient.auth.signOut();

  if (error) {
    // redirect error page
    console.log('error', error);
  }
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
