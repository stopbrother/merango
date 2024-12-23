import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { RecruitWithProfile } from '@/types/parties.types';
import { Button } from '../ui/button';

interface RecruitDetailProps {
  recruit: RecruitWithProfile;
  onClose: () => void;
}
const RecruitDetail = ({ recruit, onClose }: RecruitDetailProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>{recruit.party_type}</DialogDescription>
          <DialogTitle>{recruit.title}</DialogTitle>
        </DialogHeader>
        <div>{recruit.description}</div>

        <div>{/* TODO 참가중인 유저목록 */}유저목록</div>

        <div>
          <Button onClick={onClose}>참가 신청</Button>
          <Button onClick={onClose}>닫기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecruitDetail;
