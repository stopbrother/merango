'use server';

import { CONSENT_VERSION } from '@/constants/consent';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function submitConsent() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('유저 정보 없음');

  const now = new Date().toISOString();

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      terms_accepted_at: now,
      terms_version: CONSENT_VERSION,
      privacy_accepted_at: now,
      privacy_version: CONSENT_VERSION,
    })
    .eq('id', user.id);

  if (updateError) throw new Error(updateError.message);

  redirect('/');
}
