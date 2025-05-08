import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

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
      <div className="flex flex-col items-center gap-3 bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md max-w-lg w-full sm:flex-row">
        <Input
          placeholder="파티명 검색"
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 w-full sm:w-32">
          <option>사냥</option>
          <option>퀘스트</option>
          <option>보스</option>
        </select>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md w-full sm:w-auto ">
          검색
        </Button>
      </div>
    </div>
  );
}
