'use client';
import { useSigninMutation } from '@/hooks/query/auth/useAuthMutation';
import { Button } from '../ui/button';
import { FaDiscord } from 'react-icons/fa';

const LoginButton = () => {
  const { mutate: signIn } = useSigninMutation();

  return (
    <Button
      onClick={() => signIn()}
      className="bg-[#588157] hover:bg-[#476947]"
    >
      <FaDiscord />
      로그인
    </Button>
  );
};

export default LoginButton;
