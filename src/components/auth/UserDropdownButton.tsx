'use client';
import { useSignOutMutation } from '@/query/auth/useAuthMutation';
import { Profile } from '@/types/profiles.types';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import ProfileAvatar from '../ProfileAvatar';

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#588157] hover:bg-[#476947]">
          <ProfileAvatar profileImg={profile.avatar_url} />
          {profile.username}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem className="hover:text-[#206030]" asChild>
          <Link
            href={`/profile/${profile.id}`}
            className="cursor-pointer hover:text-[#206030]"
          >
            프로필
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${profile?.id}?tab=created`}
            className="dropdown-item"
          >
            생성한 파티
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${profile?.id}?tab=joined`}
            className="dropdown-item"
          >
            참가중인 파티
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={handleLogOut}>로그아웃</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownButton;
