'use client';

import { RecruitWithProfile } from '@/types/parties.types';
import PartyDialog from './PartyDialog';
import { useSearchParams } from 'next/navigation';

interface PartyListProps {
  parties: RecruitWithProfile[];
}

const PartyList = ({ parties }: PartyListProps) => {
  // 여기서 한번만 실행하고 props로 전달
  const searchParams = useSearchParams();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
      {parties?.map((party) => (
        <PartyDialog key={party.id} party={party} searchParams={searchParams} />
      ))}
    </ul>
  );
};

export default PartyList;
