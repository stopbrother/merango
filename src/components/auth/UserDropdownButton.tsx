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
          {profile.username}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/profile/${profile.id}`}>프로필</Link>
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
