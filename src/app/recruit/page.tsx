import { getRecruits } from '@/api/recruit-api';
import RecruitList from '@/components/recruit/RecruitList';
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
    queryFn: () => getRecruits(serverClient),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecruitList />
    </HydrationBoundary>
  );
};

export default RecruitPage;
