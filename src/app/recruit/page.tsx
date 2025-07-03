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
    partyType: string;
  };
}

const RecruitPage = async ({ searchParams }: RecruitPageProps) => {
  const { partyType } = searchParams;

  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recruits', partyType],
    queryFn: () => getParties(serverClient, partyType),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PartyRecruitList type={partyType} />
    </HydrationBoundary>
  );
};

export default RecruitPage;
