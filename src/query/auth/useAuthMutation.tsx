import { signInWithDiscord, signOut } from '@/api/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 로그인 및 로그아웃

// 로그인
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

// 로그아웃
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
