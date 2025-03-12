import { signInWithDiscord, signOut } from '@/api/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSigninMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInWithDiscord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['currentUser'],
      });
    },
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['currentUser'],
      });
    },
  });
};
