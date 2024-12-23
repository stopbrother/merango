'use client';

import { useRecruitQuery } from '@/query/useRecruitQuery';
import RecruitCard from './RecruitCard';
import { useState } from 'react';
import RecruitDetail from './RecruitDetail';
import { RecruitWithProfile } from '@/types/parties.types';

const RecruitList = () => {
  const [selectedRecruit, setSelectedRecruit] =
    useState<RecruitWithProfile | null>(null);
  const { data, error } = useRecruitQuery();

  if (error) console.log('error', error);

  console.log('data', data);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((recruit) => (
          <RecruitCard
            key={recruit.id}
            recruit={recruit}
            onClick={() => setSelectedRecruit(recruit)}
          />
        ))}
      </ul>

      {selectedRecruit && (
        <RecruitDetail
          recruit={selectedRecruit}
          onClose={() => setSelectedRecruit(null)}
        />
      )}
    </>
  );
};

export default RecruitList;
