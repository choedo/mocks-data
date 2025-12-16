import React, { type KeyboardEvent } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import validateCheck from '@/lib/validateCheck';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';
import { useSignInWithPassword } from '@/hooks/auth/use-sign-in-with-password';
import { generateErrorMessage } from '@/lib/error';
import { useHandleSaveEmail, useSaveEmail } from '@/store/session';
import { useOpenSignUpModal } from '@/store/sign-up-modal';

export default function SignInPage() {
  const navigate = useNavigate();

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const { isSavedEmail, savedEmail } = useSaveEmail();
  const { setSaveEmail, setRemoveEmail } = useHandleSaveEmail();
  const signUpModalOpen = useOpenSignUpModal();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const errorMessage = generateErrorMessage(error);
        toast.error(errorMessage, { position: 'top-center' });

        setPassword('');
      },
      onSuccess: () => {
        if (checked) {
          setSaveEmail(email);
        } else {
          setRemoveEmail();
        }

        navigate('/');
      },
    });

  /**
   * 이메일 + 비밀번호 로그인
   * --
   * @returns
   */
  const handleLoginClick = () => {
    /** SECTION - 유효성 검사 시작 */
    // 이메일
    const inputEmail = email.trim();
    if (inputEmail === '') {
      toast.info('Please enter your email', {
        position: 'top-center',
      });

      if (emailRef.current) emailRef.current.focus();

      return;
    }

    if (!validateCheck.email(inputEmail)) {
      toast.info('Please check your email', {
        position: 'top-center',
      });

      if (emailRef.current) emailRef.current.focus();

      return;
    }

    // 비밀번호
    const inputPassword = password.trim();
    if (inputPassword === '') {
      toast.info('Please enter your password', {
        position: 'top-center',
      });

      if (passwordRef.current) passwordRef.current.focus();

      return;
    }
    /**!SECTION - 유효성 검사 끝 */

    signInWithPassword({ email, password });
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleLoginClick();
    }
  };

  const handleSignUpClick = () => {
    signUpModalOpen();
  };

  React.useEffect(() => {
    if (isSavedEmail && savedEmail) {
      setChecked(isSavedEmail);
      setEmail(savedEmail);
    }
  }, [isSavedEmail, savedEmail]);

  const isPending = isSignInWithPasswordPending;

  return (
    <Card className={`w-full max-w-sm`}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button
            variant={`link`}
            className={`hover:underline cursor-pointer`}
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className={`flex flex-col gap-4`}>
        <div className={`flex flex-col gap-2`}>
          <div>
            <Label htmlFor={'email'}>Email</Label>
          </div>
          <Input
            ref={emailRef}
            id={'email'}
            type={`email`}
            placeholder={`Enter your email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handlePressEnter}
            disabled={isPending}
          />
        </div>
        <div className={`flex flex-col gap-2`}>
          <div>
            <Label htmlFor={'password'}>Password</Label>
          </div>
          <Input
            ref={passwordRef}
            id={'password'}
            type={`password`}
            placeholder={`Enter your password`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePressEnter}
            disabled={isPending}
          />
        </div>
        <div className={`flex gap-2 items-center`}>
          <Checkbox
            id={`checkbox`}
            checked={checked}
            onCheckedChange={(e) => setChecked(e as boolean)}
            disabled={isPending}
          />
          <Label htmlFor={`checkbox`}>Remember this email</Label>
        </div>
        <Link
          to={`/forget-password`}
          className={`text-muted-foreground hover:underline text-sm`}
        >
          Did you forget your password?
        </Link>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full`}
          onClick={handleLoginClick}
          disabled={isPending}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
