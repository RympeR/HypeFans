import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as langData from '../assets/text/index.json';
import '../styles/app.scss';
import { Main, Navbar } from './layout';
import AddPost from './pages/AddPost';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { LangContext } from './utils/LangContext';

const App = () => {
  // const LangData = LangDataJSON.parse()
  const [currentLang, setCurrentLang] = useState<any>(langData.EN);
  // const langSwitch = (e: MouseEvent<HTMLButtonElement>) => {
  //   setLang(langData[e.currentTarget.name as LANGS]);
  // };
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Main>
          <LangContext.Provider value={currentLang}>
            <Switch>
              <Route exact path={`/`} component={Home} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/add" component={AddPost} />
              <Route path="/chat" component={Chat} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </LangContext.Provider>
        </Main>
      </BrowserRouter>
      {/* <button onClick={langSwitch} name={LANGS.EN}>
        EN
      </button>
      <button onClick={langSwitch} name={LANGS.RU}>
        RU
      </button>
      <button onClick={langSwitch} name={LANGS.UA}>
        UA
      </button>
      {lang.name} */}
    </>
  );
};
export default App;
