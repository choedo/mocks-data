import { LoaderIcon } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div
      className={
        'z-9999 bg-gray-500 opacity-10 w-[100dvw] h-[100dvh] flex justify-center items-center fixed top-0 left-0'
      }
    >
      <LoaderIcon className={'h-10 w-10 animate-spin text-white'} />
    </div>
  );
}
