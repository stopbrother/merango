'use client';

import { useRecruitQuery } from '@/query/party/usePartyQuery';
import { Dialog, DialogTrigger } from '../ui/dialog';
import RecruitCard from './RecruitCard';
import RecruitDetail from './RecruitDetail';

const RecruitList = () => {
  const { data, error } = useRecruitQuery();

  if (error) console.log('error', error);

  console.log('data', data);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((recruit) => (
        <Dialog key={recruit.id}>
          <DialogTrigger>
            <RecruitCard recruit={recruit} />
          </DialogTrigger>
          <RecruitDetail recruit={recruit} />
        </Dialog>
      ))}
    </ul>
  );
};

export default RecruitList;
