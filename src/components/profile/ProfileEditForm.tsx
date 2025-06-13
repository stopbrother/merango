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
import { useProfileUpdateMutation } from '@/query/profile/useProfileMutation';
import { useAuthQuery } from '@/query/auth/useAuthQuery';
import { useProfileQuery } from '@/query/profile/useProfileQuery';
import QueryStateWrapper from '../QueryStateWrapper';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z.string().min(2, {
    message: '닉네임은 최소 2자 이상이어야 합니다.',
  }),
  social_name: z.string(),
  level: z.number().min(1).max(200),
  job: z.string(),
});

const ProfileEditForm = () => {
  const { data: user } = useAuthQuery();
  const { data: profile, isLoading, error } = useProfileQuery(user?.id ?? '');
  const { mutate: updateProfile } = useProfileUpdateMutation();

  if (!profile) return <div>정보없음</div>;

  const { username, social_name, level, job } = profile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username,
      social_name: social_name ?? '',
      level: level ?? undefined,
      job: job ?? '',
    },
  });

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    console.log('formData', formData);
    if (!profile) return;

    updateProfile({ userId: profile.id, formData });
  };

  return (
    <QueryStateWrapper isLoading={isLoading} error={error}>
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
                <FormDescription>인게임 닉네임을 입력해주세요.</FormDescription>
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
  );
};

export default ProfileEditForm;
