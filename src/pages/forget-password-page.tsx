import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRequestPasswordResetEmail } from '@/hooks/auth/use-request-password-reset-email';
import toastMessage from '@/lib/toast-message';
import validateCheck from '@/lib/validate-check';

export default function ForgetPasswordPage() {
  const [email, setEmail] = React.useState('');

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toastMessage.success('The authentication mail has been sent well.');
      setEmail('');
    },
    onError: (error) => {
      const message = error.message || 'Error';
      toastMessage.error(message);
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === '') {
      toastMessage.info('Please enter your email.');
      return;
    }

    if (!validateCheck.email(email)) {
      toastMessage.info('Please check your email');
      return;
    }

    requestPasswordResetEmail(email);
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호를 잊으셨나요?</div>
        <div className="text-muted-foreground">
          이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
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
        인증 메일 요청하기
      </Button>
    </div>
  );
}
