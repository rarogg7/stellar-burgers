import reducer, {
  UserState,
  loginUserThunk,
  logoutUserThunk,
  getUserThunk,
  registerUserThunk,
  updateUserThunk,
  getOrdersThunk
} from './userSlice';
import { TUser, TOrder } from '../../utils/types';
import type { TLoginData, TRegisterData } from '@api';

describe('User Slice - асинхронные экшены', () => {
  const mockUser: TUser = {
    email: 'test@test.ru',
    name: 'Даниил'
  };
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    }
  ];

  const initialState: UserState = {
    isUserAuthenticated: false,
    isLoginUserRequest: false,
    user: null,
    orders: [],
    isOrdersRequest: false,
    error: null
  };

  const loginArg: TLoginData = { email: 'test@test.ru', password: '123456' };
  const registerArg: TRegisterData = {
    email: 'test@test.ru',
    password: '123456',
    name: 'Даниил'
  };
  const updateArg: Partial<TRegisterData> = { name: 'Даниил' };

  test('loginUserThunk pending', () => {
    const action = {
      type: loginUserThunk.pending.type,
      payload: undefined,
      meta: { arg: loginArg, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoginUserRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('loginUserThunk fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: mockUser,
      meta: { arg: loginArg, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoginUserRequest).toBe(false);
    expect(state.isUserAuthenticated).toBe(true);
  });

  test('loginUserThunk rejected', () => {
    const error = { message: 'Ошибка авторизации' };
    const action = {
      type: loginUserThunk.rejected.type,
      payload: undefined,
      error,
      meta: { arg: loginArg, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe(error.message);
    expect(state.isLoginUserRequest).toBe(false);
  });

  test('logoutUserThunk fulfilled', () => {
    const loggedState: UserState = {
      ...initialState,
      user: mockUser,
      isUserAuthenticated: true
    };
    const action = {
      type: logoutUserThunk.fulfilled.type,
      payload: undefined,
      meta: { requestId: 'test' }
    };
    const state = reducer(loggedState, action);
    expect(state).toEqual(initialState);
  });

  test('getUserThunk pending', () => {
    const action = {
      type: getUserThunk.pending.type,
      payload: undefined,
      meta: { arg: undefined, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoginUserRequest).toBe(true);
  });

  test('getUserThunk fulfilled', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: { user: mockUser },
      meta: { arg: undefined, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isUserAuthenticated).toBe(true);
  });

  test('getUserThunk rejected', () => {
    const error = { message: 'Ошибка получения пользователя' };
    const action = {
      type: getUserThunk.rejected.type,
      payload: undefined,
      error,
      meta: { arg: undefined, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe(error.message);
    expect(state.isLoginUserRequest).toBe(false);
  });

  test('registerUserThunk fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: mockUser,
      meta: { arg: registerArg, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isUserAuthenticated).toBe(true);
  });

  test('registerUserThunk rejected', () => {
    const error = { message: 'Ошибка регистрации' };
    const action = {
      type: registerUserThunk.rejected.type,
      payload: undefined,
      error,
      meta: { arg: registerArg, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe(error.message);
  });

  test('updateUserThunk fulfilled', () => {
    const prevState = {
      ...initialState,
      user: { email: 'old@mail.ru', name: 'Иван' }
    };
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: { user: mockUser },
      meta: { arg: updateArg, requestId: 'test' }
    };
    const state = reducer(prevState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isUserAuthenticated).toBe(true);
  });

  test('getOrdersThunk pending', () => {
    const action = {
      type: getOrdersThunk.pending.type,
      payload: undefined,
      meta: { arg: undefined, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.isOrdersRequest).toBe(true);
  });

  test('getOrdersThunk fulfilled', () => {
    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: mockOrders,
      meta: { arg: undefined, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.orders).toEqual(mockOrders);
    expect(state.isOrdersRequest).toBe(false);
  });

  test('getOrdersThunk rejected', () => {
    const error = { message: 'Ошибка получения заказов' };
    const action = {
      type: getOrdersThunk.rejected.type,
      payload: undefined,
      error,
      meta: { arg: undefined, requestId: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe(error.message);
    expect(state.isOrdersRequest).toBe(false);
  });
});
