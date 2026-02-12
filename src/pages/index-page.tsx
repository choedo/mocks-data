import ProjectAddButton from '@/components/project/project-add-button';
import ProjectCard from '@/components/project/project-card';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useProjectData } from '@/hooks/project/use-project-data';
import { ContentMessages } from '@/languages/content-messages';
import { useSession } from '@/store/session';
import { useLanguage } from '@/store/translation';

export default function IndexPage() {
  const language = useLanguage();
  const session = useSession();
  const { data: projectIds, isLoading: isProjectIdsLoading } = useProjectData(
    session?.user.id,
  );

  const isLoading = isProjectIdsLoading;

  return (
    <div className={'p-4'}>
      <div>
        <h1 className={'text-2xl pb-6 font-bold'}>
          {ContentMessages.PROJECT_LIST_TITLE[language]}
        </h1>
      </div>
      <div className={'grid grid-cols-4 gap-4'}>
        <ProjectAddButton />
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={`project-skeleton-${index}`}>
                <Spinner />
              </Card>
            ))
          : projectIds?.map((projectId) => (
              <ProjectCard
                key={`project-card-item-${projectId}`}
                projectId={projectId}
              />
            ))}
      </div>
    </div>
  );
}
