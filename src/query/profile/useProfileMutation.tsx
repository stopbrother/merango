import { updateUserIntro } from '@/api/profile-api';
import { Profile } from '@/types/profiles.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface useProfileMutationParams {
  intro: Profile['intro'];
}

export const useProfileMutation = (userId: Profile['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ intro }: useProfileMutationParams) =>
      updateUserIntro(intro, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userProfile', userId],
      });
    },
  });
};
