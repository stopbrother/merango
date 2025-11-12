'use client';

import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import Link from 'next/link';

const SettingsTabs = () => {
  const pathname = usePathname();
  const tab = pathname.includes('/profile') ? 'profile' : 'account';

  return (
    <Tabs value={tab} className="w-full mb-6 mt-6">
      <TabsList className="p-0">
        <TabsTrigger value="profile" className="pl-0">
          <Link href={'/settings/profile'}>프로필</Link>
        </TabsTrigger>
        <TabsTrigger value="account">
          <Link href="/settings/account">계정</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SettingsTabs;
