import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectMenuSkelton() {
  return (
    <div className={'flex flex-col gap-2'}>
      {new Array(3).fill(null).map((_, index) => (
        <ProjectMenuSkeltonItem key={`project-skelton-${index}`} />
      ))}
    </div>
  );
}

function ProjectMenuSkeltonItem() {
  return <Skeleton className={'h-4 w-full'} />;
}
