import React from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as AddIcon } from '../../assets/images/add.svg';
import { ReactComponent as NoteficationIcon } from '../../assets/images/bell.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/home.svg';
import { ReactComponent as MessageIcon } from '../../assets/images/message.svg';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';
import { getLastUrlItem } from '../utils/helpers';

enum NAV_LINKS {
  HOME = '',
  NOTIFICATIONS = 'notifications',
  ADD = 'add',
  MESSAGES = 'messages',
  PROFILE = 'profile'
}

const Navbar = () => {
  const location = useLocation();

  const pathname = getLastUrlItem(location.pathname);

  return (
    <nav className="nav">
      <div className="nav__inner">
        <a
          className={`nav__icon ${pathname === NAV_LINKS.HOME ? 'nav__icon_active' : ''}`}
          href="/"
          id={NAV_LINKS.HOME}
        >
          <HomeIcon />
        </a>

        <a
          className={`nav__icon ${pathname === NAV_LINKS.NOTIFICATIONS ? 'nav__icon_active' : ''}`}
          href="/notifications"
          id={NAV_LINKS.NOTIFICATIONS}
        >
          <NoteficationIcon />
        </a>

        <a
          className={`nav__icon ${pathname === NAV_LINKS.ADD ? 'nav__icon_active' : ''}`}
          href="/add"
          id={NAV_LINKS.ADD}
        >
          <AddIcon />
        </a>

        <a
          className={`nav__icon ${pathname === NAV_LINKS.MESSAGES ? 'nav__icon_active' : ''}`}
          href="/messages"
          id={NAV_LINKS.MESSAGES}
        >
          <MessageIcon />
        </a>

        <a
          className={`nav__icon ${pathname === NAV_LINKS.PROFILE ? 'nav__icon_active' : ''}`}
          href="/profile"
          id={NAV_LINKS.PROFILE}
        >
          <UserIcon />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
