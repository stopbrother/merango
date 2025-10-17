import { CONSENT_VERSION } from '@/constants/consent';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: createServerClient 호출과 supabase.auth.getUser() 사이에는
  // 어떤 로직도 넣지 마세요. 이 구간에 실수가 있으면
  // 사용자가 무작위로 로그아웃되는 현상을 디버깅하기 매우 어려워집니다.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // 비로그인시 보호 경로
  const protectedRoutes = ['/settings', '/consent'];
  const isProtectedRoutes = protectedRoutes.includes(pathname);

  // 미동의시 접근 가능 경로
  const consentPublicRoutes = ['/consent', '/terms', '/privacy'];
  const isConsentPublicRoutes = consentPublicRoutes.includes(pathname);

  // 미인증자 처리 (비로그인)
  if (!user) {
    if (isProtectedRoutes)
      return NextResponse.redirect(new URL('/login-required', request.url));
    return supabaseResponse;
  }

  // 인증자 처리 (로그인): 경로 이동시마다 동의 버전 조회(동의해야만 이용가능)
  const { data: profile } = await supabase
    .from('profiles')
    .select('terms_version')
    .eq('id', user.id)
    .single();

  const needsConsent = profile?.terms_version !== CONSENT_VERSION;

  // 미동의면 허용된페이지 외 접속 불가능
  if (needsConsent && !isConsentPublicRoutes)
    return NextResponse.redirect(new URL('/consent', request.url));

  // 동의한 사용자는 동의페이지 접근 불가
  if (!needsConsent && pathname === '/consent')
    return NextResponse.redirect(new URL('/', request.url));

  // 로그인 + 임시 쿠키 보유중(동의가 필요한)유저: consent경로만
  // if (
  //   request.cookies.get(CONSENT_COOKIE)?.value === CONSENT_VERSION &&
  //   pathname !== '/consent'
  // ) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/consent';
  //   return NextResponse.redirect(url);
  // }

  // IMPORTANT: 반드시 supabaseResponse 객체를 그대로 반환해야 합니다.
  // 만약 새 NextResponse.next() 객체를 만들었다면,
  // 1) { request }를 반드시 전달하고,
  // 2) supabaseResponse의 쿠키를 모두 복사(setAll)해야 하며,
  // 3) 이후 필요한 수정만 하고,
  // 4) 마지막에 그 새 응답 객체를 반환하세요.
  // 위를 지키지 않으면 브라우저와 서버의 쿠키 상태가 어긋나
  // 사용자의 세션이 예기치 않게 종료될 수 있습니다.

  return supabaseResponse;
}
