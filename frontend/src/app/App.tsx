import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../styles/app.scss';
import { Main, Navbar } from './layout';
import AddPost from './pages/AddPost';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { LangProvider } from './utils/LangProvider';
import { ViewportProvider } from './utils/ViewportProvider';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Main>
          <ViewportProvider>
            <LangProvider>
              <Switch>
                <Route exact path={`/`} component={Home} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/add" component={AddPost} />
                <Route path="/chat" component={Chat} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </LangProvider>
          </ViewportProvider>
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
