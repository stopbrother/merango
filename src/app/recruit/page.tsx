import { getParties } from '@/api/party-api';
import PartyRecruitList from '@/components/recruit/PartyRecruitList';
import { createClient } from '@/utils/supabase/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface RecruitPageProps {
  searchParams: {
    partyType?: string;
    keyword?: string;
  };
}

const RecruitPage = async ({ searchParams }: RecruitPageProps) => {
  const partyType = searchParams.partyType ?? 'all';
  const keyword = searchParams.keyword ?? '';

  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recruits', partyType, keyword],
    queryFn: () => getParties(serverClient, partyType, keyword),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PartyRecruitList partyType={partyType} keyword={searchParams.keyword} />
    </HydrationBoundary>
  );
};

export default RecruitPage;
