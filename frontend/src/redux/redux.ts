import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import notificationsReducer from '~/redux/notificationsReducer';

const reducers = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  notifications: notificationsReducer
});

type rootReducer = typeof reducers;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

export type RootState = ReturnType<rootReducer>;

const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));

export default store;
