import { requestJoinParty } from '@/api/member-api';
import { PartyMember } from '@/types/parties.types';
import { Profile } from '@/types/profiles.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 파티참가
// 참가신청
export const useRequestJoinedPartyMutation = (
  partyId: PartyMember['party_id'],
  userId: Profile['id']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestJoinParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members', partyId],
      });

      queryClient.invalidateQueries({
        queryKey: ['joinedParties', userId], // 참가중인 파티 목록
      });
    },

    onError: (error) => {
      if (error.message.includes('unique_recruit_member'))
        alert('이미 신청하셨습니다.');

      console.error(error.message);
    },
  });
};
