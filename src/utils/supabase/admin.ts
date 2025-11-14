import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(supabase_url, service_role_key, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false
//   }
// })
// // Access auth admin api
// const adminAuthClient = supabase.auth.admin

export function adminAuthClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // 서버 전용키 (클라에서 참조 금지)
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
