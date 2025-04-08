'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useAuthQuery } from '@/query/auth/useAuthQuery';
import { Textarea } from '../ui/textarea';
import { useProfileQuery } from '@/query/profile/useProfileQuery';
import { useProfileMutation } from '@/query/profile/useProfileMutation';
import { Profile } from '@/types/profiles.types';
import { toast } from 'sonner';

interface ProfileIntroProps {
  userId: Profile['id'];
}
const ProfileIntro = ({ userId }: ProfileIntroProps) => {
  // 유저정보
  const { data: user } = useProfileQuery(userId);

  const [isEdit, setIsEdit] = useState(false);
  const [intro, setIntro] = useState(user?.intro ?? ''); // 소개글 textarea 상태

  // 본인 프로필 페이지 구분
  const { data: currentUser } = useAuthQuery();
  const isOwner = userId === currentUser?.id;

  const { mutate: updateIntro } = useProfileMutation(userId);

  // 소개글 저장 핸들러
  const handleSave = () => {
    updateIntro(
      { intro },
      {
        onSuccess: () => {
          toast.success('저장 되었습니다.');
          setIsEdit(false);
        },
        onError: () => {
          toast.error('저장에 실패했습니다.');
        },
      }
    );
  };

  return (
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
  );
};

export default ProfileIntro;
