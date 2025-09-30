import { rootReducer } from './rootReducer';
import { initialState as burgerInitialState } from './burgerConstructor/burgerConstructorSlice';
import { initialState as ingredientsInitialState } from './ingredients/ingredientsSlice';
import { initialState as feedInitialState } from './feed/feedSlice';
import { initialState as orderInitialState } from './order/orderSlice';
import { initialState as userInitialState } from './user/userSlice';

describe('rootReducer', () => {
  test('Должен вернуть начальное состояние при неизвестном action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      burgerConstructor: burgerInitialState,
      ingredients: ingredientsInitialState,
      feed: feedInitialState,
      order: orderInitialState,
      user: userInitialState
    });
  });
});
