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
import toastMessage from '@/lib/toast-message';
import { useDuplicateCheckProjectName } from '@/hooks/project/use-duplicate-check-project-name';
import { useLanguage } from '@/store/translation';
import { AlertMessages } from '@/languages/alert-messages';
import { ContentMessages } from '@/languages/content-messages';

export default function ProjectEditorModal() {
  const session = useSession();
  const language = useLanguage();

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
        toastMessage.success(AlertMessages.SUCCESS_PROJECT_CREATED[language]);
        close();
      },
      onError: (error) => {
        console.error(error);
        const message = AlertMessages.FAIL_PROJECT_CREATED[language];
        toastMessage.error(message);
      },
    });

  const { isLoading: isDuplicateCheckLoading, refetch: duplicateCheckRefetch } =
    useDuplicateCheckProjectName({
      userId: session?.user.id || '',
      project_name: title,
    });

  const titleRef = React.useRef<HTMLInputElement>(null);

  const handleResetInputValue = () => {
    setTitle('');
    setDescription('');
  };

  const handleSubmitClick = async () => {
    if (title.trim() === '') {
      toastMessage.info(AlertMessages.REQUIRED_PROJECT_NAME_INPUT[language]);
      titleRef.current?.focus();
      return;
    }

    // 중복 체크
    const res = await duplicateCheckRefetch();
    if (!res.data) {
      toastMessage.info(AlertMessages.DUPLICATE_PROJECT_NAME[language]);
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
        <DialogTitle>
          {ContentMessages.PROJECT_CREATE_TITLE[language]}
        </DialogTitle>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor={'title'}>
              {ContentMessages.PROJECT_NAME_LABEL[language]}
            </Label>
            <Input
              ref={titleRef}
              id={'title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={ContentMessages.PROJECT_NAME_PLACEHOLDER[language]}
              disabled={isPending}
              maxLength={50}
            />
          </div>
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor={'description'}>
              {ContentMessages.PROJECT_DESCRIPTION_LABEL[language]}
            </Label>
            <Textarea
              id={'description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              maxLength={255}
              className={'min-h-30'}
              placeholder={
                ContentMessages.PROJECT_DESCRIPTION_PLACEHOLDER[language]
              }
            />
          </div>
          <Button
            onClick={handleSubmitClick}
            className={'cursor-pointer'}
            disabled={isPending}
          >
            {ContentMessages.SUBMIT_BUTTON[language]}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
