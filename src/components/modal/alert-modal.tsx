import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogMedia,
} from '@/components/ui/alert-dialog';
import Pre from '@/components/ui/pre';
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
          {store.icon ? (
            <AlertDialogMedia>{store.icon}</AlertDialogMedia>
          ) : null}
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <Pre>{store.description}</Pre>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {store.content ? store.content : null}
        <AlertDialogFooter>
          <AlertDialogCancel
            className={'cursor-pointer'}
            onClick={handleCancelClick}
            variant={store.cancelVariant || 'outline'}
          >
            {store.cancelText ? store.cancelText : 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction
            className={'cursor-pointer'}
            onClick={handleActionClick}
            variant={store.confirmVariant || 'default'}
          >
            {store.confirmText ? store.confirmText : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
