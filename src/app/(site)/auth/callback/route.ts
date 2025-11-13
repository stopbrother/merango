import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { CONSENT_VERSION } from '@/constants/consent';
import { createClient } from '@/utils/supabase/server';
import { AuthErrorReason } from '@/types/error.types';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const next = searchParams.get('next') ?? '/';

  const fail = (reason: AuthErrorReason) => {
    return NextResponse.redirect(`${origin}/auth/error?reason=${reason}`);
  };

  const oauthError = searchParams.get('error');
  if (oauthError) return fail('provider');

  const code = searchParams.get('code');
  if (!code) return fail('no_code');

  const supabase = createClient();

  // Authorization code를 통한 세션 교환
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return fail('session');

  // 사용자 정보 확인 (Auth세션확인)
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();
  if (!user || getUserError) return fail('no_user');

  // 프로필에서 동의 여부 조회
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('terms_version')
    .eq('id', user.id)
    .single();
  if (profileError) return fail('profile');

  const needsConsent = profile?.terms_version !== CONSENT_VERSION;
  // 동의 필요하면 동의 페이지로 이동
  if (needsConsent)
    return NextResponse.redirect(new URL('/consent', request.url));

  return NextResponse.redirect(`${origin}${next}`);
}
