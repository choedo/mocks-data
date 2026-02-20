import { signOut } from '@/api/auth';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useProfileData } from '@/hooks/profile/use-profile-data';
import { ContentMessages } from '@/languages/content-messages';
import { useSession } from '@/store/session';
import { useLanguage } from '@/store/translation';
import { PopoverClose } from '@radix-ui/react-popover';
import { UserIcon } from 'lucide-react';

export default function ProfileButton() {
  const session = useSession();
  const language = useLanguage();
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatarIcon avatar_url={profile.avatar_url} />
      </PopoverTrigger>
      <PopoverContent className="flex w-80 flex-col p-0">
        <div
          className={
            'rounded-lg flex flex-col justify-center items-center bg-muted m-2 p-8'
          }
        >
          <div className={'border rounded-full'}>
            <UserAvatarIcon
              avatar_url={profile.avatar_url}
              width={80}
              height={80}
            />
          </div>
          <div className={'flex flex-col justify-center items-center mt-4'}>
            <p className={'text-sm'}>{profile.nickname}</p>
            <p className={'text-sm'}>{profile.email}</p>
          </div>

          <PopoverClose asChild className={'p-2'}>
            <Button
              onClick={signOut}
              className={
                'w-full mt-8 cursor-pointer hover:bg-destructive hover:text-foreground'
              }
            >
              {ContentMessages.LOGOUT_BUTTON[language]}
            </Button>
            {/* <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"></div> */}
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function UserAvatarIcon({
  avatar_url,
  width = 40,
  height = 40,
}: {
  avatar_url?: string;
  width?: number;
  height?: number;
}) {
  return avatar_url ? (
    <img
      width={width}
      height={height}
      src={avatar_url}
      className={'rounded-full object-cover'}
    />
  ) : (
    <div className={`hover:bg-muted rounded-full p-2`}>
      <UserIcon width={width - 16} height={height - 16} />
    </div>
  );
}
