import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getFeedsThunk = createAsyncThunk<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>('feeds/getFeeds', async () => getFeedsApi());

export const getOrderByNumberThunk = createAsyncThunk<
  { orders: TOrder[] },
  number
>('orders/getOrder', async (orderNumber) => getOrderByNumberApi(orderNumber));

export interface FeedState {
  orders: TOrder[];
  isFeedsLoading: boolean;
  order: TOrder | null;
  isOrderLoading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
}

export const initialState: FeedState = {
  orders: [],
  isFeedsLoading: false,
  order: null,
  isOrderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

type LoadingKeys = 'isFeedsLoading' | 'isOrderLoading';

const setLoading = (state: FeedState, key: LoadingKeys) => {
  state[key] = true;
};

const setError = (state: FeedState, key: LoadingKeys, action: any) => {
  state.error = action.error?.message ?? 'Unknown error';
  state[key] = false;
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getFeedsThunk.pending, (state) => {
        setLoading(state, 'isFeedsLoading');
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        setError(state, 'isFeedsLoading', action);
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(getOrderByNumberThunk.pending, (state) => {
        setLoading(state, 'isOrderLoading');
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        setError(state, 'isOrderLoading', action);
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.orders[0] ?? null;
      });
  }
});

export const ordersSelector = (state: { feed: FeedState }) => state.feed.orders;
export const isFeedsLoadingSelector = (state: { feed: FeedState }) =>
  state.feed.isFeedsLoading;
export const orderSelector = (state: { feed: FeedState }) => state.feed.order;
export const isOrderLoadingSelector = (state: { feed: FeedState }) =>
  state.feed.isOrderLoading;
export const totalSelector = (state: { feed: FeedState }) => state.feed.total;
export const totalTodaySelector = (state: { feed: FeedState }) =>
  state.feed.totalToday;

export default feedSlice.reducer;
