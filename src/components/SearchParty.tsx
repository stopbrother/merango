import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const SearchParty = () => {
  return (
    <div className="flex flex-col items-center gap-3 bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md max-w-lg w-full sm:flex-row">
      <Input
        placeholder="파티명 검색"
        className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64"
      />
      <Select defaultValue="all">
        <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 w-full sm:w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="hunt">사냥</SelectItem>
          <SelectItem value="quest">퀘스트</SelectItem>
          <SelectItem value="boss">보스</SelectItem>
        </SelectContent>
      </Select>
      <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md w-full sm:w-auto ">
        검색
      </Button>
    </div>
  );
};

export default SearchParty;
