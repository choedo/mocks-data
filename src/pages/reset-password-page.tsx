import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdatePassword } from '@/hooks/auth/use-update-password';
import toastMessage from '@/lib/toast-message';
import { useNavigate } from 'react-router';
import { signOut } from '@/api/auth';
import { useLanguage } from '@/store/translation';
import { AlertMessages } from '@/languages/alert-messages';
import { ContentMessages } from '@/languages/content-messages';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const language = useLanguage();

  const [password, setPassword] = React.useState('');

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toastMessage.success(AlertMessages.SUCCESS_PASSWORD_CHANGED[language]);
        signOut();
        navigate('/sign-in');
      },
      onError: (error) => {
        console.error(error);
        const message = AlertMessages.FAIL_PASSWORD_CHANGED[language];
        toastMessage.error(message);
        setPassword('');
      },
    });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === '') return;

    updatePassword(password);
  };

  return (
    <div className="w-full  max-w-sm flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">
          {ContentMessages.RESET_PASSWORD_TITLE[language]}
        </div>
        <div className="text-muted-foreground">
          {ContentMessages.RESET_PASSWORD_DESCRIPTION[language]}
        </div>
      </div>
      <Input
        disabled={isUpdatePasswordPending}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="py-6"
        placeholder={ContentMessages.INPUT_NEW_PASSWORD_PLACEHOLDER[language]}
      />
      <Button
        disabled={isUpdatePasswordPending}
        onClick={handleUpdatePasswordClick}
        className="w-full"
      >
        {ContentMessages.UPDATE_PASSWORD_BUTTON[language]}
      </Button>
    </div>
  );
}
