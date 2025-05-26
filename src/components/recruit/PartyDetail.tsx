'use client';
import { useAuthQuery } from '@/query/auth/useAuthQuery';
import {
  useCancelJoinRequestMutation,
  useRequestJoinPartyMutation,
} from '@/query/member/usePartyMemberMutation';
import {
  useHasJoinedPartyQuery,
  usePartyMembersQuery,
} from '@/query/member/usePartyMemberQuery';
import { useDeleteRecruitMutation } from '@/query/party/usePartyMutation';
import { RecruitWithProfile } from '@/types/parties.types';
import { Pencil, Trash2 } from 'lucide-react';
import PartyRecruitForm from '../PartyRecruitForm';
import { Button } from '../ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import TooltipWrapper from '../TooltipWrapper';
import { useState } from 'react';

interface PartyDetailProps {
  recruit: RecruitWithProfile;
}
const PartyDetail = ({ recruit }: PartyDetailProps) => {
  // 수정하기폼 모달 상태
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 참가 중인 멤버
  const { data: partyMembers, error } = usePartyMembersQuery(recruit.id);
  if (error) console.log('error', error);

  // 로그인 사용자
  const { data: currentUser } = useAuthQuery();
  const userId = currentUser?.id || '';

  // 참가 신청한 파티인지 확인
  const { data: isJoined } = useHasJoinedPartyQuery(recruit.id, userId);

  // 참가 신청
  const { mutate: requestJoin } = useRequestJoinPartyMutation(
    recruit.id,
    userId
  );

  // 참가 취소
  const { mutate: cancelJoin } = useCancelJoinRequestMutation();

  // 구인글 삭제
  const { mutate: deleteRecruit } = useDeleteRecruitMutation();

  // 로그인한 사용자가 작성자인지 확인
  const isOwner = recruit.created_by.id === userId;

  // 구인글 삭제 핸들러
  const handleDeleteRecruit = () => {
    if (!confirm('삭제하시겠습니까?')) return;
    deleteRecruit(recruit.id);
  };

  // 구인글 수정 핸들러
  //   const handleUpdateRecruit = () => {
  //     if (!confirm('수정하시겠습니까?')) return;
  // ;
  //   };

  return (
    // TODO: action 버튼들 분리
    <>
      <DialogContent>
        {isOwner && (
          <>
            <TooltipWrapper message="수정">
              <button
                onClick={() => setIsEditOpen(true)}
                className="absolute top-4 right-[4.5rem] opacity-70 hover:opacity-100"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </TooltipWrapper>

            <TooltipWrapper message="삭제">
              <button
                onClick={handleDeleteRecruit}
                className="absolute top-4 right-11 opacity-70 hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </TooltipWrapper>
          </>
        )}
        <DialogHeader>
          <DialogDescription>{recruit.party_type}</DialogDescription>
          <DialogTitle>{recruit.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-700">{recruit.description}</p>
        </div>

        {/* TODO: 참가자 목록 컴포넌트 분리  */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">참가자 목록</h3>
          <ul className="space-y-4">
            {partyMembers?.map((member) => (
              <li key={member.id} className="flex items-center gap-4">
                <p className="text-gray-800 font-semibold">
                  {member.profile_id.username}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          {isOwner ? (
            <TooltipWrapper message="파티장은 취소할 수 없습니다.">
              <div>
                <Button
                  disabled
                  variant="outline"
                  className="px-4 py-2 border border-gray-400 text-gray-700 hover:bg-gray-100"
                >
                  참가 취소
                </Button>
              </div>
            </TooltipWrapper>
          ) : isJoined ? (
            <Button
              onClick={() => cancelJoin({ partyId: recruit.id, userId })}
              variant="outline"
              className="px-4 py-2 border border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              참가 취소
            </Button>
          ) : (
            <Button
              onClick={() => requestJoin(recruit.id)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700"
            >
              참가 신청
            </Button>
          )}

          <DialogClose asChild>
            <Button className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
        {/* <div className="mt-6 flex justify-center gap-4">
          </div> */}
      </DialogContent>

      {/* 수정하기 모달 */}
      {isEditOpen && (
        <PartyRecruitForm
          open={isEditOpen}
          editData={recruit}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default PartyDetail;
