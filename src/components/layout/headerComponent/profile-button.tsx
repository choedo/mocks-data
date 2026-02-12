import { signOut } from '@/api/auth';
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
          <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
            {ContentMessages.PROFILE_BUTTON[language]}
          </div>
        </PopoverClose>
        <PopoverClose asChild className={'p-2'}>
          <div
            onClick={signOut}
            className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
          >
            {ContentMessages.LOGOUT_BUTTON[language]}
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
