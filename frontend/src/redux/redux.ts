import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import blogReducer from "./blogReducer";
import favouritesReducer from "./favouritesReducer";
import notificationsReducer from "./notificationsReducer";
import userReducer from "./userReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  notifications: notificationsReducer,
  user: userReducer,
  favourites: favouritesReducer,
});

type rootReducer = typeof reducers;

const persistedReducer = persistReducer(persistConfig, reducers);

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesType<T>>;

export type RootState = ReturnType<rootReducer>;

const middlewares = [thunkMiddleware];

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default store;
