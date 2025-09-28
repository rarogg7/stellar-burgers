import { combineReducers } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burgerConstructor/burgerConstructorSlice';
import ingredientsReducer from './ingredients/ingredientsSlice';
import feedReducer from './feed/feedSlice';
import orderReducer from './order/orderSlice';
import userReducer from './user/userSlice';
import { rootReducer } from './rootReducer';

const expectedRootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer
});

describe('rootReducer', () => {
  test('Должен вернуть начальное состояние при неизвестном action', () => {
    const UNKNOWN_ACTION = { type: 'UNKNOWN_ACTION' };
    const APP_INIT = { type: 'APP_INIT' };
    
    const initialState = expectedRootReducer(undefined, UNKNOWN_ACTION);
    
    expect(rootReducer(undefined, APP_INIT)).toEqual(initialState);
  });
});
