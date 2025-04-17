'use client';

import { useRecruitQuery } from '@/query/party/usePartyQuery';
import { Dialog, DialogTrigger } from '../ui/dialog';
import RecruitCard from './RecruitCard';
import RecruitDetail from './RecruitDetail';
import QueryStateWrapper from '../QueryStateWrapper';

const RecruitList = () => {
  const { data, isLoading, error } = useRecruitQuery();

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
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
    </QueryStateWrapper>
  );
};

export default RecruitList;
