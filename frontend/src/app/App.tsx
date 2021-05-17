import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../styles/app.scss';
import { Main, Navbar } from './layout';
import AddPost from './pages/AddPost';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
const App = () => {
  // const [lang, setLang] = useState<any>(langData.EN);
  // const langSwitch = (e: MouseEvent<HTMLButtonElement>) => {
  //   setLang(langData[e.currentTarget.name as LANGS]);
  // };
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/messages" component={Messages} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
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
