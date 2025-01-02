import { addRecruit } from '@/api/party-api';
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
