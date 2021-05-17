import React from 'react';
import { useLocation } from 'react-router-dom';
import { getLastUrlItem } from '../helpers';

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
      <div className="container">
        <div className="nav__inner">
          <a
            className={`nav__icon ${pathname === NAV_LINKS.HOME ? 'nav__icon_active' : ''}`}
            href="/"
            id={NAV_LINKS.HOME}
          >
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => console.log('lol')}>
              <path
                d="M5 15.0002L20 3.3335L35 15.0002V33.3335C35 34.2176 34.6488 35.0654 34.0237 35.6905C33.3986 36.3156 32.5507 36.6668 31.6667 36.6668H8.33333C7.44928 36.6668 6.60143 36.3156 5.97631 35.6905C5.35119 35.0654 5 34.2176 5 33.3335V15.0002Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M15 36.6667V20H25V36.6667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            className={`nav__icon ${pathname === NAV_LINKS.NOTIFICATIONS ? 'nav__icon_active' : ''}`}
            href="/notifications"
            id={NAV_LINKS.NOTIFICATIONS}
          >
            <svg viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30.3003 13.3335C30.3003 10.6813 29.2467 8.13779 27.3714 6.26243C25.496 4.38706 22.9525 3.3335 20.3003 3.3335C17.6481 3.3335 15.1046 4.38706 13.2292 6.26243C11.3539 8.13779 10.3003 10.6813 10.3003 13.3335C10.3003 25.0002 5.30029 28.3335 5.30029 28.3335H35.3003C35.3003 28.3335 30.3003 25.0002 30.3003 13.3335Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.1837 35C22.8906 35.5051 22.4701 35.9244 21.964 36.2159C21.458 36.5073 20.8843 36.6608 20.3003 36.6608C19.7164 36.6608 19.1426 36.5073 18.6366 36.2159C18.1306 35.9244 17.71 35.5051 17.417 35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            className={`nav__icon ${pathname === NAV_LINKS.ADD ? 'nav__icon_active' : ''}`}
            href="/add"
            id={NAV_LINKS.ADD}
          >
            <svg viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.3002 36.6668C29.505 36.6668 36.9669 29.2049 36.9669 20.0002C36.9669 10.7954 29.505 3.3335 20.3002 3.3335C11.0955 3.3335 3.63354 10.7954 3.63354 20.0002C3.63354 29.2049 11.0955 36.6668 20.3002 36.6668Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M20.3003 13.3335V26.6668" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.6335 20H26.9669" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            className={`nav__icon ${pathname === NAV_LINKS.MESSAGES ? 'nav__icon_active' : ''}`}
            href="/messages"
            id={NAV_LINKS.MESSAGES}
          >
            <svg viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M35.3003 25C35.3003 25.8841 34.9491 26.7319 34.324 27.357C33.6989 27.9821 32.851 28.3333 31.967 28.3333H11.967L5.30029 35V8.33333C5.30029 7.44928 5.65148 6.60143 6.2766 5.97631C6.90172 5.35119 7.74957 5 8.63363 5H31.967C32.851 5 33.6989 5.35119 34.324 5.97631C34.9491 6.60143 35.3003 7.44928 35.3003 8.33333V25Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            className={`nav__icon ${pathname === NAV_LINKS.PROFILE ? 'nav__icon_active' : ''}`}
            href="/profile"
            id={NAV_LINKS.PROFILE}
          >
            <svg viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="path_active"
                d="M33.6336 35V31.6667C33.6336 29.8986 32.9312 28.2029 31.681 26.9526C30.4307 25.7024 28.735 25 26.9669 25H13.6336C11.8655 25 10.1698 25.7024 8.91954 26.9526C7.6693 28.2029 6.96692 29.8986 6.96692 31.6667V35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.3003 18.3333C23.9822 18.3333 26.967 15.3486 26.967 11.6667C26.967 7.98477 23.9822 5 20.3003 5C16.6184 5 13.6337 7.98477 13.6337 11.6667C13.6337 15.3486 16.6184 18.3333 20.3003 18.3333Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
