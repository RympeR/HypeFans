import React, { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="main" id="main">
      {children}
    </main>
  );
};

export default Main;
