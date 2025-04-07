import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/client';

// 디스코드 소셜 로그인
export async function signInWithDiscord() {
  const supabase = createClient();

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
