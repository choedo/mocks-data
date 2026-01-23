import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdatePassword } from '@/hooks/auth/use-update-password';
import toastMessage from '@/lib/toastMessage';
import { useNavigate } from 'react-router';
import { signOut } from '@/api/auth';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toastMessage.success(
          'You password has been changed successfully. Please log in again'
        );
        signOut();
        navigate('/sign-in');
      },
      onError: (error) => {
        const message = error.message || 'Error';
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
        <div className="text-xl font-bold">Reset Password</div>
        <div className="text-muted-foreground">Please enter a new password</div>
      </div>
      <Input
        disabled={isUpdatePasswordPending}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="py-6"
        placeholder="password"
      />
      <Button
        disabled={isUpdatePasswordPending}
        onClick={handleUpdatePasswordClick}
        className="w-full"
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}
