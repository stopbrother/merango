import { Loader2, TriangleAlert } from 'lucide-react';

interface QueryStateWrapperProps {
  isPending: boolean;
  error: Error | null;
  children: React.ReactNode;
}

const QueryStateWrapper = ({
  isPending,
  error,
  children,
}: QueryStateWrapperProps) => {
  if (isPending) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-10 text-red-500">
        <TriangleAlert className="w-6 h-6 mb-2" />
        <p>데이터를 불러오지 못했습니다.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default QueryStateWrapper;
