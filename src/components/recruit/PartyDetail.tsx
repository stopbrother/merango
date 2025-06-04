'use client';
import { useAuthQuery } from '@/query/auth/useAuthQuery';
import {
  useRemovePartyMemberMutation,
  useRequestJoinPartyMutation,
} from '@/query/member/usePartyMemberMutation';
import {
  useHasJoinedPartyQuery,
  usePartyMembersQuery,
} from '@/query/member/usePartyMemberQuery';
import {
  useDeleteRecruitMutation,
  useRaisePartyMutation,
} from '@/query/party/usePartyMutation';
import { RecruitWithProfile } from '@/types/parties.types';
import { Loader2Icon, MoveUp, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import PartyRecruitForm from '../PartyRecruitForm';
import TooltipWrapper from '../TooltipWrapper';
import { Button } from '../ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { canRaiseParty } from '@/utils/time';
import { toast } from 'sonner';
import Link from 'next/link';
import ProfileAvatar from '../ProfileAvatar';

interface PartyDetailProps {
  recruit: RecruitWithProfile;
}
const PartyDetail = ({ recruit }: PartyDetailProps) => {
  // 수정하기폼 모달 상태
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 참가 중인 멤버
  const { data: partyMembers } = usePartyMembersQuery(recruit.id);

  // 로그인 사용자
  const { data: currentUser } = useAuthQuery();
  const currentUserId = currentUser?.id || '';

  // 참가 신청한 파티인지 확인
  const { data: isJoined } = useHasJoinedPartyQuery(recruit.id, currentUserId);

  // 참가 신청
  const { mutate: requestJoin, isPending: isJoining } =
    useRequestJoinPartyMutation(recruit.id, currentUserId);

  // 참가 취소 & 추방
  const { mutate: removeMember, isPending } = useRemovePartyMemberMutation();

  // 구인글 삭제
  const { mutate: deleteRecruit } = useDeleteRecruitMutation();

  // 구인글 끌어올리기
  const { mutate: raiseParty } = useRaisePartyMutation();

  // 로그인한 사용자가 작성자인지 확인
  const isOwner = recruit.created_by.id === currentUserId;

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

  // 구인글 끌어올리기 핸들러
  const handleRaiseParty = () => {
    // 끌어올리기 가능 여부 판단하는 유틸함수
    const { ok, wait } = canRaiseParty(recruit.raised_date_time);

    if (!confirm('해당 글을 끌어올리시겠습니까? (쿨타임: 30분)')) return;

    if (!ok) return toast.warning(`${wait}분 후에 끌어올릴 수 있습니다.`);

    raiseParty(recruit.id);
  };

  // 참가하기 핸들러
  const handleRequestJoin = () => {
    if (partyMembers?.length ?? 0 >= 6)
      return toast.error('최대 인원(6명)이 찼습니다.');

    requestJoin(recruit.id);
  };

  // 참가취소 & 추방하기 핸들러
  const handleRemoveMember = (userId: string, isSelf: boolean) => {
    const confirmMessage = isSelf
      ? '참가를 취소하시겠습니까?'
      : '추방하시겠습니까?';

    if (!confirm(confirmMessage)) return;

    removeMember({ partyId: recruit.id, userId });
  };

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
              <li key={member.id} className="flex items-center justify-between">
                <Link
                  href={`/profile/${member.profile_id.id}`}
                  className="flex flex-row gap-2 items-center text-gray-800 font-semibold hover:bg-gray-200"
                >
                  <ProfileAvatar profileImg={member.profile_id.avatar_url} />
                  {member.profile_id.username}
                </Link>
                {/* 추방하기 버튼(작성자만 보이고 작성자 본인은 추방x) */}
                {isOwner && currentUserId !== member.profile_id.id && (
                  <Button
                    onClick={() =>
                      handleRemoveMember(member.profile_id.id, false)
                    }
                    disabled={isPending}
                    variant="link"
                    className="text-sm text-red-500"
                  >
                    {isPending && <Loader2Icon className="animate-spin" />}
                    추방
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Dialog footer 영역 */}
        <div className="mt-6 flex justify-end">
          {/* 좌측하단 : 끌어올리기 버튼 */}
          {isOwner && (
            <Button
              onClick={handleRaiseParty}
              variant="outline"
              className="text-blue-600 border-blue-500 hover:bg-blue-50 mr-auto"
            >
              <MoveUp className="w-4 h-4" />
              끌어올리기
            </Button>
          )}
          {/* 우측하단: 참가/취소 + 닫기 버튼 */}
          <div className="flex gap-2">
            {/* disabled버튼(작성자) */}
            {isOwner && (
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
            )}

            {/* 참가 취소 버튼 */}
            {!isOwner && isJoined && (
              <Button
                onClick={() => handleRemoveMember(currentUserId, true)}
                disabled={isPending}
                variant="outline"
                className="px-4 py-2 border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                참가 취소
              </Button>
            )}

            {/* 참가 신청 버튼 */}
            {!isOwner && !isJoined && (
              <Button
                onClick={handleRequestJoin}
                disabled={isJoining}
                className="px-4 py-2 bg-green-600 hover:bg-green-700"
              >
                {isJoining && <Loader2Icon className="animate-spin" />}
                참가 신청
              </Button>
            )}

            <DialogClose asChild>
              <Button className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400">
                닫기
              </Button>
            </DialogClose>
          </div>
        </div>
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
