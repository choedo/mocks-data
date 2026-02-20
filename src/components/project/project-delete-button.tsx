import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteProject } from '@/hooks/project/use-delete-project';
import { AlertMessages } from '@/languages/alert-messages';
import { ContentMessages } from '@/languages/content-messages';
import toastMessage from '@/lib/toast-message';
import { useLanguage } from '@/store/translation';
import { Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router';

type Props = { projectId: number };

export default function ProjectDeleteButton({ projectId }: Props) {
  const language = useLanguage();
  const navigate = useNavigate();

  const { mutate: deleteProject, isPending: isDeleteProjectPending } =
    useDeleteProject({
      onSuccess: () => {
        toastMessage.success(AlertMessages.SUCCESS_PROJECT_DELETED[language]);

        navigate('/');
      },
      onError: (error) => {
        console.error(error);
        const message = AlertMessages.FAIL_PROJECT_DELETED[language];
        toastMessage.error(message);
      },
    });

  const handleDeleteClick = () => {
    deleteProject(projectId);
  };

  const isPending = isDeleteProjectPending;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} className={'cursor-pointer'}>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2Icon className={'text-destructive'} />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {AlertMessages.CONFIRM_DELETE_PROJECT_TITLE[language]}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {AlertMessages.CONFIRM_DELETE_PROJECT_DESCRIPTION[language]}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {ContentMessages.CANCEL_BUTTON[language]}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteClick}
            disabled={isPending}
            variant={'destructive'}
          >
            {ContentMessages.DELETE_BUTTON[language]}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
