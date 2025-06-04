import React from 'react';
import { TabsContent } from '../ui/tabs';
import ProfileIntro from './ProfileIntro';
import JoiningParty from './JoiningParty';
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
        <JoiningParty userId={userId} />
      </TabsContent>
      <TabsContent value="created">
        <CreatedParties userId={userId} />
      </TabsContent>
    </>
  );
};

export default ProfileTabsContents;
