import Link from 'next/link';

import AuthHeader from './auth/AuthHeader';
import RecruitButton from './RecruitButton';

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-[#588157]">
      <div className="max-w-[1200px] h-[60px] flex justify-between items-center mx-auto px-4">
        <nav className="space-x-6 text-[#333333] font-bold">
          <Link
            href={'/'}
            aria-label="홈으로"
            className="font-extrabold tracking-tight leading-none"
          >
            <span className="text-white">MeranGo</span>
          </Link>
          <Link href={'/'} className="hover:text-[#E63946]">
            홈
          </Link>
          <Link href={'/recruit'} className="hover:text-[#E63946]">
            파티찾기
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <RecruitButton />
          <AuthHeader />
          {/* {profile ? <UserDropdownButton profile={profile} /> : <LoginButton />} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
