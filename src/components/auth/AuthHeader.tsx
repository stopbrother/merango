import { getUserProfile } from '@/api/profile-api';
import { createClient } from '@/utils/supabase/server';
import LoginButton from './LoginButton';
import UserDropdownButton from './UserDropdownButton';
import { getCurrentUser } from '@/api/auth-api';

const AuthHeader = async () => {
  const client = createClient();
  const user = await getCurrentUser(client);

  if (!user) return <LoginButton />;

  const profile = await getUserProfile(client, user?.id);

  return (
    <>
      <UserDropdownButton profile={profile} />
    </>
  );
};

export default AuthHeader;
