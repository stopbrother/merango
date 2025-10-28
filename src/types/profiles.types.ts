import { Tables } from '../../database.types';

export type Profile = Tables<'profiles'>;

export type ProfileForm = Pick<
  Profile,
  'job' | 'level' | 'social_name' | 'username'
>;
