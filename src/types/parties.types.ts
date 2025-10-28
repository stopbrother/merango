import { Tables } from '../../database.types';
import { Profile } from './profiles.types';

export type Recruit = Tables<'party_recruit'>;

export type RecruitForm = Pick<Recruit, 'party_type' | 'title' | 'description'>;

export type PartyMember = Tables<'party_member'>;

/**
 DB 스키마에서 생성된 타입 이므로 원본은 변하지 않아야함.(단일진실)
 interface는 선언 병합이 가능해 전역에서 덮어씌우질 수 있음
 type은 별칭이므로 덮어씌우지 않음 -> 원본 구조 안전
 */

// party_recruit 테이블 & created_by 필드 → profile 테이블로 교체
export type RecruitWithProfile = Omit<Recruit, 'created_by'> & {
  created_by: Profile;
};
// export interface RecruitWithProfile extends Omit<Recruit, 'created_by'> {
//   created_by: Profile;
// }

// party_member 테이블 & profile_id 필드 -> Profile 교체
export type PartyMemberWithProfile = Omit<PartyMember, 'profile_id'> & {
  profile_id: Profile;
};
// export interface PartyMemberWithProfile
//   extends Omit<PartyMember, 'profile_id'> {
//   profile_id: Profile;
// }
