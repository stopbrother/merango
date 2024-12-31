import { addMember, addRecruit } from '@/api/party-api';
import { PartyMember } from '@/types/parties.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 구인글
export const useAddRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRecruit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recruits'],
      });
    },
  });
};

// 파티멤버
export const useAddMemberMutation = (id: PartyMember['party_id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members', id],
      });
    },
  });
};
