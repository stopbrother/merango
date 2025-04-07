'use client';

import { useUserProfileQuery } from '@/query/profile/useProfileQuery';
import Image from 'next/image';
import React from 'react';

interface ProfileInfoProps {
  userId: string;
}

const ProfileInfo = ({ userId }: ProfileInfoProps) => {
  const { data: user } = useUserProfileQuery(userId);
  if (!user) return null;

  return (
    <section className="flex flex-row gap-10 pb-8">
      <Image
        src={user?.avatar_url}
        alt="프로필 이미지"
        className="size-32 rounded-full"
        width={128}
        height={128}
      />
      <div className="flex flex-col justify-center gap-1">
        <p>{user.username}</p>
        <span>{user.full_name}</span>
      </div>
    </section>
  );
};

export default ProfileInfo;
