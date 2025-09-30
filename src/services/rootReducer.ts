import { combineReducers } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burgerConstructor/burgerConstructorSlice';
import ingredientsReducer from './ingredients/ingredientsSlice';
import userReducer from './user/userSlice';
import feedReducer from './feed/feedSlice';
import orderReducer from './order/orderSlice';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
