import { addParties, deleteParty, updateParty } from '@/api/party-api';
import { Recruit, RecruitForm } from '@/types/parties.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 구인글

// 구인글 등록
export const useAddRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addParties,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recruits'],
      });
    },
  });
};

interface UpdateRecruitMutationParams {
  recruitId: Recruit['id'];
  formData: RecruitForm;
}

// 구인글 수정
export const useUpdateRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recruitId, formData }: UpdateRecruitMutationParams) =>
      updateParty(recruitId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recruits'],
      });
    },
    onError: (error) => {
      alert('업데이트 실패');
      console.error(error.message);
    },
  });
};

// 구인글 삭제
export const useDeleteRecruitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recruits'],
      });
    },
  });
};
