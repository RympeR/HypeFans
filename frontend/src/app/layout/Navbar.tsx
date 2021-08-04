import React from 'react';
import { useLocation } from 'react-router';
import { ReactComponent as AddIcon } from '../../assets/images/add.svg';
import { ReactComponent as BellIcon } from '../../assets/images/bell.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/home.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/message.svg';
import { ReactComponent as ProfileIcon } from '../../assets/images/user.svg';
import NavLink from '../components/home/NavLink';
import { NAV_LINKS } from '../utils/utilities';

const Navbar = () => {
  const { pathname } = useLocation();

  if (pathname === `/${NAV_LINKS.SIGNIN}` || pathname === `/${NAV_LINKS.SIGNUP}`) {
    return null;
  }

  return (
    <nav className="nav">
      <div className="nav__inner">
        <NavLink toPath={NAV_LINKS.HOME}>
          <HomeIcon />
        </NavLink>

        <NavLink toPath={NAV_LINKS.NOTIFICATIONS}>
          <BellIcon />
        </NavLink>

        <NavLink toPath={NAV_LINKS.ADD}>
          <AddIcon />
        </NavLink>

        <NavLink toPath={NAV_LINKS.CHAT}>
          <ChatIcon />
        </NavLink>

        <NavLink toPath={NAV_LINKS.PROFILE}>
          <ProfileIcon />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
