import { User } from '@supabase/supabase-js';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface requireLoginParams {
  user: User | null | undefined;
  router: AppRouterInstance;
}
// 로그인 유무 검증
export const requireLogin = ({ user, router }: requireLoginParams) => {
  if (!user) return router.push('/login-required');

  return true;
};
