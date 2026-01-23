import React from 'react';
import Logo from '@/assets/logo.png';
import { useProjectData } from '@/hooks/project/use-project-data';
import { useSession } from '@/store/session';
import { Link } from 'react-router';
import ProjectMenuSkelton from '@/components/project/project-menu-skeleton';
import ProjectMenuItem from '@/components/project/project-menu-item';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { useOpenProjectEditorModal } from '@/store/project-editor-modal';

export default function Sidebar() {
  const session = useSession();
  const open = useOpenProjectEditorModal();

  const { data: projectData, isLoading: isProjectFetch } = useProjectData(
    session?.user.id
  );

  const bookmarkProjects = React.useMemo(
    () => projectData?.filter((project) => project.is_bookmark),
    [projectData]
  );

  return (
    <div className={`max-w-50 w-full border-r flex flex-col`}>
      <div className={`h-[56px] border-b`}>
        <Link to={'/'}>
          <img
            src={Logo}
            alt={'mockstack logo'}
            className={`object-contain h-full m-auto`}
          />
        </Link>
      </div>
      <div className={'py-4 px-2 flex flex-col gap-5'}>
        <div>
          <h4 className={'text-muted-foreground text-xs mb-2'}>Bookmark</h4>
          {isProjectFetch ? (
            <ProjectMenuSkelton />
          ) : (
            bookmarkProjects?.map((project) => <ProjectMenuItem {...project} />)
          )}
        </div>

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
            projectData?.map((project) => <ProjectMenuItem {...project} />)
          )}
        </div>
      </div>
    </div>
  );
}
