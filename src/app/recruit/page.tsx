import { getParties } from '@/api/party-api';
import PartyRecruitList from '@/components/recruit/PartyRecruitList';
import { createClient } from '@/utils/supabase/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const RecruitPage = async () => {
  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recruits'],
    queryFn: () => getParties(serverClient),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PartyRecruitList />
    </HydrationBoundary>
  );
};

export default RecruitPage;
