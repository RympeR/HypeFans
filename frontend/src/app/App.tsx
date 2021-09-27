import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getUserData } from '~/redux/authReducer';
import '../styles/app.scss';
import { Main, Navbar } from './layout';
import AddPost from './pages/AddPost';
import Auth from './pages/auth/Auth';
import Chat from './pages/Chat';
import { Favourites } from './pages/favourites/Favourites';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { Settings } from './pages/settings/Settings';
import { LangProvider } from './utils/LangProvider';
import { ViewportProvider } from './utils/ViewportProvider';

const App = () => {
  const dispatch = useDispatch();
  if (Cookies.get('token') !== undefined && Cookies.get('token') !== null) {
    dispatch(getUserData());
  }
  return (
    <>
      <BrowserRouter>
        <ViewportProvider>
          <LangProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route exact path="/signup" component={Auth} />
              <Main>
                <Route path="/home" component={Home} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/add" component={AddPost} />
                <Route path="/chat" component={Chat} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/favourites" component={Favourites} />
              </Main>
            </Switch>
          </LangProvider>
        </ViewportProvider>
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
