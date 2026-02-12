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
import toastMessage from '@/lib/toast-message';
import validateCheck from '@/lib/validate-check';
import { CircleQuestionMarkIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSignUp } from '@/hooks/auth/use-sign-up';
import { useLanguage } from '@/store/translation';
import { AlertMessages } from '@/languages/alert-messages';
import { ContentMessages } from '@/languages/content-messages';

export default function SignUpModal() {
  const language = useLanguage();
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
      console.error(error);
      const message = AlertMessages.FAIL_SIGN_UP[language];
      toastMessage.error(message);
    },
  });

  const handleSignUpClick = () => {
    /** SECTION - 유효성 검사 시작 */
    // 닉네임
    const inputNickname = nickname.trim();
    if (inputNickname === '') {
      toastMessage.info(AlertMessages.REQUIRED_NICKNAME_INPUT[language]);

      if (nicknameRef.current) nicknameRef.current.focus();
      return;
    }

    // 이메일
    const inputEmail = email.trim();
    if (inputEmail === '') {
      toastMessage.info(AlertMessages.REQUIRED_EMAIL_INPUT[language]);

      if (emailRef.current) emailRef.current.focus();
      return;
    }

    if (!validateCheck.email(inputEmail)) {
      toastMessage.info(AlertMessages.NOT_EMAIL_FORMAT[language]);

      if (emailRef.current) emailRef.current.focus();

      return;
    }

    // 비밀번호
    const inputPassword = password.trim();
    const inputRePassword = rePassword.trim();
    if (inputPassword === '') {
      toastMessage.info(AlertMessages.REQUIRED_PASSWORD_INPUT[language]);

      if (passwordRef.current) passwordRef.current.focus();
      return;
    }

    if (!validateCheck.password(inputPassword)) {
      toastMessage.info(AlertMessages.NOT_PASSWORD_FORMAT[language]);
      if (passwordRef.current) passwordRef.current.focus();
      return;
    }

    if (inputRePassword === '') {
      toastMessage.info(AlertMessages.REQUIRED_RE_PASSWORD_INPUT[language]);

      if (rePasswordRef.current) rePasswordRef.current.focus();
      return;
    }

    if (inputPassword !== inputRePassword) {
      toastMessage.info(AlertMessages.NOT_MATCH_PASSWORD[language]);

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

  React.useEffect(() => {
    return () => {
      setNickname('');
      setEmail('');
      setPassword('');
      setRePassword('');
    };
  }, [isOpen]);

  const isPending = isSignUpPending;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>{ContentMessages.SIGN_UP_TITLE[language]}</DialogTitle>
        <div className={`flex flex-col gap-4`}>
          <div className={`flex flex-col gap-2`}>
            <Label htmlFor={'nickname'}>
              {ContentMessages.NICK_NAME_LABEL[language]}
            </Label>
            <Input
              ref={nicknameRef}
              id={'nickname'}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={ContentMessages.NICK_NAME_PLACEHOLDER[language]}
              disabled={isPending}
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <Label htmlFor={'email'}>
              {ContentMessages.EMAIL_LABEL[language]}
            </Label>
            <Input
              ref={emailRef}
              id={'email'}
              type={'email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={ContentMessages.EMAIL_PLACEHOLDER[language]}
              disabled={isPending}
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <div className={`flex gap-1`}>
              <Label htmlFor={'password'}>
                {ContentMessages.PASSWORD_LABEL[language]}
              </Label>
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
                    {ContentMessages.PASSWORD_TOOLTIP[language]}
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
              placeholder={ContentMessages.PASSWORD_PLACEHOLDER[language]}
              disabled={isPending}
            />
            <Input
              ref={rePasswordRef}
              id={'rePassword'}
              type={'password'}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder={ContentMessages.RE_PASSWORD_PLACEHOLDER[language]}
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
              {ContentMessages.SIGN_UP_BUTTON[language]}
            </Button>
            <Button
              variant={'outline'}
              className={`flex-1 cursor-pointer`}
              onClick={close}
              disabled={isPending}
            >
              {ContentMessages.CANCEL_BUTTON[language]}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
