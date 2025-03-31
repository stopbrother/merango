import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileTabsContents from '@/components/profile/ProfileTabsContents';
import ProfileTabsTrigger from '@/components/profile/ProfileTabsTrigger';
import { Tabs } from '@/components/ui/tabs';
import { createClient } from '@/utils/supabase/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const ProfilePage = async () => {
  const serverClient = createClient();

  return (
    <HydrationBoundary state={dehydrate}>
      <ProfileInfo />
      <Tabs defaultValue="intro">
        <ProfileTabsTrigger />
        <ProfileTabsContents />
      </Tabs>
    </HydrationBoundary>
  );
};

export default ProfilePage;
