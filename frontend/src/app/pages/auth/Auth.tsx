import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';
import SignInForm from '~/app/components/auth/SignInForm';
import SignUpForm from '~/app/components/auth/SignUpForm';
import { NAV_LINKS } from '~/app/utils/utilities';
import { RootState } from '~/redux/redux';
import { ReactComponent as Logo } from '../../../assets/images/sign-in-logo.svg';

const Auth = () => {
  const { pathname } = useLocation();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (isAuth) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="auth">
      <div className="auth__inner">
        <div className="auth__logo-wrapper">
          <Logo className="auth__logo" />
          <h1 className="auth__logo-title">HypeFans</h1>
        </div>
        {pathname === `/${NAV_LINKS.SIGNUP}` ? <SignUpForm action="signup" /> : <SignInForm action="signin" />}
      </div>
    </div>
  );
};

export default Auth;