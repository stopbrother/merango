import { useAddMemberMutation } from '@/query/member/useMembersMutation';
import {
  useIsMemberQuery,
  useMembersQuery,
} from '@/query/member/useMembersQuery';
import { RecruitWithProfile } from '@/types/parties.types';
import { Button } from '../ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useAuthQuery } from '@/query/auth/useAuthQuery';

interface RecruitDetailProps {
  recruit: RecruitWithProfile;
}
const RecruitDetail = ({ recruit }: RecruitDetailProps) => {
  // 참가 중인 멤버
  const { data: members, error } = useMembersQuery(recruit.id);
  if (error) console.log('error', error);

  // 로그인 사용자
  const { data: currentUser } = useAuthQuery();
  const userId = currentUser?.id || '';

  // 참가 신청한 파티인지 확인
  const { data: isMember } = useIsMemberQuery(recruit.id, userId);

  // 참가 신청
  const { mutate: addMember } = useAddMemberMutation(recruit.id);

  return (
    <DialogContent>
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
          <Button className="px-4 py-2 bg-gray-300 text-gray-800">닫기</Button>
        </DialogClose>
      </DialogFooter>
      {/* <div className="mt-6 flex justify-center gap-4">
        </div> */}
    </DialogContent>
  );
};

export default RecruitDetail;
