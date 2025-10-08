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

  // 미인증자 처리
  if (!user) {
    // 로그인된 사용자가 없으므로, 로그인 페이지로 리다이렉트하도록 응답할 수 있습니다.
    const url = request.nextUrl.clone();
    url.pathname = '/login-required';
    return NextResponse.redirect(url);
  }

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
