import React from 'react';
import { useSession } from '@/store/session';
import { useProjectEditorModal } from '@/store/project-editor-modal';
import { useCreateProject } from '@/hooks/project/use-create-project';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toastMessage from '@/lib/toastMessage';
import { useDuplicateCheckProjectName } from '@/hooks/project/use-duplicate-check-project-name';

export default function ProjectEditorModal() {
  const session = useSession();

  const store = useProjectEditorModal();
  const {
    isOpen,
    actions: { close },
  } = store;

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const { mutate: createProject, isPending: isCreateProjectPending } =
    useCreateProject({
      onSuccess: () => {
        toastMessage.success('A new project has been created successfully');
        close();
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

  const titleRef = React.useRef<HTMLInputElement>(null);

  const handleResetInputValue = () => {
    setTitle('');
    setDescription('');
  };

  const handleSubmitClick = async () => {
    if (title.trim() === '') {
      toastMessage.info('Please enter the name of your new project.');
      titleRef.current?.focus();
      return;
    }

    // 중복 체크
    const res = await duplicateCheckRefetch();
    if (!res.data) {
      toastMessage.info('Duplicate project exists.');
      titleRef.current?.focus();
      return;
    }

    createProject({
      project_name: title,
      project_description: description,
    });
  };

  React.useEffect(() => {
    return () => {
      handleResetInputValue();
    };
  }, [isOpen]);

  const isPending = isCreateProjectPending || isDuplicateCheckLoading;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>Create a New Project</DialogTitle>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor={'title'}>Project Name</Label>
            <Input
              ref={titleRef}
              id={'title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={'Please enter a new project name'}
              disabled={isPending}
            />
          </div>
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor={'description'}>Project Description</Label>
            <Textarea
              id={'description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              maxLength={255}
              className={'min-h-30'}
            />
          </div>
          <Button onClick={handleSubmitClick} className={'cursor-pointer'}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
