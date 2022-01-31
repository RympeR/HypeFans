import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

const Main = ({ children }: { children: ReactNode }) => {
  if (Cookies?.get('token')?.length < 5) {
    return <Redirect to="/" />;
  }
  return (
    <main className="main" id="main">
      {children}
    </main>
  );
};

export default Main;
