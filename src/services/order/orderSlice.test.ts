import { TOrder } from '@utils-types';
import reducer, { initialState, clearOrder, orderBurgerThunk } from './orderSlice';

const mockOrder: TOrder = {
  _id: 'testOrderIdNew',
  status: 'new',
  name: 'test order',
  createdAt: '2024-04-27T07:59:55.703Z',
  updatedAt: '2024-04-27T07:59:56.203Z',
  number: 1,
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ]
};

describe('Order Slice - синхронные экшены', () => {
  test('Очистка заказа', () => {
    const stateWithOrder = { ...initialState, order: mockOrder };
    const newState = reducer(stateWithOrder, clearOrder());
    expect(newState).toEqual(initialState);
  });
});

describe('Order Slice - асинхронные экшены', () => {
  test('Проверка pending', () => {
    const newState = reducer(initialState, orderBurgerThunk.pending('pending', mockOrder.ingredients));
    expect(newState.isOrderLoading).toBeTruthy();
    expect(newState.error).toBeNull();
  });

  test('Проверка rejected', () => {
    const error: Error = { name: 'rejected', message: 'Ошибка при создании заказа' };
    const newState = reducer(initialState, orderBurgerThunk.rejected(error, 'rejected', mockOrder.ingredients));
    expect(newState.isOrderLoading).toBeFalsy();
    expect(newState.error).toBe(error.message);
  });

  test('Проверка fulfilled', () => {
    const payload = { order: mockOrder };
    const newState = reducer(initialState, orderBurgerThunk.fulfilled(payload, 'fulfilled', mockOrder.ingredients));
    expect(newState.isOrderLoading).toBeFalsy();
    expect(newState.error).toBeNull();
    expect(newState.order).toEqual(mockOrder);
  });
});
