import React from 'react';
import { ReactComponent as Logo } from '../../../assets/images/sign-in-logo.svg';
import AuthForm from '../../components/auth/AuthForm';
const Auth = () => {
  return (
    <div className="auth">
      <div className="auth__inner">
        <div className="auth__logo-wrapper">
          <Logo className="auth__logo" />
          <h1 className="auth__logo-title">HypeFans</h1>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
