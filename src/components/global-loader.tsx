import Logo from '@/assets/icon-logo.png';

export default function GlobalLoader() {
  return (
    <div
      className={
        'bflex h-[100dvh] w-[100dvw] flex flex-col items-center justify-center'
      }
    >
      <div className={'animate-bounce flex items-center gap-4'}>
        <img src={Logo} alt={'MOCKSTACK logo'} className={`w-50 h-auto`} />
      </div>
    </div>
  );
}
