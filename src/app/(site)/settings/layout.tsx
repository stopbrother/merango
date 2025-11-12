import SettingsTabs from '@/components/settings/SettingsTabs';
import { Metadata } from 'next';

// 노출X
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1 className="mb-2 text-xl font-semibold">설정</h1>
      <SettingsTabs />
      <div>{children}</div>
    </>
  );
};

export default SettingsLayout;
