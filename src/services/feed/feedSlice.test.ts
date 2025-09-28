import feedReducer, { getFeedsThunk, FeedState } from './feedSlice';
import { TOrder } from '../../utils/types';

describe('Тесты асинхронных экшенов feedSlice', () => {
  describe('Тестируем getFeedsThunk', () => {
    test('pending: установка isFeedsLoading в true и очистка ошибки', () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const newState = feedReducer(
        initialState,
        getFeedsThunk.pending('pending')
      );

      expect(newState.isFeedsLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    test('fulfilled: успешная загрузка заказов', () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const mockOrders: TOrder[] = [
        {
          _id: 'testid1',
          status: 'done',
          name: 'test order 1',
          createdAt: '2024-04-27T07:39:15.703Z',
          updatedAt: '2024-04-27T07:39:16.203Z',
          number: 1,
          ingredients: ['ing1', 'ing2']
        },
        {
          _id: 'testid2',
          status: 'done',
          name: 'test order 2',
          createdAt: '2024-04-27T07:49:15.703Z',
          updatedAt: '2024-04-27T07:49:16.203Z',
          number: 2,
          ingredients: ['ing3', 'ing4']
        }
      ];

      const payload = {
        orders: mockOrders,
        total: 5,
        totalToday: 2
      };

      const newState = feedReducer(
        initialState,
        getFeedsThunk.fulfilled(payload, 'fulfilled')
      );

      expect(newState.isFeedsLoading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.orders).toEqual(mockOrders);
      expect(newState.total).toBe(5);
      expect(newState.totalToday).toBe(2);
    });

    test('rejected: установка ошибки и выключение загрузки', () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: true,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: 'Ошибка' }
      };
      const newState = feedReducer(initialState, action);

      expect(newState.isFeedsLoading).toBe(false);
      expect(newState.error).toBe('Ошибка');
    });
  });
});
