'use client';

import { useInView } from 'react-intersection-observer';
import { PARTY_TYPE_FILTER_OPTIONS } from '@/constants/partyType';
import { useInfinitePartiesQuery } from '@/hooks/query/party/usePartyQuery';
import { Loader2, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EmptyState from '../EmptyState';
import QueryStateWrapper from '../QueryStateWrapper';
import SearchPartyForm from '../SearchPartyForm';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import PartyList from './PartyList';
import PartyCardSkeleton from './PartyCardSkeleton';
import { usePartyRecruitRealtime } from '@/hooks/realtime/usePartyRecruitRealtime';
import RefreshButton from '../RefreshButton';

interface PartyRecruitListProps {
  partyType: string;
  keyword: string;
}

const PartyRecruitList = ({ partyType, keyword }: PartyRecruitListProps) => {
  const router = useRouter();

  // 실시간: 새로운글 카운트, 수동 갱신
  const { newPostCnt, refresh } = usePartyRecruitRealtime(partyType, keyword);

  // 목록조회 (무한스크롤)
  const {
    data,
    error,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinitePartiesQuery(partyType, keyword);

  // 배열로 펼쳐서 data 배열만 추출 (cursor제외)
  const items = data?.pages.flatMap((page) => page.data);

  const isSearch = Boolean(keyword);

  // 스크롤 감지
  const { ref } = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  // 탭 변경 핸들러
  const handleFilter = (value: string) => {
    if (partyType !== value)
      router.replace(`/recruit${value === 'all' ? '' : `?partyType=${value}`}`);
  };

  return (
    <>
      {newPostCnt > 0 && (
        <RefreshButton onRefresh={refresh} newPostCnt={newPostCnt} />
      )}

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
      {isSearch && (
        <div className="mb-2 mt-2">
          <span className="text-[#3B82F6]">“{keyword}”</span>
          검색 결과
        </div>
      )}

      <QueryStateWrapper isPending={isPending} error={error}>
        {items?.length ? (
          <PartyList parties={items ?? []} />
        ) : (
          <EmptyState icon={PartyPopper} message="등록된 파티가 없습니다." />
        )}

        {/* 로드할 목록이 있으면 스크롤 감지 및 로딩상태표시 */}
        {hasNextPage && (
          <div ref={ref}>
            <PartyCardSkeleton count={3} />
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </QueryStateWrapper>
    </>
  );
};

export default PartyRecruitList;
