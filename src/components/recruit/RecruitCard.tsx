import React from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { RecruitWithProfile } from '@/types/parties.types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface RecruitCardProps {
  recruit: RecruitWithProfile;
  onClick: () => void;
}
const RecruitCard = ({ recruit, onClick }: RecruitCardProps) => {
  const formattedTime = formatDistanceToNow(
    new Date(recruit.created_date_time),
    {
      addSuffix: true,
      locale: ko,
    }
  );
  return (
    <Card
      key={recruit.id}
      onClick={onClick}
      className="hover:shadow-lg cursor-pointer"
    >
      <CardHeader className="w-full flex flex-row justify-between items-center">
        <Badge>{recruit.party_type}</Badge>
        <span className="text-sm text-gray-500 !mt-0">{formattedTime}</span>
      </CardHeader>
      <CardTitle className="text-center">{recruit.title}</CardTitle>
      <CardFooter className="justify-center">
        파티장: {recruit.created_by.username}
      </CardFooter>
    </Card>
  );
};

export default RecruitCard;
