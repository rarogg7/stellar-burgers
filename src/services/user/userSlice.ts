import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '../../utils/types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const loginUserThunk = createAsyncThunk<TUser, TLoginData>(
  'users/loginUser',
  async (data) => {
    const result = await loginUserApi(data);
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result.user;
  }
);

export const logoutUserThunk = createAsyncThunk('users/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getUserThunk = createAsyncThunk<{ user: TUser }>(
  'users/getUser',
  async () => getUserApi()
);

export const registerUserThunk = createAsyncThunk<TUser, TRegisterData>(
  'users/registerUser',
  async (data) => {
    const result = await registerUserApi(data);
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result.user;
  }
);

export const updateUserThunk = createAsyncThunk<{ user: TUser }, Partial<TRegisterData>>(
  'users/updateUser',
  async (data) => updateUserApi(data)
);

export const getOrdersThunk = createAsyncThunk<TOrder[]>(
  'users/getUserOrders',
  async () => getOrdersApi()
);

export interface UserState {
  isUserAuthenticated: boolean;
  isLoginUserRequest: boolean;
  user: TUser | null;
  orders: TOrder[];
  isOrdersRequest: boolean;
  error: string | null;
}

const initialState: UserState = {
  isUserAuthenticated: false,
  isLoginUserRequest: false,
  user: null,
  orders: [],
  isOrdersRequest: false,
  error: null
};

const setPending = (state: UserState) => {
  state.isLoginUserRequest = true;
  state.error = null;
};

const setRejected = (state: UserState, action: any) => {
  state.isLoginUserRequest = false;
  state.error = action.error.message ?? 'Unknown error';
};

const setOrdersRejected = (state: UserState, action: any) => {
  state.isOrdersRequest = false;
  state.error = action.error.message ?? 'Unknown error';
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isUserAuthenticatedSelector: (state) => state.isUserAuthenticated,
    isLoginUserRequestSelector: (state) => state.isLoginUserRequest,
    userNameSelector: (state) => state.user?.name || '',
    userEmailSelector: (state) => state.user?.email || '',
    userSelector: (state) => state.user,
    userOrdersSelector: (state) => state.orders,
    isOrdersRequestSelector: (state) => state.isOrdersRequest,
    errorSelector: (state) => state.error
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUserThunk.pending, setPending)
      .addCase(loginUserThunk.rejected, setRejected)
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoginUserRequest = false;
        state.isUserAuthenticated = true;
      });

    builder
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isLoginUserRequest = false;
        state.isUserAuthenticated = false;
      });

    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoginUserRequest = true;
      })
      .addCase(getUserThunk.rejected, setRejected)
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoginUserRequest = false;
        state.isUserAuthenticated = true;
      });

    builder
      .addCase(registerUserThunk.pending, setPending)
      .addCase(registerUserThunk.rejected, setRejected)
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoginUserRequest = false;
        state.isUserAuthenticated = true;
      });

    builder
      .addCase(updateUserThunk.pending, setPending)
      .addCase(updateUserThunk.rejected, setRejected)
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoginUserRequest = false;
        state.isUserAuthenticated = true;
      });

    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isOrdersRequest = true;
      })
      .addCase(getOrdersThunk.rejected, setOrdersRejected)
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrdersRequest = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export const {
  isUserAuthenticatedSelector,
  userNameSelector,
  userEmailSelector,
  userSelector,
  isLoginUserRequestSelector,
  userOrdersSelector,
  isOrdersRequestSelector,
  errorSelector
} = userSlice.selectors;
export default userSlice.reducer;
