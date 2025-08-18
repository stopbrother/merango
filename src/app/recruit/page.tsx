import { getInfiniteParties } from '@/api/party-api';
import PartyRecruitList from '@/components/recruit/PartyRecruitList';
import { RecruitWithProfile } from '@/types/parties.types';
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

  /*
  prefetchInfiniteQuery는 getNextPageParam 인자의 타입을 추론하지 못하므로
  반환 타입을 명시하여 타입 안정성 확보
  */
  type NextPage = { data: RecruitWithProfile[]; nextCursor: string | null };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['recruits', partyType, keyword],
    queryFn: ({ pageParam }) =>
      getInfiniteParties({
        client: serverClient,
        partyType,
        keyword,
        cursor: pageParam,
        limit: 15,
      }),
    getNextPageParam: (last: NextPage) => last.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PartyRecruitList partyType={partyType} keyword={keyword} />
    </HydrationBoundary>
  );
};

export default RecruitPage;
