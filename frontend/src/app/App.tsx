import React from 'react';
import '../styles/app.scss';
import './app.i18n';
import AppRouter from './AppRouter';
import { Navbar } from './layout';

const App = () => {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};
export default App;
