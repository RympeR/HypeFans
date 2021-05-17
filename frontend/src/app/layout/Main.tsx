import React, { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
  return <main className="main container">{children}</main>;
};

export default Main;
