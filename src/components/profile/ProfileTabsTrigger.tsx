import React from 'react';
import { TabsList, TabsTrigger } from '../ui/tabs';

const ProfileTabsTrigger = () => {
  return (
    <TabsList>
      <TabsTrigger value="intro">소개</TabsTrigger>
      <TabsTrigger value="joined">참가 중인 파티</TabsTrigger>
      <TabsTrigger value="created">내가 만든 파티</TabsTrigger>
    </TabsList>
  );
};

export default ProfileTabsTrigger;
