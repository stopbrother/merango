'use client';

import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import PolicyDialog from '../docs/PolicyDialog';
import { submitConsent } from '@/app/(plain)/consent/action';

const formSchema = z.object({
  age14: z
    .boolean()
    .refine((v) => v, { message: '만 14세 이상만 가입할 수 있습니다.' }),
  terms: z.boolean().refine((v) => v, { message: '이용약관에 동의해 주세요.' }),
  privacy: z
    .boolean()
    .refine((v) => v, { message: '개인정보처리방침에 동의해 주세요.' }),
});

const ConsentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age14: false,
      terms: false,
      privacy: false,
    },
  });

  const onSubmit = async () => {
    await submitConsent();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 전체 동의
        <FormField
          control={form.control}
          name="all"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 rounded-lg border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-medium">모두 동의합니다</FormLabel>
            </FormItem>
          )}
        /> */}
        {/* 만14세이상 */}
        <FormField
          control={form.control}
          name="age14"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="cursor-pointer"
                />
              </FormControl>
              <FormLabel className="font-medium cursor-pointer">
                만 14세 이상입니다 (필수)
              </FormLabel>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이용약관 */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="cursor-pointer"
                />
              </FormControl>
              <div className="space-x-2">
                <FormLabel className="font-medium cursor-pointer">
                  이용약관 동의 (필수)
                </FormLabel>

                <PolicyDialog policy="terms" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 개인정보처리방침 */}
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="cursor-pointer"
                />
              </FormControl>
              <div className="space-x-2">
                <FormLabel className="font-medium cursor-pointer">
                  개인정보처리방침 동의 (필수)
                </FormLabel>
                <PolicyDialog policy="privacy" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex pt-2 justify-center">
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            동의하고 계속하기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ConsentForm;
