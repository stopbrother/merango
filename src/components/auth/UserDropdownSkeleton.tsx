import { Skeleton } from '../ui/skeleton';

const UserDropdownSkeleton = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Skeleton className="w-7 h-8 rounded-full" />
      <Skeleton className="w-9 h-4" />
    </div>
  );
};

export default UserDropdownSkeleton;
