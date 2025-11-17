import SearchPartyForm from '@/components/SearchPartyForm';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MeranGo - 메이플랜드 파티 매칭',
  description: 'MeranGo - 메랜 파티 구인/구직',
};

export default function Home() {
  return (
    <div className="flex flex-col items-center py-20 gap-12">
      {/* 제목 & 파티찾기 버튼 */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-800">
          MapleLand 파티 매칭
        </h1>

        {/* 소개글 */}
        <p className="text-sm text-muted-foreground text-center max-w-xl">
          메랜고(MeranGo)는 MapleLand 유저를 위한 메이플랜드 파티 매칭
          서비스입니다. 메랜파티를 구인·구직하고 싶다면, 디스코드 로그인만으로
          간편하게 원하는 파티를 찾고 모집해 보세요.
        </p>

        <Button
          asChild
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md"
        >
          <Link href="/recruit">파티 찾기</Link>
        </Button>
      </div>

      {/* 검색 영역 */}
      <SearchPartyForm />
    </div>
  );
}
