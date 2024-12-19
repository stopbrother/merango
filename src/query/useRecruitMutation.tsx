import { addRecruit } from '@/api/recruit-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
