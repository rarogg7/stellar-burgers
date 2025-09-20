import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getFeedsThunk = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number }
>('feeds/getFeeds', async () => getFeedsApi());

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

const initialState: FeedState = {
  orders: [],
  isFeedsLoading: false,
  order: null,
  isOrderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

const setLoading = (state: FeedState, key: keyof FeedState) => {
  state[key] = true as any;
};

const setError = (state: FeedState, key: keyof FeedState, action: any) => {
  state.error = action.error.message ?? 'Unknown error';
  state[key] = false as any;
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    isFeedsLoadingSelector: (state) => state.isFeedsLoading,
    orderSelector: (state) => state.order ?? null,
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
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
      });

    builder
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

export const {
  ordersSelector,
  isFeedsLoadingSelector,
  orderSelector,
  isOrderLoadingSelector,
  totalSelector,
  totalTodaySelector
} = feedSlice.selectors;

export default feedSlice.reducer;
