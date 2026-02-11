import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlertModal } from '@/store/alert-modal';

export default function AlertModal() {
  const store = useAlertModal();

  if (!store.isOpen) return null;

  const handleCancelClick = () => {
    if (store.onNegative) store.onNegative();
    store.actions.close();
  };

  const handleActionClick = () => {
    if (store.onPositive) store.onPositive();
    store.actions.close();
  };

  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <pre>{store.description}</pre>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {store.content ? store.content : null}
        <AlertDialogFooter>
          <AlertDialogCancel
            className={'cursor-pointer'}
            onClick={handleCancelClick}
          >
            {store.cancelText ? store.cancelText : 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction
            className={'cursor-pointer'}
            onClick={handleActionClick}
          >
            {store.confirmText ? store.confirmText : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
