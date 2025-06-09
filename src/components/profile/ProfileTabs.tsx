'use client';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CreatedParties from './CreatedParties';
import JoiningParty from './JoiningParty';
import ProfileIntro from './ProfileIntro';

interface ProfileTabsProps {
  userId: string;
}

const ProfileTabs = ({ userId }: ProfileTabsProps) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'intro';

  return (
    <Tabs defaultValue={tab}>
      <TabsList className="border-b">
        <TabsTrigger value="intro" variant="underline">
          소개
        </TabsTrigger>
        <TabsTrigger value="joined" variant="underline">
          참가 중인 파티
        </TabsTrigger>
        <TabsTrigger value="created" variant="underline">
          생성한 파티
        </TabsTrigger>
      </TabsList>

      <TabsContent value="intro">
        <ProfileIntro userId={userId} />
      </TabsContent>
      <TabsContent value="joined">
        <JoiningParty userId={userId} />
      </TabsContent>
      <TabsContent value="created">
        <CreatedParties userId={userId} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
