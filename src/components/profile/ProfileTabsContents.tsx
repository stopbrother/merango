import React from 'react';
import { TabsContent } from '../ui/tabs';

const ProfileTabsContents = () => {
  return (
    <>
      <TabsContent value="intro">소개</TabsContent>
      <TabsContent value="joined">참가 중인 파티</TabsContent>
      <TabsContent value="created">내가 만든 파티</TabsContent>
    </>
  );
};

export default ProfileTabsContents;
