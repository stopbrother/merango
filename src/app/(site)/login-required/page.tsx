import LoginButton from '@/components/auth/LoginButton';

const LoginRequiredPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-[#333333] mb-4">
        로그인이 필요합니다.
      </h1>
      <LoginButton />
    </div>
  );
};

export default LoginRequiredPage;
