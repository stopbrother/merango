import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface PartyCardSKeletonProps {
  count?: number;
}

const PartyCardSkeleton = ({ count = 3 }: PartyCardSKeletonProps) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="w-full flex flex-row justify-between items-center">
            <Skeleton className="w-12 h-5 rounded-full" />
            <Skeleton className="w-10 h-5" />
          </CardHeader>
          <CardTitle className="flex justify-center mb-1">
            <Skeleton className="w-3/4 h-8" />
          </CardTitle>
          <CardFooter className="justify-center">
            <Skeleton className="w-1/2 h-5" />
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
};

export default PartyCardSkeleton;
