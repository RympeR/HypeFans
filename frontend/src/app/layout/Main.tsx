import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

const Main = ({ children }: { children: ReactNode }) => {
  if (localStorage.getItem("hypefansToken") === null) {
    return <Redirect to="/" />;
  }
  return (
    <main className="main" id="main">
      {children}
    </main>
  );
};

export default Main;
