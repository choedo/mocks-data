import Logo from '@/assets/logo.png';
import ProjectList from '@/components/project/project-list';
import { Link } from 'react-router';

export default function Sidebar() {
  return (
    <div className={`max-w-50 w-full border-r flex flex-col`}>
      <div className={`h-[56px] border-b`}>
        <Link to={'/'}>
          <img
            src={Logo}
            alt={'mockstack logo'}
            className={`object-contain h-full m-auto`}
          />
        </Link>
      </div>
      <ProjectList />
    </div>
  );
}
