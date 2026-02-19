'use client';
import { PARTY_TYPE_OPTIONS } from '@/constants/partyType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search } from 'lucide-react';

const formSchema = z.object({
  keyword: z.string(),
  partyType: z.enum(['all', 'hunt', 'quest', 'boss']),
});

const SearchPartyForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: '',
      partyType: 'all',
    },
  });

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    const { keyword, partyType: party_type } = formData;

    if (!formData.keyword.trim()) return toast.error('검색어를 입력해주세요.');

    router.push(`/recruits?keyword=${keyword}&partyType=${party_type}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-w-lg w-full mx-auto bg-gray-100 p-3 border border-gray-300 rounded-lg shadow-md sm:flex-row sm:items-center sm:justify-center"
      >
        {/* input */}
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="파티명 검색"
                  className="px-4 py-2 border border-gray-300 bg-white rounded-md w-full sm:w-64"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* select */}
        <FormField
          control={form.control}
          name="partyType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="px-4 py-2 m-0 border border-gray-300 bg-white rounded-md text-gray-700 w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {PARTY_TYPE_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md w-full sm:w-auto ">
          <Search className="size-4" aria-hidden />
          검색
        </Button>
      </form>
    </Form>
  );
};

export default SearchPartyForm;
