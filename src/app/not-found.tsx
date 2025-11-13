import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md text-center py-20">
      <h1 className="text-xl font-semibold">페이지를 찾을 수 없어요.</h1>
      <p className="text-sm text-muted-foreground mt-2">
        주소가 바뀌었거나 삭제되었을 수 있어요.
      </p>
      <Link href="/" className="mt-6 underline">
        홈으로
      </Link>
    </main>
  );
}
