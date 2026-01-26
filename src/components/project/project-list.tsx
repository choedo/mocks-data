import { useSession } from '@/store/session';
import ProjectMenuSkelton from '@/components/project/project-menu-skeleton';
import ProjectMenuItem from '@/components/project/project-menu-item';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { useOpenProjectEditorModal } from '@/store/project-editor-modal';
import { useProjectData } from '@/hooks/project/use-project-data';

export default function ProjectList() {
  const session = useSession();
  const open = useOpenProjectEditorModal();

  const { data: projectIds, isLoading: isProjectFetch } = useProjectData(
    session?.user.id,
  );

  return (
    <div className={'py-4 px-2 flex flex-col gap-5'}>
      <div>
        <div className={'flex justify-between items-center'}>
          <h4 className={'text-muted-foreground text-xs'}>Projects</h4>
          <Button
            variant={'ghost'}
            className={'w-4 h-6 cursor-pointer'}
            onClick={open}
          >
            <PlusCircleIcon />
          </Button>
        </div>
        {isProjectFetch ? (
          <ProjectMenuSkelton />
        ) : (
          projectIds?.map((id: number) => (
            <ProjectMenuItem key={`project-${id}`} projectId={id} />
          ))
        )}
      </div>
    </div>
  );
}
