import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Post from './components/Post';

const AppRouter = () => {
  const LoadingMessage = () => <div>Loading..,</div>;

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingMessage />}>
        <Switch>
          <Route exact path="/posts" component={Post} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
export default AppRouter;
