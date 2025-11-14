import { getUserProfile } from '@/api/profile-api';
import { createClient } from '@/utils/supabase/server';
import LoginButton from './LoginButton';
import UserDropdownButton from './UserDropdownButton';

const AuthHeader = async () => {
  const client = createClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) return <LoginButton />;

  const userId = user?.id ?? '';
  const profile = await getUserProfile(client, userId);

  return <UserDropdownButton profile={profile} />;
};

export default AuthHeader;
