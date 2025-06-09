import Link from 'next/link';

import { getCurrentUser } from '@/api/auth-api';
import { getUserProfile } from '@/api/profile-api';
import { createClient } from '@/utils/supabase/server';
import LoginButton from './auth/LoginButton';
import UserDropdownButton from './auth/UserDropdownButton';
import RecruitButton from './RecruitButton';

const Header = async () => {
  const client = createClient();
  const user = await getCurrentUser(client); // 로그인 정보

  if (!user) return <LoginButton />;

  const profile = await getUserProfile(client, user?.id); // 사용자 정보

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
          <Link
            href={`/profile/${profile.id}?tab=created`}
            className="hover:text-[#E63946]"
          >
            내 모집글
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <RecruitButton />
          <UserDropdownButton profile={profile} />
          {/* <AuthHeader /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
