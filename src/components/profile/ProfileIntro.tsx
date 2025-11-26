'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useAuthQuery } from '@/hooks/query/auth/useAuthQuery';
import { Textarea } from '../ui/textarea';
import { useProfileQuery } from '@/hooks/query/profile/useProfileQuery';
import { useProfileIntroMutation } from '@/hooks/query/profile/useProfileMutation';
import { Profile } from '@/types/profiles.types';
import QueryStateWrapper from '../common/QueryStateWrapper';

interface ProfileIntroProps {
  userId: Profile['id'];
}
const ProfileIntro = ({ userId }: ProfileIntroProps) => {
  // 유저정보
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useProfileQuery(userId);

  // 본인 프로필 페이지 구분
  const {
    data: currentUser,
    isLoading: authLoading,
    error: authError,
  } = useAuthQuery();
  const isOwner = userId === currentUser?.id;

  // 소개글 업데이트
  const { mutate: updateIntro } = useProfileIntroMutation(userId);

  const [isEdit, setIsEdit] = useState(false);
  const [intro, setIntro] = useState(user?.intro ?? ''); // 소개글 textarea 상태

  // 쿼리 로딩/에러 상태
  const isLoading = userLoading || authLoading;
  const error = userError || authError;

  // 소개글 저장 핸들러
  const handleSave = () => {
    updateIntro(
      { intro },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
      }
    );
  };

  return (
    <QueryStateWrapper isPending={isLoading} error={error}>
      <section>
        {isOwner && !isEdit && (
          <div className="flex justify-end">
            <Button
              onClick={() => setIsEdit(true)}
              variant="outline"
              className=""
            >
              소개글 수정
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        )}
        {isEdit ? (
          <div>
            <Textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="등록된 소개글이 없습니다."
            />
            <Button onClick={handleSave}>저장</Button>
          </div>
        ) : (
          <p>{user?.intro ?? '등록된 소개글이 없습니다.'}</p>
        )}
      </section>
    </QueryStateWrapper>
  );
};

export default ProfileIntro;
