import LoginButton from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';
import { ERROR_MESSAGE } from '@/constants/error-message';
import { AuthErrorReason } from '@/types/error.types';

interface AuthErrorPageProps {
  searchParams: { reason?: AuthErrorReason };
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const reason = searchParams.reason;

  const message = (reason && ERROR_MESSAGE[reason]) ?? {
    title: '알 수 없는 오류가 발생했습니다.',
    description: '잠시 후 다시 시도해 주세요.',
  };

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-2xl font-semibold">{message.title}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {message.description}
      </p>
      <div className="flex gap-2">
        <LoginButton />
        <Button variant="outline" asChild>
          <a href="/">홈으로</a>
        </Button>
      </div>
    </section>
  );
}
