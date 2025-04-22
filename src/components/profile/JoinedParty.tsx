'use client';
import { useJoinedPartiesQuery } from '@/query/member/useMembersQuery';
import QueryStateWrapper from '../QueryStateWrapper';
import PartyList from '../recruit/PartyList';

interface JoinedPartyProps {
  userId: string;
}

const JoinedParty = ({ userId }: JoinedPartyProps) => {
  const { data, isLoading, error } = useJoinedPartiesQuery(userId);

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
      <PartyList parties={data ?? []} />
    </QueryStateWrapper>
  );
};

export default JoinedParty;
