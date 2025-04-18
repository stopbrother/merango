'use client';
import { usePartiesQuery } from '@/query/party/usePartyQuery';
import QueryStateWrapper from '../QueryStateWrapper';
import PartyList from './PartyList';
import EmptyState from '../EmptyState';
import { PartyPopper } from 'lucide-react';

const PartyRecruitList = () => {
  const { data, isLoading, error } = usePartiesQuery();

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
      {data?.length === 0 ? (
        <EmptyState icon={PartyPopper} message="등록된 파티가 없습니다." />
      ) : (
        <PartyList parties={data ?? []} />
      )}
    </QueryStateWrapper>
  );
};

export default PartyRecruitList;
