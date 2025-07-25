import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { SupabaseDataBase } from '@/types/utils.types';

// 디스코드 소셜 로그인
export async function signInWithDiscord() {
  const supabase = createClient();
  console.log('next_base_url', process.env.NEXT_PUBLIC_BASE_URL);
  const { data, error } = await supabase.auth.signInWithOAuth({
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
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

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
