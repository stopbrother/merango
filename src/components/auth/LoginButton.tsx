'use client';
import { useSigninMutation } from '@/query/auth/useAuthMutation';
import { Button } from '../ui/button';
import { signInWithDiscord } from '@/api/auth-api';

const LoginButton = () => {
  const { mutate: signIn } = useSigninMutation();

  return (
    <Button
      onClick={() => signIn()}
      className="bg-[#588157] hover:bg-[#476947]"
    >
      로그인
    </Button>
  );
};

export default LoginButton;
