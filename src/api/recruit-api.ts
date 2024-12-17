import { RecruitForm, RecruitWithProfile } from '@/types/parties.types';
import { SupabaseDataBase } from '@/types/utils.types';
import { createClient } from '@/utils/supabase/client';

export const addRecruit = async (formData: RecruitForm) => {
  const client = createClient();

  const { data, error } = await client.from('party_recruit').insert(formData);

  if (error) throw new Error(error.message);

  return data;
};

export const getRecruits = async (client: SupabaseDataBase) => {
  const { data, error } = await client
    .from('party_recruit')
    .select(`*, created_by(*)`)
    .returns<RecruitWithProfile[]>();

  if (error) throw new Error(error.message);

  return data;
};
