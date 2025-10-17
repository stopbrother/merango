import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { CONSENT_VERSION } from '@/constants/consent';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (!code) return NextResponse.redirect(`${origin}/auth/error`);

  const supabase = await createClient();

  // Authorization code를 통한 세션 교환
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${origin}/auth/error`);

  // 사용자 정보 확인 (Auth세션확인)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${origin}${next}`);

  // 프로필에서 동의 여부 조회
  const { data: profile } = await supabase
    .from('profiles')
    .select('terms_version')
    .eq('id', user.id)
    .single();

  const needsConsent = profile?.terms_version !== CONSENT_VERSION;

  // 동의 필요하면 동의 페이지로 이동
  if (needsConsent)
    return NextResponse.redirect(new URL('/consent', request.url));

  // // 동의 필요하면 임시 쿠키 심고 동의 페이지로
  // if (needsConsent) {
  //   const response = NextResponse.redirect(new URL('/consent', request.url));

  //   response.cookies.set(CONSENT_COOKIE, CONSENT_VERSION, {
  //     httpOnly: true, // 클라이언트 JS로 조작 불가
  //     secure: true, // https에서만 전송
  //     sameSite: 'lax', // 크로스사이트 요청 최소화
  //     path: '/', // 전역에서 접근 가능
  //   });
  //   return response;
  // }

  return NextResponse.redirect(`${origin}${next}`);
}
