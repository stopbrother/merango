'use client';
import { useAuthQuery } from '@/hooks/query/auth/useAuthQuery';
import UserDropdownButton from './UserDropdownButton';
import { useProfileQuery } from '@/hooks/query/profile/useProfileQuery';
import LoadingButton from '../LoadingButton';
import LoginButton from './LoginButton';

const AuthHeader = () => {
  // auth 테이블 조회
  const { data: user, isLoading } = useAuthQuery();

  // 타입 에러 방지 (enabled로 실행 제어됨)
  const userId = user?.id ?? '';

  // profiles 테이블 조회
  const { data: profile } = useProfileQuery(userId);

  if (isLoading) return <LoadingButton />;
  if (profile) return <UserDropdownButton profile={profile} />;

  return <LoginButton />;
};

export default AuthHeader;
