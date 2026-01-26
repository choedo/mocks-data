import { StarIcon } from 'lucide-react';
import { useToggleProjectBookmark } from '@/hooks/project/use-toggle-project-bookmark';

type Props = {
  projectId: number;
  isBookmark: boolean;
  width: number;
  height: number;
};

export default function ProjectBookmarkButton(props: Props) {
  const { mutate: toggleProjectBookmark } = useToggleProjectBookmark();

  const handleBookmarkClick = () => {
    toggleProjectBookmark({
      projectId: props.projectId,
      current: props.isBookmark,
    });
  };

  return (
    <div
      className={`cursor-pointer hover:bg-muted-foreground p-1 rounded-full ${
        props.isBookmark ? 'bookmark' : 'non-bookmark'
      }`}
      onClick={handleBookmarkClick}
    >
      <StarIcon
        fill={props.isBookmark ? 'yellow' : 'transparent'}
        width={props.width}
        height={props.height}
        className={`non-bookmark-hover:fill-yellow bookmark-hover:fill-transparent cursor-pointer transition-colors delay-50`}
      />
    </div>
  );
}
