import { signOut } from '@/api/auth';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useProfileData } from '@/hooks/profile/use-profile-data';
import { useSession } from '@/store/session';
import { PopoverClose } from '@radix-ui/react-popover';
import { UserIcon } from 'lucide-react';

export default function ProfileButton() {
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger>
        {profile.avatar_url ? (
          <img
            width={40}
            height={40}
            src={profile.avatar_url}
            className={'rounded-full cursor-pointer object-cover'}
          />
        ) : (
          <div className="hover:bg-muted cursor-pointer rounded-full p-2">
            <UserIcon />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild className={'p-2'}>
          <Button
            variant={'link'}
            className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
          >
            프로필
          </Button>
        </PopoverClose>
        <PopoverClose asChild className={'p-2'}>
          <div
            onClick={signOut}
            className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
          >
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
