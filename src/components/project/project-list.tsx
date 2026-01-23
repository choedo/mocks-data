import React from 'react';
import { useSession } from '@/store/session';
import ProjectMenuSkelton from '@/components/project/project-menu-skeleton';
import ProjectMenuItem from '@/components/project/project-menu-item';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { useOpenProjectEditorModal } from '@/store/project-editor-modal';
import { useProjectData } from '@/hooks/project/use-project-data';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { ProjectEntity } from '@/types/data';

interface SplitProjects {
  bookmarkProjects: ProjectEntity[];
  nonBookmarkProjects: ProjectEntity[];
}

export default function ProjectList() {
  const queryClient = useQueryClient();
  const session = useSession();
  const open = useOpenProjectEditorModal();

  const { data: projectIds, isLoading: isProjectFetch } = useProjectData(
    session?.user.id
  );

  const { bookmarkProjects, nonBookmarkProjects } = React.useMemo(() => {
    const initialValue: SplitProjects = {
      bookmarkProjects: [],
      nonBookmarkProjects: [],
    };

    if (!projectIds || projectIds.length === 0) return initialValue;

    return projectIds.reduce((acc, id) => {
      const project = queryClient.getQueryData<ProjectEntity>(
        QUERY_KEYS.project.byId(id)
      );

      if (project) {
        if (project.is_bookmark) {
          acc.bookmarkProjects.push(project);
        } else {
          acc.nonBookmarkProjects.push(project);
        }
      }

      return acc;
    }, initialValue);
  }, [projectIds, queryClient]);

  return (
    <div className={'py-4 px-2 flex flex-col gap-5'}>
      <div>
        <h4 className={'text-muted-foreground text-xs mb-2'}>Bookmark</h4>
        {isProjectFetch ? (
          <ProjectMenuSkelton />
        ) : (
          bookmarkProjects?.map((project: ProjectEntity) => (
            <ProjectMenuItem {...project} />
          ))
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
          nonBookmarkProjects?.map((project: ProjectEntity) => (
            <ProjectMenuItem {...project} />
          ))
        )}
      </div>
    </div>
  );
}
