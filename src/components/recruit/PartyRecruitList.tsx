'use client';
import { usePartiesQuery } from '@/query/party/usePartyQuery';
import QueryStateWrapper from '../QueryStateWrapper';
import PartyList from './PartyList';
import EmptyState from '../EmptyState';
import { PartyPopper } from 'lucide-react';
import SearchPartyForm from '../SearchPartyForm';

const PartyRecruitList = () => {
  const { data, isLoading, error } = usePartiesQuery();

  if (data?.length === 0)
    return <EmptyState icon={PartyPopper} message="등록된 파티가 없습니다." />;

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
      <SearchPartyForm />

      <PartyList parties={data ?? []} />
    </QueryStateWrapper>
  );
};

export default PartyRecruitList;
