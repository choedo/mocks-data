import { QUERY_KEYS } from '@/constants/query-keys';
import { useToggleProjectBookmark } from '@/hooks/project/use-toggle-project-bookmark';
import type { ProjectEntity } from '@/types/data';
import { useQueryClient } from '@tanstack/react-query';
import { StarIcon } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  projectId: number;
};

export default function ProjectMenuItem({ projectId }: Props) {
  const queryClient = useQueryClient();
  const project = queryClient.getQueryData<ProjectEntity>(
    QUERY_KEYS.project.byId(projectId)
  );

  const { mutate: toggleProjectBookmark } = useToggleProjectBookmark();

  if (!project) return;

  const isBookmark = project.is_bookmark;

  const handleBookmarkClick = () => {
    toggleProjectBookmark({
      projectId: project.project_id,
      current: isBookmark,
    });
  };

  return (
    <div
      className={`flex gap-2 items-stretch cursor-pointer hover:bg-muted-foreground p-1`}
    >
      <div
        className={`cursor-pointer hover:bg-muted-foreground p-1 rounded-full ${
          isBookmark ? 'bookmark' : 'non-bookmark'
        }`}
        onClick={handleBookmarkClick}
      >
        <StarIcon
          fill={isBookmark ? 'yellow' : 'transparent'}
          width={18}
          height={18}
          className={`
            non-bookmark-hover:fill-yellow bookmark-hover:fill-transparent cursor-pointer transition-colors delay-50`}
        />
      </div>
      <div
        className={`text-sm line-clamp-2 wrap-break-words whitespace-pre-wrap`}
      >
        <Link to={`/project/${project.project_id}`}>
          {project.project_name}
        </Link>
      </div>
    </div>
  );
}
