import ProjectBookmarkButton from '@/components/project/project-bookmark-button';
import { useProjectByIdData } from '@/hooks/project/use-project-by-id-data';
import { Link } from 'react-router';

type Props = {
  projectId: number;
};

export default function ProjectMenuItem({ projectId }: Props) {
  const { data: projectData } = useProjectByIdData(projectId);

  if (!projectData) return;

  const isBookmark = projectData.is_bookmark;

  return (
    <div
      className={`flex gap-2 items-stretch cursor-pointer hover:bg-muted-foreground p-1`}
    >
      <ProjectBookmarkButton
        projectId={projectId}
        isBookmark={isBookmark}
        width={14}
        height={14}
      />
      <div
        className={`text-sm line-clamp-2 wrap-break-words whitespace-pre-wrap`}
      >
        <Link to={`/project/${projectData.project_id}`}>
          {projectData.project_name}
        </Link>
      </div>
    </div>
  );
}
