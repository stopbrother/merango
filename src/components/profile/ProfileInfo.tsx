'use client';

import { useProfileQuery } from '@/query/profile/useProfileQuery';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import QueryStateWrapper from '../QueryStateWrapper';

interface ProfileInfoProps {
  userId: string;
}

const ProfileInfo = ({ userId }: ProfileInfoProps) => {
  const { data: user, isLoading, error } = useProfileQuery(userId);
  if (!user) return null;

  // 복사 핸들러
  const handleCopy = (copyValue: string | null) => {
    if (!copyValue) return toast.error('복사에 실패했습니다.');

    navigator.clipboard.writeText(copyValue);
    toast.success('복사되었습니다');
  };

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
      <section className="flex flex-row gap-10 pb-8">
        {/* 프로필 이미지 */}
        <Image
          src={user?.avatar_url}
          alt="프로필 이미지"
          className="size-32 rounded-full"
          width={128}
          height={128}
        />

        {/* 프로필 정보 영역 */}
        <div className="flex flex-col justify-center gap-2">
          {/* 닉네임 */}
          <p className="text-xl font-bold text-gray-900">{user.username}</p>

          {/* TODO: 사용자명 & 소셜 닉네임 공통 컴포넌트화 */}
          {/* 디스코드 사용자명 */}
          <div
            onClick={() => handleCopy(user.full_name)}
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
          >
            <p className="text-xs text-muted-foreground">디스코드 사용자명:</p>
            <p className="text-sm font-medium">{user.full_name}</p>
            <Copy className="w-4 h-4" />
          </div>

          {/* 소셜 닉네임 */}
          <div
            onClick={() => handleCopy(user.social_name)}
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
          >
            <p className="text-xs text-muted-foreground">소셜 닉네임:</p>
            <p className="text-sm font-medium">{user.social_name}</p>
            <Copy className="w-4 h-4" />
          </div>
        </div>
      </section>
    </QueryStateWrapper>
  );
};

export default ProfileInfo;
