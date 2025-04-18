import { getCreatedParties } from '@/api/party-api';
import { getUserProfile } from '@/api/profile-api';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileTabsContents from '@/components/profile/ProfileTabsContents';
import ProfileTabsTrigger from '@/components/profile/ProfileTabsTrigger';
import { Tabs } from '@/components/ui/tabs';
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileInfo userId={userId} />
      <Tabs defaultValue="intro">
        <ProfileTabsTrigger />
        <ProfileTabsContents userId={userId} />
      </Tabs>
    </HydrationBoundary>
  );
};

export default ProfilePage;
