import { getJoinedParties } from '@/api/member-api';
import { getCreatedParties } from '@/api/party-api';
import { getUserProfile } from '@/api/profile-api';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { createClient } from '@/utils/supabase/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const userId = params.id;

  const serverClient = createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(serverClient, userId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['createdParties', userId],
    queryFn: () => getCreatedParties(serverClient, userId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['joinedParties', userId],
    queryFn: () => getJoinedParties(serverClient, userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileInfo userId={userId} />
      <ProfileTabs userId={userId} />
    </HydrationBoundary>
  );
};

export default ProfilePage;
