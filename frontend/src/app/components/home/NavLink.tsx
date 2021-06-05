import React, { ReactNode } from 'react';
import { useLocation } from 'react-router';
import { getLastUrlPoint } from '~/app/utils/utilities';

interface NavLinkProps {
  children: ReactNode;
  toPath: string;
}

const NavLink = ({ children, toPath }: NavLinkProps) => {
  const location = useLocation();

  const lastUrl = getLastUrlPoint(location.pathname);
  return (
    <a className={`nav__icon ${lastUrl === toPath ? 'nav__icon_active' : ''}`} href={`/${toPath}`} id={toPath}>
      {children}
    </a>
  );
};

export default NavLink;
