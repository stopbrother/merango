import SearchPartyForm from '@/components/SearchPartyForm';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center py-20 gap-12">
      {/* 제목 & 파티찾기 버튼 */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-800">
          MapleLand 파티 매칭
        </h1>
        <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md">
          파티 찾기
        </Button>
      </div>

      {/* 검색 영역 */}
      <SearchPartyForm />
    </div>
  );
}
