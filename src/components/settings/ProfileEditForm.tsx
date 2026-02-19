'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useProfileUpdateMutation } from '@/hooks/query/profile/useProfileMutation';
import { useAuthQuery } from '@/hooks/query/auth/useAuthQuery';
import { useProfileQuery } from '@/hooks/query/profile/useProfileQuery';
import QueryStateWrapper from '../common/QueryStateWrapper';
import { MSG } from '@/constants/messages';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// TODO: /schemas/... 경로로 분리
const formSchema = z.object({
  username: z.string().min(2, {
    message: MSG.USERNAME.MIN, // zod4부터 message → error
  }),
  social_name: z.string(),
  level: z.coerce
    .number({
      message: MSG.LEVEL.TYPE,
    })
    .min(1, { message: MSG.LEVEL.MIN })
    .max(200, { message: MSG.LEVEL.MAX }),
  job: z.string(),
});

const ProfileEditForm = () => {
  const router = useRouter();

  const { data: user } = useAuthQuery();
  const { data: profile, isLoading, error } = useProfileQuery(user?.id ?? '');
  const { mutate: updateProfile } = useProfileUpdateMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile?.username,
      social_name: profile?.social_name ?? '',
      level: profile?.level ?? undefined,
      job: profile?.job ?? '',
    },
  });

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    if (!profile) return;

    updateProfile(
      { userId: profile.id, formData },
      {
        onSuccess: () => {
          toast.success('프로필 정보가 수정 되었습니다.');
          router.back();
        },
      }
    );
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            파티 매칭을 위해 닉네임·레벨·직업은 필수입니다.
          </p>
        </div>
      </div>

      <QueryStateWrapper isPending={isLoading} error={error}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 닉네임 */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <Input placeholder="" {...field} />
                  <FormDescription>
                    인게임 닉네임을 입력해주세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 소셜 닉네임 */}
            <FormField
              control={form.control}
              name="social_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>소셜 코드</FormLabel>
                  <Input placeholder="예: #abcd" {...field} />
                  <FormDescription>
                    메이플 월드 프로필(소셜) 코드를 입력해주세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 레벨 */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>레벨</FormLabel>
                  <Input placeholder="예: 123" {...field} />
                  <FormDescription>레벨을 입력해주세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 직업 */}
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>직업</FormLabel>
                  <Input placeholder="예: 용기사" {...field} />
                  <FormDescription>직업을 입력해주세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>저장</Button>
          </form>
        </Form>
      </QueryStateWrapper>
    </>
  );
};

export default ProfileEditForm;
