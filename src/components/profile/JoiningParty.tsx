'use client';
import { useJoinedPartiesQuery } from '@/hooks/query/member/usePartyMemberQuery';
import QueryStateWrapper from '../common/QueryStateWrapper';
import PartyList from '../recruit/PartyList';

interface JoiningPartyProps {
  userId: string;
}

const JoiningParty = ({ userId }: JoiningPartyProps) => {
  const { data, isLoading, error } = useJoinedPartiesQuery(userId);

  return (
    <QueryStateWrapper isPending={isLoading} error={error}>
      <PartyList parties={data ?? []} />
    </QueryStateWrapper>
  );
};

export default JoiningParty;
