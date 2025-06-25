'use client';
import Link from 'next/link';

import { useAuthQuery } from '@/query/auth/useAuthQuery';
import { useProfileQuery } from '@/query/profile/useProfileQuery';
import LoginButton from './auth/LoginButton';
import UserDropdownButton from './auth/UserDropdownButton';
import RecruitButton from './RecruitButton';

const Header = () => {
  // auth 테이블 조회
  const { data: user } = useAuthQuery();

  // 타입 에러 방지 (enabled로 실행 제어됨)
  const userId = user?.id ?? '';

  // profiles 테이블 조회
  const { data: profile } = useProfileQuery(userId);

  return (
    <header className="w-full sticky top-0 bg-[#588157]">
      <div className="max-w-[1200px] h-[60px] flex justify-between items-center mx-auto px-4">
        <nav className="space-x-6 text-[#333333] font-bold">
          <Link href={'/'} className="hover:text-[#E63946]">
            홈
          </Link>
          <Link href={'/recruit'} className="hover:text-[#E63946]">
            파티찾기
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <RecruitButton />
          {profile ? <UserDropdownButton profile={profile} /> : <LoginButton />}
          {/* <AuthHeader /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
