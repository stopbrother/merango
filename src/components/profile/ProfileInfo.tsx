'use client';

import { useProfileQuery } from '@/query/profile/useProfileQuery';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import QueryStateWrapper from '../QueryStateWrapper';

interface ProfileInfoProps {
  userId: string;
}

const ProfileInfo = ({ userId }: ProfileInfoProps) => {
  const { data: user, isLoading, error } = useProfileQuery(userId);
  if (!user) return null;

  // discord 사용자명 클릭 복사 핸들러
  const handleCopy = () => {
    if (!user.full_name) return toast.error('해당 사용자명이 없습니다.');

    navigator.clipboard.writeText(user.full_name);
    toast.success('복사되었습니다');
  };

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
      <section className="flex flex-row gap-10 pb-8">
        <Image
          src={user?.avatar_url}
          alt="프로필 이미지"
          className="size-32 rounded-full"
          width={128}
          height={128}
        />
        <div className="flex flex-col justify-center gap-1">
          <p className="text-xl font-bold text-gray-900">{user.username}</p>
          <Button
            onClick={handleCopy}
            className="flex flex-row text-sm text-gray-500 transition-colors hover:text-blue-600 hover:underline"
            variant="secondary"
          >
            {user.full_name}
            <Copy className="w-4 h-4" />
          </Button>
          <p className="text-xs">디스코드 사용자명 입니다.</p>
        </div>
      </section>
    </QueryStateWrapper>
  );
};

export default ProfileInfo;
