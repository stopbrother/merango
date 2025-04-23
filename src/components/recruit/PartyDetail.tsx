import { useAuthQuery } from '@/query/auth/useAuthQuery';
import { useRequestJoinedPartyMutation } from '@/query/member/usePartyMemberMutation';
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

interface PartyDetailProps {
  recruit: RecruitWithProfile;
}
const PartyDetail = ({ recruit }: PartyDetailProps) => {
  // 수정하기 모달 상태
  // const [isEditOpen, setIsEditOpen] = useState(false);

  // 참가 중인 멤버
  const { data: members, error } = usePartyMembersQuery(recruit.id);
  if (error) console.log('error', error);

  // 로그인 사용자
  const { data: currentUser } = useAuthQuery();
  const userId = currentUser?.id || '';

  // 참가 신청한 파티인지 확인
  const { data: isMember } = useHasJoinedPartyQuery(recruit.id, userId);

  // 참가 신청
  const { mutate: addMember } = useRequestJoinedPartyMutation(
    recruit.id,
    userId
  );

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
    <>
      <DialogContent>
        {/* Tooltip 컴포넌트 사용시 별도의 컴포넌트로 추출 ex) icon을 children으로 */}
        {isOwner && (
          <>
            <PartyRecruitForm editData={recruit}>
              <button
                className="absolute top-4 right-[4.5rem] opacity-70 hover:opacity-100"
                title="수정"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </PartyRecruitForm>
            <button
              onClick={handleDeleteRecruit}
              className="absolute top-4 right-11 opacity-70 hover:opacity-100"
              title="삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
        <DialogHeader>
          <DialogDescription>{recruit.party_type}</DialogDescription>
          <DialogTitle>{recruit.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-700">{recruit.description}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">참가자 목록</h3>
          <ul className="space-y-4">
            {members?.map((member) => (
              <li key={member.id} className="flex items-center gap-4">
                <p className="text-gray-800 font-semibold">
                  {member.profile_id.username}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          {isMember ? (
            <Button disabled>참가중</Button>
          ) : (
            <Button
              onClick={() => addMember(recruit.id)}
              className="px-4 py-2 bg-green-600"
            >
              참가 신청
            </Button>
          )}

          <DialogClose asChild>
            <Button className="px-4 py-2 bg-gray-300 text-gray-800">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
        {/* <div className="mt-6 flex justify-center gap-4">
          </div> */}
      </DialogContent>

      {/* 수정하기 모달 */}
      {/* <RecruitForm open={isEditOpen} editData={recruit} /> */}
    </>
  );
};

export default PartyDetail;
