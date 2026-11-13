import { AuthUserType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const AUTH_STORAGE_KEY = 'auth_user';

export function extractAuthUser(
  res: unknown,
  fallback: { email: string; username?: string },
): AuthUserType {
  const responseObj = (res ?? {}) as {
    _id?: number;
    id?: number;
    email?: string;
    username?: string;
    data?: {
      _id?: number;
      id?: number;
      email?: string;
      username?: string;
      user?: Partial<AuthUserType>;
      data?: Partial<AuthUserType>;
    };
    user?: Partial<AuthUserType>;
  };
  const userPayload =
    responseObj.data?.user ??
    responseObj.data?.data ??
    responseObj.user ??
    responseObj.data ??
    responseObj;

  return {
    _id: userPayload?._id ?? (userPayload as { id?: number })?.id,
    username: userPayload?.username || fallback.username || '',
    email: userPayload?.email || fallback.email,
  };
}

type AuthState = {
  user: AuthUserType | null;
  isAuth: boolean;
  isInitialized: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isInitialized: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthUserType>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isInitialized = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isInitialized = true;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
  },
});

export const {
  setAuth,
  clearAuth,
  setInitialized,
  setAccessToken,
  setRefreshToken,
} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
