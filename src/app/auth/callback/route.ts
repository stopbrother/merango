import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();

    // Authorization code를 통한 세션 교환
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(`${origin}/auth/error`);

    // 사용자 정보 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(`${origin}${next}`);

    // 프로필에서 동의 여부 조회
    const { data: profile } = await supabase
      .from('profiles')
      .select(
        'terms_accepted_at, terms_version, privacy_accepted_at, privacy_version'
      )
      .eq('id', user.id)
      .single();

    const needsConsent =
      !profile ||
      !profile.terms_accepted_at ||
      !profile.privacy_accepted_at ||
      profile.terms_version !== '0' ||
      profile.privacy_version !== '0';

    // 동의 필요하면 동의 페이지로
    if (needsConsent)
      return NextResponse.redirect(new URL('/consent', request.url));
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
