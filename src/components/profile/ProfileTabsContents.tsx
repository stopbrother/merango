import React from 'react';
import { TabsContent } from '../ui/tabs';
import ProfileIntro from './ProfileIntro';
import JoinedParty from './JoinedParty';
import CreatedParties from './CreatedParties';

interface ProfileTabsContentsProps {
  userId: string;
}

const ProfileTabsContents = ({ userId }: ProfileTabsContentsProps) => {
  return (
    <>
      <TabsContent value="intro">
        <ProfileIntro userId={userId} />
      </TabsContent>
      <TabsContent value="joined">
        <JoinedParty userId={userId} />
      </TabsContent>
      <TabsContent value="created">
        <CreatedParties userId={userId} />
      </TabsContent>
    </>
  );
};

export default ProfileTabsContents;
