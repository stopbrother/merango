'use client';
import { Button } from '@/components/ui/button';

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error.message);

  return (
    <main className="mx-auto max-w-md text-center py-20">
      <h1 className="text-xl font-semibold">문제가 발생했습니다.</h1>
      <p className="text-sm text-muted-foreground mt-2">
        잠시 후 다시 시도해 주세요.
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        다시시도
      </Button>
    </main>
  );
}
