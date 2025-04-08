import React from 'react';
import { TabsContent } from '../ui/tabs';
import ProfileIntro from './ProfileIntro';

interface ProfileTabsContentsProps {
  userId: string;
}

const ProfileTabsContents = ({ userId }: ProfileTabsContentsProps) => {
  if (!userId) return;
  return (
    <>
      <TabsContent value="intro">
        <ProfileIntro userId={userId} />
      </TabsContent>
      <TabsContent value="joined">참가 중인 파티</TabsContent>
      <TabsContent value="created">내가 만든 파티</TabsContent>
    </>
  );
};

export default ProfileTabsContents;
