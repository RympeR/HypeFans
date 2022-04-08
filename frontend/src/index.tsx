import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import store, { persistor } from './redux/redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Preloader } from './app/utils/Preloader';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Preloader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
