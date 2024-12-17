import { Tables } from '../../database.types';
import { Profile } from './profiles.types';

export type Recruit = Tables<'party_recruit'>;

export type RecruitForm = Pick<Recruit, 'party_type' | 'title' | 'description'>;

export interface RecruitWithProfile extends Omit<Recruit, 'created_by'> {
  created_by: Profile;
}
