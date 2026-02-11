import { useProjectByIdData } from '@/hooks/project/use-project-by-id-data';
import { PopoverClose } from '@radix-ui/react-popover';
import { Link } from 'react-router';

export default function BookmarkProject({ projectId }: { projectId: number }) {
  const { data: project, isLoading } = useProjectByIdData(projectId);

  if (isLoading) return;

  if (!project.is_bookmark) return;

  return (
    <PopoverClose className={'w-full'}>
      <div className={'p-2 w-full text-left'}>
        <Link
          to={`/project/${project.project_id}`}
          className={
            'text-sm w-full inline-block hover:bg-accent p-2 rounded-md'
          }
        >
          {project.project_name}
        </Link>
      </div>
    </PopoverClose>
  );
}
