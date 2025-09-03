'use client';
import { useCreatedPartiesQuery } from '@/hooks/query/party/usePartyQuery';
import QueryStateWrapper from '../QueryStateWrapper';
import PartyList from '../recruit/PartyList';
import EmptyState from '../EmptyState';
import { PartyPopper } from 'lucide-react';

interface CreatedPartiesProps {
  userId: string;
}

const CreatedParties = ({ userId }: CreatedPartiesProps) => {
  const { data, isLoading, error } = useCreatedPartiesQuery(userId);

  return (
    <QueryStateWrapper isPending={isLoading} error={error}>
      {data?.length === 0 ? (
        <EmptyState icon={PartyPopper} message="등록한 파티가 없습니다." />
      ) : (
        <PartyList parties={data ?? []} />
      )}
    </QueryStateWrapper>
  );
};

export default CreatedParties;
