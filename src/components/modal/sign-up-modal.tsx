import React from 'react';
import { useSignUpModal } from '@/store/sign-up-modal';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toastMessage from '@/lib/toastMessage';
import validateCheck from '@/lib/validateCheck';
import { CircleQuestionMarkIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSignUp } from '@/hooks/auth/use-sign-up';

export default function SignUpModal() {
  const store = useSignUpModal();
  const {
    isOpen,
    actions: { close },
  } = store;

  const nicknameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const rePasswordRef = React.useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      setNickname('');
      setEmail('');
      setPassword('');
      setRePassword('');

      close();
    },
    onError: (error) => {
      const message = error.message ? error.message : 'Error';
      toastMessage.error(message);
    },
  });

  const handleSignUpClick = () => {
    /** SECTION - 유효성 검사 시작 */
    // 닉네임
    const inputNickname = nickname.trim();
    if (inputNickname === '') {
      toastMessage.info('Please enter your nickname');

      if (nicknameRef.current) nicknameRef.current.focus();
      return;
    }

    // 이메일
    const inputEmail = email.trim();
    if (inputEmail === '') {
      toastMessage.info('Please enter your email');

      if (emailRef.current) emailRef.current.focus();
      return;
    }

    if (!validateCheck.email(inputEmail)) {
      toastMessage.info('Please check your email');

      if (emailRef.current) emailRef.current.focus();

      return;
    }

    // 비밀번호
    const inputPassword = password.trim();
    const inputRePassword = rePassword.trim();
    if (inputPassword === '') {
      toastMessage.info('Please enter your password');

      if (passwordRef.current) passwordRef.current.focus();
      return;
    }

    if (!validateCheck.password(inputPassword)) {
      toastMessage.info(
        'Must include uppercase, lowercase, number, and a special character (@, !, $, %, *, ?, &)'
      );
      if (passwordRef.current) passwordRef.current.focus();
      return;
    }

    if (inputRePassword === '') {
      toastMessage.info('Please enter your re-password');

      if (rePasswordRef.current) rePasswordRef.current.focus();
      return;
    }

    if (inputPassword !== inputRePassword) {
      toastMessage.info('Password does not match');

      if (rePasswordRef.current) {
        setRePassword('');
        rePasswordRef.current.focus();
      }
      return;
    }
    /**!SECTION - 유효성 검사 끝 */

    signUp({
      email: inputEmail,
      password: inputPassword,
      nickname: inputNickname,
    });
  };

  const isPending = isSignUpPending;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>Create Account</DialogTitle>
        <div className={`flex flex-col gap-4`}>
          <div className={`flex flex-col gap-2`}>
            <Label htmlFor={'nickname'}>Nickname</Label>
            <Input
              ref={nicknameRef}
              id={'nickname'}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={'Enter your nickname'}
              disabled={isPending}
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <Label htmlFor={'email'}>Email</Label>
            <Input
              ref={emailRef}
              id={'email'}
              type={'email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={'Enter your email'}
              disabled={isPending}
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <div className={`flex gap-1`}>
              <Label htmlFor={'password'}>Password</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMarkIcon
                    width={16}
                    height={16}
                    className={`text-muted-foreground`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className={`max-w-sm w-full`}>
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one number, and one special character (@,
                    !, $, %, *, ?, &).
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              ref={passwordRef}
              id={'password'}
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={'Enter your password'}
              disabled={isPending}
            />
            <Input
              ref={rePasswordRef}
              id={'rePassword'}
              type={'password'}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder={'Enter your password one more time'}
              disabled={isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <div className={`flex flex-col gap-2 w-full`}>
            <Button
              className={`flex-1 cursor-pointer`}
              onClick={handleSignUpClick}
              disabled={isPending}
            >
              Sign Up
            </Button>
            <Button
              variant={'outline'}
              className={`flex-1 cursor-pointer`}
              onClick={close}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
