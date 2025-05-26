'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import PartyRecruitForm from './PartyRecruitForm';

const RecruitButton = () => {
  // 구인하기 폼 모달 상태
  const [isRecruitFormOpen, setIsRecruitFormOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsRecruitFormOpen(true)}
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
