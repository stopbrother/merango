import { cancelJoinRequest, requestJoinParty } from '@/api/member-api';
import { PartyMember } from '@/types/parties.types';
import { Profile } from '@/types/profiles.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 파티참가
// 참가신청
export const useRequestJoinPartyMutation = (
  partyId: PartyMember['party_id'],
  userId: Profile['id']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestJoinParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members', partyId], // 참가자 목록
      });

      queryClient.invalidateQueries({
        queryKey: ['joinedParties', userId], // 참가중인 파티 목록
      });

      queryClient.invalidateQueries({
        queryKey: ['isJoined', partyId, userId], // 참가 여부
      });
    },

    onError: (error) => {
      if (error.message.includes('unique_recruit_member'))
        alert('이미 신청하셨습니다.');

      console.error(error.message);
    },
  });
};

interface PartyMemberMutationParams {
  partyId: PartyMember['party_id'];
  userId: PartyMember['profile_id'];
}

// 참가신청 취소
export const useCancelJoinRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ partyId, userId }: PartyMemberMutationParams) =>
      cancelJoinRequest(partyId, userId),
    onSuccess: (_, variables) => {
      const { partyId, userId } = variables; // mutate 인자

      queryClient.invalidateQueries({
        queryKey: ['members', partyId], // 참가자 목록
      });

      queryClient.invalidateQueries({
        queryKey: ['joinedParties', userId], // 참가중인 파티 목록
      });

      queryClient.invalidateQueries({
        queryKey: ['isJoined', partyId, userId], // 참가 여부
      });
    },
  });
};
