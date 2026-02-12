import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { useProjectByIdData } from '@/hooks/project/use-project-by-id-data';
import ProjectBookmarkButton from '@/components/project/project-bookmark-button';
import { useNavigate } from 'react-router';
import { Spinner } from '@/components/ui/spinner';

export default function ProjectCard({ projectId }: { projectId: number }) {
  const navigate = useNavigate();

  const { data: project, isLoading: isProjectDataLoading } =
    useProjectByIdData(projectId);

  const handleProjectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/project/${projectId}`);
  };

  return (
    <Card
      className={'cursor-pointer h-32 p-4 gap-2'}
      onClick={(e) => handleProjectClick(e)}
    >
      {isProjectDataLoading ? (
        <div className={'flex justify-center items-center h-full'}>
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          <div className={'flex items-center gap-4'}>
            <ProjectBookmarkButton
              projectId={project.project_id}
              isBookmark={project.is_bookmark}
              width={20}
              height={20}
            />
            <CardTitle>{project.project_name}</CardTitle>
          </div>
          <div>
            <pre
              className={
                'text-sm line-clamp-3 wrap-break-words whitespace-pre-wrap'
              }
            >
              {project.project_description}
            </pre>
          </div>
        </React.Fragment>
      )}
    </Card>
  );
}
