'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { useAddRecruitMutation } from '@/query/party/usePartyMutation';

const FormSchema = z.object({
  party_type: z.enum(['사냥', '퀘스트', '보스']),
  title: z.string().min(2, {
    message: '2글자 이상 입력해주세요.',
  }),
  description: z.string(),
});

const RecruitForm = () => {
  const [open, setOpen] = useState(false);
  const { mutate: addRecruit } = useAddRecruitMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      party_type: '사냥',
      title: '',
      description: '',
    },
  });

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    // const { party_type, title, description } = data;
    console.log('data', formData);
    addRecruit(formData, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFD700] text-[#333333] font-bold w-[120px] h-[40px]">
          구인 하기
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>구인</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* 파티 타입 */}
            <FormField
              control={form.control}
              name="party_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>파티 유형</FormLabel>
                  <RadioGroup
                    className="flex flex-row"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {['사냥', '퀘스트', '보스'].map((type) => (
                      <div key={type} className="flex items-center gap-1">
                        <RadioGroupItem value={type} />
                        <FormLabel>{type}</FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
            {/* 제목 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <Input placeholder="제목을 입력하세요" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 파티 설명 */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>파티 설명</FormLabel>
                  <Textarea {...field} />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="submit">완료</Button>
              <DialogClose asChild>
                <Button type="button">취소</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RecruitForm;
