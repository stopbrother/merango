'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthQuery } from '../auth/useAuthQuery';
import { useProfileQuery } from './useProfileQuery';

export const useProfileGuard = () => {
  const router = useRouter();

  const { data: user } = useAuthQuery();
  const userId = user?.id ?? '';

  const { data: profile } = useProfileQuery(userId);

  const hasProfile = Boolean(
    profile?.username && profile?.level && profile?.job
  );

  const requireProfile = () => {
    if (hasProfile) return true;

    toast('프로필(닉네임/레벨/직업)이 필요합니다.', {
      action: {
        label: '프로필 설정',
        onClick: () => router?.push('/settings'),
      },
      duration: 5000,
    });

    return false;
  };

  return { hasProfile, requireProfile };
};
