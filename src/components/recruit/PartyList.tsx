'use client';

import { RecruitWithProfile } from '@/types/parties.types';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import PartyCard from './PartyCard';
import PartyDetail from './PartyDetail';

interface PartyListProps {
  parties: RecruitWithProfile[];
}

const PartyList = ({ parties }: PartyListProps) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
      {parties?.map((party) => (
        <Dialog key={party.id}>
          <DialogTrigger>
            <PartyCard recruit={party} />
          </DialogTrigger>

          <DialogContent>
            <PartyDetail recruit={party} />
          </DialogContent>
        </Dialog>
      ))}
    </ul>
  );
};

export default PartyList;
