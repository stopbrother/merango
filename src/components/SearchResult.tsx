'use client';

import { useSearchPartiesQuery } from '@/query/party/usePartyQuery';
import PartyList from './recruit/PartyList';
import QueryStateWrapper from './QueryStateWrapper';

interface SearchResultProps {
  keyword: string;
  partyType: string;
}

const SearchResult = ({ keyword, partyType }: SearchResultProps) => {
  const { data, isLoading, error } = useSearchPartiesQuery(keyword, partyType);
  console.log('data', data);

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
      <PartyList parties={data ?? []} />
    </QueryStateWrapper>
  );
};

export default SearchResult;
