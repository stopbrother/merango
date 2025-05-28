import { Profile } from '@/types/profiles.types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserIcon } from 'lucide-react';

interface ProfileAvatarProps {
  profileImg: Profile['avatar_url'];
}

const ProfileAvatar = ({ profileImg }: ProfileAvatarProps) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={profileImg} />
      <AvatarFallback>
        <UserIcon className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
