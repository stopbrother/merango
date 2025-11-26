import { RotateCw } from 'lucide-react';
import { Button } from '../ui/button';

interface RefreshButtonProps {
  onRefresh: () => void;
  newPostCnt: number;
}

const RefreshButton = ({ onRefresh, newPostCnt }: RefreshButtonProps) => {
  return (
    <div className="sticky rounded-full w-fit top-16 mx-auto z-50">
      <Button onClick={onRefresh}>
        <RotateCw />
        새로운 글 {newPostCnt}
      </Button>
    </div>
  );
};

export default RefreshButton;
