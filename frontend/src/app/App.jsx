import Cookies from 'js-cookie';
import React from 'react';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getUserData } from '../redux/authReducer';
import '../styles/app.scss';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from './components/search/Search';
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
// require('swiper/swiper-bundle.css');
import MetaTags from 'react-meta-tags';
import { ToastContainer } from "react-toastify";
import { PersonalSettings } from './pages/personal/PersonalSettings';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

const App = () => {
  const dispatch = useDispatch();
  if (Cookies?.get('token')?.length > 5) {
    dispatch(getUserData());
  }
  
  return (
    <>
      <MetaTags>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta http-equiv="ScreenOrientation" content="autoRotate:disabled" />
      </MetaTags>
      <Provider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <ToastContainer />
          <ViewportProvider>
            <LangProvider>
              <Switch>
                <Route path="/signup" component={Auth} />
                <Route exact path="/" component={Auth} />
                <Main>
                  <Route path="/home" component={Home} />
                  <Route path="/notifications" component={Notifications} />
                  <Route path="/add" component={AddPost} />
                  <Route path="/chat" component={Chat} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/favourites" component={Favourites} />
                  <Route path="/personalSettings" component={PersonalSettings} />
                  <Route path="/search" component={Search} />
                </Main>
              </Switch>
              <Navbar />
            </LangProvider>
          </ViewportProvider>
        </BrowserRouter>
      </Provider>
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
