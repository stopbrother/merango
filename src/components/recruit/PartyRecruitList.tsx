'use client';
import { PARTY_TYPE_FILTER_OPTIONS } from '@/constants/partyType';
import { usePartiesQuery } from '@/query/party/usePartyQuery';
import { PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EmptyState from '../EmptyState';
import QueryStateWrapper from '../QueryStateWrapper';
import SearchPartyForm from '../SearchPartyForm';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import PartyList from './PartyList';

interface PartyRecruitListProps {
  type: string;
}

const PartyRecruitList = ({ type }: PartyRecruitListProps) => {
  const router = useRouter();
  const partyType = type ?? 'all';

  const { data, isLoading, error } = usePartiesQuery(partyType);

  const handleFilter = (value: string) => {
    if (partyType !== value)
      router.replace(`/recruit${value === 'all' ? '' : `?partyType=${value}`}`);
  };

  return (
    <>
      <Tabs value={partyType} onValueChange={handleFilter}>
        <TabsList>
          {PARTY_TYPE_FILTER_OPTIONS.map((option) => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <SearchPartyForm />

      <QueryStateWrapper isLoading={isLoading} error={error}>
        {data?.length ? (
          <PartyList parties={data ?? []} />
        ) : (
          <EmptyState icon={PartyPopper} message="등록된 파티가 없습니다." />
        )}
      </QueryStateWrapper>
    </>
  );
};

export default PartyRecruitList;
