'use server';

import { adminAuthClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteAccount() {
  const supabase = createClient();
  const adminClient = adminAuthClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('유저 정보 없음');

  // 필요시 storage 정리

  const { error } = await adminClient.auth.admin.deleteUser(user.id);
  if (error) throw new Error(error.message);

  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('로그아웃 실패', err);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
