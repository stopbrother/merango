import { updateUserIntro } from '@/api/profile-api';
import { Profile } from '@/types/profiles.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface useProfileMutationParams {
  intro: Profile['intro'];
}

export const useProfileMutation = (userId: Profile['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ intro }: useProfileMutationParams) =>
      updateUserIntro(intro, userId),
    onSuccess: () => {
      toast.success('프로필 소개가 업데이트 되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['userProfile', userId],
      });
    },
    onError: () => {
      toast.error('업데이트에 실패했습니다.');
    },
  });
};
