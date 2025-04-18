import React from 'react';
import { TabsList, TabsTrigger } from '../ui/tabs';

const ProfileTabsTrigger = () => {
  return (
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
  );
};

export default ProfileTabsTrigger;
