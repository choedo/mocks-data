import { toast } from 'sonner';

type ToastAction = 'success' | 'info' | 'warning' | 'error';
type ToastOption = {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  expand?: boolean;
  description?: string;
};

function toastMessageAction(
  type: ToastAction,
  msg: string,
  options?: ToastOption,
) {
  if (options && !options.position) {
    options.position = 'top-center';
  }

  toast[type](msg, {
    position: 'top-center',
    ...options,
  });
}

const toastMessage = {
  success: (msg: string, options?: ToastOption) =>
    toastMessageAction('success', msg, options),
  info: (msg: string, options?: ToastOption) =>
    toastMessageAction('info', msg, options),
  warning: (msg: string, options?: ToastOption) =>
    toastMessageAction('warning', msg, options),
  error: (msg: string, options?: ToastOption) =>
    toastMessageAction('error', msg, options),
};

export default toastMessage;
