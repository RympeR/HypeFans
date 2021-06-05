import React from 'react';
import { useLocation } from 'react-router';
import SignInForm from '~/app/components/auth/SignInForm';
import SignUpForm from '~/app/components/auth/SignUpForm';
import { NAV_LINKS } from '~/app/utils/utilities';
import { ReactComponent as Logo } from '../../../assets/images/sign-in-logo.svg';
const Auth = () => {
  const { pathname } = useLocation();

  return (
    <div className="auth">
      <div className="auth__inner">
        <div className="auth__logo-wrapper">
          <Logo className="auth__logo" />
          <h1 className="auth__logo-title">HypeFans</h1>
        </div>
        {pathname === `/${NAV_LINKS.SIGNUP}` ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Auth;
