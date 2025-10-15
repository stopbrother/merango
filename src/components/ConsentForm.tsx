'use client';

import { useForm } from 'react-hook-form';

import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import { submitConsent } from '@/app/consent/action';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const formSchema = z.object({
  terms: z.boolean().refine((v) => v, { message: '이용약관에 동의해 주세요.' }),
  privacy: z
    .boolean()
    .refine((v) => v, { message: '개인정보처리방침에 동의해 주세요.' }),
});

const ConsentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

        {/* 이용약관 */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <div>
                <FormLabel className="font-medium">이용약관(필수)</FormLabel>
                <p className="text-sm text-muted-foreground">
                  <a
                    className="underline"
                    href="/terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    약관 전문 보기
                  </a>
                </p>
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
            <FormItem className="flex items-start space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <div>
                <FormLabel className="font-medium">
                  개인정보처리방침(필수)
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  <a
                    className="underline"
                    href="/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    전문 보기
                  </a>
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
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
