import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRequestPasswordResetEmail } from '@/hooks/auth/use-request-password-reset-email';
import toastMessage from '@/lib/toast-message';
import validateCheck from '@/lib/validate-check';
import { useLanguage } from '@/store/translation';
import { AlertMessages } from '@/languages/alert-messages';
import { ContentMessages } from '@/languages/content-messages';

export default function ForgetPasswordPage() {
  const language = useLanguage();
  const [email, setEmail] = React.useState('');

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toastMessage.success(AlertMessages.SUCCESS_EMAIL_SENT[language]);
      setEmail('');
    },
    onError: (error) => {
      console.error(error);
      const message = AlertMessages.FAIL_EMAIL_SENT[language];
      toastMessage.error(message);
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === '') {
      toastMessage.info(AlertMessages.REQUIRED_EMAIL_INPUT[language]);
      return;
    }

    if (!validateCheck.email(email)) {
      toastMessage.info(AlertMessages.NOT_EMAIL_FORMAT[language]);
      return;
    }

    requestPasswordResetEmail(email);
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">
          {ContentMessages.FORGET_PASSWORD_TITLE[language]}
        </div>
        <div className="text-muted-foreground">
          {ContentMessages.FORGET_PASSWORD_DESCRIPTION[language]}
        </div>
      </div>
      <Input
        disabled={isRequestPasswordResetEmailPending}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="py-6"
        placeholder="example@abc.com"
      />
      <Button
        disabled={isRequestPasswordResetEmailPending}
        onClick={handleSendEmailClick}
        className="w-full"
      >
        {ContentMessages.SEND_AUTH_EMAIL_BUTTON[language]}
      </Button>
    </div>
  );
}
