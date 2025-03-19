import { addMember } from '@/api/member-api';
import { PartyMember } from '@/types/parties.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 파티멤버
// 참가신청
export const useAddMemberMutation = (id: PartyMember['party_id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members', id],
      });
    },

    onError: (error) => {
      if (error.message.includes('unique_recruit_member'))
        alert('이미 신청하셨습니다.');

      console.error(error.message);
    },
  });
};
