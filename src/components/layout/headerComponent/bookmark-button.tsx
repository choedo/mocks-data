import BookmarkProject from '@/components/layout/headerComponent/bookmark-project';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { useProjectData } from '@/hooks/project/use-project-data';
import { useSession } from '@/store/session';
import { StarIcon } from 'lucide-react';

export default function BookmarkButton() {
  const session = useSession();
  const { data: projectIds, isLoading: isProjectFetch } = useProjectData(
    session?.user.id,
  );

  const isLoading = isProjectFetch;

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger className={'cursor-pointer'}>
        <div className="hover:bg-muted cursor-pointer rounded-full p-2">
          <StarIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className={'w-50 p-0'}>
        {isLoading ? (
          <div className={'flex items-center justify-center'}>
            <Spinner />
          </div>
        ) : (
          <div className={'flex flex-col items-start'}>
            {projectIds?.map((id, index) => (
              <BookmarkProject
                key={`bookmark-project-${id}-${index}`}
                projectId={id}
              />
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
