import { Tables } from '../../database.types';
import { Profile } from './profiles.types';

export type Recruit = Tables<'party_recruit'>;

export type RecruitForm = Pick<Recruit, 'party_type' | 'title' | 'description'>;

export type PartyMember = Tables<'party_member'>;

// created_by → profile 테이블로 교체 ?
export interface RecruitWithProfile extends Omit<Recruit, 'created_by'> {
  created_by: Profile;
}

export interface PartyMemberWithProfile
  extends Omit<PartyMember, 'profile_id'> {
  profile_id: Profile;
}
