import Logo from '@/assets/logo.png';
import DarkLogo from '@/assets/logo-dark.png';
import ProjectList from '@/components/project/project-list';
import { Link } from 'react-router';
import { useTheme } from '@/store/theme';
import React from 'react';

export default function Sidebar() {
  const theme = useTheme();

  const [logo, setLogo] = React.useState(Logo);

  React.useEffect(() => {
    if (theme === 'system') {
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setLogo(isDarkMode ? DarkLogo : Logo);
    } else {
      setLogo(theme === 'dark' ? DarkLogo : Logo);
    }
  }, [theme]);

  return (
    <div className={`max-w-50 w-full border-r flex flex-col`}>
      <div className={`h-[56px] border-b`}>
        <Link to={'/'}>
          <img
            src={logo}
            alt={'mockstack logo'}
            className={`object-contain h-full m-auto`}
          />
        </Link>
      </div>
      <ProjectList />
    </div>
  );
}
