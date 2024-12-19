'use client';

import { useRecruitQuery } from '@/query/useRecruitQuery';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';

const RecruitList = () => {
  const { data, error } = useRecruitQuery();

  if (error) console.log('error', error);

  console.log('data', data);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((recruit) => (
        <Card key={recruit.id} className="hover:shadow-lg cursor-pointer">
          <CardHeader className="w-full flex flex-row justify-between items-center">
            <Badge>{recruit.party_type}</Badge>
            <span className="text-sm text-gray-500 !mt-0">
              {recruit.created_date_time}
            </span>
          </CardHeader>
          <CardTitle className="text-center">{recruit.title}</CardTitle>
          <CardFooter className="justify-center">
            파티장: {recruit.created_by.username}
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
};

export default RecruitList;
