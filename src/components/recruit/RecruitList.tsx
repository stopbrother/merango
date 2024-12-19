'use client';

import { useRecruitQuery } from '@/query/useRecruitQuery';
import RecruitCard from './RecruitCard';

const RecruitList = () => {
  const { data, error } = useRecruitQuery();

  if (error) console.log('error', error);

  console.log('data', data);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((recruit) => (
          <RecruitCard key={recruit.id} recruit={recruit} />
        ))}
      </ul>
    </>
  );
};

export default RecruitList;
