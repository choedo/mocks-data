import type { ProjectEntity } from '@/types/data';
import { StarIcon } from 'lucide-react';
import { Link } from 'react-router';

export default function ProjectMenuItem(project: ProjectEntity) {
  const isBookmark = project.is_bookmark;

  const handleBookmarkClick = () => {};

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
