import { updateProfile, updateUserIntro } from '@/api/profile-api';
import { Profile, ProfileForm } from '@/types/profiles.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface useProfileIntroMutationParams {
  intro: Profile['intro'];
}

export const useProfileIntroMutation = (userId: Profile['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ intro }: useProfileIntroMutationParams) =>
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

interface useProfileMutationProps {
  userId: Profile['id'];
  formData: ProfileForm;
}

export const useProfileUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, formData }: useProfileMutationProps) =>
      updateProfile(userId, formData),
    onSuccess: (_, variables) => {
      const { userId } = variables;

      queryClient.invalidateQueries({
        queryKey: ['userProfile', userId],
      });
    },
  });
};
