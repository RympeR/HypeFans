import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/redux';

const Main = ({ children }: { children: ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  // if (!isAuth) {
  //   return <Redirect to="/" />;
  // }
  return (
    <main className="main" id="main">
      {children}
    </main>
  );
};

export default Main;
