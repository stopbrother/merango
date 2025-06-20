'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import PartyRecruitForm from './PartyRecruitForm';
import { useAuthQuery } from '@/query/auth/useAuthQuery';
import { toast } from 'sonner';

const RecruitButton = () => {
  // 구인하기 폼 모달 상태
  const [isRecruitFormOpen, setIsRecruitFormOpen] = useState(false);

  const { data: user } = useAuthQuery();

  const handleOpenRecruitForm = () => {
    if (!user) return toast.error('로그인이 필요합니다.');

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
