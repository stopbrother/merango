'use client';

import { RecruitWithProfile } from '@/types/parties.types';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import PartyCard from './PartyCard';
import PartyDetail from './PartyDetail';

interface PartyDialogProps {
  party: RecruitWithProfile;
  partyType?: string;
  partyIdParam: string | null;
}

const PartyDialog = ({ party, partyType, partyIdParam }: PartyDialogProps) => {
  const router = useRouter();
  const isOpen = party.id === partyIdParam; // open상태 결정

  // 모달 라우팅 핸들러
  const handleOpenChange = (open: boolean) => {
    // 쿼리스트링 추가/제거 로직(열릴때 id추가, 닫힐때 id제거)

    const params = new URLSearchParams();

    if (partyType && partyType !== 'all') params.set('partyType', partyType);

    if (open) params.set('id', party.id);

    const paramsString = params.toString();
    const url = paramsString ? `/recruit?${paramsString}` : '/recruit';

    router.replace(url, { scroll: false });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <PartyCard recruit={party} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogDescription>{party.party_type}</DialogDescription>
          <DialogTitle>{party.title}</DialogTitle>
        </DialogHeader>

        <PartyDetail recruit={party} isModal />
      </DialogContent>
    </Dialog>
  );
};

export default PartyDialog;
