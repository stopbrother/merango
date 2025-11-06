import ProfileEditForm from '@/components/profile/ProfileEditForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SettingsPage = () => {
  return <ProfileEditForm />;
};

export default SettingsPage;
