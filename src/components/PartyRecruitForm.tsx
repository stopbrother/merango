'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PARTY_TYPE_OPTIONS } from '@/constants/partyType';
import { useAuthQuery } from '@/query/auth/useAuthQuery';
import {
  useAddRecruitMutation,
  useUpdateRecruitMutation,
} from '@/query/party/usePartyMutation';
import { useCreatedPartiesCountQuery } from '@/query/party/usePartyQuery';
import { RecruitWithProfile } from '@/types/parties.types';
import clsx from 'clsx';
import { toast } from 'sonner';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';

interface PartyRecruitFormProps {
  open: boolean;
  onClose: () => void;
  editData?: RecruitWithProfile;
}

const FormSchema = z.object({
  party_type: z.enum(['hunt', 'quest', 'boss']),
  title: z.string().min(2, {
    message: '2글자 이상 입력해주세요.',
  }),
  description: z.string(),
});

const PartyRecruitForm = ({
  open,
  onClose,
  editData,
}: PartyRecruitFormProps) => {
  // 로그인 정보
  const { data: user } = useAuthQuery();
  const userId = user?.id ?? '';
  // 생성한 구인글 개수 조회
  const { data: createdCount } = useCreatedPartiesCountQuery(userId);
  // 구인글 등록
  const { mutate: addRecruit } = useAddRecruitMutation();
  // 구인글 수정
  const { mutate: updateRecruit } = useUpdateRecruitMutation();

  // 글작성 5개 제한
  const isLimitReached = (createdCount ?? 0) >= 5;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: editData ?? {
      party_type: 'hunt',
      title: '',
      description: '',
    },
  });

  // TODO: 작성/수정 함수분리
  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    // 작성일 경우 5개제한
    if (!editData && isLimitReached)
      return toast.error('최대 5개까지 작성할 수 있습니다.');

    // 수정 모드
    if (editData) {
      updateRecruit(
        { recruitId: editData.id, formData },
        { onSuccess: onClose }
      );
      return;
    }

    // 작성 모드
    addRecruit(formData, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
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
                    {PARTY_TYPE_OPTIONS.map(({ value, label }) => (
                      <div key={value} className="flex items-center gap-1">
                        <RadioGroupItem value={value} />
                        <FormLabel>{label}</FormLabel>
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
                  <Textarea
                    placeholder="내용을 입력하세요 (기본 이모지만 사용 가능)"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <div
              className={clsx(
                'flex gap-1 text-sm',
                isLimitReached
                  ? 'text-destructive font-semibold'
                  : 'text-muted-foreground'
              )}
            >
              <p>구인글은 5개까지 작성 가능합니다</p>
              <span>({createdCount}/5)</span>
            </div>

            <div className="flex justify-between">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-[#E5E7EB] hover:bg-[#D1D5DB]"
                >
                  취소
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isLimitReached}
                className="bg-[#FFD700] text-black hover:bg-yellow-500"
              >
                완료
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartyRecruitForm;
