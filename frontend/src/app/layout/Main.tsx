import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { RootState } from '~/redux/redux';

const Main = ({ children }: { children: ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isLoading = useSelector((state: RootState) => state.notifications.isLoading);
  if (!isAuth && isLoading) {
    return <Redirect to="/" />;
  }
  return (
    <main className="main" id="main">
      {children}
    </main>
  );
};

export default Main;
