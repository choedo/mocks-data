import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjectByIdData } from '@/hooks/project/use-project-by-id-data';
import { Button } from '@/components/ui/button';
import { SquarePenIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useUpdateProject } from '@/hooks/project/use-update-project';
import toastMessage from '@/lib/toast-message';
import { useDuplicateCheckProjectName } from '@/hooks/project/use-duplicate-check-project-name';
import { useSession } from '@/store/session';
import ProjectBookmarkButton from '@/components/project/project-bookmark-button';

type Props = {
  projectId: number;
};

export default function ProjectDetailInformation({ projectId }: Props) {
  const session = useSession();
  const { data: projectData, isLoading: isProjectDataLoading } =
    useProjectByIdData(projectId);

  const titleRef = React.useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const { mutate: updateProject, isPending: isUpdateProjectPending } =
    useUpdateProject({
      onSuccess: () => {
        toastMessage.success('Successfully changed.');
        setIsEdit(false);
      },
      onError: (error) => {
        const message = error.message || 'Error';
        toastMessage.error(message);
      },
    });

  const { isLoading: isDuplicateCheckLoading, refetch: duplicateCheckRefetch } =
    useDuplicateCheckProjectName({
      userId: session!.user.id,
      project_name: title,
    });

  const handleUpdateClick = async () => {
    if (title.trim() === '') {
      toastMessage.info(
        'Please enter the name of the project you want to change',
      );
      titleRef.current?.focus();
      return;
    }

    if (title !== projectData.project_name) {
      const res = await duplicateCheckRefetch();
      if (!res.data) {
        toastMessage.info('Duplicate project exists.');
        titleRef.current?.focus();
        return;
      }
    }

    updateProject({
      project_id: projectId,
      project_name: title,
      project_description: description,
    });
  };

  React.useEffect(() => {
    if (!isEdit && projectData) {
      setTitle(projectData.project_name);
      setDescription(projectData.project_description);
    }
  }, [isEdit, projectData]);

  const isPending = isUpdateProjectPending || isDuplicateCheckLoading;
  const isBookmark = projectData?.is_bookmark;

  return (
    <div className={'flex flex-col gap-2 border rounded-sm py-6 px-4 relative'}>
      {isProjectDataLoading ? (
        <Skeleton className={'h-10 w-50'} />
      ) : (
        <React.Fragment>
          {isEdit ? (
            <Input
              ref={titleRef}
              value={title}
              placeholder={projectData.project_name}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              disabled={isPending}
            />
          ) : (
            <div className={'flex gap-2 items-center'}>
              <ProjectBookmarkButton
                projectId={projectId}
                isBookmark={isBookmark}
                width={24}
                height={24}
              />
              <h1 className={'text-2xl font-semibold'}>
                {projectData.project_name}
              </h1>
            </div>
          )}
        </React.Fragment>
      )}

      {isProjectDataLoading ? (
        <div className={'flex flex-col gap-1'}>
          <Skeleton className={'h-5 w-200'} />
          <Skeleton className={'h-5 w-150'} />
        </div>
      ) : (
        <React.Fragment>
          {isEdit ? (
            <Textarea
              value={description}
              placeholder={projectData.project_description}
              onChange={(e) => setDescription(e.target.value)}
              className={'h-30'}
              maxLength={255}
              disabled={isPending}
            />
          ) : (
            <pre className={'text-sm text-muted-foreground'}>
              {projectData?.project_description}
            </pre>
          )}
        </React.Fragment>
      )}

      <Button
        variant={'outline'}
        className={'absolute top-6 right-4 cursor-pointer'}
        onClick={() => setIsEdit(!isEdit)}
      >
        <SquarePenIcon />
      </Button>

      {isEdit ? (
        <div className={'flex gap-2 justify-end items-center'}>
          <Button
            variant={'secondary'}
            onClick={() => setIsEdit(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateClick} disabled={isPending}>
            Update
          </Button>
        </div>
      ) : null}
    </div>
  );
}
