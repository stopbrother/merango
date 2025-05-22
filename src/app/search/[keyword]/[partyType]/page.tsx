import { searchParties } from '@/api/party-api';
import SearchResult from '@/components/SearchResult';
import { createClient } from '@/utils/supabase/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface SearchPageProps {
  params: {
    keyword: string;
    partyType: string;
  };
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const { partyType } = params;
  const keyword = decodeURIComponent(params.keyword); // 검색어 디코딩 (URL에서 받은값은 인코딩됨)

  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['searchParties', keyword, partyType],
    queryFn: () => searchParties(serverClient, keyword, partyType),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchResult keyword={keyword} partyType={partyType} />
    </HydrationBoundary>
  );
};

export default SearchPage;
