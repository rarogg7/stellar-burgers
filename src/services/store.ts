import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import burgerConstructor from './burgerConstructor/burgerConstructorSlice';
import feed from './feed/feedSlice';
import ingredients from './ingredients/ingredientsSlice';
import order from './order/orderSlice';
import user from './user/userSlice';

export const rootReducer = combineReducers({
  burgerConstructor,
  feed,
  ingredients,
  order,
  user
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
