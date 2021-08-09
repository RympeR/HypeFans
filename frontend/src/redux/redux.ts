import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authReducer';

const reducers = combineReducers({
  auth: authReducer
});

type rootReducer = typeof reducers;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

export type RootState = ReturnType<rootReducer>;

const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));

export default store;
