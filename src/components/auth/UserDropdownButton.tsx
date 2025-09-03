'use client';
import { useSignOutMutation } from '@/hooks/query/auth/useAuthMutation';
import { Profile } from '@/types/profiles.types';
import { useRouter } from 'next/navigation';
import ProfileAvatar from '../ProfileAvatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import DropdownLinkItem from './DropdownLinkItem';

interface UserDropdownButtonProps {
  profile: Profile;
}

const UserDropdownButton = ({ profile }: UserDropdownButtonProps) => {
  const router = useRouter();

  const { mutate: signOut } = useSignOutMutation();

  // TODO 로그아웃 후 새로고침 x supabase 구조개선 참고
  const handleLogOut = () => {
    signOut(undefined, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#588157] hover:bg-[#476947]">
          <ProfileAvatar profileImg={profile.avatar_url} />
          {profile.username}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownLinkItem href={`/profile/${profile.id}`}>
          프로필
        </DropdownLinkItem>

        <DropdownLinkItem href={`/profile/${profile?.id}?tab=created`}>
          생성한 파티
        </DropdownLinkItem>

        <DropdownLinkItem href={`/profile/${profile?.id}?tab=joined`}>
          참가중인 파티
        </DropdownLinkItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full justify-start px-2 cursor-pointer focus:text-[#206030]"
            onClick={handleLogOut}
          >
            로그아웃
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownButton;
