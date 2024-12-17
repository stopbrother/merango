'use client';

import { useRecruitQuery } from '@/query/useRecruitQuery';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const RecruitList = () => {
  const { data, error } = useRecruitQuery();

  if (error) console.log('error', error);

  console.log('data', data);

  return (
    <ul>
      {data?.map((recruit) => (
        <Card key={recruit.id}>
          <CardHeader>
            {recruit.party_type}
            <span className="text-sm text-gray-500">
              {recruit.created_date_time}
            </span>
          </CardHeader>
          <CardTitle>{recruit.title}</CardTitle>
          <CardContent>{recruit.description}</CardContent>
          <CardFooter>{recruit.created_by.username}</CardFooter>
        </Card>
      ))}
    </ul>
  );
};

export default RecruitList;
