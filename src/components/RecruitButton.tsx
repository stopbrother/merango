'use client';

import { useAuthQuery } from '@/hooks/query/auth/useAuthQuery';
import { requireLogin } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PartyRecruitForm from './PartyRecruitForm';
import { Button } from './ui/button';
import { useProfileGuard } from '@/hooks/query/profile/useProfileGuard';

const RecruitButton = () => {
  const router = useRouter();
  // 구인하기 폼 모달 상태
  const [isRecruitFormOpen, setIsRecruitFormOpen] = useState(false);

  const { data: user } = useAuthQuery();

  const { requireProfile } = useProfileGuard();

  // 로그인 & 프로필 유무 검증 핸들러
  const handleOpenRecruitForm = () => {
    if (!requireLogin({ user, router })) return;

    if (!requireProfile()) return;

    setIsRecruitFormOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpenRecruitForm}
        className="bg-[#FFD700] text-[#333333] font-bold w-[120px] h-[40px]"
      >
        구인 하기
      </Button>

      {/* 구인글 작성 모달 */}
      {isRecruitFormOpen && (
        <PartyRecruitForm
          open={isRecruitFormOpen}
          onClose={() => setIsRecruitFormOpen(false)}
        />
      )}
    </>
  );
};

export default RecruitButton;
