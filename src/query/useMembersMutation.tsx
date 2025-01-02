import { addMember } from '@/api/member-api';
import { PartyMember } from '@/types/parties.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
