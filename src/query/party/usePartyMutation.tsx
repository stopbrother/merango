import { addRecruit, deleteRecruit } from '@/api/party-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 구인글

// 구인글 등록
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

// 구인글 업데이트

// 구인글 삭제
export const useDeleteRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecruit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recruits'],
      });
    },
  });
};
